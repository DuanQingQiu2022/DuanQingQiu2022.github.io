---
title: "【题解】P8266 [USACO22OPEN] Photoshoot B"
date: 2025-07-11 12:46:30
categories:
  - "题解"
tags:
  - "构造"
luogu_lid: "j3fmuzro"
luogu_category: 2
original: "https://www.luogu.com.cn/article/j3fmuzro"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P8266)

<!-- more -->

听说是 2024 年 BNU 夏令营机试最后一题，感觉水平不太行啊，还搬原题，素质也有问题。

首先这个只能搬偶数数量的前缀限制很怪，考虑怎么转化。

不难看出翻转序列其实只是改变了序列上每个位置的奇偶性。对于一次操作，翻转 $n+2$ 个位置与翻转 $n$ 个位置相比，显然多翻转的 $2$ 个位置必须不一样才有意义。

有了这个观察可以想到把序列两两分组，然后只有 GH 和 HG 两种有意义的组合，能做的操作是翻转序列的一个前缀，目标是把所有 GH 都变成 HG。

那就相当于一个 01 串，做多少次前缀翻转能把 0 变成 1。

这是典题，参考[此题](https://www.luogu.com.cn/problem/P2708)即可。
