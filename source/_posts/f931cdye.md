---
title: "【题解】P10332 [UESTCPC 2024] 一站到底"
date: 2025-04-29 15:10:34
categories:
  - "题解"
tags:
  - "P10332"
luogu_lid: "f931cdye"
luogu_category: 2
original: "https://www.luogu.com.cn/article/f931cdye"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P10332)

感觉这个没有紫吧，比较套路。

首先肯定 $1$ 是必选的，然后选完 $1$ 就是一堆散开的连通块，考虑选择这些块的顺序。

假设有连通块 $i$ 和连通块 $j$，$ans_i$ 表示选择块 $i$ 的预期得分，$p_i$ 表示选择 $i$ 能做完的概率。

那么先选 $i$ 后选 $j$ 的预期得分就是 $ans_i+p_i \times ans_j$，同理先选 $j$ 后选 $i$ 的预期得分就是 $ans_j+p_j \times ans_i$。

因此先选 $i$ 更优的充要条件就是 $ans_i+p_i \times ans_j > ans_j+p_j \times ans_i$，移项即得 $\dfrac{ans_i}{1-p_i}>\dfrac{ans_j}{1-p_j}$。

因此只需要先选 $\dfrac{ans_i}{p_i}$ 大的连通块即可，考虑用一个堆维护所有块。

初始情况除了 $1$ 以外，其余每个点都是一个单独的连通块，$ans_i=p_ia_i$。然后每次取出堆顶进行更新。

考虑更新过程，每次取出堆顶的点（设为 $i$）之后，要向上更新。但是要保证每个点只被更新一遍，所以应该更新到它父亲的连通块里最靠上的点（设为 $x$），动态加一次边即可。然后把 $ans_x$ 和 $p_x$ 的值更新即可。

拿个优先队列模拟即可，最后答案就是 $ans_1$。
