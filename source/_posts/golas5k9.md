---
title: "【题解】P1550 [USACO08OCT]Watering Hole G"
date: 2022-02-26 20:49:17
categories:
  - "题解"
luogu_lid: "golas5k9"
luogu_category: 2
original: "https://www.luogu.com.cn/article/golas5k9"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1550)

<!-- more -->

题面要求说每块田都得与地下水相连。

不妨设地下水为 $0$ 号节点，然后每个点 $i$ 向 $0$ 号节点连一条边权为 $w_i$ 的边。

然后建图直接求最小生成树即可。

时间复杂度 $O(n^2 \log n)$。
