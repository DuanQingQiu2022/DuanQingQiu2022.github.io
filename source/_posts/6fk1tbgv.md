---
title: "【题解】P1809 过河问题"
date: 2026-05-27 14:37:10
categories:
  - "题解"
tags:
  - "P1809"
luogu_lid: "6fk1tbgv"
luogu_category: 2
original: "https://www.luogu.com.cn/article/6fk1tbgv"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1809)

不妨先对 $a_i$ 升序排序。

首先肯定要先把大的运送到右边，那么比较直观的想法肯定是优先把最大值运送到右边然后让最小值回来。

但是样例的做法就不符合这个思路，可以让 $a_1,a_2$ 过去然后 $a_1$ 回来，$a_{n-1},a_n$ 过去然后 $a_2$ 回来，这样就用 $a_1+2a_2+a_n$ 的代价运送了最后两个数。

对比每次用最小值运最大值的思路，可以得到运送最后两个数的代价是 $\min(a_1+2a_2+a_n,2a_1+a_{n-1}+a_n)$。

然后对 $n \ge 4$ 的情况都可以这样做，$n<4$ 特判处理即可。
