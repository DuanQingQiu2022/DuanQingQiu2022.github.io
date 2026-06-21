---
title: "【题解】CF77A（Div 1）"
date: 2023-02-03 23:52:29
categories:
  - "文章"
luogu_lid: "rxo2xgos"
luogu_category: 2
original: "https://www.luogu.com.cn/article/rxo2xgos"
disableNunjucks: true
---

## [CF77A](https://www.luogu.com.cn/problem/CF77A)

<!-- more -->

$7$ 个人分给 $3$ 个 Boss，直接枚举所有方案即可。

## [CF77B](https://www.luogu.com.cn/problem/CF77B)

题目显然是问 $p \ge 4q$ 的概率。

转化成几何模型，相当于在横轴 $[-b,b]$，纵轴 $[0,a]$ 围成的矩形内取点，求在直线 $y=4x$ 上方的概率是多少，那么只需要求出划分的图形面积即可。

简单分类讨论可知对于 $a>4b$ 的情况答案是 $1-\dfrac{b}{a}$，$a \le 4b$ 的情况答案是 $\dfrac{1}{2}+\dfrac{1}{16b}$。

要特判 $b=0$ 的情况。

## [CF77C](https://www.luogu.com.cn/problem/CF77C)

设 $dp_i$ 表示从节点 $i$ 开始往下吃最后又回到 $i$，最多能吃多少个。

那么转移就是 $dp_x=\sum\limits_{i \in son_x}(dp_i+1)$。

当然并不一定所有的都能吃到，所以要维护每个节点最优情况下的权值 $a_i$，保证 $a_i$ 非负。然后在合法基础上每次贪心地选 $dp$ 值最大的儿子进行转移。

由于第一次出发的时候不吃，最终答案就是 $dp_s-1$。
## [CF77D](https://www.luogu.com.cn/problem/CF77D)

狗都不做，什么几把题。

## [CF77E](https://www.luogu.com.cn/problem/CF77E)

如果你知道什么是[笛卡尔定理](https://www.luogu.com.cn/blog/DreamNOI2022/post-zong-jie-leng-zhi-shi-ji-ge)这题就秒了……

考虑前面已经有三个圆两两相切了，现在要放第四个圆与这三个相切。

根据笛卡尔定理，对于两两相切于不同点的四个圆有 $(\sum\limits_{i=1}^4 \dfrac{1}{r_i})^2=2 \sum\limits_{i=1}^4 \dfrac{1}{r_i^2}$。

用圆的曲率 $k=\dfrac{1}{r}$ 改写上面那个式子就变成 $(k_1+k_2+k_3+k_4)^2=2(k_1^2+k_2^2+k_3^2+k_4^2)$。（其中 $k_1=-\dfrac{1}{r_1}$）

简单化简得到以 $k_4$ 为主元的二次方程 $k_4^2-2(k_1+k_2+k_3)k_4+(k_1^2+k_2^2+k_3^2-2k_1k_2-2k_1k_3-2k_2k_3)=0$。

显然由于常数项太复杂这是不能暴力做的。考虑韦达定理，有 $x_1+x_2=-\dfrac{b}{a}$。

而对于第 $i$ 个圆来说，它需要与大圆、$G$、$i-1$ 三个圆相切，这样的圆还有一个就是第 $i-2$ 个圆，那么 $r_{i-2}$ 就是原方程的一个解，这样就可以求得另一个解了。

直接递推即可，复杂度 $O(n)$。
