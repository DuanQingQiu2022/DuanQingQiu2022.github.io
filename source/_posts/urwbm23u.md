---
title: "【题解】P4377 [USACO18OPEN] Talent Show G"
date: 2026-05-29 14:07:31
categories:
  - "题解"
tags:
  - "P4377"
luogu_lid: "urwbm23u"
luogu_category: 2
original: "https://www.luogu.com.cn/article/urwbm23u"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P4377)

分数规划板子。

题意：给定 $n$ 个物品，求一组 $b_i \in \left\{0,1\right\}$，使得 $\dfrac{\sum b_it_i}{\sum b_iw_i}$ 最大，要求 $\sum b_iw_i \ge W$。

考虑答案显然有单调性，不妨设当前二分值为 $mid$，则有 $\sum b_i(t_i-mid\times w_i) \ge 0$，那么 check 可行性只需要求出左边式子的最大值判断是否非负即可。

如果没有 $\sum b_iw_i \ge W$ 的限制那么贪心选即可。加入限制之后考虑把 $t_i-mid\times w_i$ 作为物品价值，做 01 背包即可。

代码：
```cpp
#include<bits/stdc++.h>
#define ll long long
#define back return
#define ri register int
#define ull unsigned ll
#define ld long double
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
ll T,n,m,ans;
double f[1055],w[405],t[405],v[405];
double eps=1e-8;
bool check(double x)
{
	f[0]=0;
	for(ri i=1;i<=m;i++)
		f[i]=-1e9;
	for(ri i=1;i<=n;i++)
		v[i]=t[i]-x*w[i];
	for(ri i=1;i<=n;i++)
		for(ri j=m;j>=0;j--)
		{
			int now=min(m,j+(ll)w[i]);
			f[now]=max(f[now],f[j]+v[i]); 
		}
	return f[m]>=0;
}
int main()
{
	n=read(),m=read();
	for(ri i=1;i<=n;i++)
		cin>>w[i]>>t[i];
	double l=0,r=1e9,mid=(l+r)/2;
	while(r-l>eps)
	{
		mid=(l+r)/2;
		if(check(mid))
			l=mid;
		else
			r=mid;
	}
	cout<<(ll)(l*1000)<<"\n";
	back 0;
}
```
