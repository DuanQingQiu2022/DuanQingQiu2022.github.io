---
title: "【题解】P1043 [NOIP 2003 普及组] 数字游戏"
date: 2025-12-20 21:09:51
categories:
  - "题解"
tags:
  - "P1043"
luogu_lid: "jeu6vly1"
luogu_category: 2
original: "https://www.luogu.com.cn/article/jeu6vly1"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1043)

区间 dp 板子。

首先断环为链，考虑设 $f_{i,j,k}$ 表示区间 $[i,j]$ 分成 $k$ 段满足条件的最大值，然后枚举区间断点 $l$ 进行转移即可，$f_{i,j,k}=\max\left\{f_{i,l,k-1}\times f_{l+1,j,1}\right\}$。

初始化所有 $k=1$ 的位置，这部分维护前缀和即可。

最小值跟最大值没区别。

时间复杂度 $O(n^3m)$。
