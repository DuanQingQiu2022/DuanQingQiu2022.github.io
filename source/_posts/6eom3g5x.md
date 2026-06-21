---
title: "【题解】P3398 仓鼠找 sugar"
date: 2022-04-14 17:14:11
categories:
  - "文章"
luogu_lid: "6eom3g5x"
luogu_category: 2
original: "https://www.luogu.com.cn/article/6eom3g5x"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P3398)

题意：给两条树上路径，问这两条路径是否相交。

不妨设为路径 $(x_1,y_1)$ 和 $(x_2,y_2)$。
 
这个问题等价于一条路径的起点和终点的 LCA 是否在另一条路径上，如果两条路径的 LCA 都不满足该条件，则显然无解。

证明：

考虑只有一个交点的情况，该点必然是某条路径的 LCA。

如果有多个交点，则路径中必然有连续的一段是相互包含的，这个连续段中必然有某条路径的 LCA。

于是就证完了。

判断一个点是否在某条路径上，等价于这个点到路径两端的距离和是否等于路径长度。

然后这就都是裸的 LCA 题了。
