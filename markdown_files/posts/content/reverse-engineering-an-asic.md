---
title: "From rectangles to TWO STARS: reverse-engineering an ASIC"
parent: Blog
permalink: blog/reverse-engineering-an-asic
layout: content
date: 2026-09-09
description: How I reconstructed a netlist from GDS geometry, checked it against reference data, and used Z3 to find the input that unlocked Jane Street's ASIC puzzle.
---

Most of my hardware work starts with some RTL and moves toward a layout. This puzzle made me work backwards.

Jane Street's ASIC reverse-engineering puzzle provides a GDS layout and an example input waveform. The task is to find an input that makes `success` go high, then work out what the chip emits. There is also a smaller warm-up design with its source, netlists, DEF, and GDS available.

The interesting part for me was building a chain of representations I could check. Geometry became connectivity, connectivity became a gate-level simulation, and the relevant logic became constraints for a solver. Each step made the next problem smaller.

This post contains the solution, including the input and decoded output. If you want to try it yourself first, stop here.

## Start with what survived in the layout

The GDS retained standard-cell structure names and pin labels inside the cell definitions. That changed the problem considerably. I did not need to infer a NAND gate by recognizing its transistor layout. A cell name already identified which library gate it was.

What I needed to recover was the wiring: which placed pin belonged to which net?

My extractor in `extract.py` treats this as a geometry problem. The parser reads the relevant GDS elements, keeping coordinates in integer database units. Orthogonal polygons become rectangles, and touching conductor rectangles on the same routing layer are connected using union-find. A spatial hash limits the rectangle pairs that need checking.

There are two levels to this. First, I build a local pin map for each cell definition, joining its conductor shapes through its contacts and associating connected groups with pin labels. Then I transform those pin shapes into die coordinates for every placement, add the top-level routing and via placements, and join everything again.

At the end, each connected component is a candidate net. Top-level labels provide names such as `clk`, `rst_n`, and `success`; the remaining nets get generated names.

This is deliberately a small extractor for the geometry and hierarchy used in these files. It is not a general-purpose GDS connectivity engine. Keeping that scope clear made it possible to spend effort on checking the connections that mattered.

## The warm-up was my ground truth

The warm-up computes whether two shift-register values add to 496. More useful for extraction, it ships a DEF file describing the placed components and their net connections. That gave me something independent to compare against.

I matched extracted instances to DEF instances by cell type and placed location, then compared the partitions of `(instance, pin)` pairs into nets. Internal net names do not need to match: what matters is whether the same pins are connected together.

Two details were particularly easy to get wrong.

### A placement origin is not always the lower-left corner

A GDS reference origin and a DEF `PLACED` location are different conventions. Mirroring makes the difference visible. Matching raw origins can make correctly placed cells appear unmatched.

The fix was to transform the cell's placement boundary and use its resulting lower-left corner as the matching coordinate. The extractor uses layer `236/0`, with `81/4` as a fallback for cells such as taps.

### The cell can supply the contact

A routed metal-1 wire can land on a cell pin whose connection to local interconnect is supplied by an `mcon` inside the cell definition. Looking only at top-level via placements misses that connection.

The local pin extraction therefore has to account for the cell's cut layers as well as its conductor layers. In particular, the `67/44` contact connects local interconnect to metal 1. Missing this connection can fragment a shared reset net into separate islands around the flops.

After accounting for these details, the warm-up comparison matched all 230 extracted instances and all 285 non-power pin connections, with no missing or extra pin connections, split nets, or merged nets.

That check was the point where the extraction became something I could build on.

## Make the extracted circuit run

The puzzle extraction produced a structural Verilog netlist with 728 functional cell instances, 739 signal nets, and 92 flip-flops. The larger warm-up placement count above includes physical cells that do not appear in the functional netlist.

I used the SkyWater functional models for simulation. `celllib.py` reads pin directions from those models, and `simulate.py` assembles the models and creates wrappers for the drive-strength variants used by the layout.

The first functional check was replaying `example_inputs.vcd`: drive its clock, reset, enable, and serial input into the extracted circuit, then compare `O[7:0]` and `success` after the rising clock edges. The sample offset allows the functional model's register delay to settle.

Both outputs matched the reference across 312 sampled edges, with zero mismatches and no unknown values at the checked samples.

That is evidence for the extraction on the supplied trace, not a proof that every possible input behaves identically. I wanted both checks: the warm-up tests connectivity against an independent physical description, while the puzzle replay checks observable behavior on the actual target.

## Work backwards from success

Once the netlist ran, I could ask a much more focused question: what has to happen for `success` to become 1?

`netgraph.py` records which cell drives each net and which pins consume it. Walking backwards through combinational cells, stopping at register outputs, gives the immediate logic feeding a register. Repeating that across register boundaries gives its sequential dependencies.

The extracted `success` output is driven by a flip-flop. Its D-input cone contains 47 combinational cells and is bounded by 57 flop outputs, including `success` itself. Following the dependencies across cycles expands the relevant state to 79 of the design's 92 flops.

This let me postpone understanding the output generator. I still needed to simulate it at the end, but I did not need to decode all of its internal behavior to solve the input condition.

## Derive the Boolean functions instead of transcribing them

The netlist contains compound gates with names such as `o2bb2a`. Manually translating every library cell into a Boolean expression would introduce another place to make a mistake.

Instead, `celltruth.py` exhaustively simulates the input combinations of each supported combinational model and records its outputs. The solver translates the rows where an output is 1 into an OR of AND terms. The truth tables are small enough that a direct encoding is practical.

For the success cone, the constraint is:

```text
D(success) = 1
success = 0
```

The second line asks what sets the flag, rather than allowing an already-set flag to explain the result.

`solve_cone.py` then checks each boundary variable with both possible values. If only one value is satisfiable, that bit is forced. The saved result is an exact required pattern on 56 state bits, with no remaining don't-care bits among those variables.

There is also a separate simulation check in `verify_cone.py`: force that pattern into the circuit, check that the success flop's D input becomes 1, and flip each required bit individually to check that it breaks the match. It checks the encoded condition against the Verilog model; it does not yet establish that serial inputs can reach the pattern.

## A winning state still needs an input sequence

The next problem is reachability. Knowing the state I want does not tell me which bits to put on `I`.

The reference waveform contains two independent attempts, each with 121 active clock cycles, separated by a reset pulse. Treating this as one 242-bit stream would model the wrong execution.

For one attempt, `solve_input.py` takes the register state immediately before the first active edge from the reference simulation. It then creates a symbolic input bit for each active cycle and copies the combinational transition logic across the window:

```text
state[0] = state sampled after reset, before the attempt
state[k + 1] = transition(state[k], input[k])
state[121] must satisfy the required 56-bit pattern
```

During that window, `enable` and `rst_n` are high. The solver updates the registers in the transitive fan-in of success and connects each cycle's register outputs to the next cycle's logic.

There is a subtle timing detail here. The comparator can match after the final input edge, but the success flip-flop latches that match on the following edge, when enable is already low. Requiring the flag to be high inside the input window asks for the wrong endpoint. The pipeline therefore constrains the final state to the winning pattern and lets the full replay verify the later flag assertion.

Z3 finds a satisfying 121-bit input. That establishes one candidate under the encoded model; it does not establish that the input is unique.

## Replay the candidate through the whole circuit

Here is the recovered input, in transmission order, with the leftmost bit sent first:

```text
0000000101010000100000000000010101010000000000001010000001000001000000100000101000010000000100000010000010010001010000000
```

`run_key.py` preserves the reference clock, reset, and enable timing, replacing `I` with the candidate bits. It drives each bit 2500 ps before its capturing edge and repeats the key for both attempts.

The full gate-level replay asserts success at 1,256,000 ps and 2,816,000 ps. Reading the output changes as ASCII gives:

```text
(* TWO STARS *)(* TWO STARS *)
```

One message per attempt. The answer emitted by the circuit is `(* TWO STARS *)`.

As a negative check, a 121-bit all-zero input never asserts success and produces `EMPTY SKY` for each attempt. The replay tool now returns a failure status for that case.

## What I would carry into the next puzzle

The strategy that worked was to give each representation a specific job. Geometry recovered connectivity. The warm-up supplied a structural check. Simulation tested the extracted behavior. Graph traversal narrowed the question. Z3 found an input, and a full simulation checked that input through the output generator.

I also tightened the scripts after reviewing them. Shell pipelines now propagate Python failures, the warm-up checker rejects extra connections and unmatched instances, and key replay fails when success never asserts. VCD timestamps are normalized to picoseconds so reference files and generated waveforms can be compared even when their timescales differ.

Those details matter because the whole strategy depends on being able to trust the checks between stages. A printed warning followed by exit code zero is a poor foundation for the next transformation.

The satisfying part was reaching an answer without having to reconstruct the original RTL or assign a human explanation to every gate. I needed enough structure to ask a precise question, and enough independent checks to believe the answer.
