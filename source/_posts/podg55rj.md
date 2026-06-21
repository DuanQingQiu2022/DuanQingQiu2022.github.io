---
title: "【题解】P9693 [GDCPC 2023] New Houses"
date: 2025-04-07 01:12:25
categories:
  - "题解"
tags:
  - "贪心"
  - "排序"
luogu_lid: "podg55rj"
luogu_category: 2
original: "https://www.luogu.com.cn/article/podg55rj"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P9693)

<!-- more -->

好烦人啊。

注意到每个人的贡献与他的邻居是谁无关，所以我们只关心没有邻居的人的数量。

假设所有人初始都有邻居，那么每个人的权重就是 $b_i-a_i$。

然后考虑如果有 $k$ 个人没有邻居，那么必然有 $2k+(n-k) \le m$，即 $k\le m-n$。

然后直接按每个人的权重排序，贪心取前 $\le k$ 个最大的正值即可。

但是需要考虑一些 corner case。首先是 $n=1$ 的情况答案是 $b_1$，然后注意 $n-k \neq 1$。

时间复杂度 $O(n \log n)$。
