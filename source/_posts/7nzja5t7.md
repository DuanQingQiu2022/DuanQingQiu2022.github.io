---
title: "【题解】P5664 [CSP-S2019] Emiya 家今天的饭"
date: 2021-09-01 14:20:47
categories:
  - "题解"
tags:
  - "动态规划"
  - "容斥原理"
  - "组合数学"
luogu_lid: "7nzja5t7"
luogu_category: 2
original: "https://www.luogu.com.cn/article/7nzja5t7"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P5664)

<!-- more -->

一道比较有价值的数数题。

一句话题意：给一个 $n \times m$ 的矩阵，每行至多选一个，每列至多选一半（向下取整），不能不选，求方案数。

正向思考的话，需要枚举很多变量，显然不好处理。（听说有一个四维的做法，但是并不太会写）正难则反，不妨考虑枚举不合法的方案数。

发现题目中的限制，只有每列至多选一半不好满足。那么显然不合法的方案中，只会有一列超过一半，那么可以 $O(m)$ 枚举不合法的列。

考虑在每行至多选一个的限制下，合法的方案数就是总方案数 $-$ 所有不合法的方案数。那么可以分别计算。

以下令 $sum[i]$ 表示第 $i$ 行矩阵元素的和。

先考虑总方案数。显然可设 $f[i][j]$ 表示前 $i$ 行选 $j$ 个的方案数，于是有 $f[i][j]=f[i-1][j]+f[i-1][j-1]*sum[i]$。 （在第 $i$ 行不选的方案数 $+$ 在第 $i$ 行任选一个的方案数）

于是总方案数就是 $\sum\limits_{i=1}^nf[n][i]$。

考虑计算不合法的方案数。

设不合法的列为 $l$，那么可以设 $dp[i][j][k]$ 为前 $i$ 行中，第 $l$ 列选了 $j$ 个，其他列中选了 $k$ 个的方案数，于是可以转移 $dp[i][j][k]=dp[i-1][j][k]+dp[i-1][j-1] \times a[i][l]+dp[i-1][j] \times (sum[i]-a[i][l])$。（在第 $i$ 行不选的方案数 $+$ 在第 $i$ 行 $l$ 列任选一个的方案数 $+$ 在第 $i$ 行除 $l$ 列外任选一个的方案数）

这样做显然是 $O(n^3m)$ 的，只能得到 $84pts$，考虑优化。

发现之前的转移中虽然枚举了 $j,k$，但是转移过程中并没有用到 $j,k$ 的具体数值，那么不妨直接枚举 $(j-k)$ 的值。

设 $dp[i][j]$ 为前 $i$ 行中，第 $l$ 列比其他列多选了 $j$ 个的方案数。

那么转移为 $dp[i][j]=dp[i-1][j]+dp[i-1][j-1] \times a[i][l]+dp[i-1][j+1] \times (sum[i]-a[i][l])$。（含义同上）

这样不合法的情况数量就是 $\sum\limits_{i=1}^ndp[n][i]$。

这样就可以压掉一维，复杂度变为 $O(n^2m)$，就能过了。

但是有个问题，在之前 $O(n^3m)$ 的转移时，$(j-k)$ 有可能是负值，但是 $O(n^2m)$ 转移枚举 $(j-k)$ 的时候，是直接将其当做数组下标进行处理的，这样会造成数组越界，导致一些奇怪的错误。于是我们需要运用一个小技巧，将 $O(n^2m)$ 的转移中的下标 $j$ 统一处理成 $j+n$ 即可。

时间复杂度 $O(n^2m)$.

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
    while(!isdigit(ch))
    {
        if(ch=='-') 
            f=-1;
        ch=getchar();
    }
    while(isdigit(ch))
    {
        x=x*10+ch-'0';
        ch=getchar();
    }
    back x*f;
}
ll mod=998244353;
ll n,m,res,a[105][2005],f[105][105],dp[205][205],sum[205];
int main()
{
	n=read(),m=read();
	for(ri i=1;i<=n;i++)
		for(ri j=1;j<=m;j++)
			a[i][j]=read(),sum[i]=(sum[i]+a[i][j])%mod;
	f[0][0]=1;
	for(ri i=1;i<=n;i++)
		for(ri j=0;j<=i;j++)
			f[i][j]=(f[i-1][j]+f[i-1][j-1]*sum[i]%mod)%mod;	
	for(ri i=1;i<=n;i++)
		res=(res+f[n][i])%mod;
	for(ri l=1;l<=m;l++)
	{
		memset(dp,0,sizeof(dp));
		dp[0][n]=1;
		for(ri i=1;i<=n;i++)
			for(ri j=n-i;j<=n+i;j++)
				dp[i][j]=(dp[i-1][j]+dp[i-1][j-1]*a[i][l]%mod+dp[i-1][j+1]*(sum[i]-a[i][l])%mod)%mod;
		for(ri i=1;i<=n;i++)
			res=(res-dp[n][n+i]+mod)%mod;
	}
	cout<<res<<"\n";
    back 0;
}
```
