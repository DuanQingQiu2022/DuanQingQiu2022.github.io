---
title: "【笔记】合作博弈中的 Core 与 Shapley Value"
date: 2025-12-24 19:25:24
categories:
  - "笔记"
luogu_lid: "i9lbf1sz"
luogu_category: 4
original: "https://www.luogu.com.cn/article/i9lbf1sz"
disableNunjucks: true
---

TU-game（Transferable Utility Game） 指具有可转移效用的合作博弈。效用可转移即联盟获得的收益可以在联盟内部成员间自由分配。

<!-- more -->

玩家集合 $N$，特征函数 $v(S)$ 表示玩家集合 $S$ 的总收益。通常地，规定 $v(\varnothing)=0$。

## Core（核心）

如果某一种分配方案 $x=(x_1,\dots,x_n)$ 满足 $\sum\limits_{i=1}^nx_i=v(N)$，且 $\sum\limits_{i \in S}x_i \ge v(S)$，则称这个方案是合作博弈的一个核心。

可以看出，一个方案是核心需要把所有的钱分完，并且任何子集 $S$  中的所有人分到的总钱数必须不少于小团体出去自己单干获得的钱数。

比如 $N=\left\{1,2,3 \right\},v(1)=v(2)=v(3)=0,v(12)=v(13)=v(23)=50,v(123)=60$。

那么 $x_1=20,x_2=20,x_3=20$ 就不是 Core 划分，因为对于 $S=\left\{1,2\right\}$，$x_1+x_2 < v(12)$，所以 12 完全可以抛下 3 两个人组队，这就不是一个核心分配。（事实上，这个博弈的核心为空集）

核心分配主要侧重于团队核心，要给核心多分钱，混子少分钱，防止核心跳槽单干（脱离大团体成立小团体）。

核心可能有多个，也可能是空的。

## Shapley Value

对于每个玩家，其 Shapley Value 就是他能对团队带来的平均增量贡献。

具体地，对于某个集合 $S$，它对玩家 $i$ 的 Shapley Value 贡献为 $v(\left\{S \cup i \right\})-v(S)$。

设集合 $S$ 的大小为 $|S|$，假设分到 $|S|=0,1,\dots,n-1$ 的概率是均等的，都是 $\dfrac{1}{n}$，那么玩家 $i$ 的 Shapley Value 值即为 $\phi(i)=\dfrac{1}{n}\sum\limits_{k=0}^{n-1}\dfrac{1}{\binom{n-1}{k}}\sum\limits_{|S|=k}[v(\left\{S \cup i \right\})-v(S)]$。

::::info[为什么概率是均等的]
考虑 $n$ 个玩家排成一列，每个玩家排在第 $1,2,\dots n$ 的位置概率均为 $\dfrac{1}{n}$，因此前面的人数为 $0,1,\dots,n-1$ 的概率均为 $\dfrac{1}{n}$。
::::

可以看出，$\sum\limits_{i=1}^n\phi(i)=v(N)$。
