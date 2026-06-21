---
title: "【题解】P2051 [AHOI2009]中国象棋"
date: 2022-04-04 23:10:21
categories:
  - "题解"
tags:
  - "动态规划"
  - "组合数学"
luogu_lid: "efs6dwu8"
luogu_category: 2
original: "https://www.luogu.com.cn/article/efs6dwu8"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P2051)

<!-- more -->

一个巨大的分类讨论 dp。

因为行和列都有限制，每行/每列都不能放 $\ge 3$ 个炮，考虑分开算行和列，设 $dp[i][j][k]$ 表示前 $i$ 行有 $j$ 列放了一个炮，$k$ 列放了两个炮的方案数。

然后分别讨论当前行不放炮，放一个炮，放两个炮的情况。

放一个炮分为在 $0$ 炮列上放和在 $1$ 炮列上放两种情况。

放两个炮分为两个都放在 $0$ 炮列上、两个都放在 $1$ 炮列上、一个在 $0$ 炮列上一个在 $1$ 炮列上三种情况。

然后一共有六种情况，判断一下边界直接讨论即可。

预处理 $dp[0][0][0]=1$。

时间复杂度 $O(nm^2)$。

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
const int mod=9999973;
ll n,m,ans,dp[105][105][105]; 
ll C(ll x)
{
	back (x*(x-1)/2)%mod;
}
int main()
{
	n=read(),m=read();
	dp[0][0][0]=1;
	for(ri i=1;i<=n;i++)
		for(ri j=0;j<=m;j++)
			for(ri k=0;k<=m-j;k++)
			{
				dp[i][j][k]=(dp[i][j][k]+dp[i-1][j][k])%mod;
				if(k>=1)
					dp[i][j][k]=(dp[i][j][k]+dp[i-1][j+1][k-1]*(j+1)%mod)%mod;
				if(j>=1)
					dp[i][j][k]=(dp[i][j][k]+dp[i-1][j-1][k]*(m-j-k+1)%mod)%mod;
				if(k>=1)
					dp[i][j][k]=(dp[i][j][k]+dp[i-1][j][k-1]*j%mod*(m-j-k+1)%mod)%mod;
				if(j>=2)
					dp[i][j][k]=(dp[i][j][k]+dp[i-1][j-2][k]*C(m-j-k+2)%mod)%mod;
				if(k>=2)
					dp[i][j][k]=(dp[i][j][k]+dp[i-1][j+2][k-2]*C(j+2)%mod)%mod;
			}
	for(ri i=0;i<=m;i++)
		for(ri j=0;j<=m;j++)
			ans=(ans+dp[n][i][j])%mod;
	cout<<ans%mod<<"\n";
	back 0;
}
```
