---
title: "【笔记】Romberg 求积法"
date: 2025-12-20 16:10:52
categories:
  - "文章"
luogu_lid: "rzpe36md"
luogu_category: 4
original: "https://www.luogu.com.cn/article/rzpe36md"
disableNunjucks: true
---

Romberg 求积法是另一个求积分近似值的方法。

<!-- more -->

考虑复化梯形公式（其中 $h=\dfrac{b-a}{n}$）

$$
\displaystyle{\int_a^bf(x)\mathrm{d}x} \approx h[\dfrac{f(a)}{2}+f(a+h)+f(a+2h)+\cdots+f(b-h)+\dfrac{f(b)}{2}]
$$

记上面式子右边为 $T(h)$，真实积分值为 $I$，则 $I=T(h)+c_1h^2+c_2h^4+\cdots$，其中 $c_1,\dots,c_n$ 为与 $h$ 无关、依赖于函数 $f(x)$ 导数的系数。

可以看出误差项都是 $h$ 的偶数次幂。

不妨记 $I \approx T(h)+c_1h^2$，又 $I \approx T(\dfrac{h}{2})+c_1\dfrac{h^2}{4}$，故联立有 $I \approx \dfrac{4T(\dfrac{h}{2})-T(h)
}{3}$。

实际上上式展开就能得到辛普森公式。利用两个 $O(h^2)$ 级别的误差项联立可以得到 $O(h^4)$ 级别的误差项，以此类推继续联立两个 $O(h^4)$ 级别的误差项可以得到 $O(h^6)$ 级别的误差项，这就是 Romberg 求积法的基本思路。

::::info[为什么是辛普森公式]
我们设定积分区间为 $[a, b]$，中点为 $c = \dfrac{a+b}{2}$，段长 $h = \dfrac{b-a}{2^k}$。

$ F_{0,0}=\dfrac{(b-a)}{2}[f(a)+f(b)]$

$F_{1,0}=\dfrac{b-a}{4} [f(a) + 2f(c)+f(b)]$

$ F_{1,1} = \dfrac{4 F_{1,0} - F_{0,0}}{3} =\dfrac{b-a}{6} [f(a) + 4f(c) + f(b)]$

可以看出这就是辛普森公式
$\displaystyle{\int_{l}^{r}f(x) \text{d}x=\dfrac{r-l}{6}[f(l)+f(r)+4f(\frac{l+r}{2})]}$ 的形式。
::::

进一步地，设 $F_{k,m}$ 表示将区间 $[a,b]$ 分成 $2^k$ 份，联立 $m$ 次所得到的值。可以看出，$F_{k,0}$ 就是将区间分成 $2^k$ 份时的复化梯形公式值 $T(\dfrac{b-a}{2^k})$。

事实上，我们有如下递推式可以快速计算 $F_{k,0}$ 的值：

$$
F_{k,0}=\dfrac{1}{2}F_{k-1,0}+\dfrac{b-a}{2^k} \sum\limits_{i=1}^{2^{k-1}} f[a+(2i-1)\dfrac{b-a}{2^k}]
$$

根据上述思路，可以递推得到 $F_{k,m}=F_{k,m-1}+\dfrac{F_{k,m-1}-F_{k-1,m-1}}{4^m-1}$。

时间复杂度 $O(2^k)$，误差级别为 $O(h^{2m+2})$。

Romberg 求积法的局限性也十分明显，它依赖于误差项按泰勒展开的形式，这意味着对于函数不光滑或端点处导数发散等情况无法使用此方法。因此，该方法常用于光滑函数的积分求解。

### 例题

利用 Romberg 求积法 求解 $\displaystyle{\int_0^1e^x\mathrm{d}x}$ 的近似值，保留五位有效数字。

### 解答

设 $F_{k,m}$ 表示将区间 $[0,1]$ 分成 $2^k$ 份，联立 $m$ 次所得到的值。

下取 $f(x)=e^x,e=2.718281.$

$k=0,m=0,h=1,F_{0,0}=\dfrac{h}{2}[f(0)+f(1)]=\dfrac{1+e}{2}=1.859141$

$k=1,m=0,h=\dfrac{1}{2},F_{1,0}=\dfrac{h}{2} [f(0) + 2f(\dfrac{1}{2})+f(1)]=\dfrac{1+2\sqrt{e}+e}{4}=1.753931$

$k=1,m=1,h=\dfrac{1}{2},F_{1,1}=F_{1,0} +\dfrac{F_{1,0} - F_{0,0}}{3}=1.718861$

$k=2,m=0,h=\dfrac{1}{4},F_{2,0}=\dfrac{h}{2} [f(0) +2f(\dfrac{1}{4})+ 2f(\dfrac{1}{2})+2f(\dfrac{3}{4})+f(1)]=1.727222$

$k=2,m=1,h=\dfrac{1}{4},F_{2,1}=F_{2,0}+\dfrac{F_{2,0} - F_{1,0}}{3}=1.718319$

$k=2,m=2,h=\dfrac{1}{4},F_{2,2}=F_{2,1}+\dfrac{F_{2,1} - F_{1,1}}{15}=1.718283$

故所求积分近似值为 $F_{2,2} \approx 1.7183$。

实际上原积分精确值为 $e-1$，与所求近似值误差 $<10^{-5}$。
