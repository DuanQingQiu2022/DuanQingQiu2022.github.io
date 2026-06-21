---
title: "【题解】P1396 营救"
date: 2022-02-20 23:35:01
categories:
  - "文章"
luogu_lid: "wglsvlbd"
luogu_category: 2
original: "https://www.luogu.com.cn/article/wglsvlbd"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1396)

傻逼题。

把边按权值排序，然后连边最小生成树，当 $s$ 和 $t$ 联通时的那条边的权值即为答案。

原理显然，$s$ 和 $t$ 联通时说明已经找到了从 $s$ 到 $t$ 的路径，此时的边权必然是路径中最大的，并且不可能存在更小的路径。
