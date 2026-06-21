---
title: "【笔记】整数裂项公式与平方和公式"
date: 2021-02-26 18:15:28
categories:
  - "文章"
luogu_lid: "tjbv5bcq"
luogu_category: 1
original: "https://www.luogu.com.cn/article/tjbv5bcq"
disableNunjucks: true
---

#### 整数裂项公式：
$\sum\limits_{i=1}^ni(i+1)= \dfrac{n(n+1)(n+2)}{3}$

#### 证明：

$∵i(i+1)=\dfrac{i(i+1)(i+2)-i(i+1)(i-1)}{3}$

$∴i(i+1)+(i+1)(i+2)$

$=\dfrac{i(i+1)(i+2)-i(i+1)(i-1)}{3}+\dfrac{(i+1)(i+2)(i+3)-i(i+1)(i+2))}{3}$

$=\dfrac{(i+1)(i+2)(i+3)-i(i+1)(i-1)}{3}$

$∴\sum\limits_{i=1}^ni(i+1)=\dfrac{n(n+1)(n+2)}{3}-\dfrac{1×2×0}{3}=\dfrac{n(n+1)(n+2)}{3}$



#### 平方和公式：

$\sum\limits_{i=1}^ni^2=\dfrac{n(n+1)(2n+1)}{6}$

#### 证明：

$\sum\limits_{i=1}^ni^2$

$=\sum\limits_{i=1}^ni(i+1)-\sum\limits_{i=1}^ni$

$=\dfrac{n(n+1)(n+2)}{3}-\dfrac{n(n+1)}{2}$

$=\dfrac{n(n+1)(2n+1)}{6}$

#### 平方和公式的另一证明：

根据伸缩级数一般公式 $\sum\limits_{i=a}^b[f(i)-f(i-1)]=f(b)-f(a-1)$

$∴n^3=\sum\limits_{i=1}^n[i^3-(i-1)^3]$

$=\sum\limits_{i=1}^n(3i^2-3i+1)$

$=3\sum\limits_{i=1}^ni^2-3\sum\limits_{i=1}^ni+\sum\limits_{i=1}^n1$

$=3\sum\limits_{i=1}^ni^2-\dfrac{3n(n+1)}{2}+n$

$=3\sum\limits_{i=1}^ni^2-\dfrac{3n^2+n}{2}$

$∴3\sum\limits_{i=1}^ni^2=n^3+\dfrac{3n^2+n}{2}$

$\sum\limits_{i=1}^ni^2=\dfrac{2n^3+3n^2+n}{6}=\dfrac{n(n+1)(2n+1)}{6}$
