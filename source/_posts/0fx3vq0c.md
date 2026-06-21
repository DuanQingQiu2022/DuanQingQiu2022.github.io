---
title: "【题解】P3223 [HNOI2012] 排队"
date: 2026-01-04 04:17:32
categories:
  - "题解"
tags:
  - "P3223"
luogu_lid: "0fx3vq0c"
luogu_category: 2
original: "https://www.luogu.com.cn/article/0fx3vq0c"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P3223)

<!-- more -->

正难则反，合法方案数就是女生不相邻的方案数减去女生不相邻且领导相邻的方案数。

如果不考虑领导的限制，那么男生和领导随意排序共 $(n+2)!$ 种方案，插板法有 $n+3$ 个空位，插入女生不相邻的方案数是 $(n+3)!A_{n+3}^m$。

考虑计算女生不相邻且领导相邻的方案数，即 $2!(n+1)!A_{n+2}^m$。

因此答案即为 $(n+3)!A_{n+3}^m-2!(n+1)!A_{n+2}^m$。
