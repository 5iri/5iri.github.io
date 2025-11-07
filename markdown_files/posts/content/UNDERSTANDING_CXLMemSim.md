---
title: Understanding CXLMemSim (Beginner‑Friendly Deep Dive)
parent: Blog
layout: content
permalink: blog/understanding-cxlmemsim
date: 2025-11-07
---

# Understanding CXLMemSim (Beginner‑Friendly Deep Dive)

CXLMemSim is a software emulator that makes your program run “as if” some of its memory lived on slower, CXL‑attached devices. It does not change your code. It watches the app briefly, estimates how much extra time CXL would add, and pauses your app by that much. Do this every few milliseconds, and the whole run feels like a machine with far memory.

## What It Emulates
- Extra time for far‑memory reads (vs. local DRAM).
- Bandwidth caps and simple congestion across CXL switches/links.
- CPU‑side stall pressure from cache misses (ROB/outstanding requests).
- Optional paging/TLB costs (4K/2M/1G) and simple caching/migration.

## What It’s Not
- Not a cycle‑accurate PCIe/CXL link simulator (no flit‑by‑flit protocol).
- Not a device DRAM/Flash model (no cell‑level timing).
- It’s a fast, CPU‑perspective timing emulator for real apps.

## How It Works (Simple 4‑Step Loop)
1) Watch: Every few milliseconds (“epoch”), it samples memory behavior (e.g., LLC misses, L2 stalls, LBR/PEBS samples) with low overhead.
2) Map: It keeps a layout of “near” (local DRAM) and “far” (CXL pools) memory and knows which addresses belong where (policies can migrate/cache pages).
3) Estimate: It computes the extra time that far memory, bandwidth limits, congestion, paging, and stores would have added in that epoch.
4) Delay: It injects that extra time as a small pause, then repeats.

## Inside The Code (Main Pieces)
- Main loop: reads PMU/eBPF samples per epoch and injects the computed delay (see `src/main.cc`).
- Controller: global view, policies, counters (see `include/cxlcontroller.h`, `src/cxlcontroller.cpp`).
- Topology/device: switches and expanders (see `include/cxlendpoint.h`, `src/cxlendpoint.cpp`).
- Policies: allocation/migration/paging/caching (see `include/policy.h`, `src/policy.cpp`).
- Counters/stats: loads, stores, conflicts, back‑invalidation, TLB/PTW (see `include/cxlcounter.h`).

## How It Decides “Near” vs “Far”
- Think “two closets”: near (fast) and far (slower).
- Capacity and a placement policy decide what gets the “far” sticker (e.g., when local fills, new data is placed in far).
- Policies can move/copy (“migrate”/“cache”) pages to reduce far trips.
- When samples show you touched an address, CXLMemSim checks where that address currently lives (near/far) and accounts cost accordingly.

## The Timing Model (What Adds Delay)
- Remote read latency: far reads pay higher latency than local DRAM (you set both).
- Overlap via ROB: the CPU overlaps some misses; CXLMemSim scales per‑miss penalty so you don’t overcharge.
- Bandwidth exceedance (time series): if bytes moved exceed link/switch capacity in the window, overflow becomes wait time (`overflow_bytes / link_rate`).
- Congestion: simple conflict penalties when many requests bunch up at a switch.
- Paging/TLB: optional page‑table‑walk penalties sensitive to 4K/2M/1G page sizes.
- Stores/writeback: uses counter signals to approximate extra store/fence delay.

### Tiny Numerical Example
- Configure: DRAM 110 ns, far memory 300 ns (+190 ns), link 50 GB/s.
- In a 5 ms epoch, samples say ~300 “far” reads, but CPU overlaps ~4 at a time → added latency ≈ `300 × 190 ns / 4 ≈ 14.25 µs`.
- Data moved exceeded 50 GB/s over that window by ~50 MB → bandwidth delay ≈ `50 MB / 50 GB/s ≈ 1.0 ms`.
- Total pause injected for this epoch ≈ `1.014 ms`. Repeat next epoch.

## Typical CXL Numbers To Start With
- Latency: 250–400 ns read end‑to‑end for CXL 2.0 (PCIe 5.0 x16); add ~20–50 ns per switch hop.
- Bandwidth: effective ~35–55 GB/s per direction on x16 after overheads (workload‑dependent).
- DRAM baseline: 85–120 ns typical (measure and pass via `-d`).

## Example Command
Simulate one far device with 64 GB capacity, 250 ns read latency, 50 GB/s:

```
./CXLMemSim \
  -t ./microbench/ld_simple \
  -i 5 \
  -m p \
  -d 110 \
  -o "(1)" \
  -q "0,64" \
  -l "250,250" \
  -b "50,50" \
  -k "numa,none,hugepage,fifo"
```

- `-i`: epoch (ms). `-m`: page mode. `-d`: DRAM latency (ns).
- `-o`: topology `(1)` means one expander. `-q`: capacities (0 local, 64 GB far).
- `-l`: expander latencies (ns). `-b`: expander bandwidths (GB/s).
- `-k`: policies (allocation,migration,paging,caching).

## From The Paper (2303.06153) — Why It’s Valid
- Epoch‑based target‑latency injection: sample, estimate extra delay (latency + bandwidth), inject.
- Bandwidth exceedance: delays added when demand > cap (time‑series).
- Validation: hardware and Gem5 comparisons; CXL ≈ 2–3× DDR latency, ~50–80% of DRAM bandwidth.
- Rules of thumb: small pools +70–90 ns; rack‑scale +180 ns or more; each switch hop ~20–50 ns.

## Useful Analyses You Can Run
- Slowdown vs. topology: vary switches, device latencies/bandwidths; report % under 1 µs and p95/p99 injected delay.
- Policy comparisons: placement, migration, paging, caching — which mix cuts remote trips most?
- Congestion view: add co‑runners; chart demand vs cap over time and count exceedance events.

## Prefetcher Extension (High‑Leverage Add‑On)
- Goal: bring data “near” before you need it (fewer far penalties) while budgeting link traffic.
- Approach:
  - Add a `Prefetcher` with `observe()` and `generate()` per epoch.
  - Implement stride/stream first (degree/distance, throttling).
  - Mark prefetch requests so they consume bandwidth/credits but don’t count as demand loads.
  - On timely prefetch, treat demand as local/LRU hit; always charge prefetch bytes into the bandwidth exceedance check.
- Metrics: prefetch accuracy, timeliness margin (arrival − demand), coverage, pollution (wasted), and impact on injected delay.

## How It “Knows” How Much To Slow Down
- Count: “How many expensive memory trips did we likely do?” (LLC misses).
- Classify: “Which of those live in far memory right now?” (address → near/far).
- Cost: “What’s the extra time per far trip?” (far − local, scaled for overlap).
- Traffic: “Did we exceed link capacity?” (overflow becomes extra wait).
- Extras: add optional PTW/store costs.
- Pause: sum those numbers and sleep by that amount. Repeat.

## Quick Metrics To Track
- Latency: average and p95/p99 of injected delay per epoch; % under 1 µs.
- Bandwidth: time above cap per link; congestion events.
- Placement: local vs remote counts; migration/back‑invalidation counts.
- If prefetch is enabled: useful/late/wasted, timeliness, and link share.

---
