---
title: "【题解】P1925 最大划分乘积"
date: 2025-12-26 21:27:55
categories:
  - "题解"
tags:
  - "P1925"
luogu_lid: "vcbyqv64"
luogu_category: 2
original: "https://www.luogu.com.cn/article/vcbyqv64"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1925)

<!-- more -->

感觉没什么技术力的题。

定义函数 $f(k)=\left(\dfrac{n}{k}\right)^k$，其中 $k$ 为正整数。

题目中的 $M(n)$ 即为对于常数 $n$ 来说函数 $f(k)$ 的最大值。

对 $f(k)$ 取对数后求导，容易看出在 $k=\dfrac{n}{e}$ 的时候取最大值。比较一下下取整和上取整时的函数值大小即可确定 $k$ 的值。（可以两边取对数比较）

然后判断 $\left(\dfrac{n}{k}\right)^k$ 是不是有限小数，就相当于判断 $\dfrac{n}{k}$ 是不是有限小数。

把 $\dfrac{n}{k}$ 化成最简分数，然后判断 $k$ 的质因子是否只有 2 和 5 即可。

::::info[判断有限小数的方法]
对于最简分数 $\dfrac{p}{q}$，在十进制下能化成有限小数当且仅当它能化成 $\dfrac{A}{10^k}$ 的形式，这要求分母 $q$ 只能含有质因子 2 和 5。
::::
