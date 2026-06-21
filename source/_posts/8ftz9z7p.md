---
title: "【题解】P3254 圆桌问题"
date: 2022-06-09 15:47:53
categories:
  - "文章"
luogu_lid: "8ftz9z7p"
luogu_category: 2
original: "https://www.luogu.com.cn/article/8ftz9z7p"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P3254)

<!-- more -->

这题的关键性质就是每个单位在每个桌子上最多坐一个人。

所以相当于把第 $i$ 个单位匹配 $r_i$ 张桌子，求这样的匹配方案。

这就相当于每个单位和每个桌子都是一个点，然后从源点到第 $i$ 个单位的边容量为 $r_i$，每个单位到每个桌子的流量为 $1$，第 $i$ 张桌子到汇点的边容量为 $c_i$。

直接求最大流，如果最大流等于所有单位总人数则有解，暴力枚举所有边统计输出即可。
