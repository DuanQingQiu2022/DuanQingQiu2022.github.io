---
title: "【题解】CF1707（Div 1）"
date: 2022-10-12 23:54:58
categories:
  - "题解"
luogu_lid: "9ktwai9m"
luogu_category: 2
original: "https://www.luogu.com.cn/article/9ktwai9m"
disableNunjucks: true
---

## [CF1707A](https://www.luogu.com.cn/problem/CF1707A)

<!-- more -->

可以当做每场比赛的代价均相同，不难发现必然有这样一个断点，在这个断点之前的比赛只参加 $\le q$ 的，在这之后的比赛都打。

这个证明比较简单，只需要移动断点即可证明。

于是考虑每参加一场大于当前智商的比赛扣掉 $1$ 智商，然后倒着扣一直到智商全扣完为止，前面的部分只要 $\le q$ 即可。

时间复杂度 $O(n)$。

## [CF1707B](https://www.luogu.com.cn/problem/CF1707B)

首先可以知道 $0$ 在序列中唯一的作用就是凑差分次数，那么不难想到对于暴力的一个优化，就是删掉所有 $0$ 并且记录删掉的次数 $t$，把当前的 $a_1$ 扔到 $b_1$，这样扔 $t$ 次即可保证正确。

然后发现这个暴力复杂度直接是对的，下面证明复杂度。

首先发现值域是 $5 \times 10^5$ 级别，那极差肯定也是这个级别。

考虑 $a$ 数列的总和 $sum$，当 $sum \le 0$ 时就结束了。然后考虑在第一次暴力做完之后，$sum=a_n-a_1 \le 5 \times 10^5$。

那么只需要考虑 $sum$ 的衰减速度即可证明。

记操作前的 $sum$ 为 $s$，操作后的 $sum$ 为 $s'$，显然有 $s \ge a_n+n-1$，$s' \le a_n-1$，于是有 $s-s' \ge n$。

所以第一次暴力做完之后，后面的操作次数是 $O(\dfrac{sum}{n})$ 级别的，每次操作代价是 $O(n \log n)$，所以总复杂度是 $O(sum \log n)$。

注意判断最后序列剩一堆 $0$ 的情况。

## [CF1707C](https://www.luogu.com.cn/problem/CF1707C)

## [CF1707D](https://www.luogu.com.cn/problem/CF1707D)

## [CF1707E](https://www.luogu.com.cn/problem/CF1707E)

## [CF1707F](https://www.luogu.com.cn/problem/CF1707F)
