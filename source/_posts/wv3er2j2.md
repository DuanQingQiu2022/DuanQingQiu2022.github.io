---
title: "【笔记】Gauss 求积法"
date: 2025-12-24 13:12:13
categories:
  - "文章"
luogu_lid: "wv3er2j2"
luogu_category: 4
original: "https://www.luogu.com.cn/article/wv3er2j2"
disableNunjucks: true
---

不同于辛普森法和 Romberg 求积法，Gauss 求积法不再追求将区间等分，而是选取某些特定的节点并给它们赋权重，使得这种求积法能够对于更高次多项式成立，即代数精度更高，这是 Gauss 求积法最显著的优势。

::::info[代数精度]
对于某种求积公式来说，如果它对不高于 $m$ 次的多项式都准确成立，但对至少一个 $m+1$ 次多项式存在误差，则称其具有 $m$ 次代数精度。
::::

对于 $n$ 个点的 Gauss 求积法，其代数精度达到 $2n-1$ 次。如辛普森公式取区间两个端点及中点计算，其代数精度为 $3$ 次。

高斯求积法的标准公式如下：



$$
\int_{-1}^1f(t)\text{d}t \approx \sum\limits_{k=1}^n A_kf(t_k)
$$



其中 $t_k$ 是 $n$ 次勒让德多项式 $P(n)$ 的零点，$A_k$ 为节点 $t_k$ 的权重。

具体地，对于不同的 $n$，先求出 $t_1,\dots,t_n$，然后根据其对于标准公式中的 $f(t)=1,f(t)=t,\dots,f(t)=t^{n-1}$ 精确成立，联立求解即可求出 $A_1,\dots,A_n$。

一般地，对于积分区间 $[a,b]$，可以作变换 $x=\dfrac{b-a}{2}t+\dfrac{b+a}{2}$，则标准公式变为



$$
\int_{a}^bf(x)\text{d}x =\dfrac{b-a}{2}\int_{-1}^1f(\dfrac{b-a}{2}t+\dfrac{b+a}{2})\text{d}t
$$



### 例题

用三点 Gauss 公式计算积分 $\displaystyle{\int_{1}^3 \dfrac{1}{y} \text{d}y}$，并和准确值比较，指出该三点 Gauss 公式计算结果的有效位数。

### 解答
首先积分的精确值是 $\ln 3 \approx 1.098612$。

积分区间 $[1,3]$，作变换 $y=t+2$ 变换为标准区间 $[-1,1]$。

于是有 $\displaystyle{\int_{1}^3 \dfrac{1}{y} \text{d}y=\int_{-1}^1 \dfrac{1}{t+2} \text{d}t}=\sum\limits_{k=1}^3\dfrac{A_k}{t_k+2}$
$n=3$。

勒让德多项式 $P_3(x)=\dfrac{1}{2}(5x^3-3x)$，零点为 $t_1=-\sqrt{\dfrac{3}{5}},t_2=0,t_3=\sqrt{\dfrac{3}{5}}$。

令 $f(t)=1$，则 $\displaystyle{\int_{-1}^1 \text{d}t}=2$，即  $\sum\limits_{k=1}^3A_k=2$；

令 $f(t)=t$，则 $\displaystyle{\int_{-1}^1 t\text{d}t}=0$，即  $\sum\limits_{k=1}^3A_kt_k=0$；

令 $f(t)=t^2$，则 $\displaystyle{\int_{-1}^1 t^2\text{d}t}=\dfrac{2}{3}$，即  $\sum\limits_{k=1}^3A_kt_k^2=\dfrac{2}{3}$；

解得 $A_1=\dfrac{5}{9},A_2=\dfrac{8}{9},A_3=\dfrac{5}{9}$。

代入 $\sum\limits_{k=1}^3\dfrac{A_k}{t_k+2}$，原积分 $\approx \dfrac{5}{9(2-\sqrt{\frac{3}{5}})}+\dfrac{4}{9}+\dfrac{5}{9(2+\sqrt{\frac{3}{5}})}=\dfrac{56}{51} \approx 1.098039$。

误差值 $\approx |1.098612-1.098039|=0.000573$ 介于 $0.5 \times 10^{-2}$ 和  $0.5 \times 10^{-3}$ 之间，因此精确到两位小数，所求近似值的有效位数为 $3$ 位。
