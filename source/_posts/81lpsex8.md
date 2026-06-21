---
title: "【题解】P10614 BZOJ3864 Hero meet devil"
date: 2024-11-19 17:24:25
categories:
  - "题解"
tags:
  - "P10614"
luogu_lid: "81lpsex8"
luogu_category: 2
original: "https://www.luogu.com.cn/article/81lpsex8"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P10614)

设 $n=|s|$。

写在脸上的 dp of dp，显然内层 dp 是一个 LCS。

LCS 就直接设 $dp_{i,j}$ 表示考虑到串 $s$ 的第 $i$ 个字符，串 $t$ 的第 $j$ 个字符，然后 $dp_{i,j}=\max(dp_{i-1,j},dp_{i,j-1},dp_{i-1,j-1}+[s_i=t_j])$。

考虑怎么把内层 dp 状态压入外层 dp 中。

考虑对于本题，串 $s$ 不变但串 $t$ 会变化。因此外层 dp 需要有一维 $j$ 表示现在考虑到串 $t$ 的第 $j$ 位。

然后自然考虑用 $S$ 记录此时 $dp[1 \dots n][j]$ 的值。

显然 $S$ 不可能存储 $n$ 个 int 类型，观察数据范围 $n \leq 15$，自然想到有 $O(2^n)$ 级别的做法，然后可以发现 $dp_{i+1,j}-dp_{i,j} \in \{0,1\}$。

考虑利用归纳法证明这个结论。$j=1$ 是显然的。

然后如果 $dp_{i+1,j}=dp_{i,j}$ 那么自然成立。

如果 $dp_{i+1,j}=dp_{i+1,j-1}$，又根据归纳法有 $dp_{i+1,j-1}-dp_{i,j-1} \in \{0,1\}$，所以 $dp_{i+1,j}-dp_{i,j} \in \{0,1\}$。

如果 $dp_{i+1,j}=dp_{i,j-1}+1$，又 $dp_{i,j}-dp_{i,j-1} \in \{0,1\}$，所以 $dp_{i+1,j}-dp_{i,j}=1-(dp_{i,j}-dp_{i,j-1}) \in \{0,1\}$。

这样就证明了这个结论。

那么如果固定 $j$ 这一维，$dp[1...n][j]$ 的差分数组就是一个 $01$ 序列。于是就可以用一个二进制数 $S$ 压缩这个差分数组。

定义 $f_{i,S}$ 表示考虑到串 $t$ 的第 $i$ 位时，内层 dp 状态为 $S$ 的方案数。

需要 $O(n2^n)$ 预处理一个 $g_{S,ch}$ 表示在差分数组状态为 $S$ 时，再加一个字符 $ch$ 会变成的状态，这样就可以做到 $O(1)$ 转移。

枚举 $i,S$ 直接转移即可，时间复杂度 $O((n+m)2^n)$。

好像还要乘个字符集大小，不过无所谓。
