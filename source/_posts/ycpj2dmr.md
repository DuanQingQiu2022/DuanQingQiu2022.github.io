---
title: "【题解】P10701 [SNCPC2024] 致命公司"
date: 2025-05-24 14:41:54
categories:
  - "题解"
tags:
  - "P10701"
luogu_lid: "ycpj2dmr"
luogu_category: 2
original: "https://www.luogu.com.cn/article/ycpj2dmr"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P10701)

首先观察数据范围，然后答案显然是具有单调性的，不难想到二分答案。

考虑对于答案 $j$ 如何进行 check。

首先肯定应该按怪物出现时间降序考虑问题，这样在考虑前面的怪物时不会漏掉后面凝视的时间。

然后对于怪物，计算需要对它用多少次凝视。这需要对于每个出怪口，记录其被凝视的次数并纳入考虑。如果剩余时间不够就说明答案非法。

$-1$ 的情况就是所有怪出现在一个出怪口。特判即可。

注意二分边界要开大，右边界开 $10^{18}$ 是不够的。
