---
title: "【题解】P12142 [蓝桥杯 2025 省 A] 黑客"
date: 2025-04-13 17:23:45
categories:
  - "题解"
tags:
  - "组合数学"
  - "逆元"
luogu_lid: "1nsyh3wt"
luogu_category: 2
original: "https://www.luogu.com.cn/article/1nsyh3wt"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P12142)

<!-- more -->

蓝桥 E 题。赛时多测没清空，搞笑了。

考虑对一个 $n \times m$ 的矩阵，首先如果每个数都不同的话总方案数肯定是 $(nm)!$ 的。

然后如果同一个数重复出现了 $c$ 次那么方案数就要除以 $c!$ 。

可以先把阶乘和逆元预处理出来，然后找到所有合法的 $n,m$ 即可，注意 $n,m$ 出现次数要减一。当然由于合法的取值最多 $O(\sqrt{nm})$ 级别，每次快速幂求逆元也是可以的。 

注意阶乘要处理到 $nm+2$ 而不是 $nm$，否则会被如下小数据卡掉。

```cpp
//Hack
3
1 1 1
```

时间复杂度 $O(nm)$。
