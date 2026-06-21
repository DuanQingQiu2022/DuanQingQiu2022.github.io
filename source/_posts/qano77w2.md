---
title: "【题解】P1052 [NOIP2005 提高组] 过河"
date: 2022-04-06 22:52:28
categories:
  - "文章"
luogu_lid: "qano77w2"
luogu_category: 2
original: "https://www.luogu.com.cn/article/qano77w2"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1052)

<!-- more -->

暴力 dp 是线性的很好想。

考虑优化，发现石子个数很少，也就是有很多空区间是没用的。

考虑把这些空区间跳掉，发现无论 $s,t$ 为多少，总是 $2520$ 的因数。所以对于大段的空区间可以去掉几个 $2520$。

注意应当留出一部分空间用于快速处理 $2520$ 空区间之后的决策。

这样真正有效的序列长度就不超过留出空间与石子个数乘积，复杂度就可以接受。

注意找答案的时候要从序列长度开始往后找一段，防止跳过了终点的情况。

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
int l,s,t,m,dp[10000005],p[1005];
unordered_map<int,int> vis;
int main()
{
	//freopen("A.in","r",stdin);
	//freopen("A.out","w",stdout);
	l=read();
	s=read(),t=read(),m=read();
	for(ri i=1;i<=m;i++)
		p[i]=read();
	sort(p+1,p+m+1);
	for(ri i=1;i<=m;i++)
	{
		if(p[i]-p[i-1]>5000)
		{
			int d=(p[i]-p[i-1])%2520;
			if(d==0)
				d=2520;
			p[i]=p[i-1]+d;
		}
		vis[p[i]]=1;
	}
	l=min(l,p[m]+10);
	for(ri i=1;i<=l;i++)
	{
		dp[i]=1e9;
		for(ri j=s;j<=t;j++)
			if(i>=j)
			{
				if(vis[i]==1)
					dp[i]=min(dp[i],dp[i-j]+1);
				else
					dp[i]=min(dp[i],dp[i-j]);
			}		
	}
	int ans=1e9;
	for(ri i=p[m];i<=l;i++)
		ans=min(ans,dp[i]);
	cout<<ans<<"\n";		
	back 0;
}
```
