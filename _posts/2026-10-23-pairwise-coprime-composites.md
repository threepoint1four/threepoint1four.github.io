---
title: How many pairwise coprime composites?
description: A small extremal number theory problem from Putnam and Beyond.
date: 2026-10-23
tags: [math, number-theory]
math: true
---

## The problem

Find the least positive integer $n$ such that every set of $n$ pairwise relatively prime integers strictly between $1$ and $2005$ contains a prime number.

Source: Răzvan Gelca and Titu Andreescu, [*Putnam and Beyond*](https://link.springer.com/book/10.1007/978-0-387-68445-1).

## My write-up

The squares of the primes from $2$ through $43$ form a set of $14$ pairwise relatively prime composite numbers below $2005$:

$$
\lbrace 2^2,3^2,5^2,\ldots,43^2\rbrace.
$$

This shows that $n$ must be **at least $15$**: a set of $14$ can avoid primes, as can any smaller subset of this example.

To show that $15$ actually works, consider any composite integer $m<2005$. It has a prime divisor $p\leq\sqrt{m}<45$, so $p$ is one of the $14$ primes from $2$ through $43$. If several composites are pairwise relatively prime, none can share a prime divisor. Each therefore needs a different prime from this list, so there can be at most $14$ of them. Every set of $15$ pairwise relatively prime integers in the given range must contain a prime.

Thus the least possible $n$ is $15$. Showing that every set of $16$ contains a prime would only establish $n\leq16$; it would leave open whether $15$ works.
