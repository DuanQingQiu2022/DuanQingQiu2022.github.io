---
title: "【题解】P3750 [六省联考 2017] 分手是祝愿"
date: 2022-08-07 00:04:16
categories:
  - "题解"
tags:
  - "概率与期望"
  - "递推"
  - "数论"
luogu_lid: "ft8pk4fq"
luogu_category: 2
original: "https://www.luogu.com.cn/article/ft8pk4fq"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P3750)

<!-- more -->

神题，我只会贺题解。

首先考虑每个按键都有其独特性，即它不可能被别的按键所替代，因为总会有一个最大的键不能被组合出来，所以如果按错键了就必须再把它按回去，没有其他方法。

然后这样对于每个需要按的键都得按一遍，于是就可以递推，设 $dp_i$ 表示从需要按 $i$ 个键到需要按 $i-1$ 个键的操作次数。

然后转移就是 $dp_i=\dfrac{i}{n}+\dfrac{n-i}{n}\times(dp_{i+1}+dp_i+1)$

意义显然，有 $\dfrac{i}{n}$ 的概率按对键，剩下按错键了就需要 $dp_{i+1}$ 次按回来再加上 $dp_i$ 和当前多按的这一次。

化简一下，有 $dp_i=\dfrac{(n-i)dp_{i+1}+n}{i}$，这个就可以直接倒序转移了。

边界 $dp_{n+1}=0$。

然后考虑计算最少需要按多少键，这个显然当前亮的都需要按一遍，倒序枚举因数模拟一下即可。

设最少需要按 $cnt$ 个键，若 $cnt \le k$ 显然答案是 $cnt$。

若 $cnt>k$ 答案就是 $k+\sum\limits_{i=k+1}^{cnt}dp_i$。

然后乘上 $n!$ 即可。
