---
title: "【题解】P3743 kotori的设备"
date: 2022-04-20 22:32:29
categories:
  - "题解"
tags:
  - "二分"
luogu_lid: "nbye32r2"
luogu_category: 2
original: "https://www.luogu.com.cn/article/nbye32r2"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P3743)

<!-- more -->

Stop learning useless algorithms，go and learn how to use binary search.

发现这个题的操作是实数级的，也就是可以无缝转换，所以肯定能把充电值拉满。

所以可以直接 $O(n)$ 计算出某个时间能否被达到，然后二分一下答案就做完了。

上界随便设个 $10^{11}$  就过了，实际上可能还达不到。
