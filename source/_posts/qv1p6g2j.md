---
title: "【题解】CF1593C Save More Mice"
date: 2021-11-16 12:36:35
categories:
  - "题解"
tags:
  - "贪心"
  - "排序"
luogu_lid: "qv1p6g2j"
luogu_category: 2
original: "https://www.luogu.com.cn/article/qv1p6g2j"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/CF1593C)

<!-- more -->

记录弱智错误系列。

考虑猫和老鼠都是每回合走一步，所以相当于相对静止，于是问题转化为猫走 $n$ 步时有多少只老鼠能走进洞口。

于是统计每只老鼠离洞口的距离，每次贪心送走距离最近的即可。

但是要注意特判所有老鼠都能进洞的情况，输出 $k$。不特判的话会 WA on pretest 2。
