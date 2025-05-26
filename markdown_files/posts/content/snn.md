--- 
title: What is Spike Neural Networks?
parent: Other
--- 
# What is Spike Neural Networks? and why are FPGAs useful for it?

## What is a Spike Neural Network?

- Neural Networks that operate using discrete spikes.

- A neuron remains silent until its membrane potential reaches a threshold, at points emits an action potential that is transmitted to other neurons.

## Advantages of SNNs

-  They naturally encode the dimension of time, making them well-suited to dynamic or temporal data.

- SNNs promise energy efficiency. This is because the SNN Activity is event-driven.

## Key differences between SNNs and ANNs

|     | SNNs | ANNs |
|----| --- | --- |
|Signal Form| SNNs use binary spikes/impulses over time | ANNs use continuous activations |
|Timing| Spikes have precise timing, enabling temporal coding | ANNs ignore timing of input presentation |
|Dynamics| SNN Neurons have internal state (membrane potential) evolving over time| Typical ANN Neurons are stateless between the two inputs|
|Computation| SNNs comnpute only on spike events (which are sparse, asynchronous) | ANNs compute at every layer synchronously|

For example, SNNs can exploit temporal sparsity for energy efficiency and real-time processing, but their discrete non-differentiable nature makes their training harder.

- SNN Architecture design largely parallels ANN Design (feedfoward, convolutional, recurrent, etc), with the added dimension that connectivity and neuron models must support temporal spiking behaviour.

- Optimal SNN - specific architecture are still on active research area.

## Spike Encoding Schemes

- Rate Coding : Convert a value to the 'spike rate' => value $$\alpha$$ spike rate. This is appealing for rapid processes.
- Temporal Coding : Convert a value into precise timing of spike.
- Phase Coding: data is stored in the phase between one global oscillator.
- Burst Coding: Burst of several spikes represent the input value. => no. of spike $$\alpha$$ input.
- Direct/Analog Coding: Some systems use an analog value to drive spiking directly, but typically a discrete code is used.


In Practice, the choice of which encoding scheme to use depends on the application:

rate coding -> easy to implement

temporal and burst -> complex but more efficient and biologically realistic.


## Learning Mechanics

There are mainly 5 types of learning mechanism,

1. Spike-Timing-Dependent Plasticity
2. Supervised Spike based learning
3. ANN-SNN Conversion
4. Reinforcement methods
5. Biology based methods

Training, as of date, remains a major challenge. The non-differentiable nature of spikes makes traditional backprop less effective, and researchers are actively exploring surrogate gradient methods to overcome this limitation.

## Energy Efficiency and Neuromorphic Hardware

 - Because neurons only compute when they spike SNNs can exploit temporal sparsity.

 - SNNs employ "event-driven" processing -> only a small fraction of neurons are active at any time, potentially reducing power usage upto two orders of magnitude compared to ANNs.

 - Neuromorphic hardware chips like Intel Loihi and IBM TrueNorth implement large network of spiking neurons directly in silicon.

 - In practice, translating to an FPGA or ASIC could also bring benefits. FPGAs can implement parallel spiking architectures where neurons and synapses are customized as logic units or FSMs. The event-driven nature means that an FPGA-Based SNN can remain idle when no spikes occur. 

## The reason why FPGA Implementation is better 

Firefly is a popular SNN-based Accelerator. The summary is of an extract from that paper.

- Most SNN Accelerators adopt the fabric-only implementation without much optimization.

- To implement with similar efficiency in a FPGA, we need to use hard blocks like the DSPs found with FPGAs like DSP48E2 found in Xilinx UltraScale FPGAs. (There are other methods, but this is most common right now with FPGA Based implementations).

- It is possible to generalize the SNN Computation to the Arithmetic operations that the DSP48E2 can provide.

- Another Aspect of the SNN Accelerator design is the memory system. 

    - Everytime a neuron spikes (which is a 1-bit event), you need to read its multi-bit synaptic weights and update its multi-bit membrane voltage (8-16 bits).
    - If you increase the parallelization -- more PEs -- the more the number of weight reads and voltage reads/writes per cycle -- yet spikes themselves haven't ballooned in size.
    - While the computational complexity and the memory footprints of the binary spikes decrease, the memory access requirements of the synaptic weights and membrane voltages do not.
- At present, most existing neuromorphic hardware/ Accelerators are inefficient in terms of resource utilization, computational density, and scalability.

## Types of Neuromorphic Hardware

- There are 4 types of dedicated neuromorphic hardware.

    1. Hardware constructs its hardware substrates in a Network on Chip (NoC) fashion. Intel Loihi, Spinnaker and IBM TrueNorth come into this category.
    2. Second type explores emerging devices, analogi hardwares, mem-resistors and optics etc.
    3. ANN Accelerators based design except constructing dedicating hardware for synaptic operations and explores optimal dataflow for SNNs specifically. FPGA Platforms are an ideal choice for this type of hardware due to their flexibility and reconfigurability.

## Resources

* [Spiking Neural Networks for More Efficient AI Algorithms](https://www.youtube.com/watch?v=PeW-TN3P1hk) 
* [The Complete Guide to Spiking Neural Networks](https://pub.towardsai.net/the-complete-guide-to-spiking-neural-networks-d0a85fa6a64)
* [Spiking Neural Networks: The next “Big Thing” in AI?](https://medium.com/@deanshorak/spiking-neural-networks-the-next-big-thing-in-ai-efe3310709b0) 
* [Spiking Neurons: A Digital Hardware Implementation](https://open-neuromorphic.org/blog/spiking-neurons-digital-hardware-implementation/) 
* [FireFly: A High-Throughput Hardware Accelerator for Spiking Neural Networks with Efficient DSP and Memory Optimization](https://arxiv.org/pdf/2301.01905)



