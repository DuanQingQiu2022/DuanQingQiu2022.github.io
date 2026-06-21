---
title: "【题解】CF1728（Div 2）"
date: 2022-10-04 10:35:33
categories:
  - "文章"
luogu_lid: "t9ule0pl"
luogu_category: 2
original: "https://www.luogu.com.cn/article/t9ule0pl"
disableNunjucks: true
---

### [CF1728A](https://www.luogu.com.cn/problem/CF1728A)

显然存在一种取法使得最后剩下的颜色是开始时数量最多的那个颜色。

### [CF1728B](https://www.luogu.com.cn/problem/CF1728B)

不难看出最后应该放 $n-1$ 和 $n$。

问题是怎样让前 $n-2$ 个数和为 $0$。

显然考虑倒着放，然后这是两两抵消的一个过程，这个方法适用于 $n$ 为偶数。

$n$ 为奇数时把 $1$ 放在第一个垫一下，剩下倒着放即可。

### [CF1728C](https://www.luogu.com.cn/problem/CF1728C)

注意到值域最大 $10^9$，操作一次之后肯定变成个位数。

考虑排序之后两两相等，不难想到当前最大值肯定匹配不上。

所以每个当前最大值都要进行操作。

拿两个优先队列存一下两边序列，每次取出两边最大值比较即可。

## [CF1728D](https://www.luogu.com.cn/problem/CF1728D)

偶数长度的字符串，先手肯定每次要拿当前最大的字符，后手没有赢的可能。

考虑平局需要两人每轮取的字符都相等，假定先手取左端，那么要么左边下一个和左端点相等，要么右端点和左端点相等。

如果这两种情况交替出现，先手必然能够通过不规律的取法破坏这个局面。

所以两边最优策略就是先把两端相等部分取完，然后看看剩下部分是否能够形成左边两两相等，右边两两相等的这种局面，如果能就是平局，否则先手必胜。

时间复杂度 $O(n)$，比 std 快。

## [CF1728E](https://www.luogu.com.cn/problem/CF1728E)

首先考虑 $n$ 盘菜放 $i$ 个 $a$ 怎么放最优，记为 $f_i$，这个显然可以贪心预处理出来，考虑最开始全选 $b$，然后每次贪心选当前 $a-b$ 值最大的那个即可。同时记最大值点为 $pos$。

然后给定每个商店每包菜数量 $p,q$，求最优购买方案，设买 $x$ 包 $a$ 和 $y$ 包 $b$，这个显然形如 $px+qy=n$。

先利用裴蜀定理把无解判掉，然后 exgcd 找到一组合法解 $(x_0,y_0)$。

设 $d=\gcd(p,q)$，考虑通解形如 $x=x_0+k \times \dfrac{q}{d}$，那么买到 $a$ 的数量就是 $px_0+\dfrac{kpq}{d}$。

显然 $f_i$ 的图像是一个伪单峰函数的形式，最大值只会出现在连续的一段之中。所以取到的点离最大值点越近就越优。

不妨令 $pos=px_0+\dfrac{kpq}{d}$，得到 $k=\dfrac{(pos-px_0)d}{pq}$。

当然这个 $k$ 不一定是整数，所以离 $pos$ 最近的两个点分别取 $\left\lfloor k \right\rfloor$ 和 $\left\lceil k \right\rceil$ 代入原式，取最大值即可。注意不要超过范围。

时间复杂度 $O(n \log n+m \log x)$。

## [CF1728F](https://www.luogu.com.cn/problem/CF1728F)

## [CF1728G](https://www.luogu.com.cn/problem/CF1728G)
