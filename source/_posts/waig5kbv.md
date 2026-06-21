---
title: "【题解】P8818 [CSP-S 2022] 策略游戏"
date: 2022-11-05 23:49:14
categories:
  - "题解"
luogu_lid: "waig5kbv"
luogu_category: 2
original: "https://www.luogu.com.cn/article/waig5kbv"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P8818)

<!-- more -->

简单的分类讨论，分为后手只有正数，只有负数，有正有负三种情况讨论，不难看出先手对策。

讨论之后需要维护先手区间最大正数，最大负数，最小正数，最小负数，是否有零，后手最大值，后手最小值七个信息。随便什么数据结构维护即可。
