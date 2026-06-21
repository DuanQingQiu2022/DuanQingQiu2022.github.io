---
title: "【题解】P8819 [CSP-S 2022] 星战"
date: 2022-11-12 18:27:40
categories:
  - "题解"
luogu_lid: "bte5jn6k"
luogu_category: 2
original: "https://www.luogu.com.cn/article/bte5jn6k"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P8819)

<!-- more -->

注意到条件一被包含在条件二中，也就是需要满足每个点的出度都为 $1$。

但是发现题目中所给的四个操作，只能做到 $O(1)$ 维护入度。

考虑转化，由于入度和等于出度和，所以图中入度和为 $n$。

但是维护入度和为 $n$ 并不能代表每个点出度和都是 $1$。

考虑给每个点赋一个随机权值，并且使得所有点权值和为 $0$。如果能够维护每个点的出度和点权的乘积，那么如果入度和为 $n$ 且所有点的乘积之和等于 $0$，就可以认为每个点出度恰好都为 $1$，正确性[不难看出](https://www.luogu.com.cn/blog/DreamNOI2022/post-ti-xie-p4065-jxoi2017-yan-se)。

那么维护这个乘积，显然应该分开维护，对于每个点记录所有它的入边连接的点的点权之和即可。

时间复杂度线性。
