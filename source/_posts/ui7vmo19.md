---
title: "【题解】CF2196A Game with a Fraction"
date: 2026-02-12 09:00:29
categories:
  - "文章"
luogu_lid: "ui7vmo19"
luogu_category: 2
original: "https://www.luogu.com.cn/article/ui7vmo19"
disableNunjucks: true
---

考虑构造 $f(p,q)=3p-2q$，Bob 的目标是使得 $f(p,q)=0$。

显然当初始状态 $f(p,q)>0$ 时，Alice 每次只会动 $q$，Bob 每次只会动 $p$。每轮操作结束后 $f$ 值减小 $1$，于是 Bob 想赢意味着两个人至少要能动 $3p-2q$ 轮。

容易看出其余的情况都是 Alice 必胜的局面。
