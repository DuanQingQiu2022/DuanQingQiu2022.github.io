---
title: "【题解】P2446 [SDOI2010]大陆争霸"
date: 2022-05-21 12:59:38
categories:
  - "题解"
luogu_lid: "goe6fwdb"
luogu_category: 2
original: "https://www.luogu.com.cn/article/goe6fwdb"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P2446)

<!-- more -->

考虑上帝视角下，最佳策略肯定是维护所有能被摧毁的点的集合，每次取出当前能被摧毁的最早的点，然后从这个点继续扩展。

维护一个 $dis_i$ 表示到达 $i$ 点的最短时间，$dsy_i$ 表示 $i$ 点变为“可摧毁”状态的最短时间，然后 $i$ 点的真正被摧毁时间就是 $\max(dis_i,dsy_i)$。

然后每次用当前点更新所有连接点的 $dis$，并且更新其保护的所有节点的保护情况，这个可以对每个节点开一个 vector 维护它保护的所有节点。如果更新之后有节点变成了可摧毁的点，就把它入队。

然后发现这个过程就是 dijkstra 的过程，直接跑 dijkstra 过程中维护即可。

时间复杂度 $O((n+m) \log n+n^2)$。

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
ll n,m,l[5005],dis[5005],dsy[5005];
bool vis[5005];
vector<ll> a[5005],w[5005],p[5005];
struct node
{
	ll x,tim;
	node(ll x_,ll tim_)
	{
		x=x_;
		tim=tim_;
	}
	friend bool operator < (node a,node b)
	{
		back a.tim>b.tim;
	}
};
priority_queue<node> q;
void dijkstra(int s)
{
	q.push(node(s,0)),dis[s]=0;
	while(!q.empty())
	{
		int now=q.top().x;
		q.pop();
		if(vis[now])
			continue;
		vis[now]=1;
		for(ri i=0;i<a[now].size();i++)
		{
			ll to=a[now][i],val=w[now][i];
			if(dis[to]>max(dis[now],dsy[now])+val)
			{
				dis[to]=max(dis[now],dsy[now])+val;
				if(dsy[to]==1e17)
					continue;
				q.push(node(to,max(dis[to],dsy[to])));
			}
		}
		for(ri i=0;i<p[now].size();i++)
		{
			int to=p[now][i];
			l[to]--;
			if(l[to]==0)
			{
				dsy[to]=max(dis[now],dsy[now]);
				q.push(node(to,max(dis[to],dsy[to])));
			}			
		}
	}
}
int main()
{
	n=read(),m=read();
	for(ri i=1;i<=m;i++)
	{
		int x=read(),y=read(),w1=read();
		if(x==y)
			continue;
		a[x].push_back(y);
		w[x].push_back(w1);
	}
	for(ri i=1;i<=n;i++)
	{
		l[i]=read();
		if(l[i]==0)
			dsy[i]=0;
		else
			dsy[i]=1e17;
		for(ri j=1;j<=l[i];j++)
		{
			int x=read();
			p[x].push_back(i);
		}
	}
	for(ri i=1;i<=n;i++)
		dis[i]=1e17;
	dijkstra(1);
	cout<<max(dsy[n],dis[n])<<"\n";
	back 0;
}
```
