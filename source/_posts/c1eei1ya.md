---
title: "【题解】CF468B Two Sets"
date: 2023-02-18 22:51:14
categories:
  - "题解"
luogu_lid: "c1eei1ya"
luogu_category: 2
original: "https://www.luogu.com.cn/article/c1eei1ya"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/CF468B)

<!-- more -->

脑筋急转弯。

显然矛盾点只出现在 $a-x$ 和 $b-x$ 同时出现的情况下。

假定 $x$ 和 $a-x$ 在 $A$ 集合中，注意到数字各不相同，所以 $b-x$ 不可能在 $B$ 集合中，因此它也在 $A$ 集合中。

因此，$x,a-x,b-x$ 必然都在同一个集合中，用并查集存一下，最后判断是否有冲突即可。
