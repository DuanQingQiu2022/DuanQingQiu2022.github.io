---
title: "【题解】P3199 [HNOI2009] 最小圈"
date: 2026-05-30 02:43:08
categories:
  - "题解"
tags:
  - "分数规划"
  - "二分"
  - "最短路"
luogu_lid: "2kxz51vi"
luogu_category: 2
original: "https://www.luogu.com.cn/article/2kxz51vi"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P3199)

<!-- more -->

分数规划板子。

考虑二分答案的一个合法值为 $mid$，那么有 $\dfrac{1}{k}\sum\limits_{i=1}^kw_{c_i,c_{i+1}} \le mid$，即 $\sum\limits_{i=1}^k(w_{c_i,c_{i+1}}-mid) \le 0$。

因此令边权为 $w_{c_i,c_{i+1}}-mid$，图里有负环就是一个合法解。
