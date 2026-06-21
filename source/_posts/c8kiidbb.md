---
title: "【题解】CF632E Thief in a Shop"
date: 2023-02-20 12:34:38
categories:
  - "题解"
tags:
  - "动态规划"
  - "背包"
luogu_lid: "c8kiidbb"
luogu_category: 2
original: "https://www.luogu.com.cn/article/c8kiidbb"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/CF632E)

<!-- more -->

注意到值域 $V$ 很小，考虑设 $dp[i]$ 表示总价值为 $i$ 最少需要拿几个物品。

转移显然是 $dp[i]=\min\left\{dp[i-a_j]+1\right\}$。

但是要求必须拿 $k$ 个物品。有一个巧妙的处理是把所有物品的价值都减去最小物品的价值，这样就会出现一个价值为 $0$ 的物品，可以用来填补空缺。最后输出的时候把这些价值加回去即可。

枚举 $[1,V]$ 进行转移，时间复杂度 $O(nkV)$。
