---
title: Projects
layout: content
permalink: /projects
description: Six things I've built, with dates, roles, and what actually happened.
---

<ul class="project-grid">
  <li class="project-card">
    <a href="https://github.com/5iri/prosperityhdl" target="_blank" rel="noopener">
      <div class="project-card-head">
        <span class="project-title">Prosperity PPU <span class="ext">↗</span></span>
        <span class="project-meta mono">2025–ongoing · solo</span>
      </div>
      <span class="project-summary">SNN accelerator that exploits product sparsity via a TCAM-based detector, reusing shared spike patterns to cut redundant MACs.</span>
      <span class="project-role">RTL and the full cocotb testbench suite are verified in simulation; FPGA synthesis is next.</span>
    </a>
  </li>
  <li class="project-card">
    <a href="https://github.com/cupx0j0e/riscv-gpu/tree/fpgademo" target="_blank" rel="noopener">
      <div class="project-card-head">
        <span class="project-title">Tiny TPU <span class="ext">↗</span></span>
        <span class="project-meta mono">2025–2026 · shipped</span>
      </div>
      <span class="project-summary">A fully FPGA-resident systolic array for RISC-V-adjacent matrix compute — running on real hardware.</span>
      <span class="project-role">Co-built with @cupx0j0e, who designed the systolic-array RTL; I did the MicroBlaze/AXI/UART FPGA bring-up.</span>
    </a>
  </li>
  <li class="project-card">
    <a href="https://github.com/SRA-VJTI/synapse32" target="_blank" rel="noopener">
      <div class="project-card-head">
        <span class="project-title">Synapse-32 <span class="ext">↗</span></span>
        <span class="project-meta mono">2023–ongoing · team</span>
      </div>
      <span class="project-summary">5-stage RV32I pipeline core with Zicsr/Zifencei, built toward an open SoC for microcontrollers.</span>
      <span class="project-role">Contributor on the SRA-VJTI club team.</span>
    </a>
  </li>
  <li class="project-card">
    <a href="https://github.com/5iri/zig-led" target="_blank" rel="noopener">
      <div class="project-card-head">
        <span class="project-title">zig-led <span class="ext">↗</span></span>
        <span class="project-meta mono">2025 · shipped</span>
      </div>
      <span class="project-summary">Bare-metal Zig firmware for a UART peripheral on the Synapse-32 core, verified with cocotb + Verilator testbenches.</span>
      <span class="project-role">Solo.</span>
    </a>
  </li>
  <li class="project-card">
    <a href="https://github.com/5iri/conway-in-asm" target="_blank" rel="noopener">
      <div class="project-card-head">
        <span class="project-title">riscv-asm-game-of-life <span class="ext">↗</span></span>
        <span class="project-meta mono">2025 · shipped</span>
      </div>
      <span class="project-summary">Conway's Game of Life, animated in a terminal via VT100 escape codes, written in bare-metal RISC-V assembly.</span>
      <span class="project-role">Solo.</span>
    </a>
  </li>
  <li class="project-card">
    <a href="https://github.com/5iri/RISCV-ISA-IN-C" target="_blank" rel="noopener">
      <div class="project-card-head">
        <span class="project-title">riscv-isa-in-c <span class="ext">↗</span></span>
        <span class="project-meta mono">2025 · shipped</span>
      </div>
      <span class="project-summary">A from-scratch RISC-V ISA emulator in C, built to learn the instruction set end to end.</span>
      <span class="project-role">Solo.</span>
    </a>
  </li>
</ul>
