---
title: "【题解】CF1144F Graph Without Long Directed Paths"
date: 2023-02-20 22:31:08
categories:
  - "题解"
tags:
  - "CF1144F"
luogu_lid: "kvkqclj9"
luogu_category: 2
original: "https://www.luogu.com.cn/article/kvkqclj9"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/CF1144F)

<!-- more -->

首先图是无向连通图。

路径长度 $\le 2$，等价于一个点不能既有入边又有出边，即一个点要么入度为 $0$，要么出度为 $0$。

注意到相邻的点必然具有的性质不同，那么直接二分图染色即可。
