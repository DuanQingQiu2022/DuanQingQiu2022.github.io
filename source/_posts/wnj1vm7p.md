---
title: "【题解】P1102 A-B 数对"
date: 2021-11-04 11:34:23
categories:
  - "题解"
luogu_lid: "wnj1vm7p"
luogu_category: 2
original: "https://www.luogu.com.cn/article/wnj1vm7p"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1102)

<!-- more -->

这个水题总感觉是在致敬 Leetcode 上的第一题 2Sum。

前两天在知乎上看到一个神必回答，说 75% 的程序员认为 2Sum 这题最优复杂度是 $O(n^2)$，于是十分震惊。

然后今天就看到一个 map 练习题的帖子，翻了翻发现这题是个减法版 2Sum……

要求 $a-b=c$，只需要确定 $a-c$ 在原数列中出现了几次，拿个 unordered_map 维护一下，然后枚举 $a$ 就做到 $O(n)$ 了。

~~不知道这个知乎回答是不是在编故事~~
