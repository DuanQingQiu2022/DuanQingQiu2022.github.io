---
title: "【题解】P5683 [CSP-J2019 江西] 道路拆除"
date: 2022-05-21 16:35:44
categories:
  - "文章"
luogu_lid: "l2vw00zj"
luogu_category: 2
original: "https://www.luogu.com.cn/article/l2vw00zj"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P5683)

注意到图上边权均为 $1$，所以最短路长度就等于经过的边数。

正难则反，求删除边数最多，等价于求保留边数最少，也就是 $1$ 到 $s_1$ 的最短路 $+$ $1$ 到 $s_2$ 的最短路，两者之和最小，且分别不小于 $t_1,t_2$。

这样想发现最后肯定是两条链（可能有一条链被另一条链完全包含），即 $1$ 到 $s_1$ 的路径和 $1$ 到 $s_2$ 的路径，然后这两条路径必然相交于某一节点。

分别从 $1,s_1,s_2$ 为起点求最短路，枚举两条路径的交点并更新答案即可。
