---
title: "【题解】P2647 最大收益"
date: 2022-06-08 15:53:40
categories:
  - "文章"
luogu_lid: "tgd0sdtd"
luogu_category: 2
original: "https://www.luogu.com.cn/article/tgd0sdtd"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P2647)

好久没写博客了，写个水题。

一眼正难则反，考虑倒着选，这样就转化成选 $i$ 会使前面选的所有数均减去 $r_i$，然后这样就满足了动态规划性质。

然后考虑 $r_i$ 较大的数肯定越早选越好，所以直接贪心把 $r_i$ 按从大到小排序即可，剩下的就是 01 背包了。

感觉这题放 LNOI T1 都行啊。
