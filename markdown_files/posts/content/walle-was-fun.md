---
title: Wall-E was fun Gang.
layout: content
parent: Blog
permalink: blog/wall-was-fun
date: 2025-11-24
---

Yesterday, We @ [SRA-VJTI](https://sravjti.in) completed our first robotics workshop of the academic year — Wall-Ev2.7.

It felt very full-circle for me, because Wall‑E is kind of threaded through my entire college story.

## Wall-E #1 — Showing up as a totally lost first-year

My first Wall‑E was back in first year, when I had just crawled out of JEE prep and the whole aftermath that comes with it. I walked into that workshop thinking I “liked electronics,” and walked out realising I basically knew nothing about actual robotics or embedded systems.

Soldering, debugging loose wires, reading datasheets, figuring out why the bot refused to move in a straight line… every tiny thing reminded me that school‑level “physics” and real hardware are very different games.

But instead of feeling defeated, that first Wall‑E flipped a switch somewhere. It was the first time after JEE that I felt, “Okay, this is something worth grinding for.” That little line‑following robot was the first thing in a long time that made me want to stay back late in college and just keep tinkering.

## Wall-E #2 — Teaching the workshop I once struggled through

A year later, I was on the other side of the room, helping run Wall‑E instead of attending it.

Explaining concepts like PWM, motor drivers, basic control, and sensor tuning to juniors made me realise how much had quietly clicked in the background over the year. The same topics that once felt intimidating were now things I could walk someone else through on a whiteboard or on a half‑broken bot with wires hanging out.

That second Wall‑E was less about the robot and more about confidence. It made me see that I had actually built a mental model of how the system worked end‑to‑end — from code to microcontroller pins to motors — instead of just copy‑pasting logic from a tutorial.

## Wall-E #3 — Shipping a real upgrade

Now, finishing the third year of Wall‑E, the story feels different again.

This time, I was not just helping people build the same old kit; I was working on upgrading the whole stack:

- Moving to our new SRA board and making sure the whole flow “just works” for participants.
- Building `1_led_matrix` and getting the basic bring‑up right so people see something alive on the hardware quickly.
- Adding an LVGL‑based flow and migrating things so that the interface feels modern, not like a relic from a decade ago (even if this part did not make it fully into this year’s workshop because of time constraints).

On top of that, we did all of this on a very stupid timeline: less than a month from “okay, let’s run Wall‑E again” to “every single bot on every table is powered, programmed, and moving." with just a team of 50 people (which seems a lot but the more people the worse the efficiency becomes). We sold about 60 kits in total.

That meant:

- Assembling and bringing up every kit ourselves before the workshop, not just trusting the schematic.
- Flashing, testing, and re‑testing all the example code so that `git clone` -> build -> run stayed smooth on the lab machines.
- Running tight feedback loops — fix a bug, push, pull on another PC, and see if a confused first‑year could still follow the README without getting stuck.

## A tiny Game of Life

Somewhere in the middle of all this “serious” work, I kept coming back to Conway’s Game of Life.

It is such a dumb‑simple set of rules — a grid of cells, each one just “alive” or “dead,” updating based on a few local neighbours — but when you watch it evolve on real hardware, it feels like the system is breathing on its own.

Game of Life is also a perfect embedded test:

- You need tight control over timing and frame updates.
- You are constantly reading and writing a 2D grid in memory.
- You have to make the patterns readable on a tiny LED matrix without everything turning into noise.

I like that the same cellular‑automata idea also shows up in my other work, like the little RISC‑V assembly Game of Life project I have been hacking on separately ([riscv asm game of life](https://github.com/5iri/conway-in-asm)). Different hardware, same feeling: simple rules, complex behaviour, and that weird joy of seeing something you coded run by itself long after you take your hands off the keyboard.

Most of the “boring but critical” work was not glamorous: pin‑mapping, tweaking timings, fixing small LVGL issues, making sure the LED matrix demo behaved the same across boards, and cleaning up the repo so the next person does not need a three‑hour handover just to compile the code.

Most of that work lives here: [SRA-VJTI/Wall-E](https://github.com/SRA-VJTI/Wall-E.git). It is still very much a work‑in‑progress (will always be cause its a ever molding workshop), but this time I am thinking in terms of maintainability, documentation, and how the next batch of juniors will experience the workshop.

## Why this Wall-E felt different

First‑year Wall‑E was my wake‑up call: “you do not know anything, but you can learn.”

Second‑year Wall‑E was proof that I had actually done the work and could teach it forward.

This Wall‑E feels like the point where everything — robotics, embedded, software, and teaching — intersects. It is less about a single bot and more about building a pipeline so that every year, some confused first‑year kid can walk into that lab, touch real hardware, and leave with the same spark that pulled me out of my JEE mess. 

That is the part I do not want to lose: the feeling that this tiny robot workshop can quietly change the trajectory of someone’s college life, the same way it did for mine and this is the reason why I love Wall-E.

I love my life.
