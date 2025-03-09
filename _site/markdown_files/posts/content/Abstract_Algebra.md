
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
- **$$CASE $$ 1:**

  Let $$\{e\} \leq G$$ and $$\|{e}\| = 1$$.

  $$\|G\| = n = 1 \times n$$, which is true.

- **$$CASE $$ 2:**

  Let $$\|G\| = n$$ and $$G \leq G$$.

  $$\|G\| = n = n \times 1$$, which is true.


- ** $$ CASE  $$ 3: **

  Let $$\|H\| = k $$ and $$H < G $$ and $$ H \neq \{e\} $$.

  $$Construction$$:
    - Pick $$g_1 \ \epsilon \ G$$ _not_ in $$H$$
    - $$g_1H \ = \ \{g_1.h \ for \ all\ h  \ \epsilon \ H \}$$
    - $$H$$ and $$g_1$$ do not overlap .i.e. $$H \cap g_1H = \phi $$ (How?)
      - _Assume_ there _is_ an element in $$H$$ and $$g_1H$$
      - which means $$g_1 \cdot h_i$$ = $$h_j$$ in $$H$$

$$g_1 \cdot h_i$$ = $$h_j$$

 $$(g_1 \cdot h_i) \cdot h_i^\(-1\)$$ = $$h_j \cdot h_i^\(-1\)$$

  $$g_1 \cdot (h_i \cdot h_i^\(-1\))$$ = $$h_j \cdot h_i^\(-1\)$$

$$g_1 \cdot e$$ = $$h_j \cdot h_i^\(-1\)$$

$$\Rightarrow g_1 = h_j \cdot h_i^\(-1\) \epsilon \ H \Rightarrow \ g_1 \epsilon \ H $$

  - This poses a contradiction, as we specifically took $$g_1$$ not in $$H$$.

This process can be repeated for different cosets of $$g_i$$ which do not overlap which each other as well as $$H$$.


- From here, we should also be able to see that all cosets $$g_i$$ must be of the same size.


- So now, we can see that $$G$$ is now partitioned into cosets $$\|G\| = n$$, and $$\|H\| = d$$


(insert an animation of the distinction).


Number of cosets = $$k$$

Index of $$H$$ in $$G$$ = $$\|G:H\| = k$$

so $$d \cdot k = n \Rightarrow d | n$$

$$ \|H\| divides \|G\| $$



### Normal Subgroups and Quotient Groups

**Definition:**
A subgroup $$N$$ of a group $$G$$ is normal if $$g \cdot n \cdot g^\(-1\)  ∈ N$$ for all $$g ∈ G$$ and $$n ∈ N$$.

**Simple Example:**
Consider $$S_3$$, the group of permutations on 3 elements. The subgroup $$A₃ = \{e, (123), (132)\}$$ consisting of only the even permutations is normal in $$S₃$$.

To verify: If we take any permutation in S₃ and conjugate elements of A₃ by it, we stay within A₃. For instance:
- $$(12)(123)(12^\(-1\)) = (12)(123)(12) = (132) ∈ A₃$$
- $$(12)(e)(12^\(-1\)) = e ∈ A₃$$

This works because conjugation preserves the "evenness" of permutations.


**Another Example:**
Consider $$Z$$ to be the set of Integers.

Group: Integers $$Z$$ under +

Subgroups: $$Z, 2Z. 3Z, 4Z, 5Z,..$$


The Group $$Z$$ consists of say $$5Z, 1+5Z, 2+5Z, 3+5Z, 4+5Z$$
of which, $$5Z$$ is the only group, and others are a coset (as they don't have the $$e$$ in them).

Hence, $$5Z$$ is called the **Normal Subgroup**.

The sum of other cosets is called the **Quotient Group**, represented by $$Z/5Z$$ (why a group?)

It is important to note that $$Z/5Z \leq Z$$


**Simple Groups:** Every group $$G$$ has at least 2 subgroups; {$$e$$} and $$G$$.

If the only subgroups of $$G$$ are the identity and the group itself, then it's called a simple group.


### What are Cyclic Groups

 - A group $$G$$ is _cyclic_  if it is "generated" by a single element.


 - "generated" can be defined from an example

Let $$G$$ be a group with operation $$ \times $$

 - pick _x_ $$ \epsilon \ G $$
 - $$\langle x \rangle $$ = $$ \{ ..., x^\(-n\), .... , x^\(-2\), x, x^2, x^3 .... x^n\} $$ are all elements  that are generated by  _x_.

 - If this is possible, then $$G$$ = $$\langle x \rangle $$. (cyclic group).


### What is Homomorphism?

Suppose we have 2 groups $$(G, *)$$ and $$(H,\square)$$

pick two elements _x_, _y_ $$\epsilon \ G $$

So, _x_ $$*$$ _y_ $$\epsilon \ G $$

$$ f: G \to \ H $$

this sends everthing in $$H$$ from $$G$$ as:
 - _x_ $$\to$$ _f(x)_
 - _y_ $$\to$$ _f(y)_
 - $$x * y \ \to $$ _f($$x * y $$)_
 - Note, This is the same as _f(x)_ $$\square$$ _f(y)_

We know have a way to compare two completely different groups with different operations!

This function that converts $$G$$ to $$H$$ is called Homomorphism.

**Definition:** Homomorphism is a way to compare two different groups for structural similarity.

**note:** Homomorphisms do not need to map a one-to-one function.

**Isomorphism:** It is a type of homomorphism that is one-one and onto (bijection).

This means that the function which converts $$H$$ for $$G$$ is a unique function.

**What is a kernel of a Group Homomorphism?**

Suppose

$$f : G \to H $$ is _not_ 1-1

$$x_1, x_2, ... \to y $$


A kernel of $$G$$ can be represented as

ker(_f_) = $$ \{ x \epsilon G \ | \  f(x) = 1_H \} $$

we could say that the kernel defines the degree to which the function fails the 1-1 condition.

It is also important to note that ker(_f_) $$\neq \phi $$ as even when it is 1-1, ker(_f_) = $$\{1_G\}$$. This is also the condition for 1-1 for _f_.


### Symmetric Groups

 - $$S_n$$ = Group of permutations on a set with $$n$$ elements.
 - It is a finite group with $$n!$$ elements.
 - All symmetric groups with $$ n > 2 $$ is non-abelian.



**note:** every finite group is a subgroup of a symmetric group. This is called Cayley's theorem.


### Cycle notation of permutations

This is a method to rewrite the permutation that you get from Symmetric groups in less than $$n$$ elements.

**Simple Example: **

 - Consider a Symmetric Group of $$S_4$$
    - this can be written as (as an example)

$$\begin{pmatrix}
1 & 2 & 3 & 4 \\
2 & 1 & 4 & 3
\end{pmatrix} $$

This is one permutation of $$S_4$$, like this there are many (specifically $$4!$$)

let's take another permutation,

$$\begin{pmatrix}
1 & 2 & 3 & 4 \\
3 & 4 & 1 & 2
\end{pmatrix} $$

We can clearly see that these can be converted into different functions,

f(1) = 2; f(2) = 1; f(3) = 4; f(4) = 3;

similarly g(1) = 3; g(2) = 4; g(3) = 1; g(4) = 2;
where the numbers on top is the input, and the numbers on the bottom as the output.

Remember, each permutation is an element in the symmetric group.

$$\Rightarrow$$  we can see that the group operation has to be like a function composition. $$ f \circ g $$


So,

$$ f \circ g $$ = $$\begin{pmatrix}
1 & 2 & 3 & 4 \\
4 & 3 & 2 & 1
\end{pmatrix} $$


But man, this is too lengthy to keep writing for different larger and larger examples.

So, We introduce Cycle notations.
 - They are basically shorthand for writing this weird matrix.
 - In the above example, I can write $$f$$ and $$g$$ as follows:

$$1 \to 2 \to 1 $$ and $$3 \to 4 \to 3 $$

So, $$f$$ = $$(1, 2)(3, 4)$$

and $$g$$ = $$(1,3)(2,4)$$

This makes it a whole lotta easy to read and write because now, you can see that 1 and 2 are interconnected and 3 and 4 are interconnected in $$f$$ and from there it's easy to build the permutation.
**Sidenote: ** It's neat to note that the order of the cyclic decomposition does not matter and the order in which the cycles have been written doesn't matter either.

$$(1,2)(4,3)$$ = $$(3,4)(1,2)$$

Two element cycles are called a **transposition**.


It's important to note that we haven't done any group operation on the cyclic decomposition yet. (the brackety ones just above).


So, to do that, we need to start continue with this example.

f = $$(1,2)(3,4)$$
g = $$(1,3)(2,4)$$

Cycles with no numbers in common can be rearranged, whereas cycles with common numbers in them have to keep it the same.

first take 1, 1 $$\to$$ 3 $$\to $$ 4

then take 2, 2 $$\to$$ 4 $$\to$$ 1

like this you do and you get this,

$$ f \circ g $$  = $$(4, 3, 2, 1)$$

You can see that you get the same answer here!

The technical definition of rearrangement Cycles with no numbers in common "commute"

### Dihedral Group

 - The word Dihedral means "two faces"

 - There are three different operations that an $$n$$ sided regular polygon can do
    - rotation (defined as $$r$$)
    - flip (defined as $$f$$)
    - No change (aka identity element $$e$$)

For this let's look at the symmetry groups of the equilateral triangle.

 Here, the no change in rotation or flipping will be the identity element $$e$$.

When you rotate the triangle by $$120^\circ$$, then it can be defined as $$r$$.

When you rotate the triangle by $$240^\circ$$, then it can be defined as rotating twice, so it can be defined as $$r^2$$.

When you rotate the triangle by $$360^\circ$$, you can see that it comes back to the same position, hence we can say that $$r^3 = e$$.

you can also flip the triangle vertically, which can be defined as $$f$$.

you can also see that you flip the triangle twice, it brings you back to the same place. So, $$f^2 = e $$.


So the total transformations that can be done which is distinct is as follows:
 - $$e, r, r^2, f ,r\cdot f ,r^2 \cdot f $$
 - Also note, $$\|r\|$$ = 3 and $$\|f\|$$ = 2.


Similarly, you can see the same thing for isosceles and scalene triangle. (I'm too lazy to work it out, but its so simple tbh)


### Matrix Groups
 - Groups made using matrices are called the Matrix groups.

 - There are two operations that can be done under matrices. $$ \times$$  or $$+$$.

 - Identity element under addition for an $$ n \ \times \ m $$ matrix is just 0s in all elements. (which is represented by $$O$$).


 - For Matrices under Multiplication, for the group to be abelian and infinite, We take the only $$n \times n$$ matrices, with $$I$$ as the identity matrix. It should also be noted that for a matrix to have inverses, det($$M$$) $$\neq$$ 0.


 - The general linear group, $$GL_n(R)$$ = $$n \times n$$ invertible matrices.

 - The Special Linear group, $$SL_n(R)$$ = $$n \times n$$ invertible matrices with det($$A$$) must be equal to 1. and $$A \ \epsilon \ SL_n(R)$$

 - Note that the $$R$$ here, denotes that the elements in the matrix are real.


### Direct products of Groups

 - Like how prime numbers are the building blocks of integers (as in any integer can be decomposed into the product of primes), Groups can be decomposed by their building blocks, $$Simple \  groups$$.

(TBD)
