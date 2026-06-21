---
title: "【题解】CF1375G Tree Modification"
date: 2022-10-27 11:05:10
categories:
  - "文章"
luogu_lid: "avqsgawx"
luogu_category: 2
original: "https://www.luogu.com.cn/article/avqsgawx"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/CF1375G)

<!-- more -->

透过现象看本质，很精妙。

题目中这个操作看似很有规律，实际分析好像没什么好用的性质。

注意到整个操作中都只有 $a,c$ 有作用，也就是强制要求选距离为 $2$ 的点，从这个限制入手。

不难想到如果把树进行黑白染色，那么 $a,c$ 都是同色点，把 $a$ 连接的点连到 $c$，这些点颜色不变，也就是一套操作下来只是把 $a$ 的颜色换了一下。

也就是说一次操作能改变一个点的颜色，目标是把一种颜色的点数量变为 $1$，那么直接对树染色之后统计数量较少的那种颜色即可。
