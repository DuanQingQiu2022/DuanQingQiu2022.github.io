---
title: "【题解】P1417 烹调方案"
date: 2022-04-05 16:45:48
categories:
  - "题解"
tags:
  - "背包"
  - "贪心"
luogu_lid: "xyizdzb7"
luogu_category: 2
original: "https://www.luogu.com.cn/article/xyizdzb7"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1417)

<!-- more -->

一眼 01 背包。

但是发现制作时间会对答案产生影响。

考虑贪心地排序。

设当前时刻为 $t$，则先做物品 $i$ 再做物品 $j$ 的贡献为 $a_i-(t+c_i)b_i+a_j-(t+c_i+c_j)b_j$，先做物品 $j$ 再做物品 $i$ 的贡献为 $a_j-(t+c_j)b_j+a_i-(t+c_j+c_i)b_i$。

然后比较一下就能推出优先级，排序做 01 背包即可。

时间复杂度 $O(tn)$。
