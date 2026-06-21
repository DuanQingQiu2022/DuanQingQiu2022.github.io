---
title: "【题解】CF865D Buy Low Sell High"
date: 2022-10-27 12:01:47
categories:
  - "题解"
tags:
  - "贪心"
  - "堆"
luogu_lid: "ztcd35z3"
luogu_category: 2
original: "https://www.luogu.com.cn/article/ztcd35z3"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/CF865D)

<!-- more -->

典题。

直观的贪心就是把每一天的物品都塞到堆里，然后需要卖的时候就从堆里挑一个最小的卖。（如果当天不卖东西的话，那么之后的决策如果需要买这个东西就是合法的）

错误性显然，因为后面可能有更好的机会卖出。

考虑 $a_i$ 如果在第 $j$ 天卖出，得到的利润是 $a_j-a_i$。如果在第 $k$ 天卖出，可能得到的更优利润就是 $(a_k-a_i)-(a_j-a_i)=a_k-a_j$，那么就相当于物品 $a_j$ 在第 $k$ 天被选择，也就是说每次买 $a_i$ 的时候就多塞一个 $a_j$ 进堆里即可。

至于想取出一个 $a_j$ 的时候，视为优先取多塞的那个，这样就可以避免第 $j$ 天执行两个操作的问题。同理如果想买 $a_k$ 并在之后卖出，也视为优先取多塞的 $a_k$。

这样就可以执行反悔贪心的操作了。
