---
title: How many pairwise coprime composites?
description: Interesting number theory puzzle
date: 2026-10-22
tags: [math, number-theory]
math: true
---

### Problem

Find the least positive integer $n$ such that every set of $n$ pairwise relatively prime integers strictly between $1$ and $2005$ contains a prime number.

Source: Răzvan Gelca and Titu Andreescu's *Putnam and Beyond*.

### Write-up

The squares of the primes from $2$ through $43$ form a set of $14$ pairwise relatively prime composite numbers below $2005$:

$$
\lbrace 2^2,3^2,5^2,\ldots,43^2\rbrace.
$$

This shows that $n$ must be **at least $15$**: a set of $14$ can avoid primes, as can any smaller subset of this example.

To show that $15$ actually works, consider any composite integer $m<2005$. It has a prime divisor $p\leq\sqrt{m}<45$, so $p$ is one of the $14$ primes from $2$ through $43$. If several composites are pairwise relatively prime, none can share a prime divisor. Each therefore needs a different prime from this list, so there can be at most $14$ of them. Every set of $15$ pairwise relatively prime integers in the given range must contain a prime.

Thus the least possible $n$ is $15$. 
