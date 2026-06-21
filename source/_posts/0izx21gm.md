---
title: "【题解】P1974 基因聚合"
date: 2026-01-04 04:44:58
categories:
  - "题解"
tags:
  - "贪心"
  - "高精度"
luogu_lid: "0izx21gm"
luogu_category: 2
original: "https://www.luogu.com.cn/article/0izx21gm"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1974)

<!-- more -->

考虑有三张卡片 $a<b<c$，那么显然先合并 $ab$ 再合并 $c$ 是最优解。

因此只需要每次贪心地取出两张最小的卡片合并即可。

实际上可以把构造过程看成一棵二叉树，叶节点为初始的 $n$ 个值。最终构造出的二叉树应该严格满足离根节点越近的位置值越大，这证明了上述结论。

需要高精度。
