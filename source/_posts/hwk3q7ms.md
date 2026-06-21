---
title: "【题解】CF1305D Kuroni and the Celebration"
date: 2022-07-22 19:55:26
categories:
  - "题解"
tags:
  - "CF1305D"
luogu_lid: "hwk3q7ms"
luogu_category: 2
original: "https://www.luogu.com.cn/article/hwk3q7ms"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/CF1305D)

<!-- more -->

注意到树的形态和标号都是给定的，所以做法都写在题面上了。

然后你注意到如果你随便问两个点没法确定顺序，所以应该问叶子。

每次询问两个叶子，如果返回其中一个叶子那它显然是 LCA。如果都不是那你就排除了两个点。

然后如果你询问次数用完了还没出结果，那最多就剩一个点没问过，答案就是那个点。
