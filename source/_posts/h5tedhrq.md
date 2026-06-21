---
title: "【题解】CF1638B Odd Swap Sort"
date: 2022-02-22 21:16:05
categories:
  - "题解"
tags:
  - "adhoc"
luogu_lid: "h5tedhrq"
luogu_category: 2
original: "https://www.luogu.com.cn/article/h5tedhrq"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/CF1638B)

<!-- more -->

感觉这个题出得挺好。

两个数相加是奇数才能交换，说明能交换的两个数奇偶性必然不同。也就是说两个奇数不可能互换位置，两个偶数也不能互换位置。

于是可以得到结论：无论如何交换，原数列中，奇数的相对位置不变，偶数的相对位置不变。

因此如果原数列中，奇数是排好序的，偶数也是排好序的，那么就可以完成，否则不能。

然后线性扫一遍所有奇数和所有偶数就行了。
