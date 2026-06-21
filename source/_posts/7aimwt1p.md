---
title: "【题解】P6033 [NOIP2004 提高组] 合并果子 加强版"
date: 2021-12-06 23:31:44
categories:
  - "题解"
tags:
  - "贪心"
  - "排序"
luogu_lid: "7aimwt1p"
luogu_category: 2
original: "https://www.luogu.com.cn/article/7aimwt1p"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P6033)

<!-- more -->

被这题教做人了。

合并果子之前只会一个 $O(n \log n)$ 的优先队列做法，很 naive 地以为那是最优解……

$10^7$ 的话，考虑一个线性做法。

发现值域很小， $a_i \le 10^5$，可以使用桶排做到 $O(n)$。

考虑之前的插入是单次 $\log$ 的复杂度，需要优化成 $O(1)$。

考虑开两个普通队列，一个存放原始的果子，一个存放合并后的果子，显然这两个队列都能保证从小到大有序。

然后每次合并的时候从两个队列队首选择最小值即可，这样能做到 $O(1)$。

注意要开 $long$ $long$，并且要判断有队列为空的情况。

时间复杂度 $O(n)$。
