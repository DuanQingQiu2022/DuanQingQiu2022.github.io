---
title: "【题解】[POI2008]BLO-Blockade"
date: 2022-06-16 17:44:54
categories:
  - "文章"
luogu_lid: "lgobzjpb"
luogu_category: 2
original: "https://www.luogu.com.cn/article/lgobzjpb"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P3469)

<!-- more -->

题意：一个无向连通图，无重边，求对于每一个城镇，将其连接的所有边删掉（不删点）之后，有多少个有序点对 $(x,y)$ 满足 $x$ 和 $y$ 不连通。

首先分类讨论。

如果当前点不是割点，那么显然只有这个点和其他 $(n-1)$ 个点都不连通，所以答案是 $2(n-1)$。

如果是割点就比较麻烦。首先考虑如果把割点的边都删了，整个图会被分成多个连通块。其中这个割点单独组成一个连通块，以这个割点为根的每棵子树都是一个连通块，此外，还可能有除了以上这些点以外的其他点再组成一个连通块。

以下计算贡献的时候只考虑无序点对，这样可以避免重复统计。

考虑子树 $s_1$ 的大小如果是 $siz[s_1]$，那么它对答案的贡献就是 $siz[s_1](n-siz[s_1])$。那么以割点为根的所有子树对答案的贡献就直接可以计算。

然后这个割点与其他所有点都不连通，贡献为 $n-1$。

不妨设以割点为根的所有子树的总大小为 $tot$，那么剩下可能存在的连通块大小就是 $n-tot-1$，然后这部分贡献就是 $(n-tot-1)(tot+1)$。

tarjan 统计过程中直接计算每棵子树的大小并累加，最后更新当前点的答案即可，只需要跑一遍 tarjan。

时间复杂度 $O(n+m)$。

代码：

```cpp
#include<bits/stdc++.h>
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
ll n,m,s,t,rt,cnt,ans[200005],dfn[200005],low[200005],cut[200005],siz[200005];
vector<int> a[200005];
void tarjan(int x)
{
	dfn[x]=low[x]=++cnt,siz[x]=1;
	int sum=0,tot=0; 
	for(ri i=0;i<a[x].size();i++)
	{
		int to=a[x][i];
		if(dfn[to])
		{
			low[x]=min(low[x],dfn[to]);
			continue;
		}		
		tarjan(to);
		siz[x]+=siz[to];
		low[x]=min(low[x],low[to]); 
		if(low[to]>=dfn[x])
		{
			sum++;
			ans[x]+=siz[to]*(n-siz[to]);
			tot+=siz[to];
			if(x!=rt||sum>=2)
				cut[x]=1;
		}			
	}
	if(cut[x])
		ans[x]+=(n-1)+(n-1-tot)*(tot+1);
	else
		ans[x]=2*(n-1);
}
int main()
{
	n=read(),m=read();
	for(ri i=1;i<=m;i++)
	{
		int u=read(),v=read();
		a[u].push_back(v),a[v].push_back(u);
	}
	rt=1,tarjan(rt);
	for(ri i=1;i<=n;i++)
		cout<<ans[i]<<"\n";
	back 0;
}
```
