---
title: "【题解】P7078 [CSP-S2020] 贪吃蛇"
date: 2022-05-04 20:07:39
categories:
  - "文章"
luogu_lid: "k0grzmyr"
luogu_category: 2
original: "https://www.luogu.com.cn/article/k0grzmyr"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P7078)

<!-- more -->

注意到蛇的强度是单调递增的。

一条蛇当前选择吃，当且仅当它在之后不会被吃。

而被吃的蛇只可能是最弱的蛇，因此如果有比蛇 $A$ 更弱的蛇 $B$ 没被吃掉，那么蛇 $A$ 肯定也不会被吃掉。

考虑当前最强蛇如果吃掉最弱蛇后，不是剩下的蛇里面最弱的，那它肯定不会被吃掉，因此一定会选择吃最弱蛇。

证明：如果当前最强蛇吃了最弱蛇后不是最弱，那么剩下的最强蛇如果选择吃，那么吃完之后它一定比上一条选择吃的蛇更弱，而它选择吃说明它吃完后不会死，那么比它更强的蛇也不会死。所以当前最强蛇吃完后一定不会死，所以一定选择吃。

如果最强蛇吃完之后变成了最弱蛇，那么它无论是否选择吃，游戏都将在选择后立刻结束。

证明：如果吃，证明它不会死，吃完之后是最弱蛇，没有蛇敢吃它，游戏结束。

而当前蛇敢不敢吃取决于吃完之后它会不会死，而它会不会死取决于剩下蛇里的最强蛇吃完它会不会死，以此类推。

于是这变成一个递归问题，只需要模拟这个递归过程即可。

这样，问题转化为维护一个初始单调递增的序列，支持查询最大值、最小值以及单点插入。

当然这个可以使用 set 解决，但是一个 $\log$ 显然不足以通过本题，需要线性做法。

发现一个性质是每次只会弹出最强蛇和最弱蛇，并且插入的蛇强度单调递减。

因此可以使用两个双端队列维护，$q_1$ 存初始的所有蛇，$q_2$ 存弹出的所有蛇，并且显然这两个队列都是满足单调性的，每次取最大值和最小值时只需要比较两个队头（或队尾）即可。

时间复杂度 $O(Tn)$。

代码：

```cpp
#include<bits/stdc++.h>
#define ll long long
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
	return x*f;
}
int t,n,a[1000005];
deque<pair<int,int>> q1,q2;
int main()
{
	t=read();
	for(ri c=1;c<=t;c++)
	{
		if(c==1)
		{
			n=read();
			for(ri i=1;i<=n;i++)
				a[i]=read();
		}	
		else
		{
			int k=read();
			for(ri i=1;i<=k;i++)
			{
				int x=read(),y=read();
				a[x]=y;
			}
		}
		int ans=n;
		for(ri i=1;i<=n;i++)
			q1.push_front({a[i],i});
		while(1)
		{
			if(q1.size()+q2.size()==2)
			{
				ans=1;
				break;
			}
			pair<int,int> minn,maxx;
			if(!q1.empty())
				minn=q1.back(),q1.pop_back();
			else
				minn=q2.back(),q2.pop_back();
			if(q2.empty()||q1.front().first>q2.front().first||q1.front().first==q2.front().first&&q1.front().second>q2.front().second)	
				maxx=q1.front(),q1.pop_front();
			else
				maxx=q2.front(),q2.pop_front();
			int max1=maxx.first,id=maxx.second,min1=minn.first;
			pair<int,int> now;
			if(q2.empty()||q1.back().first<q2.back().first||q1.back().first==q2.back().first&&q1.back().second<q2.back().second)	
				now=q1.back();
			else
				now=q2.back();
			if(max1-min1<now.first||max1-min1==now.first&&id<now.second)
			{
				pair<int,int> mn={max1-min1,id};
				int cnt=0;
				while(1)
				{		
					if(q1.size()+q2.size()==1)
					{
						if(cnt%2==1)
							ans--;
						break;
					}
					cnt++;
					if(q2.empty()||q1.back().first<q2.back().first||q1.back().first==q2.back().first&&q1.back().second<q2.back().second)	
						minn=q1.back();
					else
						minn=q2.back();
					if(q2.empty()||q1.front().first>q2.front().first||q1.front().first==q2.front().first&&q1.front().second>q2.front().second)	
						maxx=q1.front(),q1.pop_front();
					else
						maxx=q2.front(),q2.pop_front();
					if(minn.first<mn.first||minn.first==mn.first&&minn.second<mn.second)
					{
						if(cnt%2==1)
							ans--;
						break;
					}
					mn={maxx.first-mn.first,maxx.second};	
				}
				break;
			}
			q2.push_back({max1-min1,id}),ans--;
		}
		cout<<ans<<"\n";
		q1.clear(),q2.clear();
	}
    return 0;
}
```
