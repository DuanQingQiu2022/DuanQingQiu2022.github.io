---
title: "【题解】P2900 [USACO08MAR]Land Acquisition G"
date: 2022-02-25 14:40:35
categories:
  - "文章"
luogu_lid: "5iqrz7yh"
luogu_category: 2
original: "https://www.luogu.com.cn/article/5iqrz7yh"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P2900)

<!-- more -->

又是斜优 dp。

首先把土地按 $w$ 从小到大排序，然后再去掉一些 $w$ 和 $l$ 都较小的土地，最后得到的序列就是一个 $w$ 严格递减，$l$ 严格递增的序列。

设 $dp_i$ 表示前 $i$ 块土地分成若干组的最小花费。

转移方程：$dp_i=\min_{0 \le j <i}\left\{dp_{j}+w_i \times l_{j+1}\right\}$。

然后直接套斜率式 $y=kx+b$，有 $y=dp_j,k=w_i,x=l_{j+1},b=dp_i$。

对于两个决策点 $(l_{j+1},dp_j)$ 和 $(l_{k+1},dp_k),k<j$ 

若 $j$ 比 $k$ 优，有 $dp_{j}+w_i \times l_{j+1} \le dp_{k}+w_i \times l_{k+1}$ 

移项有 $\dfrac{dp_j-dp_k}{l_{k+1}-l_{j+1}} \le w_i$，然后直接维护一个斜率 $> k$ 部分的下凸壳转移即可。
