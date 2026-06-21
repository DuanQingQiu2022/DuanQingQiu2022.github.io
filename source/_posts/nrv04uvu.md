---
title: "【题解】P2354 [NOI2014] 随机数生成器"
date: 2022-05-09 20:50:59
categories:
  - "题解"
tags:
  - "贪心"
luogu_lid: "nrv04uvu"
luogu_category: 2
original: "https://www.luogu.com.cn/article/nrv04uvu"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P2354)

<!-- more -->

题意：给你一个 $n \times m$ 矩阵，元素为 $1 \sim n \times m$ 的一个排列，求从矩阵左上角只能向右或向下走到右下角经过路径元素字典序最小的序列。

考虑直接贪心，从小到大枚举每个数是否能被选中。

如何判断一个数被选取是否合法？

考虑选一个数之后会产生什么影响。显然当选中一个数之后，这个数左下角的所有数都不能被选中，右上角所有数不能被选中，也就是说可以排除掉不能被选的区间。

对于第 $i$ 行，记录 $l_i$ 和 $r_i$ 表示当前可选的左边界和右边界，每次选择一个数时更新该数上面所有行右边界，和下面所有行左边界。

由于每次选择一个数时要线性处理，最多选 $n+m-1$ 个数，总复杂度就是 $O(nm+Q)$。

本题轻微卡空间，注意开 int，以及空间重复使用。

代码：

```cpp
#include<bits/stdc++.h>
#define ll long long
#define back return
#define ri register int
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
int x[25000005],l[5005],r[5005],cnt,x0,a,b,c,d;
int n,m,q,t[25000005];
int main()
{
	x[0]=read(),a=read(),b=read(),c=read(),d=read();
	n=read(),m=read(),q=read();
	for(ri i=1;i<=n*m;i++)
		t[i]=i;
	for(ri i=1;i<=n*m;i++)
		x[i]=(ll)((ll)a*x[i-1]*x[i-1]+(ll)b*x[i-1]+c)%d;
	for(ri i=1;i<=n*m;i++)
		swap(t[i],t[x[i]%i+1]);
	for(ri i=1;i<=q;i++)
	{
		int u=read(),v=read();
		swap(t[u],t[v]);
	}
	for(ri i=1;i<=n*m;i++)
		x[t[i]]=i;	
	for(ri i=1;i<=n;i++)
		l[i]=0,r[i]=m;	
	for(ri i=1;i<=n*m;i++)
	{	
		int ln,rw;
		if(cnt==n+m-1)
			break;
		if(x[i]%m==0)
			rw=x[i]/m,ln=x[i]-(rw-1)*m;
		else
			rw=x[i]/m+1,ln=x[i]-(rw-1)*m;
		if(ln>=l[rw]&&ln<=r[rw])
		{
			cnt++;
			cout<<i<<" ";
			for(ri j=1;j<=rw-1;j++)
				r[j]=min(r[j],ln);
			for(ri j=rw+1;j<=n;j++)
				l[j]=max(l[j],ln);
		}
	}
	back 0;
}
```
