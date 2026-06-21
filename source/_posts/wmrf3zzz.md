---
title: "【题解】P4158 [SCOI2009]粉刷匠"
date: 2021-11-09 22:26:31
categories:
  - "文章"
luogu_lid: "wmrf3zzz"
luogu_category: 2
original: "https://www.luogu.com.cn/article/wmrf3zzz"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P4158)

这题我一眼就秒杀了，然而足足调了一周……

一看就是个弱智 dp 题，只要把所有可选区间都处理出来做个背包就完事了。

考虑预处理出第 $i$ 行的所有 $cnt_i$ 个单独区间 $[l,r]$，每段区间长度为 $r-l+1$。

考虑选取区间的最优方式必然是选取一段（或几段）连续的区间，于是可以 $O(nm^2)$ 预处理出所有可选取的区间 $sum_{l,r}$，代表区间 $[l,r]$ 的价值。

但是这个信息是不能做背包的，需要处理出第 $i$ 行选 $j$ 次的最大价值才能做背包。

那么考虑预处理第 $i$ 行选 $j$ 次的最大价值，记为 $a_{i,j}$。

这个东西直感 dp 不太好做，考虑记忆化搜索。

显然可以暴力 dfs，搜索状态也很好设计，直接记录当前可选区间的左端点 $ln$，当前已选择次数 $ti$，当前答案 $ans$ 即可。

但是这个复杂度肯定是过不了的。

考虑剪枝。显然的剪枝是记录当前状态的最大价值 $vis_{ln,ti}$，如果当前答案还没有这个最大价值大就直接退出。

事实上这个剪枝减掉了几乎所有情况，于是跑得飞快。

这样统计出 $a_{i,j}$ 之后，直接暴力做个背包即可。

设 $dp_{i,j}$ 为前 $i$ 行选了 $j$ 次的最大价值，于是就随便转移了。

时间复杂度 $O(nmt)$。

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
char c;
int n,m,t,cnt[55],l[55],r[55],sum[55][55];
int dp[55][2550],a[55][55],re[55][55];
int vis[55][55];
void dfs(int now,int tag,int ln,int ti,int ans)
{
	if(ti==tag||ln>cnt[now])
	{	
		a[now][tag]=max(a[now][tag],ans);
		back ;
	}	
	if(ans+(m-l[ln]+1)<=a[now][tag])
		back ; 
	if(vis[ln][ti]>=ans&&ans)
		back ;
	vis[ln][ti]=max(vis[ln][ti],ans);
	for(ri i=ln;i<=cnt[now];i++)
		if(sum[l[ln]][r[i]])
			dfs(now,tag,i+1,ti+1,ans+sum[l[ln]][r[i]]);		
	back ; 
}
int main()
{
	//freopen("data.in","r",stdin);
	//freopen("my.out","w",stdout);
	n=read(),m=read(),t=read();
	for(ri i=1;i<=n;i++)
		for(ri j=1;j<=m;j++)
			cin>>c,re[i][j]=c-'0';
	for(ri i=1;i<=n;i++)
	{	
		memset(l,0,sizeof(l));
		memset(r,0,sizeof(r));
		memset(sum,0,sizeof(sum));
		l[++cnt[i]]=1;
		if(m==1)
			r[cnt[i]]=1;
		for(ri j=2;j<=m;j++)
		{		
			if(re[i][j]!=re[i][j-1])
			{
				r[cnt[i]]=j-1;
				l[++cnt[i]]=j;
			}	
			if(j==m)
				r[cnt[i]]=j;
		}
		for(ri k=1;k<=cnt[i];k++)
			for(ri j=k;j<=cnt[i];j++)
			{
				int s=j-k+1;
				if(s%2)
					sum[l[k]][r[j]]=sum[l[k]][r[j-1]]+(r[j]-l[j]+1);
				else
					sum[l[k]][r[j]]=sum[l[k]][r[j-1]];
			}
		for(ri k=1;k<=cnt[i];k++)
			for(ri j=k;j<=cnt[i];j++)
				sum[l[k]][r[j]]=max(sum[l[k]][r[j]],(r[j]-l[k]+1)-sum[l[k]][r[j]]);
		for(ri j=1;j<=min(cnt[i],t);j++)
		{	
			memset(vis,0,sizeof(vis));
			dfs(i,j,1,0,0);	
		}		
	}
	for(ri i=1;i<=n;i++)
		for(ri j=1;j<=t;j++)
			for(ri k=0;k<=min(cnt[i],j);k++)
				dp[i][j]=max(dp[i][j],dp[i-1][j-k]+a[i][k]);
	cout<<dp[n][t]<<"\n"; 
	back 0;
}
```
