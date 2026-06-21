---
title: "【乱搞】P1835 素数密度"
date: 2022-02-16 09:06:14
categories:
  - "文章"
luogu_lid: "xzy7ww2t"
luogu_category: 1
original: "https://www.luogu.com.cn/article/xzy7ww2t"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1835)

暴力过了这个题，随便写一写。

发现这个题上下界差值特别小，瓶颈在于如何筛素数。

可以先预处理出 5e4 以内的素数，这部分线性筛即可。

然后不打标记，直接对 $[L,R]$ 内的每一个数暴力枚举质因子即可。

注意特判一下 $1$ 不是素数。

这个东西确实很慢，但是由于不可能跑满，因此发挥比较稳定，不开 O2 会 TLE #10，开 O2 能过。

代码：

```cpp
#include<bits/stdc++.h>
#include<iostream>
#define ll long long
#define back return 
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
	back x*f;
}
int l,r,cnt,prime[50005],maxn=50005;
bool vis[50005];
void check()
{
	for(ri i=2;i<=maxn;i++)
	{
		if(!vis[i])
			vis[i]=1,prime[++cnt]=i; 
		for(ri j=1;i*prime[j]<=maxn;j++)
		{
			vis[i*prime[j]]=1;
			if(i%prime[j]==0)
				break;
		}		
	}
}
int main()
{
	int ans=0;
	check();
	l=read(),r=read();
	for(ri i=l;i<=r;i++)
	{
		if(i==1)
			continue;
		bool flag=0;
		for(ri j=1;j<=cnt;j++)
			if(i%prime[j]==0&&i!=prime[j])
			{
				flag=1;
				break;
			}
		if(!flag)		
			ans++;
	}
	cout<<ans<<"\n";
    back 0;
}
```


