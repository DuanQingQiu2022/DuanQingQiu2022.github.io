---
title: "【题解】CF2196B Another Problem about Beautiful Pairs"
date: 2026-02-12 09:10:04
categories:
  - "题解"
tags:
  - "分块"
luogu_lid: "prbupw7w"
luogu_category: 2
original: "https://www.luogu.com.cn/article/prbupw7w"
disableNunjucks: true
---

一眼根号分治。

<!-- more -->

$a_ia_j=j-i$ 显然意味着 $a_i$ 和 $a_j$ 中至少有一个 $\le \sqrt{n}$。

考虑若 $a_i \le \sqrt{n}$，令 $a_i=x$，则有 $i=j-xa_j$，枚举 $x,j$ 进行判断即可。

同理若 $a_j \le \sqrt{n}$ 且 $a_i>\sqrt{n}$，令 $a_j=x$，则有 $j=i+xa_i$，枚举 $x,i$ 进行判断即可。

时间复杂度 $O(n\sqrt{n})$。
