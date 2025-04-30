--- 
title: Why CPUs Use Caches (and What That Even Means)
parent: Blog 
--- 

# Why CPUs Use Caches (and What That Even Means)



Let’s say you're working on a project late at night, and you've got everything spread across three spots:  
1. The stuff on your desk — super handy.  
2. A shelf nearby — still accessible.  
3. A dusty cupboard across the room — slow to get to, but it has everything.

Now imagine your CPU is doing the same — just a LOT faster (and without coffee). It has to fetch data to process, and depending on *where* that data lives, it either grabs it instantly or has to wait a while. That’s basically what **cache memory** is about: **keeping important stuff close so the CPU doesn’t waste time waiting**.

## The Memory Hierarchy — A Speed Pyramid

CPUs are incredibly fast — like, billions-of-operations-per-second fast. RAM? Not quite as fast. And SSDs? Even slower. So if every time the CPU needed a number, it had to go all the way to RAM or disk, your programs would crawl. To fix this, CPUs use a **memory hierarchy**:

- **Registers**: Live inside the CPU. Super tiny. Super fast.
- **L1 Cache**: Also on the CPU. Small (like 32–64KB), lightning fast.
- **L2 Cache**: Slightly larger and slower (a few hundred KB to a couple MB).
- **L3 Cache**: Bigger again (MBs), shared between CPU cores.
- **RAM**: Your regular memory. Slower than all of the above.
- **Storage**: HDD/SSD. Huge, but very, very slow in comparison.

Each level is a compromise: faster = smaller & expensive, slower = larger & cheaper.

The slowness is also not so obvious to many, but it is literally farer -- as in, Caches and Registers are present inside the physical chip of the CPUs that you put inside, whereas the RAM and Storage are seperate chips with different controllers which assemble the stuff that we give it.

## Cache 101: Hits, Misses, and Why They Matter

When the CPU needs a value, it checks the L1 cache first.  
- If the data is already there: that’s a **cache hit** — fast, good, everyone’s happy.  
- If it’s *not* there: **cache miss**. Then it tries L2, then L3, and finally RAM.

Every time you “miss” and go down a level, you lose time. RAM might take **100x** longer than L1. That's like grabbing a pen from your desk vs. walking out to a store to buy one.

So smart CPUs try really hard to keep things you *probably* need in cache — this is where **locality** comes in.

## Locality: CPUs Are Predictive (and Lazy)

Most programs tend to reuse the same data or instructions in loops — this is called **temporal locality**. And when you access one part of an array, chances are you'll access the nearby parts too — that's **spatial locality**.

So when the CPU fetches a memory location, it grabs a bit extra, just in case. This is why cache lines exist — chunks of memory are brought in, not just individual bytes. And modern CPUs even try to *predict* what you’ll use next and load it into cache ahead of time.

Basically: CPUs are designed to be lazy — they avoid the long walk to RAM as much as possible.

## L1, L2, L3: The Cache Squad

Here’s how it generally breaks down:

- **L1**: Super close to the core. Smallest, fastest. Split into instruction (I-cache) and data (D-cache).
- **L2**: Larger, slightly slower. Usually per core.
- **L3**: Even bigger, slower still. Shared by all cores on the chip.

Let’s say you’re playing a game. The code you're currently running (rendering, physics) will likely sit in L1. Your last few functions or variables might still be in L2. L3 is like a big backup warehouse — if it's not in L3, it’ll have to go all the way to RAM (ouch).

## Why Not Just Make RAM Faster?

Because it’s expensive, complex, and power-hungry. Making all memory as fast as cache would burn a hole in your laptop (and your wallet). Instead, we let RAM be big and slow, and use caches to smooth things over.

Smart caching means **you get the speed of small memory, but the flexibility of big memory**.

## Final Thoughts

So yeah, CPUs are fast — but memory can be a bottleneck. Caches are the clever workaround: they’re like tiny, super-speedy notebooks sitting next to your brain. Use them well, and everything flies.

Next time your program is “slow,” maybe it's not your code — maybe it just missed the drawer.


