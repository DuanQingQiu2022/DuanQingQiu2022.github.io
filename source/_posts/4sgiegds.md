---
title: "【题解】P5322 [BJOI2019]排兵布阵"
date: 2021-09-18 14:09:51
categories:
  - "题解"
tags:
  - "背包"
  - "排序"
luogu_lid: "4sgiegds"
luogu_category: 2
original: "https://www.luogu.com.cn/article/4sgiegds"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P5322)

<!-- more -->

由于对手很多而派兵方案不变，所以贪心显然是最不可取的做法。

那么考虑 dp，显然可以设 $dp[i][j]$ 为前 $i$ 座城堡派出 $j$ 名士兵的最大得分。

但是这个东西并不能转移，还需要先处理一下已知条件。

设 $b[i][k]$ 为第 $i$ 座城堡击败 $k$ 个人所需要的最少兵力，$a[i][j]$ 为第 $j$ 个玩家在第 $i$ 座城堡所放置的兵力，那么将 $a[i][j]$ 按城堡序号从小到大排序，那么显然有 $b[i][k]=2\times a[i][k]+1$。

这样处理之后转移就很简单了。设第 $i$ 个城堡击败人数为 $k$，枚举一下 $k$ 即可。

转移方程就是 $dp[i][j]=\max(dp[i][j],dp[i-1][j-b[i][k]]+ik)$。

然后如果当前兵力小于 $b[i][k]$ 就从 $dp[i-1][j]$ 转移过来。

时间复杂度 $O(nms)$，常数似乎不大，所以能过。

代码：

```cpp
#include<bits/stdc++.h>
#define ll long long
#define ri register int
#define back return
using namespace std;
int read()
{
	int x=0,f=1;
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
int s,n,m,a[105][105],dp[105][20005],b[105][105],cnt[105];
int main()
{
	s=read(),n=read(),m=read();
	for(ri i=1;i<=s;i++)
		for(ri j=1;j<=n;j++)
			a[j][i]=read();
	for(ri i=1;i<=n;i++)
		for(ri j=1;j<=s;j++)
			b[i][j]=1e9;
	for(ri i=1;i<=n;i++)
		for(ri j=1;j<=s;j++)
			sort(a[i]+1,a[i]+s+1);
	for(ri i=1;i<=n;i++)
		for(ri j=1;j<=s;j++)
			b[i][j]=2*a[i][j]+1;			
	for(ri i=1;i<=n;i++)
		for(ri j=0;j<=m;j++)
			for(ri k=0;k<=s;k++)
				if(j>=b[i][k])
					dp[i][j]=max(dp[i][j],dp[i-1][j-b[i][k]]+i*k);
				else
					dp[i][j]=max(dp[i][j],dp[i-1][j]);
	cout<<dp[n][m]<<"\n";	
	back 0;
}
```
