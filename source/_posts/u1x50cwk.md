---
title: "【题解】P1347 排序"
date: 2025-12-19 17:47:22
categories:
  - "题解"
tags:
  - "P1347"
luogu_lid: "u1x50cwk"
luogu_category: 2
original: "https://www.luogu.com.cn/article/u1x50cwk"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1347)

似乎有的题解说得很奇怪。

每加一条边就跑一次拓扑排序，如果拓扑排序过程中某时刻队列中的元素个数 $>1$ 说明拓扑序不唯一。

注意优先判图里有环的情况。
