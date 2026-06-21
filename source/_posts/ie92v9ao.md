---
title: "【题解】P13364 [GCJ 2011 Qualification] GoroSort"
date: 2026-01-03 09:51:59
categories:
  - "题解"
tags:
  - "P13364"
luogu_lid: "ie92v9ao"
luogu_category: 2
original: "https://www.luogu.com.cn/article/ie92v9ao"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P13364)

没看懂讨论区在说什么。

首先有个结论是在一个随机排列中，不动点的期望个数总是 $1$。

考虑猜结论。直观的想法是已经排好序的位置就不要动，然后剩下错排的位置肯定会形成一堆置换环的结构。考虑每次选其中一个大小为 $k$ 的置换环进行操作，根据上述结论每次操作完期望剩下 $k-1$ 个点，因此把这个环排好序的期望操作次数是 $k$ 次。

这样答案就是原序列中所有不在自己位置的数的个数。

当然每次期望减少 $1$ 并不能推出期望操作次数就一定是 $k$。考虑证明。

设错排位置为 $k$ 的一个序列最优情况下期望操作次数为 $E_k$，每次操作产生 $i$ 个不动点的概率是 $p_i$，要求证明 $E_k=k$。

首先 $E_0=0,E_k=1+\sum\limits_{i=0}^kp_iE_{k-i}$。

考虑前面已经归纳出了 $E_{k-i}=k-i$，那么 $1+\sum\limits_{i=0}^kp_iE_{k-i}=1+k\sum\limits_{i=0}^kp_i-\sum\limits_{i=0}^kip_i$。

$\sum\limits_{i=0}^kp_i=1$，而 $\sum\limits_{i=0}^kip_i$ 就是操作之后不动点的期望个数，所以也等于 $1$。

因此上面那个式子就等于 $1+k-1=k$。
