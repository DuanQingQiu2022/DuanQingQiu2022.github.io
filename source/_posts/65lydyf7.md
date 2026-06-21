---
title: "【题解】P8365 [LNOI2022] 吃"
date: 2022-05-28 23:12:16
categories:
  - "题解"
tags:
  - "贪心"
luogu_lid: "65lydyf7"
luogu_category: 2
original: "https://www.luogu.com.cn/article/65lydyf7"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P8365)

<!-- more -->

这题样例造得什么几把，写啥都能过所有样例。

首先随便贪心都能 75pts/85pts/90pts，不多说了。

然后考虑 $a_i=1$ 的点是必加的，考虑所有 $a_i>1$ 的点。

考虑 $a_i$ 至少为 $2$，也就是最差也会把当前数翻倍，所以剩下的数里最多只能选一个最好的加上 $b_i$，而次好的显然不如直接乘上去更优。

所以直接枚举判断一下选不选，选的话选哪个点加上去。显然正常的话是乘上所有 $a_i$，所以选择加的贡献是 $\dfrac{ans+b_i}{a_i}$，选一个最大值和 $ans$ 取 $\max$ 即可。

时间复杂度 $O(n)$。
