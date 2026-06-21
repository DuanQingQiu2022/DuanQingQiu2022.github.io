---
title: "【题解】P9691 [GDCPC 2023] Base Station Construction"
date: 2025-04-06 04:03:47
categories:
  - "题解"
tags:
  - "P9691"
luogu_lid: "5hho4fv8"
luogu_category: 2
original: "https://www.luogu.com.cn/article/5hho4fv8"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P9691)

<!-- more -->

比较套路。

首先观察数据范围一眼 dp。

考虑 $dp_i$ 表示选第 $i$ 个时前 $i$ 个点的最小成本。于是有 $dp_i=\min_{j<i}{dp_j+a_i}$。

然后为了让转移合法，即从 $j$ 转移到 $i$ 时，$(j,i)$ 内没有不满足的约束，需要对每个 $i$ 记录一个 $p_i$ 表示选择 $i$ 时至少应该必选 $\ge p_i$ 的一个点。

于是每次枚举 $[p_i,i)$ 中的点转移到 $i$ 即可。然后这东西就是维护一个区间最小值，单调队列优化即可做到线性。

最终答案可以创建一个虚点 $n+1$，令 $a_{n+1}=0$，$dp_{n+1}$ 即为答案。

时间复杂度 $O(n)$。
