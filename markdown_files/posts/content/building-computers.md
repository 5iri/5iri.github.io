---
title: "I just wanted to build accelerators"
parent: Blog
permalink: blog/building-computers
layout: content
content_class: building-story
date: 2026-11-03
published: true
description: Three years of CPUs, memory, spiking networks, and trying to make rocks think.
---

<div class="article-copy" markdown="1">

<div class="story-margin story-margin--left" markdown="1">

{% include media-figure.html side="right" image="/markdown_files/posts/assets/selected/santra-laptop.webp" alt="Santra, an orange cat, sitting on a laptop beside electronics on the workbench" caption="Santra, supervising." %}

</div>

I was watching Santra play with her chew toy. A little later she was asleep, completely unbothered by anything around her. I kept wondering: what is happening in her brain through all of this?

A bit philosophical, yes. But I have been thinking about what makes us think since I was a kid. In my second year of college, I started to understand that people were building language models and running them on chips. (The big GPT-2 moment, yes.) These systems needed enormous amounts of computation, yet could do things that looked surprisingly familiar. *How the fuck are we making that happen with rocks?*

I don't think building a language model is the same thing as understanding a brain. But asking how a system computes, and how its pieces make that computation possible, felt like a place to start.

One of my long-term hopes is that, in the next 40 years, we get much closer to making systems that can think and act like us. I don't know exactly what that will take, but the questions I want to work on are becoming clearer:

- **Design and verification:** Can an agent propose an accelerator, test it, understand the failure, and improve the design?
- **Iteration speed:** How do we make EDA tools fast and usable enough to support that loop?
- **Access and manufacturing:** How do we make process design kits easier to work with and get designs manufactured faster?
- **New devices:** If memristors become practical building blocks, what would tools need to understand to take us from a device to circuits and then to a whole system?

I didn't start out with that list. Three years ago, I just knew I liked chips and wanted to understand how they worked. CPUs, memory, spiking networks, and a few small accelerators gradually brought me here. Here's how that happened.

</div>

<section class="article-section" markdown="1">

<div class="article-copy" markdown="1">

## It started with a CPU

I knew I liked chips, but I had no idea where to begin. A senior at [SRA-VJTI](https://github.com/SRA-VJTI) pointed me towards [Synapse32](https://github.com/SRA-VJTI/synapse32). The idea was to build a soft-core RISC-V CPU that could eventually be useful in embedded projects. I wanted to make my own RV32I core and understand what actually went into it.

<aside class="story-side-fill story-side-fill--left" aria-label="Arty board LED demo">

{% include media-figure.html side="left" video="/markdown_files/posts/assets/selected/arty-board-closeup-2024-08-31.mp4" poster="/markdown_files/posts/assets/selected/arty-board-closeup-2024-08-31.jpg" alt="An Arty FPGA board connected over USB, with a hand pressing a button" caption="An Arty board on the desk. August 2024." %}

</aside>

<aside class="story-side-fill story-side-fill--left story-side-fill--third" aria-label="Virtex-7 FPGA bench setup">

{% include media-figure.html image="/markdown_files/posts/assets/selected/virtex7-board-2025-05-22.jpg" alt="Powered Virtex-7 FPGA board on a bench" caption="A Virtex-7 bench setup. May 2025." %}

</aside>

I was studying electrical engineering at VJTI, where much of the coursework focused on large-scale and power systems. I wanted to understand chips, so I had to find that education elsewhere. SRA became the place where I could ask questions, get stuck, and learn from people building things around me. SRA's [board progression](https://x.com/k7agar/status/2116453076806844468), [board builds](https://x.com/k7agar/status/2116477896483385855) and [PCB photos](https://x.com/k7agar/status/2116454170039582806) are worth a look too.

<aside class="story-side-fill story-side-fill--left story-side-fill--later" aria-label="Related photo or video">

{% include media-figure.html side="right" image="/markdown_files/posts/assets/selected/sensor-workshop-2025-02-09.jpg" alt="Teaching about sensors at a workshop" caption="Teaching about sensors at a workshop. February 2025." %}

</aside>

The first time you make a pipeline work, the diagrams stop being abstract. Instructions move through stages; hazards have to be handled; everything has to agree about what happens on a clock edge. Once I understood a little about one RISC-V core, I had more questions:

<aside class="story-side-fill story-side-fill--right" aria-label="Related photo or video">

{% include media-figure.html video="/markdown_files/posts/assets/selected/legged-robot-floor-2025-02-19.mp4" poster="/markdown_files/posts/assets/selected/legged-robot-floor-2025-02-19.jpg" alt="A legged-robot floor test" caption="A legged-robot floor test. February 2025." %}

</aside>

- **The instruction set:** What does the processor need to be able to do, and which instructions make that practical?
- **The pipeline:** Where should the work be split into stages, and how fast can each stage run?
- **The cost of splitting:** What happens to latency, hazards, and control when I add more stages?

Pipelining gave me a useful way to think about trade-offs. A longer combinational path can limit the clock frequency. Splitting the work into stages can shorten the longest path between registers, letting the clock run faster. But registers have overhead, and more stages can mean more latency and more costly hazards.

<figure class="pipeline-chart">
{% include pipeline-tradeoff.svg %}
<figcaption>An illustrative workload: frequency rises while end-to-end latency first falls and then rises as the pipeline gets deeper. Frequency uses the left scale and latency the right; these curves are hypothetical, not measurements from my CPU.</figcaption>
</figure>

In this example, breaking a long path into stages helps at first. Beyond a point, the costs of extra stages and workload effects outweigh the faster clock, so latency rises again. The turning point depends on the design and workload; a real pipeline may behave differently. The question is where to split the work for the system I want to build.

Around the same time, I followed Ben Eater's 8-bit computer builds, learned how transistors can be used to build digital circuits, and went through Onur Mutlu's lectures. I wanted to keep going down the stack and understand what the pieces of a computer were actually doing.

<aside class="story-side-fill story-side-fill--right story-side-fill--later" aria-label="Related photo or video">

{% include media-figure.html video="/markdown_files/posts/assets/building-computers/robot-board-leds-2025-11-15.mp4" poster="/markdown_files/posts/assets/building-computers/robot-board-leds-2025-11-15.jpg" alt="Robot electronics with a blue LED matrix" caption="A robot-board bench test. November 2025." %}

</aside>

</div>

</section>

<section class="article-section" markdown="1">

<div class="article-copy" markdown="1">

## Memory, and the application on the other side

Learning about processors made me realise how much of the machine is memory. I played around with memory circuits in [LTspice](https://ltspice.analog.com/) and tried to understand what happens when the thing you need isn't where the computation is happening. That question keeps coming back, whether the system is a tiny FPGA or a rack full of machines.

I also tried to implement a transformer on an FPGA. At the time, I understood neither the large FPGA I was trying to use nor the transformer well enough. It was difficult, and I didn't get the complete system I had imagined. But it made the gap obvious: learning to build a processor is only one part of running an application.

[The purple banana running through my HDMI driver](https://x.com/lazybanananann/status/2109253911500792308).

A way of thinking about this that I like is to look at the application and the compute underneath it together. What does the workload actually need? What can the hardware provide? How much of either side can you change? People generally call that hardware–software co-design. For me it became a reason to understand both sides instead of treating the chip as a black box.

<figure class="systems-map">
{% include systems-map.svg %}

</figure>

<div class="systems-questions" markdown="1">

**Models & learning**<br>
What kind of computation produces useful intelligence?

**Applications & workloads**<br>
What does the task actually need the system to do?

**Processors & accelerators**<br>
What should the hardware compute, and how?

**Memory & interconnect**<br>
Where does the data live, and what does moving it cost?

**Devices & materials**<br>
What can we physically build, and can it scale?

**Compilers & tools**<br>
How do we turn an idea into a working, verifiable system?

</div>

</div>

</section>

<section class="article-section" markdown="1">

<div class="article-copy" markdown="1">

## Spikes and Prosperity

My internship at IIT Madras introduced me to a different approach: spiking neural networks. Their event-driven structure takes inspiration from biological neurons. That was exciting to me because it brought the question back to where it started, even if an artificial spiking neuron is only a simplified model of the real thing. Is this the right architecture for intelligence? I don't know. I wanted to understand it by building it.

I worked on a hardware implementation of [Prosperity](/blog/prosperity), an SNN accelerator architecture from a research paper. Getting from a paper and simulator to hardware meant working through timing, state, data movement, and the uncomfortable details that an architectural diagram can leave out. I had a lot of fun with it. I also found out later that some of my attempted extensions were based on a wrong understanding of the design. Going back and figuring out why was part of the work too.

{% include media-figure.html side="left" image="/markdown_files/posts/assets/selected/prosperity-tcam.png" alt="Prosperity TCAM component diagram" caption="A TCAM component from the Prosperity hardware design." %}

I got outputs from the design. [Here's the demo](https://x.com/lazybanananann/status/1964345744497746186), and I want to revisit what worked and what didn't.

</div>

</section>

<section class="article-section" markdown="1">

<div class="article-copy" markdown="1">

## Making the whole system run

<aside class="story-side-fill story-side-fill--left" aria-label="Related project media">

{% include media-figure.html image="/markdown_files/posts/assets/selected/udp-summary-20-samples.png" alt="UDP measurements from the tiny3tpu setup" caption="UDP measurements from the tiny3tpu setup." %}

</aside>

<aside class="story-side-fill story-side-fill--right" aria-label="Related project media">

{% include media-figure.html image="/markdown_files/posts/assets/selected/uart-gemm-console.png" alt="Matrix multiplication results over UART" caption="Matrix multiplication results over UART." %}

</aside>

I kept coming back to matrix multiplication. My [first tiny TPU](/blog/tiny-tpu-week) was a small systolic array on an FPGA, with a MicroBlaze controller and BRAM tiling to feed it data. Getting it to run MNIST was exciting: I could follow the computation from the program down to the hardware I had built.

<div class="story-post" aria-label="The early tiny TPU build">
<blockquote class="twitter-tweet" data-dnt="true" data-width="400" data-conversation="none"><a href="https://x.com/lazybanananann/status/2009340546679230645">The first tiny TPU build — view on X</a></blockquote>
</div>

{% include media-figure.html side="left" video="/markdown_files/posts/assets/selected/mnist-demo.mp4" poster="/markdown_files/posts/assets/selected/mnist-demo-1.png" alt="The early MNIST demo." caption="The early MNIST demo." %}

Once the multiply worked, I wanted to run more than a single kernel. That meant building the system around it: moving inputs, getting results back, running the rest of the program, and giving the hardware a way to receive work.

[Tiny3TPU](https://github.com/5iri/tiny3tpu) grew out of that. On a KC705, it brought together a VexRiscv CPU, two 4×4 int8 systolic cores, on-chip RAM, firmware, and a compiler path from JAX through StableHLO to the board.

<div class="story-post" aria-label="Introducing tiny3tpu">
<blockquote class="twitter-tweet" data-dnt="true" data-width="400" data-conversation="none"><a href="https://x.com/lazybanananann/status/2105322005071577099">Introducing tiny3tpu — view on X</a></blockquote>
</div>

The interesting part was being able to send a program to the board and get an answer back. I tried a digit classifier, then mesh transforms and cloth physics. For the mesh demo, the board transformed the vertices and my laptop drew the coordinates it received.

{% include media-figure.html image="/markdown_files/posts/assets/selected/system-config.png" alt="The tiny3tpu system configuration" caption="The tiny3tpu system configuration." %}

<div class="story-feature-pair" markdown="1">

{% include media-figure.html side="left" image="/markdown_files/posts/assets/selected/banana.gif" alt="A mesh transformed on the FPGA, drawn from coordinates returned by the board" caption="The board transforms the vertices; the laptop draws them." %}

{% include media-figure.html side="right" image="/markdown_files/posts/assets/tiny3tpu-stack/cloth.gif" alt="Cloth simulated on the board; playback is sped up" caption="Cloth simulation. Playback is sped up." %}

</div>

The cloth made the limits harder to miss. In one experiment, each frame took about 4.8 seconds, mostly in software floating-point physics. The GIF above is sped up. [An earlier capture](https://x.com/lazybanananann/status/2105322934420017162) measured a different, smaller physics step.

I also worked on a [small matrix accelerator for Tiny Tapeout](https://github.com/5iri/tt-riscv-gpu), where area and interfaces made the constraints impossible to ignore.

{% include media-figure.html image="/markdown_files/posts/assets/selected/spi-matrix-gds.jpg" alt="Tiny Tapeout matrix accelerator die layout" caption="The Tiny Tapeout design, with all metal layers visible." %}

The most useful part was being able to change something and measure it. A faster arithmetic unit doesn't automatically make the whole program fast. Data still has to move; the CPU and compiler still have work to do. I wrote more about those experiments in [The array was the easy part](/blog/joy-of-owning-the-whole-stack).

</div>

</section>

<section class="article-section" markdown="1">

<div class="article-copy" markdown="1">

## From the board to the rack

As I read more, I realised that people were approaching the same broad problem from different directions. Some change the model architecture. Some build specialised hardware. Others change how memory and compute are connected. I started paying attention to work from companies like [Cerebras](https://www.cerebras.ai/) and [Etched](https://www.etched.com/) as well as different approaches to compute-in-memory. They make different bets, and I want to understand where each one helps.

[CXL](/blog/cxls-are-important) was interesting because it gave me a way to think about memory beyond a single board, at the scale of servers and racks. I worked on [CXLMemSim](/blog/understanding-cxlmemsim), a way to study CXL-attached memory behaviour. There are more papers in progress, and I'll share them when I can.

At [Zett AI](https://zettai.us), I have also worked on KimiBox, an on-device language-model system. The questions feel familiar at a different scale: where do the model's weights live, what needs to move, and how do you make the whole system fast on hardware people can actually afford? We experimented with ideas around memory and prefetching. I remember a run around 20 tokens per second, but I need to check the configuration and current result before treating that number as a benchmark.

</div>

</section>

<section class="article-section" markdown="1">

<div class="article-copy" markdown="1">

## What should we measure?

A question I want to come back to is: what are all these architectures trying to maximise?

I keep coming back to a few ways of asking it:

- **Tokens per second:** How quickly can the system produce output? I also need to distinguish the speed one user sees from total throughput across users.
- **Tokens per joule:** How much output do I get for the energy spent?
- **Tokens per dollar:** What does it cost to produce that output, including the costs I choose to count?

None is a complete measure. I also need to know the model, quality, workload, batch size, context length, and what's included in the cost. A faster stream of worse answers isn't automatically a better system.

I want to compare model and hardware architectures using those kinds of measures, based on the numbers their authors actually report. I haven't done that analysis here yet. The interesting part will be figuring out which comparisons are fair and where the missing numbers are.

[The bitter lesson](http://incompleteideas.net/IncIdeas/BitterLesson.html) is also in the back of my mind. As I understand Sutton's argument, general methods that can keep using more computation, especially learning and search, have often outperformed approaches built around our hand-coded ideas about a problem. That doesn't prove spiking networks can't work, or that specialised chips are the wrong approach. It does make me ask whether a clever idea can keep improving when the workload, the data, and the system scale up.

Cerebras is interesting to me in that context: it makes a very specific hardware bet to support large-scale computation. The question I want to investigate is how such bets affect what can scale and at what cost. I have similar questions about memristors and compute-in-memory: can they deliver their promise at the scale of a useful system, including the memory, interfaces, tooling, and manufacturing around the devices? I don't know yet. Someone who makes that work at scale could change a lot.

</div>

</section>

<section class="article-section" markdown="1">

<div class="article-copy" markdown="1">

## The tools have to get better too

I think language models and agents could eventually do much more of the work of designing accelerators. I can imagine giving a system a direction and letting it propose designs, run experiments, and improve them. That's a long-term ambition, not something I think we've already solved. Verification, physical constraints, and knowing whether the result is actually useful still matter.

One near-term problem is the speed of the loop. Hardware design tools can be slow and awkward to iterate with, and an agent can't learn much from an experiment it can't run or verify. That is part of why my work on [CIRCT and counterexample generation](/blog/gsoc-2026) matters to me: better tools can make the next design easier to understand and debug.

I don't expect to answer all of this soon. But these are the kinds of questions I can see myself working on for the next 20 or 30 years. I want to keep building things, seeing where they break, and getting a little closer to understanding how computation becomes something that looks like thought.

Looking back, none of this would have happened without the people who supported me, answered my questions, and believed I could figure things out. I've been really lucky to learn from mentors and build alongside [friends](https://sravjti.in/webring) who made all of this feel possible. Thank you.

</div>

</section>


<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
