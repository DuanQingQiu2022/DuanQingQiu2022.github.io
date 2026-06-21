---
title: "【题解】P3878 [TJOI2010]分金币"
date: 2022-03-21 21:34:46
categories:
  - "文章"
luogu_lid: "3ej0mttg"
luogu_category: 2
original: "https://www.luogu.com.cn/article/3ej0mttg"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P3878)

<!-- more -->

这题我提交了 0.1k 次，哈哈。

可以模拟退火。用 $pos_i$ 代表第 $i$ 个数在哪个组里，每次随机两个数，如果不同组就交换。然后这样就可以做到 $O(1)$ 退火。

参数只要差不多都能过。我降温 0.996，跑 20 次退火能过；降温 0.91，跑 1000 次退火也能过。所以差不多得了。

注意当 $\Delta E >0$ 的时候，采用当前解并不需要更新答案的值。
