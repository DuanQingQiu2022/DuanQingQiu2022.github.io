---
title: "【题解】P8817 [CSP-S 2022] 假期计划"
date: 2022-11-05 23:45:57
categories:
  - "题解"
tags:
  - "最短路"
  - "BFS"
  - "排序"
luogu_lid: "nbv47f6c"
luogu_category: 2
original: "https://www.luogu.com.cn/article/nbv47f6c"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P8817)

<!-- more -->

考虑题目为什么限制四个点，结合数据范围不难想到要枚举中间两个点。

那么考虑边上两个点怎么选，比如对于点 $a$ 来说，首先要满足距离点 $1$ 和点 $b$ 距离都 $\le k+1$，然后点权尽可能大，那就把对于所有点来说满足这两个条件的点筛出来按点权排个序。

然后依然以点 $a$ 为例，不能与 $c,d$ 重复，因此至少要保留点权前三大的点。

时间复杂度 $O(n^2 \log n)$。
