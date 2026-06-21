---
title: "【题解】P12509 【模板】通信题"
date: 2025-05-13 12:06:52
categories:
  - "题解"
tags:
  - "P12509"
luogu_lid: "smmlxvyi"
luogu_category: 2
original: "https://www.luogu.com.cn/article/smmlxvyi"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P12509)

这个 trick 还是比较常规的。

考虑到值域的限制，一般的 hash 是比较困难的。而 01 串比较两位是否相同其实只需要异或一下就可以，所以分别把两个串值为 1 的下标异或起来，记为 $x_1,x_2$，那么答案位就是 $x_1$ 和 $x_2$ 的异或值。
