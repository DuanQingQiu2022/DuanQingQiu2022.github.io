---
title: "【题解】P2503 [HAOI2006]均分数据"
date: 2022-03-22 10:19:23
categories:
  - "题解"
tags:
  - "随机化"
luogu_lid: "yqdkm1zd"
luogu_category: 2
original: "https://www.luogu.com.cn/article/yqdkm1zd"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P2503)

<!-- more -->

这个均方差就是标准差……

题意：把 $n$ 个数分成 $m$ 组，把每组当做整体，求这 $m$ 组的标准差最小是多少。

根据常识肯定是让每组的值与平均值越接近越好，然后考虑你手玩这个东西怎么做，肯定是不断往最小的组里面放一个数对吧。然后会发现进行很多次这个东西，就会很像模拟退火。

所以可以直接跑模拟退火，每次维护最小的组，随便找一个数扔进去，然后计算一下新的值即可。

有可能会 WA #10。但是多跑几次退火，跑到时限的一半差不多就能过。

提供一个能过的参数：降温参数 0.91，跑 500 次退火即可。
