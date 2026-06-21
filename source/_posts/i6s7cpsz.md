---
title: "【题解】P5194 [USACO05DEC]Scales S"
date: 2021-11-12 23:10:56
categories:
  - "文章"
luogu_lid: "i6s7cpsz"
luogu_category: 2
original: "https://www.luogu.com.cn/article/i6s7cpsz"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P5194)

<!-- more -->

简单搜索。注意到序列单调不降且递增幅度严格不劣于斐波那契数列，大概能够猜出可选的数据范围。

然后比较显然的做法是倒序枚举每一个砝码选与不选，如果剩下的砝码能全选则全选。（正序枚举无法剪枝）

注意搜索过程中要先判断 $ans>c$ 的无解情况。
