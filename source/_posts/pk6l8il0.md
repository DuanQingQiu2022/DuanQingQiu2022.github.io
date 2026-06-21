---
title: "【题解】P2789 直线交点数"
date: 2025-03-25 16:54:23
categories:
  - "题解"
tags:
  - "P2789"
luogu_lid: "pk6l8il0"
luogu_category: 2
original: "https://www.luogu.com.cn/article/pk6l8il0"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P2789)

<!-- more -->

考虑如果在 $n$ 条直线组成的平面中添加一条新的直线，那么它会跟所有斜率不同的直线都有一个交点。

所以只需要统计已有直线里有多少种不同的斜率，每种斜率有多少条直线即可。

答案最多不会超过 $n^2$ 级别，直接记忆化搜索即可。
