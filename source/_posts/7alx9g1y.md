---
title: "【题解】P2343 宝石管理系统"
date: 2022-04-05 20:04:25
categories:
  - "文章"
luogu_lid: "7alx9g1y"
luogu_category: 2
original: "https://www.luogu.com.cn/article/7alx9g1y"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P2343)

每日一个 STL 小技巧。

插入和询问第 $k$ 大，但我就不写平衡树。

维护一个有序的 vector，插入的时候 upperbound 一下然后直接插，直接能过，甚至跑到了当前最优解 Rank 4。

事实上 Rank 1 也是一样的操作。

插入的时候可以重载也可以取负数。
