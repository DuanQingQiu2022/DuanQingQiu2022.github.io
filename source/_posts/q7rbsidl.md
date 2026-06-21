---
title: "【题解】AT320 Cards"
date: 2022-05-21 15:44:00
categories:
  - "题解"
tags:
  - "概率与期望"
  - "数学"
luogu_lid: "q7rbsidl"
luogu_category: 2
original: "https://www.luogu.com.cn/article/q7rbsidl"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/AT320)

<!-- more -->

考虑每次翻两张正面朝上的卡片，翻一张背面朝上的卡片，一轮操作之后相当于将一张正面朝上的卡片翻到背面。

所以一共会进行 $n-1$ 轮操作。

显然每张卡片期望被翻一次，所以相当于从 $n$ 个数里选出 $n-1$ 个数的期望值，答案就是 $\dfrac{n-1}{n} \times \sum\limits_{i=1}^na_i$。
