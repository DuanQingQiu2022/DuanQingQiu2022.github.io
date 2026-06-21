---
title: "【题解】P1801 黑匣子"
date: 2022-04-05 18:09:14
categories:
  - "文章"
luogu_lid: "7rr3gupx"
luogu_category: 2
original: "https://www.luogu.com.cn/article/7rr3gupx"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1801)

这当然是平衡树查找第 $k$ 小的板子……

但是注意到查找的第 $k$ 小中，$k$ 是递增的。

所以可以用 multiset 过。

注意这里的指针指向某个位置后，再插入新的元素，指针并不会移动位置。也就是说如果插入了一个比当前指向元素小的元素，需要手动将指针左移一位。
