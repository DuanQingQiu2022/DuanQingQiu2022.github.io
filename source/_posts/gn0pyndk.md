---
title: "【题解】P8883 幻想中成为原神"
date: 2025-02-19 00:20:17
categories:
  - "文章"
luogu_lid: "gn0pyndk"
luogu_category: 2
original: "https://www.luogu.com.cn/article/gn0pyndk"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P8883)

首先肯定是质数的平方才有意义，正着做就是枚举质因子然后大力容斥，于是显然是正难则反，考虑不能被所有质数平方整除的数。

然后分别对每一个质数 $p_i$ 计算贡献，即可得到答案是 $n\times [1-\prod\limits_{p} (1-{p_i}^{-2})]$。

然后你当然可以对它做数论分块，不过这是不可能过的，所以还需要借助一下伟大先辈的智慧。

根据欧拉乘积公式 $\sum\limits_{n=1}^{\infty}n^{-s}=\prod\limits_{p} (1-{p_i}^{-s})^{-1}$

可以得到原式 $=n-\dfrac{n}{\sum\limits_{n=1}^{\infty}n^{-2}}$

众所周知，自然数平方的倒数之和 $= \dfrac{\pi^2}{6}$，于是原式 $=n-\dfrac{6n}{\pi^2}$。
