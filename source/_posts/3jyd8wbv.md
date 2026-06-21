---
title: "【题解】P1119 灾后重建"
date: 2022-01-08 23:38:21
categories:
  - "文章"
luogu_lid: "3jyd8wbv"
luogu_category: 2
original: "https://www.luogu.com.cn/article/3jyd8wbv"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1119)

<!-- more -->

Floyd 的经典运用。

Floyd 算法原始的时候，是需要开一个三维数组 $f[k][x][y]$ 代表只允许经过点 $1 \sim k$，从 $x$ 到 $y$ 的最短路长度，但是你会发现这个东西和直接开二维数组 $f[x][y]$ 没有区别（[这个结论的证明](https://oi-wiki.org/graph/shortest-path/#_4)），于是就把这个东西优化掉了。

但是这个题有点类似原始的做法。$n \le 200$，肯定想到 Floyd 求最短路。然后发现主要难点在于顺时间不断加边，每加一次边相当于加入一个新点，然后每次把这个新点当作 $k$，跑一遍 Floyd。

也就是说，可以事先把边加好，等到加点的时候再扩展这个点进行 Floyd 求最短路，于是正确性是显然的。

时间复杂度 $O(n^3+Q)$。

代码：

```cpp
#include<bits/stdc++.h>
#include<iostream>
#define ll long long
#define back return 
#define ri register int 
using namespace std;
int n,m,t[205];
int f[205][205];
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
void floyd(int k)
{
	for(ri i=0;i<n;i++)
		for(ri j=0;j<n;j++)
			if(f[i][j]>f[i][k]+f[k][j])
				f[i][j]=f[i][k]+f[k][j];
}
int main()
{
	n=read(),m=read();
	for(ri i=0;i<n;i++)
		t[i]=read();
	for(ri i=0;i<n;i++)
		for(ri j=0;j<n;j++)
			f[i][j]=1e9;
	for(ri i=1;i<=m;i++)
	{
		int x=read(),y=read(),w=read();
		f[x][y]=f[y][x]=w;
	}
	int q=read(),now=0;// current village is now
	while(q--)
	{
		int x=read(),y=read(),t1=read();
		while(now<n&&t[now]<=t1)
			floyd(now),now++;
		if(t[x]>t1||t[y]>t1||f[x][y]==1e9)
			cout<<-1<<"\n";
		else
			cout<<f[x][y]<<"\n";
	}
    back 0;
}
```
