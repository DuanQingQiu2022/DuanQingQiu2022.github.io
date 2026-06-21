---
title: "【题解】SP1026 FAVDICE - Favorite Dice"
date: 2021-10-14 19:20:25
categories:
  - "题解"
tags:
  - "概率与期望"
  - "动态规划"
luogu_lid: "jbeqh9eo"
luogu_category: 2
original: "https://www.luogu.com.cn/article/jbeqh9eo"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/SP1026)

<!-- more -->

期望 dp 的练手好题。

设 $dp[i]$ 为已经选了 $i$ 种点数，要选到 $n$ 种点数还需要扔多少次的期望值。

考虑每扔一次只有两种可能： $\dfrac{i}{n}$ 可能扔出已有的点数， $\dfrac{n-i}{n}$ 可能扔出没有的点数。

根据期望的可加性，$dp[i]=dp[i] \times \dfrac{i}{n}+dp[i+1] \times \dfrac{n-i}{n}+1$。

要 $+1$ 的原因是因为扔了 $1$ 次。

这个式子随便化简一下就有 $dp[i]=dp[i+1]+\dfrac{n}{n-i}$。倒序枚举 $i$ 转移即可。
