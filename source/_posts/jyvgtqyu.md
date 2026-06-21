---
title: "【题解】P7113 [NOIP2020] 排水系统"
date: 2022-03-04 23:22:59
categories:
  - "文章"
luogu_lid: "jyvgtqyu"
luogu_category: 2
original: "https://www.luogu.com.cn/article/jyvgtqyu"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P7113)

恶心题。

管道是 DAG，所以可以记录一下每个点的入度 $ind_i$ 和出度 $out_i$，然后直接按拓扑序枚举即可。

设每个点的水流为 $\dfrac{s1_i}{s2_i}$，然后下放的时候下放 $\dfrac{s1_i}{s2_i \times out_i}$。

注意分数相加的时候分母要通分成 lcm。

直接分母爆乘 60pts，预处理 gcd 70pts，分母通分成 lcm 90pts，开 int128 100pts。

出题人 nmsl。
