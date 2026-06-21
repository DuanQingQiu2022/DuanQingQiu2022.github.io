---
title: "【题解】CF2183E LCM is Legendary Counting Master"
date: 2026-01-08 01:53:41
categories:
  - "题解"
tags:
  - "CF2183E"
luogu_lid: "8r7dj3ob"
luogu_category: 2
original: "https://www.luogu.com.cn/article/8r7dj3ob"
disableNunjucks: true
---

题意：给定一个长度为 $n$ 的序列 $a$，要求将区间内所有空位置替换为 $[1,m]$ 范围内的整数，使得序列满足 $a_1 < a_2 < \dots < a_n$，且 $S=\sum\limits_{i=1}^{n-1} \dfrac{1}{\text{lcm}(a_i,a_{i+1})} + \dfrac{1}{\text{lcm}(a_n,a_1)} \ge 1$。
   
求满足条件的方案数，模 $998244353$。

<!-- more -->

首先对于 $a_i<a_{i+1}$，有 $\dfrac{1}{\text{lcm}(a_i,a_{i+1})}=\dfrac{\gcd(a_i,a_{i+1})}{a_ia_{i+1}}\le\dfrac{1}{a_i}-\dfrac{1}{a_{i+1}}$。

于是 $S \le \dfrac{1}{a_1}-\dfrac{1}{a_n}+\dfrac{1}{\text{lcm}(a_n, a_1)} \le \dfrac{1}{a_1} \le 1$。

因此要使题设中的不等式成立，必有 $S=1$。

这意味着之前的每个不等式都要取等，一定有 $a_1=1,\gcd(a_i,a_{i+1})=a_{i+1}-a_i$。

不妨设 $a_{i+1}-a_i=d$，则 $\gcd(a_i,d)=d$，即两个相邻项之间的差值必须是前项的约数。

设 $f_{i,j}$ 表示第 $i$ 个数填 $j$ 的方案数，每次枚举 $a_i$ 的所有约数转移即可，答案即为 $\sum\limits_{j=1}^m f_{n,j}$。

时间复杂度 $O(nm \log m)$。

赛时代码：

```cpp
#include<bits/stdc++.h>
#define ll long long
#define back return
#define ri register int
#define ull unsigned ll
#define ld long double
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
ll ksm(ll a,ll b,ll p)
{
	ll ans=1,base=a;
	while(b)
	{
		if(b&1)
			ans=ans*base%p;
		base=base*base%p;
		b>>=1;
	}
	back ans;
}
const int p=998244353;
ll T,n,m,k,x,y,cnt,a[200005],dp[3005][3005];
vector<ll> d[3005];
void pre()
{
	for(ri i=1;i<=3005;i++)
		for(ri j=1;j*j<=i;j++)
			if(i%j==0)
			{
				d[i].push_back(j);
				if(j*j!=i)
					d[i].push_back(i/j);
			}
}
int main()
{
	pre();
	T=read();
	while(T--)
	{
		n=read(),m=read();
		for(ri i=1;i<=n;i++)
			a[i]=read();
		if(a[1]>1)
		{
			cout<<0<<"\n";
			continue;
		}
		a[1]=1;dp[1][1]=1;
		int lst=1,f=0;
		for(ri i=2;i<=n;i++)
		{
			if(!a[i])
				continue;
			if(a[i]<a[lst])
			{
				f=1;
				break;
			}
			lst=i;
		}
		if(f)
		{
			cout<<0<<"\n";
			continue;
		}		
		for(ri i=1;i<=n-1;i++)
			for(ri j=1;j<=m;j++)
			{
				if(!dp[i][j])
					continue;
				for(ri k=0;k<d[j].size();k++)
				{
					int now=d[j][k];				
					if(j+now>m||a[i+1]&&a[i+1]!=j+now)
						continue;
					dp[i+1][j+now]=(dp[i+1][j+now]+dp[i][j])%p;
				}
			}
		ll ans=0;
		for(ri i=1;i<=m;i++)
			ans=(ans+dp[n][i])%p;
		cout<<ans<<"\n";
		
		for(ri i=0;i<=n;i++)
			for(ri j=0;j<=m;j++)
				dp[i][j]=0;
	}
	back 0;
}

```
