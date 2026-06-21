---
title: "【题解】SP116 INTERVAL - Intervals"
date: 2023-03-10 08:45:01
categories:
  - "文章"
luogu_lid: "2kakvpcg"
luogu_category: 2
original: "https://www.luogu.com.cn/article/2kakvpcg"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/SP116)

<!-- more -->

考虑差分，设 $d_i$ 表示 $[1,i]$ 中最少要选多少个数，在 $[l,r]$ 选 $c$ 个数，条件就是 $d_{r}-d_{l-1} \ge c$。

然后考虑 $0 \le d_i-d_{i-1} \le 1$，分别连边即可，差分约束跑最长路，答案就是 $d_{r_{\max}}$。

下标非负可以从 $1$ 开始编号。
