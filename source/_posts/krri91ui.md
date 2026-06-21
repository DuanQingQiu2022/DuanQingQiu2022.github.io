---
title: "【题解】CF1559A Mocha and Math"
date: 2021-08-29 23:22:14
categories:
  - "题解"
tags:
  - "位运算"
luogu_lid: "krri91ui"
luogu_category: 2
original: "https://www.luogu.com.cn/article/krri91ui"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/CF1559A)

<!-- more -->

出题人为了不被猜出结论真是煞费苦心啊……可惜一个 **无限多次操作** 就暴露了。

由于是无限多次操作，并且 $i$ 取多少都可以，那么题目要求等价于你可以对序列中任何两个元素进行按位与操作，且没有次数限制。

按位与操作：只有参与运算的两数对应的两个二进位都为 $1$ 时，结果位才为 $1$。

因此由于按位与的性质，把两个数进行按位与之后的结果一定不大于这两个数。

因此答案显然是 $a_1 \And a_2 \And…\And a_n$。

时间复杂度 $O(tn)$。

代码：
```cpp
#include<bits/stdc++.h>
#include<iostream>
#define ll long long
#define back return
#define ri register int
using namespace std;
ll read()
{
	ll x=0,f=1;
	char ch=getchar();
	while(ch<'0'||ch>'9')
	{
		if(ch=='-')
			f=-1;
		ch=getchar();
	}
	while(ch>='0'&&ch<='9')
	{
		x=x*10+ch-'0';
		ch=getchar();
	}
	back x*f;
}
int t,n,a[1001];
int main()
{
	t=read();
	while(t--)
	{
		n=read();
		for(ri i=1;i<=n;i++)
			a[i]=read();
		int sum=a[1];
		for(ri i=2;i<=n;i++)
			sum=sum&a[i];
		cout<<sum<<"\n";
	}
	back 0;
}
```
