---
title: "【题解】CF1642A Hard Way"
date: 2022-02-26 20:54:32
categories:
  - "题解"
tags:
  - "计算几何"
  - "模拟"
luogu_lid: "esloxgon"
luogu_category: 2
original: "https://www.luogu.com.cn/article/esloxgon"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/CF1642A)

<!-- more -->

题意：给一个三角形的三个顶点，问所有不能从 $x$ 轴上连一条直线到达的点组成的线段的长度。

显然这样的线段必定平行于 $x$ 轴，且另外一个顶点必然在这条平行线下方。

所以直接判断一下是否有两个点的纵坐标相等，并且第三个点的纵坐标比这两个点小即可。

时间复杂度 $O(t)$。
