---
title: "【题解】P8255 [NOI Online 2022 普及组] 数学游戏"
date: 2022-03-29 21:10:49
categories:
  - "题解"
luogu_lid: "bytoerag"
luogu_category: 2
original: "https://www.luogu.com.cn/article/bytoerag"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P8255)

<!-- more -->

萌萌题不配蓝吧……

题意：给定正整数 $x,z$，求满足 $z=x \times y \times \gcd(x,y)$ 的最小正整数 $y$。

首先套路性拆一波式子，设 $d=\gcd(x,y),x=md,y=nd$

显然有 $\gcd(m,n)=1$。

然后代入可以得到 $z=mnd^3=x \times nd^2$

发现 $d$ 存在则 $y$ 必然存在，$d$ 不存在则 $y$ 也不存在，所以直接找最小的 $d$ 即可。

单独处理 $d$ 不好处理，考虑整体换元。

由于 $\gcd(m^2,n)=1$，显然有 $d^2=\gcd(m^2d^2,nd^2)=\gcd(x^2,\dfrac{z}{x})$

所以 $d=\sqrt{\gcd(x^2,\dfrac{z}{x})}$，直接代入求 $y$ 值即可。
