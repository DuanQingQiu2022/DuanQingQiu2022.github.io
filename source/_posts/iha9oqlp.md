---
title: "【题解】P16807 [蓝桥杯 2026 国 Python A] 桌游足球"
date: 2026-06-09 00:49:13
categories:
  - "题解"
tags:
  - "P16807"
luogu_lid: "iha9oqlp"
luogu_category: 2
original: "https://www.luogu.com.cn/article/iha9oqlp"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P16807)

组合意义天地灭，代数推导保平安。

首先如果没有限制那答案肯定是 $\dbinom{n+m}{m}$。正难则反，考虑统计不合法的方案数。

考虑当小蓝打了 $k$ 个球，小桥打了 $k+1$ 个球时，后面随便填都是不合法的。然后这个状态必然是前面符合限制地打了 $2k$ 个球，最后一个球小桥进的，所以前面的部分就是卡特兰数 $\dfrac{1}{k+1}\dbinom{2k}{k}$。

于是全部不合法的方案数就是 $\sum\limits_{k=0}^{m-1} \dfrac{1}{k+1}\dbinom{2k}{k}\dbinom{n+m-2k-1}{n-k}$

考虑 Rothe-Hagen 恒等式：



$$
\sum\limits_{k=0}^n \dfrac{x}{x+kz} \dbinom{x+kz}{k} \dfrac{y}{y+(n-k)z} \dbinom{y+(n-k)z}{n-k} = \dfrac{x+y}{x+y+nz} \dbinom{x+y+nz}{n}
$$



这个看起来分式有点多，考虑它的另一个变体：



$$
\sum\limits_{k=0}^n \dfrac{x}{x+kz} \dbinom{x+kz}{k} \dbinom{y-kz}{n-k} = \dbinom{x+y}{n}
$$

 ①

尝试凑式子，可以把卡特兰数写成 $\dfrac{1}{k+1}\dbinom{2k}{k}=\dfrac{1}{2k+1}\dbinom{2k+1}{k}$。

又 $\dbinom{n+m-2k-1}{n-k}=\dbinom{n+m-2k-1}{m-1-k}$，

于是原式等于 $\sum\limits_{k=0}^{m-1} \dfrac{1}{2k+1}\dbinom{2k+1}{k}\dbinom{n+m-2k-1}{m-1-k}$

根据 ① 式可以直接得到上面式子等于 $\dbinom{n+m}{m-1}$。

因此合法方案数即为 $\dbinom{n+m}{m}-\dbinom{n+m}{m-1}$。
