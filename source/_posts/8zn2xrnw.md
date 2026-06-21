---
title: "【题解】P14635 [NOIP2025] 糖果店 / candy"
date: 2025-11-29 15:16:49
categories:
  - "题解"
tags:
  - "P14635"
luogu_lid: "8zn2xrnw"
luogu_category: 2
original: "https://www.luogu.com.cn/article/8zn2xrnw"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P14635)

UPD on 2025.12.3：通过了官方数据。

场外选手尝试签到。

考虑买一对的话只会反复买 $x+y$ 最小的那一颗，记为 $p$。

然后考虑方案数必然是买前 $k$ 小的 $x$ 糖果，然后剩下的钱都用来买成对的 $p$。

所以先按 $x$ 升序排序然后找到 $p$ 的位置，从小到大枚举 $k$ 比较答案即可。

注意买完成对的 $p$ 后，如果此前买的 $k$ 个 $x$ 糖果里包含 $p$，那么要判断剩下的钱是否够买 $\min\left\{a[k+1].x,a[p].y\right\}$；否则只需判断剩下的钱是否够买 $a[k+1].x$ 即可（此时必然有 $a[p].x>a[k+1].x$）。

可以证明，找 $p$ 的时候应该找 $p.x$ 最小的一个。

注意特判 $k=0$ 的情况。

时间复杂度 $O(n \log n)$。

代码：
```cpp
#include<bits/stdc++.h>
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
ll n,m,cnt,p,ans,mn=2e18;
struct node
{
	ll x,y;
}a[100005];
bool cmp(node a,node b)
{
	back a.x<b.x;
}
bool f;
int main() 
{
    n=read(),m=read();
    for(ri i=1;i<=n;i++)
    	a[i].x=read(),a[i].y=read();
    sort(a+1,a+n+1,cmp);	
    for(ri i=1;i<=n;i++)
		if(mn>a[i].x+a[i].y)
			mn=min(mn,a[i].x+a[i].y),p=i;
	ans=m/mn*2+(m%mn>=a[1].x); 
    for(ri i=1;i<=n;i++)
    {
    	if(m<a[i].x)
    		break;
    	m-=a[i].x,cnt++;
    	if(i==p)
    		f=1;
    	if(f)// p 已经买过一次 
    		ans=max(ans,cnt+m/mn*2+(m%mn>=a[p].y||i+1<=n&&m%mn>=a[i+1].x));
    	else
    		ans=max(ans,cnt+m/mn*2+(m%mn>=a[i+1].x));	
    }
    cout<<ans<<"\n";
	back 0;
}
```
