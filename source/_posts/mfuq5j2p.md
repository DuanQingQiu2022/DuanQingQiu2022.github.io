---
title: "【题解】CF474F Ant colony"
date: 2023-02-27 18:00:59
categories:
  - "题解"
tags:
  - "分块"
luogu_lid: "mfuq5j2p"
luogu_category: 2
original: "https://www.luogu.com.cn/article/mfuq5j2p"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/CF474F)

<!-- more -->

本质上就是求区间 $[l,r]$ 内有多少个数等于区间 $\gcd$。

直接分块维护区间 $\gcd$ 和区间内等于 $\gcd$ 的数的个数即可。
