---
title: "2025: From Imposter to Believer"
layout: content
parent: Blog
permalink: blog/2025-retro
date: 2026-01-02
---

I had started 2025 with a singular, slightly terrifying motivation: I knew absolutely nothing about computer architecture, and I felt like I needed to learn everything to ensure I actually did something meaningful with my life. That realization hit me hard during the winter break of 2024—the kind of existential dread that makes you question every decision you've made. I remember sitting in my room, scrolling through research papers I couldn't understand, feeling like an imposter in my own field. But that fear became fuel. Looking back now, the year was an absolute roller coaster, and somehow, I loved every single bit of it.

## The "I Know Nothing" Phase

### January-February: Onur Mutlu's Lectures and the Verification Spiral

My first month of 2025 was spent completely buried in Onur Mutlu's 2015 summer playlist for Computer Architecture. I'm talking about 8-10 hour days just watching lectures, pausing, rewinding, taking notes in my barely-legible handwriting. The man is a legend, and his way of explaining memory hierarchies, cache coherence, and prefetchers made something click in my brain. It was the foundation I desperately needed—the kind of grounding that makes you realize how much you *don't* know, but also gives you a roadmap.

From that high, I spiraled—probably a bit too ambitiously—into the world of verification. I thought, "Okay, if I'm going to build CPU cores, I need to verify them properly." So I dove headfirst into learning Boolector, SymbiYosys, UVM, and cocotb. I spent weeks trying to get formal verification working, writing testbenches that felt like they were more complex than the actual hardware I was verifying. 

I remember one particularly frustrating night where I spent four hours debugging a cocotb testbench only to realize I had a typo in a signal name. *Four hours.* For a typo. Honestly? It felt like a lot of time spent with very little tangible "result" to show for it. No fancy demos, no working cores, just a bunch of half-finished verification frameworks that I barely understood. I was exhausted, mentally drained, and I could feel myself burning out. So I made a decision: pivot back to what I started with—fixing my own CPU core. But before I could do that...

### March: RISCV-ISA-IN-C and Learning How Things Actually Work

Before I touched the core again, I took a detour that ended up being one of the most valuable learning experiences of the year. I built [RISCV-ISA-IN-C](https://github.com/5iri/RISCV-ISA-IN-C), a simple RISC-V instruction set simulator written in C. The project itself wasn't groundbreaking, but the *why* behind it was crucial: I realized that to understand why I was doing things on a microcontroller, why certain instructions existed, why memory-mapped I/O worked the way it did, I first had to understand how programming actually works at the lowest possible level.

So I learned C. Not just the syntax, but the *philosophy* of C. Pointers, memory management, bit manipulation, the stack, the heap—all the things that make C both beautiful and terrifying. I spent late nights reading K&R, writing toy programs, and breaking things just to see how they'd fail. This wasn't about building something impressive; it was about building intuition. And that intuition would pay off in ways I couldn't have predicted.

## The Math Rabbit Hole

### Late March-Early April: Harris & Harris, GSoC Stress, and a Brief Math Detour

After my C detour, I spent some time doing a deep dive into the Harris & Harris book—*Digital Design and Computer Architecture*. This time, things were different. I wasn't just reading; I was *understanding*. I finally learned what pipelining actually was, not just as an abstract concept but as a concrete design pattern with real trade-offs. I learned how SRAM cells worked at the transistor level, why there's a "right" way (and many wrong ways) to write Verilog, and how timing constraints can make or break a design.

Around this time, I was also stressing about GSoC (Google Summer of Code) and briefly stumbled upon SageMath—an open-source mathematics software system. While exploring it, I discovered Hopf Algebra, this incredibly cool (and incredibly confusing) topic. I even submitted a couple of PRs that got rejected—a wake-up call that I wasn't spending enough time learning math deeply. But I realized GSoC wasn't the path for me, and I had bigger things coming.

## The Turning Point: IIT Madras and Building Prosperity

### April: The Internship That Changed Everything

In early April, I got the email that would change my trajectory for the year. Somehow—and I still think this was a mix of luck and the quality of a PR I had put together for SRA's Synapse32 project—I had landed an internship at IIT Madras. Under real researchers. At RISE Labs. I couldn't believe it. This felt like the "make it or break it" moment I had been waiting for. The internship would start on May 15th.

I would be working under Dr. Gopalakrishnan Srinivasan, who had done extensive work on Spiking Neural Networks (SNNs). The RISE Labs were using Bluespec SystemVerilog (BSV), a high-level hardware description language I had never touched before. So I spent April and early May learning BSV from scratch while simultaneously diving deep into SNN literature. The learning curve was brutal—BSV's rules system and the way it handles implicit conditions is nothing like Verilog or VHDL.

I wanted to impress Dr. Srinivasan, so I spent every spare moment reading papers on SNNs, trying to understand the neuroscience, the spike timing, the energy efficiency advantages. I'd stay up until 3 AM reading about Leaky Integrate-and-Fire neurons and STDP (Spike-Timing-Dependent Plasticity), scribbling diagrams in my notebook, trying to connect the biological concepts to hardware implementations.

### May 15 - July 15: Two Months of Implementing Prosperity in Hardware

And then I started building. What would become my most significant project of the year: a hardware implementation of **Prosperity**, a cycle-accurate SNN simulator developed by PhD students from Duke University. Their paper had just been accepted to HPCA 2025, and I was tasked with taking their simulator and implementing it in actual hardware—turning software simulation into real silicon (well, Verilog).

Those two months were some of the most intense, exhausting, and rewarding months of my life. I was learning BSV, understanding SNNs, reading the Prosperity paper over and over to grasp the architecture, and implementing hardware optimizations all at the same time. The challenge wasn't just coding—it was translating the high-level concepts from a cycle-accurate simulator into hardware constraints, timing requirements, and resource utilization. Some days I felt like a genius; other days I felt completely lost. I'd wake up, code for hours, hit a wall, take a walk, come back, and somehow the solution would appear.

I managed to implement the core architecture and several optimization techniques in Verilog in just two months. Looking back, I'm genuinely proud of that. I didn't implement *everything* the full accelerator would need—I was still learning what hardware implementation truly required—but I got the core design working in hardware. Dr. Srinivasan was impressed with my progress, and for the first time in a long time, I felt like I belonged in this field.

### August-September: The Math Deep Dive Redux

After the internship wrapped up in July, I had some breathing room before the next semester. That's when I went back to the math rabbit hole I had glimpsed earlier. I decided to properly understand Hopf Algebra, which meant grinding through Number Theory, Abstract Algebra, and Combinatorics. I spent these months working through textbooks, solving problem sets, watching lectures, and slowly—*painfully* slowly—building up the mathematical machinery I needed.

And then, one day in early September, it clicked. I finally understood what Hopf Algebra meant. I could see the structures, the symmetries, the elegance of it all. It was one of those rare moments where everything just falls into place.

But here's the thing: that moment also brought a crucial realization. I loved learning math. I loved the challenge, the beauty, the way a good proof could make you see the world differently. But I also knew, deep down, that I could never make it my main work. Math was a passion, a hobby, something I wanted to keep pure and untainted by deadlines and career pressure. It wasn't my "cup of tea" for a career, and that was okay.

## The Reality Check

### October: The Mistake That Almost Ruined Everything

After spending August and September diving deep into math, I came back to Prosperity in the fall semester. The work I had done during the IIT Madras internship was solid—the core hardware implementation was correct. But I wanted to extend it, to add new features and optimizations that would make it publication-worthy. So in September and October, I dove back in, re-reading papers, extending my designs, adding what I thought were improvements.

And that's when I realized: the additional work I had done in September and October was completely incorrect.

Not in small ways. In fundamental, embarrassing ways. I had misunderstood how Prosperity was supposed to work, and all the extensions I'd been building on top of the correct internship work were based on a flawed mental model. The core architecture from the internship was fine, but everything I'd added after was just... wrong.

I was almost on the verge of submitting a paper to a workshop. A paper that would have been laughed out of the room by anyone who actually understood SNNs. The only reason I caught the mistakes was because I decided to do one more deep literature review with a senior from IIT Madras, before finalizing the submission. I stayed up for 36 hours straight, reading every SNN paper I could find, cross-referencing my work, and slowly realizing the magnitude of what I had gotten wrong in my post-internship extensions.

It was devastating. I had spent two months building on top of solid work, only to realize I'd been building in the wrong direction entirely. But it was also a crucial lesson: speed without rigor is just noise. Building fast is only valuable if what you're building is correct.

### October-November: The FPGA Inference Detour That Went Nowhere

Thanks to that mistake, I realized I needed to work on something new—something where I could be more careful, more methodical. By this point, it was October, and I was feeling the pressure to have *something* to show for the year. So I decided to venture into FPGA inference techniques. I was fascinated by the idea of running large models on FPGAs, of using spatial architectures to achieve better performance-per-watt than GPUs.

I spent weeks learning about systolic arrays, dataflow architectures, and quantization techniques. I simulated designs in Vivado, optimizing matrix multiplies and experimenting with different bit-widths. The simulations looked promising. The timing reports were good. The area utilization was reasonable.

But here's the thing: I never got to run any of it on real FPGAs. Why? Because I didn't have access to high-end FPGAs. The kind of FPGAs you need to run meaningful LLM inference—Xilinx Alveo or Intel Stratix—cost thousands of dollars. And even if I had the money, getting access to the software licenses and cloud instances was prohibitively expensive for a student.

So I was stuck in simulation land, building things that *might* work but never getting the satisfaction of seeing them run on real hardware. It sucked. It felt like I was shadow-boxing, building for a fight that would never come.

## The Cold Email Grind and the Breakthrough

### November: 30 Emails, 2 Replies, 0 Acceptances

Then came the summer internship application season for 2026. I knew I needed to get an internship—preferably abroad, at a research lab or with a professor doing cutting-edge work in computer architecture or hardware accelerators. So I started the grind that every student dreads: cold emailing professors.

I crafted what I thought was a pretty good template email: brief intro, statement of interest, summary of my work, and a genuine expression of why I wanted to work with them specifically. I personalized each email, reading papers, tailoring my language, trying to make a connection.

I sent out emails. One. Five. Ten. Twenty. By the time I hit 30, I was running on autopilot. I'd wake up, search for professors working on memory systems or neural network accelerators, read their recent publications, craft an email, send it off, and move to the next one.

The response rate? Abysmal. Out of 30+ emails, only two professors replied. And both were rejections. Polite rejections, sure—"We're not taking interns this year," "Your profile is interesting but not quite the fit we're looking for"—but rejections nonetheless.

By mid-November, right around Diwali, I was exhausted. I was ready to give up. I told myself I'd take a break, enjoy the festival, and maybe start again in January with a fresh perspective. But the whole process had left me feeling defeated. I started questioning whether I was good enough, whether all this work had been worth anything, whether I should just give up on research and take a corporate internship for the paycheck.

### Late November: The Email That Changed Everything

And then, almost by accident, I stumbled upon Yiwei Yang's Zett AI page. I was browsing Twitter (or X, I guess we're supposed to call it now), following some thread about CXL (Compute Express Link) memory, and someone mentioned her work. I clicked through to her page, started reading, and I was hooked.

Her research on CXL memory pooling, disaggregated architectures, and the future of data center memory was exactly the kind of systems work that I found very very interesting. But here's the thing: she was a PhD student, not a professor. I had been mostly emailing professors because I thought students wouldn't have the resources or authority to take on interns.

But I loved her work so much that I decided to send an email anyway. I spent about two hours crafting it—not a template, but a genuine letter explaining why her work resonated with me, what I had been working on, and what I hoped to learn. I hit send at around 11 PM, right before bed, with absolutely no hope whatsoever. It was Diwali season, and I had already mentally checked out of the email grind.

I had to catch a flight to my hometown that night, so I kept my phone on airplane mode and decided to listen to some music, and went through security and stuff. I had come early so I decided to switch data back on so that I could play some mobile games to pass the time. And look what I found, Yiwei had responded. And not just with a polite rejection—she was interested. She had projects I could work on. She wanted to set up a call to discuss details.

I read that email three times before it sank in. Then I literally jumped out of my seat.

That email came at the perfect time. I was on the verge of giving up, and then suddenly, I had a lifeline. I had someone who believed I could contribute, who saw potential in the work I'd done, who was willing to give me a chance. Looking back, I think part of what made the difference was that I didn't send her a template. I sent her genuine enthusiasm, and she responded to that.

Now I have a couple of projects to work on with her, focusing on CXL memory systems and disaggregated architectures—exactly the cutting-edge systems work I've been dreaming about. I'm genuinely filled with joy. I love my life right now, and that's not something I say lightly.

## Wrapping Up the Year

### December: Barely Passing and the Manali Reset

The year ended with the usual chaos of exam season. I had spent so much time on internships, projects, and research that my coursework had taken a backseat. Power System Analysis? Barely looked at it. Control Systems? Crammed everything the night before.

I *just* passed my papers. Like, just barely. If I had scored a few marks lower, I would have had to write re-exams, and that would have been a disaster. But I pulled through—not gracefully, not with high marks, but I passed. And honestly? I'm okay with that. Those classes weren't where my heart was, and I'd rather spend my time building things and learning what I actually care about than optimizing for grades in subjects I'll never use again.

The one thing that kept me going through exam season was knowing that right after, I had a trip to Manali planned with my friends. That trip was honestly my main motivation to get through those exams (lol). The moment exams ended, we were off.

And it was exactly what I needed. We spent a week in the mountains, completely disconnected. No emails. No code. No pressure. We spent Christmas in -7°C weather, sitting around a fire, talking about everything except work. We went trekking, ate terrible roadside food that somehow tasted amazing, and I slept more than I had in months.

That trip reset me. It reminded me that life is more than just building things and chasing opportunities. It reminded me that friendships matter, that rest is productive, and that sometimes the best thing you can do for your work is to step away from it entirely.

## Looking Ahead

The year felt like an absolute roller coaster. There were moments where I felt like I was on top of the world—landing the IIT Madras internship, building Prosperity, getting Yiwei's email. And there were moments where I felt like I was failing at everything—the verification spiral that went nowhere, the SNN mistakes, the email rejections.

But I loved each and every bit of my life this year. Even the failures taught me something. Even the detours led somewhere valuable. 2025 went by too fast, and yet, looking back, I feel like I lived three different lives in those twelve months.

Now I'm back on the grind for 2026 with more motivation than ever. I have projects to work on, mentors who believe in me, and a clearer sense of what I want to do with my life. I'm not scared anymore. I don't feel like an imposter. I feel like someone who's earned the right to be here—not because I know everything, but because I'm willing to learn everything.

Let's see where 2026 takes me. I have a feeling it's going to be even wilder than this year.

cheers.