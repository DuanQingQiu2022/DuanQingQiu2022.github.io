---
title: "【题解】P1433 吃奶酪"
date: 2022-05-12 21:36:40
categories:
  - "题解"
tags:
  - "状压DP"
luogu_lid: "vq018jct"
luogu_category: 2
original: "https://www.luogu.com.cn/article/vq018jct"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1433)

<!-- more -->

状压板子。

首先根据三角不等式，重复走一个点肯定是不优的，所以不妨设每个点最多被经过一次（三点共线情况不算在内，不影响结果）

然后这就是一个起点确定的哈密顿回路，不重不漏经过 $n$ 个点恰好一次。

设 $dp_{i,j}$ 表示当前经过的点集合为 $i$，当前位置为点 $j$ 的最小长度，由于点 $j$ 只会被经过一次，所以必定是从 $i$ 中的其他点转移而来的，枚举 $i$ 中的所有点转移即可。

时间复杂度 $O(n^22^n)$。

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
int n;
double ans=1e9,dp[70005][20],x[1005],y[1005];
double dis(double x,double y,double xx,double yy)
{
	back sqrt((xx-x)*(xx-x)+(yy-y)*(yy-y));
}
int main()
{
	cin>>n;
	for(ri i=1;i<=n;i++)
		cin>>x[i]>>y[i];
	memset(dp,127,sizeof(dp));
	dp[1][0]=0;
	for(ri i=1;i<(1<<(n+1));i++)
		for(ri j=0;j<=n;j++)
			if((i>>j)&1)
				for(ri k=0;k<=n;k++)
				{
					int now=i^(1<<j);
					if((now>>k)&1)
						dp[i][j]=min(dp[i][j],dp[now][k]+dis(x[k],y[k],x[j],y[j]));
				}
	for(ri i=0;i<=n;i++)
		ans=min(ans,dp[(1<<(n+1))-1][i]);
	cout<<fixed<<setprecision(2)<<ans<<"\n";
	back 0;
}
```
