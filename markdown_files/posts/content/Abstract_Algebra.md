--- 
title: Abstract Algebra 
parent: Math 
nav_order: 1
permalink: notes/math/abstract_algebra
--- 

# What is Abstract Algebra?

Abstract Algebra is the fascinating study of algebraic structures that generalize the arithmetic of numbers. It's a field that revolutionized mathematics in the 19th century and continues to be fundamental to many branches of mathematics today.

---

## Introduction to Groups

The roots of Abstract Algebra can be traced back to the brilliant minds of the 19th century. The famous mathematician **Évariste Galois** laid its foundation when he discovered solutions for higher-degree polynomials using groups. Simultaneously, **Carl Friedrich Gauss** was formalizing the concept of modular arithmetic, which would become a cornerstone in Abstract Algebra.

---

## Technical Terms

Before we dive deeper, let's understand some essential terminology:

- **Element:** An object in a set.
- **Set:** A collection of objects.
- **Binary Operation:** A rule that combines two elements of a set to produce another element.
- **Identity element:** An element that leaves others unchanged when combined with them. For example, $$e$$ is the identity element if $$a * e = e * a = a$$ for all $$a$$ in the set.
- **Inverse Element:** For each element $$a$$ in the set, there exists an element $$a^{-1}$$ such that $$a * a^{-1} = a^{-1} * a = e$$.
- **Order of a Group:** The number of elements in a group, represented as $$ \|G\|$$.

---

## Definition of a Group

At the heart of Abstract Algebra is the concept of a **Group**. A Group is a set $$G$$ with a binary operation $$*$$ that satisfies four fundamental properties:

1. **Closure:** For all $$a, b \in G $$, the element $$a * b$$ is also in $$G$$. ($$x,y \in G \Rightarrow x * y \in G$$)
2. **Associativity:** For all $$a, b, c \in G$$, $$ (a * b) * c = a * (b * c) $$
3. **Identity Element:** There exists an element $$e \in G$$ such that for all $$a \in G$$, $$ a * e = e * a = a $$
4. **Inverse Element:** For each $a \in G$, there exists an element $$a^{-1} \in G$$ such that $$ a * a^{-1} = a^{-1} * a = e $$

While this formal definition might seem abstract, the concept becomes more intuitive through examples:
- The set of integers under addition forms a group.
- The set of rotations or flips of a triangle forms a group.

It's important to note that a group $$G$$ may not be commutative, meaning $$x * y \neq y * x$$. A group that is commutative is called **Abelian**, and one that isn't is called **Non-Abelian**.

---

## What is a Subgroup?

If we have a group $$G$$ with a binary operation $$*$$, a subset $$H$$ of $$G$$ is a **subgroup** of $$G$$ if it is itself a group under the operation $$*$$.

We denote this as $$ H \leq G $$, meaning $$H$$ is a subgroup of $$G$$. If $$H$$ is a proper subgroup of $$G$$ (meaning $$H \neq G$$), we write $$H < G$$.

---

## Group Multiplication Tables (Cayley's Tables)

To visualize how elements of a group interact under the group operation, we use **Cayley Tables**. Consider the group under multiplication consisting of four elements: $$ * , {-1, 1, i, -i} $$

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
- The table is symmetric about the main diagonal for abelian groups.

---

## Cosets and Lagrange's Theorem

**Cosets** are subsets of a group that partition the group into equal-sized sets. They're a crucial concept for understanding the structure of groups.

There are two standard subgroups of any group $$G$$:
1. $$G$$ itself, the entire group.
2. The Trivial Group, consisting of just the identity element: \{$$e$$\}.

### Lagrange's Theorem

One of the most elegant results in group theory is **Lagrange's Theorem**. It states that:

> The order of a subgroup divides the order of the group.

Mathematically: If $$H \leq G \Rightarrow \|G\| \ \text{divides} \ \|H\|$$

It's important to note that the converse of Lagrange's Theorem is not true.

#### Proof of Lagrange's Theorem

Let's prove this beautiful theorem step by step:

Assume $$G$$ is a finite group with $$\|G\| = n$$.

**Case 1:**
Let $$\{e\} \leq G$$ and $$\|{e}\| = 1$$.
$$\|G\| = n = 1 \times n$$, which is true.

**Case 2:**
Let $$\|G\| = n$$ and $$G \leq G$$.
$$\|G\| = n = n \times 1$$, which is true.

**Case 3:**
Let $$\|H\| = k $$ and $$H < G $$ and $$ H \neq \{e\} $$.

**Construction:**
- Pick $$g_1 \ \epsilon \ G$$ _not_ in $$H$$
- $$g_1H \ = \ \{g_1.h \ \text{for} \ \text{all}\ h  \ \epsilon \ H \}$$
- $$H$$ and $$g_1$$ do not overlap, i.e., $$H \cap g_1H = \phi $$

Let's prove this by contradiction. Assume there _is_ an element in both $$H$$ and $$g_1H$$, meaning $$g_1 \cdot h_i = h_j$$ for some elements $$h_i, h_j$$ in $$H$$.

$$g_1 \cdot h_i = h_j$$

$$(g_1 \cdot h_i) \cdot h_i^{-1} = h_j \cdot h_i^{-1}$$

$$g_1 \cdot (h_i \cdot h_i^{-1}) = h_j \cdot h_i^{-1}$$

$$g_1 \cdot e = h_j \cdot h_i^{-1}$$

$$\Rightarrow g_1 = h_j \cdot h_i^{-1} \epsilon \ H \Rightarrow \ g_1 \epsilon \ H $$

This contradicts our initial choice of $$g_1$$ as not being in $$H$$.

We can repeat this process for different cosets $$g_i$$ that don't overlap with each other or with $$H$$. Since all cosets $$g_iH$$ have the same size as $$H$$, and they partition $$G$$, we get:

Number of cosets = $$k$$

Index of $$H$$ in $$G$$ = $$\|G:H\| = k$$

So $$\|H\| \cdot k = \|G\| \Rightarrow \|H\| \text{ divides } \|G\|$$

---

## Normal Subgroups and Quotient Groups

### Definition:
A subgroup $$N$$ of a group $$G$$ is **normal** if $$g \cdot n \cdot g^{-1} \in N$$ for all $$g \in G$$ and $$n \in N$$.

### Simple Example:
Consider $$S_3$$, the group of permutations on 3 elements. The subgroup $$A₃ = \{e, (123), (132)\}$$ consisting of only the even permutations is normal in $$S₃$$.

To verify: If we take any permutation in $$S₃$$ and conjugate elements of $$A₃$$ by it, we stay within $$A₃$$. For instance:
- $$(12)(123)(12^{-1}) = (12)(123)(12) = (132) \in A₃$$
- $$(12)(e)(12^{-1}) = e \in A₃$$

This works because conjugation preserves the "evenness" of permutations.

### Another Example:
Consider $$Z$$ to be the set of Integers.

Group: Integers $$Z$$ under addition
Subgroups: $$Z, 2Z, 3Z, 4Z, 5Z, ...$$

The Group $$Z$$ consists of elements like $$5Z, 1+5Z, 2+5Z, 3+5Z, 4+5Z$$, where $$5Z$$ is the only group, and others are cosets (as they don't contain the identity element $$e$$).

Hence, $$5Z$$ is called the **Normal Subgroup**.

The collection of these cosets forms the **Quotient Group**, represented by $$Z/5Z$$.

It's worth noting that $$Z/5Z \leq Z$$.

### Simple Groups:
Every group $$G$$ has at least 2 subgroups: {$$e$$} and $$G$$ itself.

If the only normal subgroups of $$G$$ are the identity and the group itself, then $$G$$ is called a **simple group**.

---

## What are Cyclic Groups?

A group $$G$$ is **cyclic** if it is "generated" by a single element. To understand what "generated" means, let's consider an example:

Let $$G$$ be a group with operation $$ \times $$
- Pick $$x \in G$$
- $$\langle x \rangle = \{ ..., x^{-n}, ..., x^{-2}, x^{-1}, 1, x, x^2, x^3, ..., x^n\} $$ are all elements generated by $$x$$.

If this set equals $$G$$, then $$G = \langle x \rangle$$, making $$G$$ a cyclic group.

---

## What is Homomorphism?

Homomorphisms allow us to compare different groups, even with different operations. Suppose we have two groups $$(G, *)$$ and $$(H, \square)$$.

Pick two elements $$x, y \in G$$
So, $$x * y \in G$$

A function $$f: G \to H$$ is a homomorphism if:
- It maps $$x$$ to $$f(x)$$ in $$H$$
- It maps $$y$$ to $$f(y)$$ in $$H$$
- And crucially, $$f(x * y) = f(x) \square f(y)$$

This gives us a way to compare two entirely different groups with different operations!

**Definition:** A homomorphism is a function that preserves the structure of the groups.

**Note:** Homomorphisms don't need to be one-to-one functions.

An **Isomorphism** is a special type of homomorphism that is both one-to-one and onto (a bijection). This means the function that maps $$G$$ to $$H$$ is unique.

### What is a kernel of a Group Homomorphism?

Given a homomorphism $$f: G \to H$$ that may not be one-to-one, multiple elements from $$G$$ might map to the same element in $$H$$.

The **kernel** of $$f$$ is defined as:
ker($$f$$) = $$\{x \in G \mid f(x) = 1_H\}$$

The kernel tells us the degree to which the function fails the one-to-one condition. It's important to note that ker($$f$$) is never empty, as even when $$f$$ is one-to-one, ker($$f$$) = $$\{1_G\}$$. This is also the condition for $$f$$ to be one-to-one.

---

## Symmetric Groups

$$S_n$$ is the group of permutations on a set with $$n$$ elements. It's a finite group with $$n!$$ elements. All symmetric groups with $$n > 2$$ are non-abelian.

An important result in group theory is **Cayley's Theorem**, which states that every finite group is isomorphic to a subgroup of a symmetric group.

---

## Cycle notation of permutations

This is a method to represent permutations in a more concise form.

**Simple Example:**

Consider the symmetric group $$S_4$$. A permutation in this group can be written as:

$$\begin{pmatrix}
1 & 2 & 3 & 4 \\
2 & 1 & 4 & 3
\end{pmatrix}$$

This means:
- $$1$$ maps to $$2$$
- $$2$$ maps to $$1$$
- $$3$$ maps to $$4$$
- $$4$$ maps to $$3$$

Similarly, another permutation might be:

$$\begin{pmatrix}
1 & 2 & 3 & 4 \\
3 & 4 & 1 & 2
\end{pmatrix}$$

These can be viewed as functions. If we call the first permutation $$f$$ and the second $$g$$, then:
- $$f(1) = 2$$, $$f(2) = 1$$, $$f(3) = 4$$, $$f(4) = 3$$
- $$g(1) = 3$$, $$g(2) = 4$$, $$g(3) = 1$$, $$g(4) = 2$$

The group operation is function composition, $$f \circ g$$, which gives:

$$f \circ g = \begin{pmatrix}
1 & 2 & 3 & 4 \\
4 & 3 & 2 & 1
\end{pmatrix}$$

But writing permutations in this matrix form can be cumbersome, especially for larger groups. That's where cycle notation comes in.

In cycle notation, we write:
- $$f = (1,2)(3,4)$$
- $$g = (1,3)(2,4)$$

This makes it much easier to read and write permutations. The notation $(a, b, c, ...)$ means $$a$$ maps to $$b$$, which maps to $$c$$, and so on, with the last element mapping back to $$a$$.

**Sidenote:** The order of the cycles in a permutation doesn't matter, and the order of elements within a cycle (except for the starting point) doesn't matter either. So $(1,2)(4,3) = (3,4)(1,2)$.

Two-element cycles, like $(1,2)$, are called **transpositions**.

---

## Dihedral Group

The word **Dihedral** means "two faces." These groups describe the symmetries of regular polygons.

There are three types of operations a regular $$n$$-sided polygon can undergo:
1. Rotation (denoted as $$r$$)
2. Flip (denoted as $$f$$)
3. No change (the identity element $$e$$)

For an equilateral triangle:
- No change in position is the identity element $$e$$.
- Rotating by $$120^\circ$$ is denoted as $$r$$.
- Rotating by $$240^\circ$$ can be denoted as $$r^2$$ (rotating twice).
- Rotating by $$360^\circ$$ brings us back to the starting position, so $$r^3 = e$$.
- Flipping the triangle vertically is denoted as $$f$$.
- Flipping twice returns to the original position, so $$f^2 = e$$.

The total distinct transformations for the triangle are:
$$e, r, r^2, f, r \cdot f, r^2 \cdot f$$

Also, note that the order of $$r$$ is 3 ($$\|r\| = 3$$) and the order of $$f$$ is 2 ($$\|f\| = 2$$).

---

## Matrix Groups

Groups formed using matrices are called **Matrix Groups**. The two common operations with matrices are addition and multiplication.

Under addition, the identity element for an $$n \times m$$ matrix is a matrix with all elements as 0 (denoted as $$O$$).

For matrices under multiplication, the group is typically limited to $$n \times n$$ matrices. The identity element is the identity matrix $$I$$. For a matrix to have an inverse (and hence be part of a group under multiplication), its determinant must be non-zero, i.e., det($$M$$) $$\neq$$ 0.

Some important matrix groups include:
- **General Linear Group** ($$GL_n(R)$$): The group of $$n \times n$$ invertible matrices.
- **Special Linear Group** ($$SL_n(R)$$): The group of $$n \times n$$ invertible matrices with determinant 1.

The $$R$$ indicates that the matrix elements are real numbers.

---

## Direct products of Groups

Just as integers can be decomposed into products of primes, groups can be broken down into simpler groups. One way to build complex groups from simpler ones is through direct products.

Given two groups $$G_1$$ and $$G_2$$, their direct product is defined as:

$$G_1 \times G_2 = \{(x,y) \mid x \in G_1, y \in G_2\}$$

The direct product of multiple groups is also possible:

$$G_1 \times G_2 \times G_3 \times \ldots \times G_n = \{(x_1, x_2, x_3, \ldots, x_n) \mid x_1 \in G_1, x_2 \in G_2, \ldots, x_n \in G_n\}$$

The order of the direct product is the product of the orders of its constituent groups:

$$\|G_1 \times G_2 \times \ldots \times G_n\| = \|G_1\| \times \|G_2\| \times \ldots \times \|G_n\|$$

The identity element of the direct product is the tuple of identity elements from each group:

$$(e_1, e_2, e_3, \ldots, e_n)$$, where $$e_i$$ is the identity element of $$G_i$$.

If any of the groups in the direct product is non-abelian, then the direct product itself is also non-abelian.

---

## Simple Groups (In Detail)

A subgroup $$N$$ of a group $$G$$ is **normal** if $$g \cdot N \cdot g^{-1} = N$$ for all $$g \in G$$.

A group $$G$$ is **simple** if its only normal subgroups are {1} and $$G$$ itself.

Let's consider a finite group $$G$$ with a normal subgroup $$N_1 \triangleleft G$$. We say $$N_1$$ is **maximal** and **proper** if:

**Maximal**: There's no group $$H$$ between $$G$$ and $$N_1$$, i.e., no group $$H$$ with $$N_1 \subset H \subset G$$.

**Proper**: $$N_1 \neq G$$.

We can continue this process, finding a normal subgroup of $$N_1$$, and so on, forming a **normal series**:

$$1 \triangleleft N_i \triangleleft N_{i-1} \triangleleft \ldots \triangleleft N_2 \triangleleft N_1 \triangleleft G$$

When this series is made as long as possible, it's called a **composition series**.

### Jordan-Hölder Theorem

The **Jordan-Hölder Theorem** states that if there are multiple composition series for a finite group $$G$$, they are equivalent in the sense that they have the same length and identical factor groups.

### Classification of Finite Simple Groups

In a composition series, each quotient group is a simple group. This means that understanding all finite groups can be broken down into two tasks:

1. Find all simple groups.
2. Find all extensions of simple groups.

This leads to the **extension problem**: Given a finite group $$N$$ and a simple group $$S$$, find all groups $$G$$ where $$N \triangleleft G$$ and $$G/N \cong S$$.

Researchers have made significant progress in classifying all finite simple groups. There are four categories:

1. **Cyclic groups of prime order**: $$Z/pZ$$ where $$p$$ is prime. These are simple because their only divisors are 1 and $$p$$, which means their only subgroups are {0} and the group itself.

2. **Alternating groups** $$A_n$$ for $$n \geq 5$$. These relate to the non-existence of general formulas for solving polynomial equations of degree 5 or higher.

3. **Groups of Lie Type**: These are related to manifolds, spaces that locally resemble Euclidean space. One example is the group of complex numbers with absolute value 1, which forms a circle. Another is the group of real, invertible $$n \times n$$ matrices.

4. **26 Sporadic Groups**: These are exceptional groups that don't fit into the other categories. Among them, the **Monster Group** is the largest, with approximately $$8 \times 10^{53}$$ elements. The Monster contains 20 of the 26 sporadic groups, known as the "happy family," while the remaining 6 are called the "pariahs."

The classification of finite simple groups is one of the monumental achievements of modern mathematics, spanning approximately 10,000 pages of research.

---

## The Definition of a Ring

A **Ring** is a set of elements with operations similar to addition and multiplication, though the inverses of these operations may not always be defined.

For example, a $$2 \times 2$$ matrix with real elements forms a ring.

A ring is always "closed," meaning the result of any operation on ring elements is also in the ring.

Technically, a ring is a set $$R$$ with two operations, addition ($$+$$) and multiplication ($$\times$$), satisfying:
- Closure: For $$x, y \in R$$, both $$x + y \in R$$ and $$x \times y \in R$$.
- The set forms a commutative group under addition.
- Multiplication is associative.
- Multiplication is distributive over addition.

If a ring is commutative under multiplication, it's called a **commutative ring**.

If a ring contains a multiplicative identity (usually denoted as 1), it's called a **ring with identity**.

---

## Examples of Rings

### 1. The Set of Integers ($$Z$$)

The set of all positive and negative whole numbers, including zero, forms a ring under the operations of addition and multiplication.

**Properties**:
- **Closure**: Adding or multiplying two integers gives another integer.
- **Associativity**: Both addition and multiplication are associative.
- **Additive Identity**: 0 serves as the additive identity.
- **Multiplicative Identity**: 1 serves as the multiplicative identity.
- **Additive Inverses**: For every integer $$a$$, there's an integer $$-a$$ such that $$a + (-a) = 0$$.
- **Distributivity**: Multiplication distributes over addition.

### 2. The Set of Polynomials with Real Coefficients ($$R[x]$$)

This is the set of all polynomials where the coefficients are real numbers.

**Properties**:
- **Closure**: The sum and product of two polynomials in $$R[x]$$ are also in $$R[x]$$.
- **Associativity**: Both addition and multiplication are associative.
- **Additive Identity**: The zero polynomial is the additive identity.
- **Multiplicative Identity**: The polynomial 1 is the multiplicative identity.
- **Additive Inverses**: For every polynomial $$p(x)$$, there's a polynomial $$-p(x)$$ such that $$p(x) + (-p(x)) = 0$$.
- **Distributivity**: Multiplication distributes over addition.

### 3. The Set of $$n \times n$$ Matrices with Real Entries ($$M_n(R)$$)

This is the set of all $$n \times n$$ matrices where each entry is a real number.

**Properties**:
- **Closure**: The sum and product of two $$n \times n$$ matrices are also $$n \times n$$ matrices.
- **Associativity**: Matrix addition and multiplication are associative.
- **Additive Identity**: The zero matrix is the additive identity.
- **Multiplicative Identity**: The identity matrix is the multiplicative identity.
- **Additive Inverses**: For every matrix $$A$$, there's a matrix $$-A$$ such that $$A + (-A) = 0$$.
- **Distributivity**: Matrix multiplication distributes over addition.

### 4. The Set of Continuous Functions from $$R$$ to $$R$$ ($$C(R, R)$$)

This is the set of all continuous functions mapping real numbers to real numbers.

**Properties**:
- **Closure**: The sum and product (pointwise) of two continuous functions are continuous.
- **Associativity**: Function addition and multiplication are associative.
- **Additive Identity**: The zero function ($$f(x) = 0$$ for all $$x$$) is the additive identity.
- **Multiplicative Identity**: The constant function $$f(x) = 1$$ is the multiplicative identity.
- **Additive Inverses**: For every function $$f$$, there's a function $$-f$$ such that $$f + (-f) = 0$$.
- **Distributivity**: Function multiplication distributes over addition.

---

## Units in a Ring

### Definition of Units
A **unit** in a ring is an element that has a multiplicative inverse. If $$a$$ is an element in a ring $$R$$ and there exists a $$b \in R$$ such that $$a \times b = 1$$, then $$a$$ is a unit, and $$b$$ is its inverse.

### Group of Units
The set of all units in a ring forms a **group under multiplication**, known as the **group of units**.

### Examples
- In the ring of integers ($$Z$$), the only units are 1 and -1, as these are the only integers with multiplicative inverses within $$Z$$.
- In the ring of real numbers ($$R$$), every non-zero real number is a unit, since each has a multiplicative inverse.

---

## Integral Domains

An **Integral Domain** is a commutative ring $$R$$ with a multiplicative identity and no zero divisors. This means that if $$a \times b = 0$$, then either $$a = 0$$ or $$b = 0$$.

A key property of integral domains is that they satisfy the **cancellation law**: If $$a \times b = a \times c$$ and $$a \neq 0$$, then $$b = c$$.

---

## Ideals in Rings

An **Ideal** is a subset of a ring that is closed under addition and multiplication by elements of the ring. It's analogous to how subgroups relate to groups.

Formally, if $$I$$ is an ideal of a ring $$R$$, then:
- For all $$a, b \in I$$, $$a + b \in I$$ (closed under addition)
- For all $$a \in I$$ and $$r \in R$$, $$a \times r \in I$$ and $$r \times a \in I$$ (closed under multiplication by ring elements)

---

## Key Concepts

| Concept           | Description                                              |
|-------------------|----------------------------------------------------------|
| Normal Subgroup   | Subgroup N of G, forms factor group G/N.                 |
| Ring              | Abelian group under addition, associative multiplication.|
| Ideal             | Additive subgroup I of R, r·i, i·r ∈ I.                  |
| Factor Ring       | Cosets of R modulo I form ring R/I.                      |

- Left Ideals and Right Ideals also exist and are important in non-commutative rings.
- The intersection of two ideals is also an ideal.
- The sum of two ideals is also an ideal.
- The product of two ideals is also an ideal.

---

## What are Fields?

A **Field** is a ring where all non-zero elements have multiplicative inverses. This means it can perform all the operations familiar from arithmetic.

Formally, a field is a set $$F$$ with two operations, addition and multiplication, such that:
- The set forms a commutative group under addition.
- The set of non-zero elements forms a commutative group under multiplication.
- Multiplication is distributive over addition.

### Prime Fields

The smallest fields are called **prime fields**. These are fields of integers modulo a prime number, like $$Z/2Z$$, $$Z/3Z$$, $$Z/5Z$$, and so on.

The **characteristic of a field** is the smallest positive integer $$n$$ such that $$n \times 1 = 0$$. If no such $$n$$ exists, the field has characteristic 0.

---

## Vector Spaces

A **Vector Space** is a set of elements (vectors) along with operations of vector addition and scalar multiplication. The scalars come from a field.

A vector space over a field $$F$$ must satisfy several axioms, including:
- The set of vectors forms a commutative group under addition.
- Scalar multiplication is distributive over vector addition.
- Scalar multiplication is compatible with field multiplication.
- The multiplicative identity of the field acts as a scalar that leaves vectors unchanged.

---

## Modules

A **Module** generalizes the concept of a vector space by replacing the field of scalars with a ring. This allows for a broader study of algebraic structures.

Formally, a module over a ring $$R$$ consists of a set of elements (like vectors) together with operations of addition and scalar multiplication by elements of $$R$$, satisfying axioms similar to those of a vector space.

The key difference between a module and a vector space is that modules allow for scalar multiplication from a ring, while vector spaces require scalars from a field.

---

## References

- [A YouTube playlist by Socratica](https://www.youtube.com/playlist?list=PLi01XoE8jYoi3SgnnGorR_XOW3IcK-TP6)
- [A Book of Abstract Algebra - Charles C. Pinter](https://math.umd.edu/~jcohen/402/Pinter%20Algebra.pdf)
- [Abstract Algebra - Theory and Applications - Judson, Stephen](https://math.mit.edu/~mckernan/Teaching/12-13/Spring/18.703/book.pdf)

---

I hope this guide has provided a comprehensive introduction to the beautiful world of Abstract Algebra. From the foundational concept of groups to the more advanced topics of rings, fields, and modules, Abstract Algebra offers a fascinating glimpse into the deeper structures that underlie mathematics.
