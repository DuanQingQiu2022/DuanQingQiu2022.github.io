---
title: "【题解】P11397 界分数"
date: 2024-12-14 22:30:47
categories:
  - "题解"
tags:
  - "P11397"
luogu_lid: "f08jnocq"
luogu_category: 2
original: "https://www.luogu.com.cn/article/f08jnocq"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P11397)

<!-- more -->

忘记今天有 djy 老师的比赛了，写一下这题致敬[万人血书](https://www.luogu.com.cn/problem/P8319)。

首先肯定先用一次操作 1，然后拆开来看，如果 $n$ 是奇数那就一次操作 2，如果 $n$ 是偶数就一次操作 1，最后肯定都能化归到偶数情况。

偶数情况每用一次操作 1 都会使问题规模减半，然后继续根据奇偶性重复以上操作即可。

感性理解正确性非常显然，因为对于分母为奇数的情况假如你不变偶数那问题规模下降得会很慢。归纳一下就可以证明。当然严格证明是比较困难的。

考虑先求单个答案，对于 $n=1$ 显然是 $1$。归纳一下不难看出对于 $n \geq 1$ 的情况，答案是 $\lfloor \log_{2}(n-1) \rfloor+2$。

题目要求对所有 $1 \sim n$ 的情况求和，于是可以得到答案是 $\sum\limits_{i=1}^{n-1} \lfloor \log_{2}i \rfloor+2n-1$。 直接按 2 的幂次分段求和即可，复杂度 $O(\log n)$。

注意求和的时候别爆 long long 了。
