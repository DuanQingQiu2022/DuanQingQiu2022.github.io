---
title: "【笔记】单调栈学习笔记"
date: 2021-09-08 13:59:37
categories:
  - "文章"
luogu_lid: "zy2epv1s"
luogu_category: 1
original: "https://www.luogu.com.cn/article/zy2epv1s"
disableNunjucks: true
---

[洛谷例题](https://www.luogu.com.cn/problem/P5788)

借这道例题简单写一下单调栈的用法。

单调栈，即栈中元素均满足单调性的栈。为了达到这个目的，需要在加入一个元素时弹出一些不满足单调性的元素，而我们希望弹出的这些元素尽可能少。

本题例题是求第 $i$ 个元素之后第一个 $>a_i$ 的元素下标，这里的单调栈显然是一个单调递增栈。

反之，单调栈也可以求第 $i$ 个元素之后第一个 $< a_i$ 的元素下标，这里就是单调递减栈了。

利用这个性质，单调栈也可以维护以 $a_i$ 为最小值（或最大值）的最大区间长度。

以下是例题讲解。

由于要满足栈的特性，这题显然应该从后向前扫。

考虑对于第 $i$ 个元素，如果单调递增栈的栈顶有比它还小的元素，那么这个元素就会被弹出（因为不满足单调递增）。这样执行一遍之后，找到栈顶第一个比它大的元素即为答案（如果没有则为 $0$ )，然后将第 $i$ 个元素入栈。

这样我们最后将会得到一个单调递增栈，并且顺带求出了例题的答案。但是注意，例题中要求的是**下标**，因此我们将元素入栈时也应该改为将第 $i$ 个元素的下标 $i$ 入栈。

由于每一个元素最多进栈一次、出栈一次，所以时间复杂度是 $O(n)$。


例题代码：
```cpp
#include<bits/stdc++.h>
#define ll long long
#define ri register int
#define back return
#define ull unsigned ll
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
int n,a[3000005],ans[3000005];
stack<int> s;
int main()
{
	n=read();
	for(ri i=1;i<=n;i++)
		a[i]=read();
	for(ri i=n;i>=1;i--)
	{
		while(!s.empty()&&a[s.top()]<=a[i])
			s.pop();
		if(s.empty())
			ans[i]=0;
		else
			ans[i]=s.top();
		s.push(i);
	}
	for(ri i=1;i<=n;i++)
		cout<<ans[i]<<" ";
	cout<<"\n";
	back 0;
}
```
