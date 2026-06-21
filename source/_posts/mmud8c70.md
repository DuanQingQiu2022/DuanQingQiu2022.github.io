---
title: "【题解】P12143 [蓝桥杯 2025 省 A] 好串的数目"
date: 2025-04-12 16:31:08
categories:
  - "题解"
tags:
  - "P12143"
luogu_lid: "mmud8c70"
luogu_category: 2
original: "https://www.luogu.com.cn/article/mmud8c70"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P12143)

蓝桥 F 题。

首先好串可以分为两种，一种是连续非递减串，一种是有断点但是可以分割成两个连续非递减子串。

考虑在一个好串后面添加一个数字，如果它能跟上一个连起来那肯定是好串，且整个串的性质不变。如果连不起来那么没有断点的好串会变成有断点的好串，有断点的好串则无法作出贡献。

然后又注意到如果 $[i,j]$ 是好串那么它的子区间肯定全是好串，所以只需要计算大段贡献即可。

于是双指针扫一遍整个串，记录当前好串类型和断点位置即可。

时间复杂度 $O(n)$。


```cpp
//简单题需要代码……
n=s.length(),ans=n;
int i=0,j=1,rec=-1;
while(i<j&&j<n)
{
	if(s[j-1]==s[j]||s[j-1]+1==s[j])
		ans+=(j-i),j++;
	else if(rec==-1)
		ans+=(j-i),rec=j,j++;
	else
		i=rec,rec=-1;
}
cout<<ans<<"\n";
```
