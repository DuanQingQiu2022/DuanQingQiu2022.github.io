---
title: "【题解】P4281 [AHOI2008]紧急集合 / 聚会"
date: 2022-04-11 22:47:52
categories:
  - "文章"
luogu_lid: "myaw8r0n"
luogu_category: 2
original: "https://www.luogu.com.cn/article/myaw8r0n"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P4281)

<!-- more -->

首先集合点肯定是某两个点的 LCA，证明显然。

因为从 LCA 向外移动，必然靠近一个点而远离两个点，这样距离肯定不会减少，所以得证。

然后这个东西其实有一些结论，比如必然有两个 LCA 是重合的。

但是无所谓，直接暴力两两求 LCA 再算距离也是可以的。

时间复杂度 $O(m \log n)$。
