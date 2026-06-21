---
title: "【题解】P1364 医院设置"
date: 2022-02-12 22:59:53
categories:
  - "题解"
luogu_lid: "nxgcj4oh"
luogu_category: 2
original: "https://www.luogu.com.cn/article/nxgcj4oh"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1364)

<!-- more -->

这是一个求带权树重心的板子题。

如何线性求带权树重心？

设 $f_x$ 表示以 $x$ 为根的总距离和，$siz_x$ 表示以 $x$ 为根的子树大小。

然后先 dfs 预处理一下 $f_1$ 和 $siz_1$。

然后考虑转移，从 $u$ 到 $v$ 时，有 $f_v=f_u-siz_v+(siz_1-siz_v)$。因为以 $v$ 为根的子树从 $u$ 到 $v$ 距离减小 $1$，距离和减小 $siz_v$；其他部分的点从 $u$ 到 $v$ 距离增加 $1$，距离和增加 $siz_1-siz_v$。

直接转移找到 $f$ 最小的点即可，复杂度 $O(n)$。

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
int n,y,u,v,ans=1e9,f[105],siz[105],w[105];
int a[105][2];
void dfs1(int x,int fa,int dep)
{
	siz[x]=w[x];
	for(ri i=0;i<=1;i++)
	{
		int u=a[x][i];
		if(u==fa)
			continue;
		dfs1(u,x,dep+1);	
		siz[x]+=siz[u];
	}
	f[1]+=w[x]*dep;
}
void dfs2(int x,int fa)
{
	for(ri i=0;i<=1;i++)
	{
		int u=a[x][i];
		if(u==fa)
			continue;
		f[u]=f[x]+siz[1]-2*siz[u];
		dfs2(u,x); 
	} 
	ans=min(ans,f[x]);
}
int main()
{
	n=read();
	for(ri i=1;i<=n;i++)
	{
		w[i]=read(),u=read(),v=read();
		a[i][0]=u,a[i][1]=v;
	}
	dfs1(1,0,0);
	dfs2(1,0);
	cout<<ans<<"\n";
   	back 0;
}
```
