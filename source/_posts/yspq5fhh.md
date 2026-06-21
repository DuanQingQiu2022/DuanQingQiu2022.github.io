---
title: "【题解】P1144 最短路计数"
date: 2022-02-25 23:25:14
categories:
  - "题解"
tags:
  - "最短路"
  - "BFS"
  - "递推"
luogu_lid: "yspq5fhh"
luogu_category: 2
original: "https://www.luogu.com.cn/article/yspq5fhh"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1144)

<!-- more -->

没有边权的无向图，模数 $p=100003$。

首先去掉自环，bfs 一遍可以求出每个点的最短路 $dep_i$。

然后再 bfs 一遍，如果节点 $i$ 与节点 $j$ 连边，且 $dep_i+1=dep_j$，那么就说明 $j$ 能够被 $i$ 更新，也就是说边 $(i,j)$ 是在点 $j$ 的其中一条最短路上，于是有 $ans_j=(ans_j+ans_i) \bmod p$。

这样两遍 bfs 即可。

时间复杂度 $O(n+m)$。

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
const int mod=100003;
int n,m,dep[1000005],ans[1000005],vis[1000005];
vector<int> a[1000005];
queue<int> q;
void bfs()
{
	
}
int main()
{
	n=read(),m=read();
	for(ri i=1;i<=m;i++)
	{
		int x=read(),y=read();
		if(x==y)
			continue;
		a[x].push_back(y);
		a[y].push_back(x);
	}
	q.push(1),vis[1]=1,ans[1]=1,dep[1]=0;
	while(!q.empty())
	{
		int now=q.front();
		q.pop();
		for(ri i=0;i<a[now].size();i++)
		{
			int to=a[now][i];
			if(vis[to])
				continue;
			vis[to]=1;
			q.push(to);
			dep[to]=dep[now]+1;	
		}		
	}
	while(!q.empty())
		q.pop();
	memset(vis,0,sizeof(vis));
	q.push(1);
	while(!q.empty())
	{
		int now=q.front();
		q.pop();
		if(vis[now])
			continue;
		vis[now]=1;
		for(ri i=0;i<a[now].size();i++)
		{
			int to=a[now][i];
			if(dep[to]==dep[now]+1)
				ans[to]=(ans[to]+ans[now])%mod;
			q.push(to);
		}
	}
	for(ri i=1;i<=n;i++)
		cout<<ans[i]<<"\n";
	back 0;
}
```
