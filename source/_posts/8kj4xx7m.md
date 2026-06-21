---
title: "【题解】P11701 [ROIR 2025] 平方差"
date: 2025-02-11 23:19:34
categories:
  - "题解"
luogu_lid: "8kj4xx7m"
luogu_category: 2
original: "https://www.luogu.com.cn/article/8kj4xx7m"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P11701)

<!-- more -->

不难想到 $(x+y)(x-y)=d$，因此只需枚举 $d$ 的因子即可求出 $x,y$ 的值。

时间复杂度 $O(\sqrt d)$。
