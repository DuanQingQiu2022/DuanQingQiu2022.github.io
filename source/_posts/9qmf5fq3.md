---
title: "【题解】CF13E Holes"
date: 2023-02-08 00:03:11
categories:
  - "文章"
luogu_lid: "9qmf5fq3"
luogu_category: 2
original: "https://www.luogu.com.cn/article/9qmf5fq3"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/CF13E)

<!-- more -->

不好维护的信息统一考虑分块，设块长为 $B$。

维护 $p_i$ 表示 $i$ 洞的弹力，$c_i$ 表示球在 $i$ 洞时，需要弹 $c_i$ 次离开当前块，$d_i$ 表示从 $i$ 洞弹出当前块落在 $d_i$ 处。

然后每次修改时需要更新整个块的 $c,d$ 值，容易知道 $i$ 的参数值只与 $i+p_i$ 有关，于是倒着递推即可保证复杂度为 $O(B)$。

查询时暴力跳所有块复杂度 $O(\dfrac{n}{B})$，取 $B=\sqrt{n}$，时间复杂度 $O(m\sqrt{n})$。
