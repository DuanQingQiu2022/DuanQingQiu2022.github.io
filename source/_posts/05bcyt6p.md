---
title: "【题解】P1194 买礼物"
date: 2022-03-06 23:07:25
categories:
  - "文章"
luogu_lid: "05bcyt6p"
luogu_category: 2
original: "https://www.luogu.com.cn/article/05bcyt6p"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1194)

<!-- more -->

这个题比较脑筋急转弯。

显然 $i,j$ 间边权为 $k_{i,j}$，问题在于如何处理点权。

稍微思考一下就能想到，从 $0$ 号点出发向每个点连一条长度为 $a$ 的边，然后跑最小生成树即可。

注意 $k_{i,j}=0$ 的时候，$i,j$ 间没有边连接。
