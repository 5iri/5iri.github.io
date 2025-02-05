# Memory Performance Attacks: Denial of Memory Service in Multi-Core Systems

```
Thomas Moscibroda

Onur Mutlu

@microsoft
```

## Introduction

 - The transition from single-core to multi-core systems has introduced major performance and security challenges. 
 - Multiple programs running on shared DRAM systems can interfere with each other's memory accesses, leading to performance degradation and security vulnerabilities.
 - This paper introduces a new security problem that arises due to the core design of multi-core architectures -- a denial of service (DoS) attack that was not possible in single-core systems.
 - An aggressive memory-intensive program can severely impact the performance of other threads with which it is co-scheduled. This is called a Memory Performance Hog (MPH).
 - This program gets worse with more number of cores, as the effect is exponential.
 - an MPH like this can be used to perform DoS attacks could be used to fool computer users into thinking that some other applications are inherently slow, even without causing easily observable performance effects on system performance.
 - A regular application can unintentionally be used to behave like an MPH and damage the memeory-related performance of co-scheduled threads.

---
 - The fundamental reason why an MPH can deny memory system service to other applications lies in the "unfairness" in the design of multi-core memory systems.


 ## DRAM architectures
  - DRAM memory is a very expensive resource in modern systems. So, creating a DRAM system for each core is not feasible.
  - In a partitioned DRAM system, a processor accessing a memoryu location needs to issue a request to the DRAM partition that contains the data for that location.

## DRAM Memory Systems
![DRAM BANK ORGANIZATION](posts/assets/DRAM_block_diagram.png)

 - Row hit is a type of access which hits the row which is already in the row-buffer. It has the lowest latency (around 40-50 ns in commodity DRAM).
 - Row conflict is a type of access which hits a row different from the one that is currently int he row-buffer. the row-buffer first needs to be written back into the memory array because the row access had destroyed the row's data in the memory array.
 - Row closed is a type of access wherein there is no row in the row-buffer. Now the row-buffer needs to be read from the memory array and then column access is performed.

## DRAM Controller

 - The DRAM controller is the mediator between the on-chip caches and the off-chip DRAM memory. It recieves read/write requests from L2 caches.
 - The memory access scheduler is the brain of the memory controller. Its main function is to select a memory request from the memory request bugger to be sent to DRAM memory.
## Memory Access Scheduling Algorithm

 - Current memory access schedulers usually employ what is called a First-Ready First-Come-First-Serve (FR-FCFS) algorithm to select which request should be scheduled next.
 - This algorithm prioritized requests in the following order:
   - Row-hit first: A row-hit request is given priority over all the other requests.
   - Oldest-within-bank first: Selection is given with a higher priority to the request that arrived earliest.
   - Oldest-across-banks first: Selection is based on the earliest arrial time among all the request selected by individual bank schedulers.

## vulnerabilitiesof the Multi-Core DRAM Memory System to DoS attacks

 - current DRAM memory systems do not distinguish between the requests of different threads.
 - Unfairness of row-hit first scheduling: A thread whose accesses result in row hits gets higher priority compared to a thread whose accesses result in row conflicts.
 - Unfairness of oldest-first scheduling: Oldest first scheduling implicitly gives higher priority to those threads that can generate memory requests at a faster rate than others.
## Examples of DoS in Existing Multi-Cores
 - When two opposing ways of accessing memory are being used by two threads, the memory controller will give priority to the thread that is accessing the memory in the way that it wants to be optimized.
 - A program which streams data into the memory system and another program which does something similar but does it randomly will cause the memory controller to give priority to the program that streams its data into the memory system.

## Fairness in DRAM Memory Systems
 - This seems to be a very difficult question to answer, since the question is non-trivial and even coming up witha reasonable definition is somewhat problematic.

## Fair Memory Scheduling: A Model
