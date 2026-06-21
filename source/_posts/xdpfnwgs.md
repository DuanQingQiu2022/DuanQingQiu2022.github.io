---
title: "【题解】P1099 [NOIP2007 提高组] 树网的核 || P2491 [SDOI2011] 消防"
date: 2022-05-19 16:04:42
categories:
  - "题解"
tags:
  - "图论"
  - "贪心"
  - "双指针"
luogu_lid: "xdpfnwgs"
luogu_category: 2
original: "https://www.luogu.com.cn/article/xdpfnwgs"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P2491)

<!-- more -->

经典题的 $O(n)$ 做法。

题意是在树的直径上选一条长度不超过 $s$ 的路径 $(i,j)$，使得路径外的其他点到这条路径的最大距离最小，求这个最小值。

首先可以两次 dfs 求出直径，并且记录直径上的所有点。

然后裸暴力就是在直径上枚举路径左右端点，然后 $O(n)$ 计算最大距离，复杂度 $O(n^3)$，这就能通过原题，非常牛逼。

然后考虑如果路径左端点固定，那右端点肯定越远越好，这样只会使其他点到这条路径的距离减小。所以可以贪心，只枚举左端点后直接确定右端点，复杂度 $O(n^2)$。

继续优化，最大值最小可以想到二分，而根据贪心思想答案显然有单调性，然后可以二分答案并验证，复杂度 $O(n \log sum)$，$sum$ 为所有边长度和。

也可以不用二分，不妨设直径上的节点为 $1,2,...t-1,t$，$d_i$ 表示从点 $i$ 出发不经过直径上其他点的最长距离，显然处理 $d_i$ 只需要把整棵树遍历一遍，所以复杂度是 $O(n)$ 的。

然后所求的值就是 $\max(\max_{i \le k \le j}{d_k},dis(1,i),dis(j,t))$。

单调队列维护 $d_k$ 可以做到 $O(n)$。

但是还有一个不用数据结构的线性做法。

根据直径最长性，$\max_{1 \le j \le i}{d_j} \le dis(1,i),\max_{i \le j \le t}{d_j} \le dis(i,t)$。

因此实际上这两部分都不可能是结果，那么 $\max_{i \le k \le j}{d_k}$ 就等价于 $\max_{1 \le i \le t}{d_i}$，而 $\max_{1 \le i \le t}{d_i}$ 是定值，可以事先预处理出来，记为 $maxd$。

然后答案就是 $\max_{1 \le j \le i}(maxd,dis(1,i),dis(j,t))$。

枚举右端点 $j$，不断移动 $j$ 并记录答案，当 $dis(i,j)>s$ 时就移动左端点，右端点到 $t$ 时就结束，复杂度显然为 $O(n)$。

代码：

```cpp
#include<bits/stdc++.h>
#define ll long long
#define ri register int
#define back return
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
int n,s,ans=1e9,len,pos,maxd,rec[300005],dis[300005],fa[300005],u[300005]; 
vector<int> a[300005],w[300005];
bool vis[300005];
void dfs(int f,int x)//两次 dfs 求直径，pos 记录距离最远节点 
{
	fa[x]=f,vis[x]=1;
	if(dis[x]>dis[pos])
		pos=x;
	for(ri i=0;i<a[x].size();i++)
	{
		int to=a[x][i];
		if(vis[to]||rec[to])
			continue;
		vis[to]=1;
		dis[to]=dis[x]+w[x][i];
		dfs(x,to);
	}
}
int main()
{
   	n=read(),s=read();
   	for(ri i=1;i<=n-1;i++)
   	{
   		int x=read(),y=read(),w1=read();
   		a[x].push_back(y),a[y].push_back(x);
   		w[x].push_back(w1),w[y].push_back(w1);
   	}
   	dfs(0,1);
   	dis[pos]=0,memset(vis,0,sizeof(vis));
   	dfs(0,pos);
   	for(ri i=pos;i;i=fa[i])// u[1] ~ u[len] 为直径上节点 
   		u[++len]=i,rec[i]=1;
   	for(ri r=1,l=1;r<=len;r++)//此时 dis[i] 表示点 i 到 u[len] 的距离 
   	{
   		while(dis[u[l]]-dis[u[r]]>s)
   			l++;
   		ans=min(ans,max(dis[u[1]]-dis[u[l]],dis[u[r]]));
   	}
   	memset(vis,0,sizeof(vis));
   	for(ri i=1;i<=len;i++)
   	{
   		dis[u[i]]=0;
   		dfs(fa[u[i]],u[i]);
   		maxd=max(maxd,dis[pos]);
   	}
   	cout<<max(ans,maxd)<<"\n";
    back 0;
}
```
