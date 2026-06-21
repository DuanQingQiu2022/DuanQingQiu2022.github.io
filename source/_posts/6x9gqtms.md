---
title: "【题解】CF797（Div 2）"
date: 2023-01-04 23:41:06
categories:
  - "题解"
luogu_lid: "6x9gqtms"
luogu_category: 2
original: "https://www.luogu.com.cn/article/6x9gqtms"
disableNunjucks: true
---

## [CF797A](https://www.luogu.com.cn/problem/CF797A)

<!-- more -->

直接对 $n$ 进行质因数分解，如果由 $\ge k$ 个质数相乘就有解，反之无解。

## [CF797B](https://www.luogu.com.cn/problem/CF797B)

首先把所有的正数全选了，如果和为奇数就是答案，如果不是的话就得减一个最小的正奇数或者加一个最小的负奇数。

## [CF797C](https://www.luogu.com.cn/problem/CF797C)

考虑如果当前字符后面还有比这个更小的字符，那么肯定要让后面的先出栈，那就把当前字符扔进栈里。如果没有，那就应该让当前字符直接出栈。

那么只需要维护一个后缀最小值，用栈模拟整个过程，每次比较当前栈顶元素和后面最小元素的大小即可。

## [CF797D](https://www.luogu.com.cn/problem/CF797D)

这个题题意有点抽象。

二叉搜索树就是对于树上每个节点，它的左子树所有节点值不大于该节点值，它的右子树节点值不小于该节点值。

然后如果树中的节点值都不相同，那么从根部开始遍历，能走到的左儿子节点值必然都小于该节点，右儿子节点值必定大于该节点，于是每次遍历最大的左儿子和最小的右儿子，即左边界与右边界，如果该节点值在左右边界的开区间中那就可以被找到。

然后对于可能有节点值相等的树，以上做法依然成立，用 map 统计遍历过的节点即可。

## [CF797E](https://www.luogu.com.cn/problem/CF797E)

暴力显然是设 $dp[i][j]$ 表示 $i$ 每次被加上 $a_i+j$ 的最少操作次数，有 $dp[i][j]=dp[i+a_i+j][j]-1$，倒着转移就可以做到 $O(nk)$。

然后考虑如果 $k$ 比较小可以直接 dp，$k$ 比较大的话操作次数会很少可以模拟。于是一眼根号分治，dp 预处理出 $k \le \sqrt n$ 的答案，$k>\sqrt n$ 的情况不会操作超过 $\sqrt n$ 次，总复杂度 $O(n \sqrt n)$。

## [CF797F](https://www.luogu.com.cn/problem/CF797F)

首先把老鼠和洞排序，然后显然这些老鼠的路径不会交叉，于是每个洞必然装的是一段连续的老鼠。

设 $dp_{i,j}$ 表示前 $i$ 个洞装 $j$ 只老鼠的最小距离，那么有 $dp_{i,j}=\min \left\{ dp_{i-1,k}+sum_{i,j}-sum_{i,k} \right\}$。

于是有 $dp_{i,j}=sum_{i,j}+\min \left\{ dp_{i-1,k}-sum_{i,k} \right\}$，括号里面的式子与 $j$ 无关，直接单调队列优化掉即可，时间复杂度 $O(n^2)$。

注意 $sum$ 不要开二维数组，否则会 MLE。
