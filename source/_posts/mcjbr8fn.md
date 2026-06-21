---
title: "【题解】CF1594D The Number of Imposters"
date: 2021-11-01 17:42:05
categories:
  - "题解"
tags:
  - "并查集"
luogu_lid: "mcjbr8fn"
luogu_category: 2
original: "https://www.luogu.com.cn/article/mcjbr8fn"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/CF1594D)

<!-- more -->

果然套路题评分都不高吗……

一看题就知道显然是扩展域并查集。

考虑 $[1,n]$ 存诚实的人，$[n+1,2n]$ 存说谎者。

如果 $x$ 说 $y$ 诚实，那么 $x$ 和 $y$ 都诚实，合并 $x,y$；

如果 $x$ 说 $y$ 说谎，那么可能是 $x$ 说谎，$y$ 诚实，也有可能是 $x$ 诚实，$y$ 说谎。于是应该分别合并 $x,y+n$ 和 $x+n,y$。

考虑如果 $x$ 和 $x+n$ 在一个集合，即 $x$ 既诚实又说谎，那就无解。

对于有解的情况，所有人必然被分为两个大集合，统计一下哪个集合中诚实的人比较多即可。

时间复杂度 $O(\sum (n+m \log n))$。

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
int t,n,m,fa[400005],vis[400005],sum[400005]; 
string s;
int find(int x)
{
	if(fa[x]==x)
		back fa[x];
	back fa[x]=find(fa[x]);
}
int main()
{
	t=read();
	while(t--)
	{
		n=read(),m=read();
		int ans=0;
		for(ri i=1;i<=2*n;i++)
			vis[i]=0,sum[i]=0;
		for(ri i=1;i<=2*n;i++)
			fa[i]=i;
		for(ri i=1;i<=m;i++)
		{
			int x,y;
			x=read(),y=read(),cin>>s;
			if(s[0]=='c')
			{
				fa[find(x)]=find(y);
				fa[find(x+n)]=find(y+n);
			}
			else
			{
				fa[find(x)]=find(y+n);
				fa[find(x+n)]=find(y);
			}
		}
		bool flag=0;
		for(ri i=1;i<=n;i++)
			if(find(i)==find(i+n))
			{
				flag=1;
				cout<<-1<<"\n";
				break;
			}
		if(!flag)
		{
			for(ri i=1;i<=n;i++)
				sum[find(i)]++;
			for(ri i=1;i<=n;i++)
			{
				if(vis[find(i)]||vis[find(i+n)])
					continue;
				ans+=max(sum[find(i)],sum[find(i+n)]);
				vis[find(i)]=vis[find(i+n)]=1;
			}
			cout<<ans<<"\n";
		}		
	}
	back 0;
}
```
