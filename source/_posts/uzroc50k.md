---
title: "【题解】P2261 [CQOI2007]余数求和"
date: 2022-04-13 23:37:56
categories:
  - "题解"
tags:
  - "数论"
  - "分块"
luogu_lid: "uzroc50k"
luogu_category: 2
original: "https://www.luogu.com.cn/article/uzroc50k"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P2261)

<!-- more -->

首先拆式子可以得到原式等价于 $nk-\sum\limits_{i=1}^n \left\lfloor\dfrac{k}{i}\right\rfloor\times i$

猜测 $k \bmod i$ 的取值不会太多，可以分段做。

事实上就是除法分块的应用。

考虑如果当前一段的段首是 $i$，那么这一段的段尾就是 $\left\lfloor\dfrac{k}{\left\lfloor\dfrac{k}{i}\right\rfloor}\right\rfloor$。

证明直观：如果 $k \bmod i=0$ 显然可得，如果 $k \bmod i \ne 0$，则只需找到 $k$ 的下一个因子即可。

然后对于 $i \ge k$ 的部分直接特判一下即可。

复杂度 $O(\sqrt{n})$。
