---
title: "【题解】CF1114（Div 2）"
date: 2022-12-02 00:18:38
categories:
  - "题解"
tags:
  - "区间DP"
  - "数论"
  - "线段树"
luogu_lid: "nsnhwf0d"
luogu_category: 2
original: "https://www.luogu.com.cn/article/nsnhwf0d"
disableNunjucks: true
---

## [CF1114A](https://www.luogu.com.cn/problem/CF1114A)

<!-- more -->

依次满足三个人的要求即可。

## [CF1114B](https://www.luogu.com.cn/problem/CF1114B)

第一遍读错题了，读成了让每一段的最小值最大，有点尴尬。

要求每一段的和最大，那只要选出最大的 $k \times m$ 个数即为答案。每段分出 $m$ 个要选的数即可。容易证明一定存在这样的划分方式。

## [CF1114C](https://www.luogu.com.cn/problem/CF1114C)

$n$ 在 $b$ 进制下末尾 $0$ 的个数就是令 $n=k\times b^p$，其中 $p$ 取得的最大值。

考虑算术基本定理，令 $b=\prod\limits_{i=1}^m p_i^{c_i}$，那么 $n!$ 中出现 $p_i$ 的数量 $s_i$ 即为 $\prod\limits_{j=1}^{\left\lfloor\log_{p_i}^n\right\rfloor} \left\lfloor\dfrac{n}{{p_i}^j}\right\rfloor$，那么答案就是 $ \dfrac{s_i}{c_i}$ 的最小值。

直接质因数分解即可。

## [CF1114D](https://www.luogu.com.cn/problem/CF1114D)

简单区间 dp。

首先把联通块缩点，然后直接设 $dp_{i,j}$ 表示从 $i$ 合并到 $j$ 的最小代价。

考虑如果 $c_i=c_j$，那么 $dp_{i,j}=dp_{i+1,j-1}+1$，如果 $c_i \neq c_j$，则有 $dp_{i,j}=\min(dp_{i+1,j},dp_{i,j-1})+1$。

直接枚举区间长度转移即可，时间复杂度 $O(n^2)$。

## [CF1114E](https://www.luogu.com.cn/problem/CF1114E)

简单题。

首先通过操作 $2$ 可以使用 $30$ 次操作找到最大值。

然后考虑剩下的 $30$ 次操作找到公差，如果对这种套路有过了解，不难想到随机询问 $30$ 个值然后作差求 $\gcd$。

设公差为 $d$，由于这些差值都形如 $kd$，那么这些数的 $\gcd$ 不等于 $d$ 的概率等于在 $[1,n]$ 里选 $m$ 个数不互质的概率，也就是这 $m$ 个数都有同一个质因数的概率，大概是 $\dfrac{1}{2^m}$ 级别。因此这个做法正确性是有保证的。

## [CF1114F](https://www.luogu.com.cn/problem/CF1114F)

注意到诡异的数据范围，$a_i \le 300$。然后又发现要求一个乘积的欧拉函数，考虑 $\varphi(n)=n\prod\limits_{i=1}^m \dfrac{p_i-1}{p_i}$，直接分解可知 $300$ 以内的质数只有 $62$ 个，恰好在一个 long long 类型能够状压的范围内，那就把这个状压状态存在线段树里打个标记维护，预处理出质数那堆的逆元之后直接线段树维护区间乘积和质因子状态就做完了。

这样由于每次询问都需要算欧拉函数，设 $k=62$，由于每次下放标记需要快速幂维护，则单次查询复杂度应该是 $O(k+\log^2 n)$ 的，所以做法应该是 2log 的。
