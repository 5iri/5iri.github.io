--- 
title: Multi-Agent Path Finding Algorithms 
parent: Other
permalink: /notes/mapf
--- 

# Multi-Agent Path Finding
---
## Introduction

 - MAPF is a planning problem in which the task is to plan paths for multiple agents, where the key constraint is that the agents will be able to follow these paths while not colliding with each other.

 - This problem has a range of research groups and academic communities which have studied them but they all have very different terminoligies used, and someof them have also different objectives in their paper.
 - The paper aims to address this issue by introducing unified terminology to describe MAPF problems.

 - The second part of the paper introduces a new grid MAPF benchmark.

---

## Classical MAPF

#### Description of the classical MAPF

 - The input to a classical MAPF problem with k agents is a tuple <G,s,t>, where G = (V, E) [Have some doubts here(1. What is V and E here? V can be assumed to be Vector but I have no idea what E is.) ]  is an undirected graph,

 s : [1,.....,k] -> V maps an agent to a source vertex.

 t : [1,......,k] -> V maps an agent to a target vertex.

 - Time is assumed to be discretized, and in every step each agent is situated in one of the graph vertices and can perform a single *action*.

 - An *Action* in classical MAPF is a function *a* : *V* -> *V* such that *a(v) = v'* means if an agent is at vertex *v* and performs an action, then it will be in vertex *v'* in the next time step.

 - So Each agent has two types of actions : *wait* and *move*.

 - *wait* means that the agent stays exactly where it is.
 - *move* means the agents moves to another adjacent block (or *vertex* as written in the paper).

 - For a sequence of actions *represented as &pi;* = $$(a_{1}, ..... a_{n})$$, and an agent *i*, we denote by
$$\pi_{i} \left[ x \right]$$ = $$a_{x}(a_{x-1}(...a_{1}(s(i)))$$.

 - $$\pi$$ is a **single-agent plan** for agent $$i$$ iff executing this sequence of actions in $$s(i)$$ results in being at $$t(i)$$,
						$$
						\pi_{i}[|\pi |] = t(i)
						$$

 - A solution is a set of $k$ single-agent plans, one for each agent.


				This means we could ig say it forms a $k * n$ matrix??


---

#### Types of Conflicts in Classical MAPF

 - There is a possibility of $$vertex \ conflict$$ between $$\pi_{i}$$ and $$\pi_j$$ occuring when both agents plans to occupy a particular positions.

 - There is a possibility of $$edge\ conflict$$ between $$\pi_{i}$$ and $$\pi_{j}$$ occuring iff where both the agents plan to traverse to the same edge at the same time and step in the same direction.

   - Formally, there is an edge conflict between $$\pi_{i}$$ and $$\pi_{j}$$ iff there exists a time step $x$ such that $$\pi_{i} [x] = \pi_{j} [x]$$ and $$\pi_{i}[x+1] = \pi_{j} [ x+1]$$.  /// Don't know when is this possible, in the sense we already have vertex conflict which basically says that $$\pi_{i} = \pi_{j}$$ right?

 - $$Following\ conflict$$ is between $$\pi_{i}$$ and $$\pi_{j}$$ occurs iff one agent is planned to occupy a vertex that was occupied by another agent in the previous time step. Now, that's gonna be ignored since occupied positions are something that we are neglecting in here.  // Why is this a big issue?

   - $$\pi_{i} [x+1] = \pi_{j} [x]$$ mathematically written.

 - A conflict where multiple agents can enter into a position forming a loop like

| x | x | x | x | x | x | x | x | x | x |
|---|---|---|---|---|---|---|---|---|---|
| x | 1 | 2 | x | x | x | x | x | x | x |
| x | 3 | 4 | x | x | x | x | x | x | x |
| x | x | x | x | x | x | x | x | x | x |
| x | x | x | x | x | x | x | x | x | x |
| x | x | x | x | x | x | x | x | x | x |
| x | x | x | x | x | x | x | x | x | x |
| x | x | x | x | x | x | x | x | x | x |
| x | x | x | x | x | x | x | x | x | x |
| x | x | x | x | x | x | x | x | x | x |

 -- This is called as $$Cycle\ conflict$$.

- $$π_{i}(x + 1) = π_{i+1}(x)$$

 - $$Swapping\ conflict$$ is like the cycle one, where it would just switch the vertices.



 - Cosidering the formal definitions of these conflicts, it is clear that there are dominance in relation with them,

		1.  Forbidding vertex conflicts also implies edge conflicts are forbidden.
		2.  Forbidding following conflicts also implies cycle conflicts are also forbidden.
		3.  Forbidding cycle conflicts implies that swapping conflicts are also forbidden.

 - This is also true vice versa.

 - To properly define a classical MAPF problem, one needs to specify which types of conflicts are allowed in a solution.
  - The least constrained restriction is to only forbid edge conflicts. (In our task, ig Swapping and edge are not allowed so only 1 and 3 are forbidden per say).

---
#### Agent Behaviour at Target in Classical MAPF

- There are two ccommon assumptions that are done when defining a classical MAPF problem,

  - **Stay at target** : Under this assumption, an agent waits in its target untill all agents have reached their targets. This will then cause a vertex conflict with any plan that passes through its target after it has reached it.

  - **Disappear at target**: Under this assumption, when an agent reaches its target it immediately disappears. This means the plan of that agent will not have any conflict after the time step in which the corresponding agent has reached its target.

---
### Objective Functions in Classical MAPF

 - To capture the best solution, we consider something called as **objective functions** that is used to evaluate MAPF solutions. The two most common functions used for evaluating a solution in classical MAPF are $$makespan$$ and $$sum\ of\ costs$$.

   - $$Makespan$$ : The number of time steps required for all agents to reach their target.
   - $$Sum\ of \ costs$$: The sum of time steps required by each agent to reach its target. It is also called as *flowtime*.

 - For example, assume that agent i reaches its
target at time step t, leaves its target at time step t
'
, arrives
back at its target at time step t'', and then stays at its target until all agents reach their target. Then, this single-agent
plan will contribute t'' to the sum of costs of the corresponding solution.

---

### Beyond Classical MAPF

 -  As of now, the assumptions taken are:
 1. time is discretized into time steps,
 2. every action takes exactly one time step,
 3. in every time step, each agent occupies exactly a single vertex.
---
### MAPF on Weighted Graphs

 - The notation $$G$$ now is a weighted graph where the weight of each edge represents the duration it will take an agent to traverse this edge.

 - Types of graphs that have been included in this paper:
 1. MAPF in $$2^k$$-neighbor grids
   -- These maps are restricted form of weighted graphs in which every vertex represents a cell in a two dimensional grid. **DID NOT UNDERSTAND THIS**

2. MAPF in Euclidean space
-- These maps are a generalization of MAPF in which every node in $$G$$ represents a Euclidean point ($$x$$, $$y$$), and the edges represent allowed move actions. Such settings arise when the underlying graph is a roadmap generated for a continuous Euclidean environment. **ABSOLUTELY DID NOT UNDERSTAND THIS EITHER**.


---

### Feasibility Rules

- Depending on what you want to lose and what you want in priority, there are sufficient rules for the classical MAPF solution.

 - **Robustness rules** -- These rules are designed to ensure that a MAPF solution considers inadvertant delays in execution. A $$k-robust$$ MAPF plan builds in a sufficient buffer for agents to be delayed up to $$k$$ time steps without resulting in a conflict. This is only when the probability of future delays are known (ig this is where we can use RL if I am not wrong, where we can use ML to predict the probability of a task in a delay.

 - **Formation rules** -- this is restriction added whenever there is some action that needs to be decided by the bot (or "$$agent$$" as given in the paper).


---
### From Pathfinding to Motion planning

- We are now considering bots now not in vertex but with something as a limited speed and a variety of sizes ($$configuration$$ is a better word).

 - **MAPF with large agents** -- This basically now introduces volume to the vertex, and now a single $$agent$$ can take up multiple vertices. Hence, it may prevent some other bot to move or even take use of those vertices.
 It may also not allow other $$agents$$ along the edge whenever one $$agent$$ is along the edge.

-  * There are several approaches to solving these kinds of issues, including a CBS-based approach and a prioritized planning approach.

				A special case of agents with volume is the convoy setting, in which agents occupy a string of vertices and their connecting edges.

 - **MAPF with kinematic constraints**  -- This basically is now introducing another parameter which needs to also think about how to move over to  another location without falling or whatever it is not to do to reach the final destination.
 - A by-product of such contraints is that the underlying graph becomes directed, as there may be edges that can only be passable in one-direction due to kinematic constraints of the agent.

 - There is some reduction-based approach that assumes rotation actions as a half way to kinematic constraints.

---

###  Tasks and Agents

- In classical MAPF, one agent --- one task -- to get it to its target. Several extensions have been made in the MAPF literature in which agents may be assigned more than one target.


- **Anonymous MAPF** --- The objective is to move the agents to a set of target vertices, but it does not matter which agent reaches which target. (Like, in a place where all the products are the same, it doesn't matter which person goes and takes the box to be delivered, all we need to know is that *that* thing is delivered on time.

- **Colored MAPF** --- The objective here is to generalize and group the agents into teams, and each team has their own sets of targets. **(THIS IS THE TASK WE ARE GOING TO WORK ON)**.
   -  Another way to view this variant, is as a MAPF problem in which every agent can be assigned to targets only from the set of targets designated for its team.

  - This can be generalised even further, assigning a target and an agent to multiple teams.

- **Online MAPF** --- In $$online$$ MAPF, a sequence of MAPF problems are solved on the same graph. This setting has also been called "Lifelong MAPF". Online MAPF problems can be classified as follow.
  - **warehouse model** -- This is the setting where a fixed set of agents, solve a MAPF problem, but after an agent finds a target, it may be tasked to go to different target. This setting is inspired by MAPF for autonomous warehouses. **(This is also another way to represent the task since, we do have fixed number of agents for each team, and they are always given some task "$target$", which once is done, it is made to go to another location to do another task, which is also what is being done, so basically we are doing a mix of colored and Online MAPF).**

  - **Interesection model** -- This is the setting where new agents may appear and each agent has one task --  to reach its target. This setting is inspired by autonomous vehicles entering and exiting intersections.
