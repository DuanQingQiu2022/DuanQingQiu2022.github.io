---
title: "【题解】P1199 [NOIP2010 普及组] 三国游戏"
date: 2021-10-12 13:25:48
categories:
  - "题解"
luogu_lid: "10qaxcc0"
luogu_category: 2
original: "https://www.luogu.com.cn/article/10qaxcc0"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1199)

<!-- more -->

博弈论好玩！

容易看出这个计算机总是亦步亦趋地跟着人选，也就是说计算机的下一步完全是被人控制的，所以计算机必不可能赢。

但是人想取到任何一个武将的最大默契值都不可能，因为选择该武将之后，计算机就会把另一个与他默契最高的选走。

因此人只能取一个武将的次大默契值。那么只需要统计出所有武将的次大默契值，取其中最大值即可。

时间复杂度 $O(n^2)$。

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
int a[550][550],sec[550];
int main()
{
	n=read();
	for(ri i=1;i<=n-1;i++)
		for(ri j=i+1;j<=n;j++)
			a[i][j]=read(),a[j][i]=a[i][j];
	for(ri i=1;i<=n;i++)
	{
		int maxx=-1;
		for(ri j=1;j<=n;j++)
			maxx=max(maxx,a[i][j]);
		for(ri j=1;j<=n;j++)
			if(a[i][j]!=maxx)
				sec[i]=max(sec[i],a[i][j]);	
	}
	sort(sec+1,sec+n+1);
	cout<<1<<"\n"<<sec[n]<<"\n";
	back 0;
}
```
