---
title: "【题解】P3509 [POI2010] ZAB-Frog"
date: 2024-12-15 00:54:02
categories:
  - "题解"
luogu_lid: "pbsmrif5"
luogu_category: 2
original: "https://www.luogu.com.cn/article/pbsmrif5"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P3509)

<!-- more -->

小清新。看到了就写一写。

首先要预处理出每个点 $i$ 跳一次之后的位置 $nxt_i$，这个只需要维护 $i$ 周围前 $k$ 小的点组成的区间即可，显然使用滑动窗口。

然后要求跳 $m$ 次的结果，$m \leq 10^{18}$，显然考虑倍增即可。注意每次跳完之后重新更新 $nxt_{i}$ 的值。

时间复杂度 $O(n \log m)$。
