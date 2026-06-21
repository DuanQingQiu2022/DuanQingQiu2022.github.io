---
title: "【题解】CF27D Ring Road 2"
date: 2023-02-19 18:04:41
categories:
  - "题解"
tags:
  - "二分图"
  - "图论"
luogu_lid: "rf1e4dld"
luogu_category: 2
original: "https://www.luogu.com.cn/article/rf1e4dld"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/CF27D)

<!-- more -->

如果两条边相交那就不能放在同侧，于是自然想到二分图染色。

把每条边抽象成点，相交就连边，最后判断一下这个图是否为二分图即可。
