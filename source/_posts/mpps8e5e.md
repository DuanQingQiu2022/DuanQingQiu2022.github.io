---
title: "【题解】CF757B Bash's Big Day"
date: 2021-10-28 13:52:23
categories:
  - "文章"
luogu_lid: "mpps8e5e"
luogu_category: 2
original: "https://www.luogu.com.cn/article/mpps8e5e"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/CF757B)

CF 的 hack 数据千奇百怪……

显然直接枚举是 $O(n^2)$ 的，考虑优化。

假设最后选取了 $m$ 个数，那么这 $m$ 个数的 $\gcd$ 必然大于 $1$。不妨设这个 $\gcd$ 的值为 $k$，那么只需要枚举 $k$ 即可。

考虑 $\gcd$ 的定义，$k$ 必然是 $a_1,a_2...a_n$ 所有数的因数中除 $1$ 以外出现次数最多的那一个。那么直接 $O(n\sqrt n)$ 处理出所有数的因数，统计出现次数最多的那个因数，那么这个出现次数即为答案。

但是如果 $n$ 个数都是 $1$，此时答案为 $1$，特判一下即可。

时间复杂度 $O(n \sqrt n)$。
