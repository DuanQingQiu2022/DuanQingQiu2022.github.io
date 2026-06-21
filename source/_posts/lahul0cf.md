---
title: "【题解】B4394 [常州市赛 2025] 公约数与公倍数"
date: 2025-09-07 02:58:49
categories:
  - "题解"
tags:
  - "B4394"
luogu_lid: "lahul0cf"
luogu_category: 2
original: "https://www.luogu.com.cn/article/lahul0cf"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/B4394)

[P11036](https://www.luogu.com.cn/problem/P11036) 的加强版，挺有趣的。

首先看 P11036 怎么做。第一感肯定是令 $b=1$，然后得到 $a=\operatorname{lcm}(c,d)-c-d$。然后考虑令 $c=2$ 且 $d$ 为奇数，就得到 $d=a+2$，这样 $a$ 为奇数时的通解就是 $(1,2,a+2)$。

考虑 $a$ 为偶数的情况，那就相当于 $a'=2^k \times a$，然后上面那个构造同时乘以 $2^k$ 也是成立的，所以 $b=2^k,c=2^{k+1},d=2^k(a+2)$ 即为一组通解。

注意到 $a \le 10^9$，所以 $k \le 29$，那么最大的 $d$ 要么是 $3 \times 2^{29}$，要么是 $5 \times  2^{28}$，可以通过 P11036。

考虑对于本题的限制怎么做。直观的想法是要放宽 $b$ 的限制，因为 $b=1$ 意味着 $c,d$ 中有一个很可能会很大。

把原式移项就得到 $a+b-\gcd(a,b)=\operatorname{lcm}(c,d)-c-d$。左边的值只跟 $b$ 有关不妨记作 $f(b)$，那么对于 $f(b)=\operatorname{lcm}(c,d)-c-d$，可以注意到一组通解 $f(b)=5k,c=3k,d=4k$。

也就是说需要寻找 $b$ 的值使得 $f(b) \equiv 0(\bmod$ $ 5)$。

考虑 $a=5k+r$，对 $r$ 进行分类讨论。

$r=0$ 时 $b=1$ 即可，$r=1$ 时 $b=5$ 即可，这两种情况是平凡的。

对于 $r=2,3,4$ 的情况，枚举 $a \in [1,10^9],a \in \mathbb{N}^+$ 打表可知：

$r=2$ 时，$b$ 的所有可能取值为 $4,9,10$。

$r=3$ 时，$b$ 的所有可能取值为 $3,4,8,13,14,15$。

$r=4$ 时，$b$ 的所有可能取值为 $2,7,8,9,17,18,20$。

因此，对于任意 $a \le 10^9$，只需暴力枚举 $b \le 20$ 即可求出符合题目要求的解。这样构造出的解满足 $\max(b,c,d) \le \frac{4}{5}(a+20)$，可以通过本题。
