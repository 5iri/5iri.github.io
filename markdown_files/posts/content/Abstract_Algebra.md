---
title: "Introduction to Abstract Algebra"
tags: ["Mathematics", "Abstract Algebra", "Groups", "Finite Groups"]
layout: default
---

# What is Abstract Algebra?

## Introduction to Groups

- **Abstract Algebra** is the study of algebraic structures that generalize the arithmetic of numbers.
- The famous mathematician **Évariste Galois** laid the foundation for Abstract Algebra in the 19th century when he discovered solutions for higher-degree polynomials using groups.
- At the same time, **Carl Friedrich Gauss** formalized the concept of modular arithmetic, which is a key concept in Abstract Algebra.

---
## Technical terms

- **Element:** An object in a set.
- **Set:** A collection of objects.
- **Binary Operation:** A rule that combines two elements of a set to produce another element.
- **Identity element:** An element that leaves other elements unchanged when combined with them. $$e$$ is the identity element if $$a * e = e * a = a$$ for all $$a$$ in the set.
- **Inverse Element:** For each element $$a$$ in the set, there exists an element $$a^{-1}$$ such that $$a * a^{-1} = a^{-1} * a = e$$.
- **Order of a Group:** The number of elements in a group. (Represented as $$ \|G\|$$)

---
## Definition of a Group

- A **Group** is a set $$G$$ with a binary operation $$*$$ that satisfies the following properties:
  - **Closure:** For all $$a, b \in G $$, the element $$a * b$$ is also in $$G$$. ($$x,y \in G \Rightarrow x * y \in G$$)
  - **Associativity:** For all $$a, b, c \in G$$,
    $$ (a * b) * c = a * (b * c) $$
  - **Identity Element:** There exists an element $$e \in G$$ such that for all $$a \in G$$, $$ a * e = e * a = a $$
  - **Inverse Element:** For each $a \in G$, there exists an element $$a^{-1} \in G$$ such that $$ a * a^{-1} = a^{-1} * a = e $$

- Although this is the formal definition, the concept of a group can be understood more intuitively through examples.
   - e.g., The set of integers under addition forms a group.
   - e.g., The set of rotations or flips of a triangle forms a group.

- $$G$$ may _not_ be commutative $$\Rightarrow x * y \neq y * x $$
  - A group is called **Abelian** if it is commutative.
  - A group is called **Non-Abelian** if it is not commutative.

---
## What is a Subgroup?

- Assume a group $$G$$ with a binary operation $$*$$.
- A subset $$H$$ of $$G$$ is a **subgroup** of $$G$$ if it is itself a group under the operation $$*$$.
- $$ H \leq G $$ denotes that $$H$$ is a subgroup of $$G$$.
- If $$H$$ is a proper subgroup of $$G$$, we write $$H < G$$.

---
## Group Multiplication Tables (Cayley's Tables)

Consider the group under multiplication consisting of four elements: $$ * , {-1, 1, i, -i} $$

$$
      \begin{array}{c|cccc}
      \times & 1 & -1 & i & -i \\
      \hline
      1 & 1 & -1 & i & -i \\
      -1 & -1 & 1 & -i & i \\
      i & i & -i & -1 & 1 \\
      -i & -i & i & 1 & -1
      \end{array}
$$

Some interesting features of Cayley Tables:
- The row and column of the identity element are identical.
- Each row and column will contain each element of the group exactly once.
- This is because each element must have an inverse.
- The table is symmetric about the main diagonal (for abelian groups).

---
## Cosets and Lagrange's Theorem

- **Cosets** are subsets of a group that partition the group into equal-sized sets.
- A subgroup is a sum of subsets and groups.
- $$H$$ is a subgroup of $$G$$, and $$a \in G$$.
- There are two standard subgroups of $$G$$:
  1. $$G$$, the group itself.
  2. Trivial Group = \{$$e$$\}.

### Lagrange's Theorem

- Lagrange's Theorem states that the order of a subgroup divides the order of the group.
  - If $$H \leq G \Rightarrow \|G\| \ divides \ \|H\|$$
  - It is important to note that the converse of Lagrange's Theorem is not true.

#### Proof of Lagrange's Theorem

- Proof: $$G$$ is a finite group with $$\|G\| = n$$.
- Let {e} ≤ G and \|{e}\| = 1.
