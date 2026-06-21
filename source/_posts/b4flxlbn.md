---
title: "【题解】P4430 小猴打架"
date: 2021-10-03 21:03:45
categories:
  - "文章"
luogu_lid: "b4flxlbn"
luogu_category: 2
original: "https://www.luogu.com.cn/article/b4flxlbn"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P4430)

奇怪的结论题……

一句话题意：经过 $n-1$ 次连边之后得到一棵 $n$ 个点的无根树，求不同的连边方案数。

要解决这个问题，需要使用 Carley 公式。

Carley 公式：$n$ 个节点组成的形态不同的有标号无根树数量为 $n^{n-2}$。

于是就可以得到形态不同的无根树数量为 $n^{n-2}$。

然后由于要连边 $n-1$ 次，连边顺序没有要求，所以连边方案数为 $(n-1)!$。

根据乘法原理，方案总数就是 $(n-1)! \times n^{n-2}$。
