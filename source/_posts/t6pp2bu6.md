---
title: "【题解】P10904 [蓝桥杯 2024 省 C] 挖矿"
date: 2025-02-04 16:39:09
categories:
  - "文章"
luogu_lid: "t6pp2bu6"
luogu_category: 2
original: "https://www.luogu.com.cn/article/t6pp2bu6"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P10904)

<!-- more -->

显然有效区间最多 $[-m,m]$。

假设向一侧走了 $x$ 步，另一侧走了 $y$ 步，且 $x<y$，那么有 $2x+y=m$。

枚举 $x$ 然后前缀和处理区间贡献即可，时间复杂度 $O(n)$。
