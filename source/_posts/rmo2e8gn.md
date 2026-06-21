---
title: "【题解】P3913 车的攻击"
date: 2021-12-04 22:55:41
categories:
  - "文章"
luogu_lid: "rmo2e8gn"
luogu_category: 2
original: "https://www.luogu.com.cn/article/rmo2e8gn"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P3913)

好家伙 橙题卡了 0.5h，真就原地退役了。

对这种 CF-Style 毫无免疫力。破防了。

考虑有 $x$ 行有车，$y$ 列有车。

那么不算重复的格子，一共能攻击到的格子数为 $n(x+y)$。

考虑每一行和每一列相交都会有且仅有一个格子被算重，因此有 $xy$ 个格子会被算重。

因此答案是 $n(x+y)-xy$。

有点卡常。用 unordered_map 去重需要吸氧。
