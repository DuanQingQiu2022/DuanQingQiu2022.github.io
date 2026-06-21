---
title: "【题解】P1156 垃圾陷阱"
date: 2021-10-12 12:55:30
categories:
  - "文章"
luogu_lid: "slvugm0x"
luogu_category: 2
original: "https://www.luogu.com.cn/article/slvugm0x"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1156)

<!-- more -->

本来是一道 dp 练习题，但是突然不想推 dp 式子了，于是看到如此小的数据范围果断一发记忆化搜索。

定义搜索状态 $dfs(ti,hi,cnt)$ 代表当前还能存活时间为 $ti$，当前高度为 $hi$，当前已经扔了 $cnt$ 个垃圾。

考虑几个搜索出口：

如果当前 $ti$ 已经活不到扔下一个垃圾，那么它必然要死，于是可以直接返回当前最大存活时间。

如果它能活到扔下一个垃圾，那么判断一下是否能出去，如果能出去就输出扔下一个垃圾的时间。

然后注意标记一下奶牛到底能不能出去，能出去就输出最小时间，不能出去就输出最大时间。有个小坑，当出不去时不要更新标记（因为只要有一种能出去的方案，那么最大存活时间就没有意义了）

向下搜索的时候就分别搜索 $dfs(ti+f_{cnt},hi,cnt+1)$ 和 $dfs(ti,hi+h_{cnt},cnt+1)$ 两种情况即可。

注意 $1 \le f_i \le 30,1 \le t_i \le 1000,1 \le G \le 100$，所以最长存活时间最长可能达到 $4000$，因此记忆化数组的第一维必须要开到 $4000$ 以上。

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
struct node
{
	int t,f,h;
}a[105];
bool cmp(node a,node b)
{
	if(a.t==b.t)
		back a.h>b.h;
	back a.t<b.t;
}
int d,g,maxx=-1,minn=1e9;
bool flag,f[4100][110][110];
void dfs(int ti,int hi,int cnt)
{	
	if(f[ti][hi][cnt])
		back ;
	f[ti][hi][cnt]=1;
	if(ti+a[cnt-1].t<a[cnt].t)
	{
		maxx=max(maxx,ti+a[cnt-1].t);
		back ;
	}	
	ti-=(a[cnt].t-a[cnt-1].t);	
	if(hi+a[cnt].h>=d)
	{
		flag=1;
		minn=min(minn,a[cnt].t);
		back ;
	}		
	dfs(ti+a[cnt].f,hi,cnt+1);
	dfs(ti,hi+a[cnt].h,cnt+1);
	back ;
}
int main()
{
	d=read(),g=read();
	for(ri i=1;i<=g;i++)
		a[i].t=read(),a[i].f=read(),a[i].h=read(); 
	sort(a+1,a+g+1,cmp);
	a[g+1].t=1e9+7;
	dfs(10,0,1);
	if(!flag)
		cout<<maxx<<"\n";
	else
		cout<<minn<<"\n"; 
	back 0;
}
```
