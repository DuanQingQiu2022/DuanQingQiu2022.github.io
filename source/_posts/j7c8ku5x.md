---
title: "【题解】P1525 [NOIP2010 提高组] 关押罪犯"
date: 2021-09-28 13:21:38
categories:
  - "文章"
luogu_lid: "j7c8ku5x"
luogu_category: 2
original: "https://www.luogu.com.cn/article/j7c8ku5x"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1525)

<!-- more -->

这似乎依然是一道扩展域并查集板子题……

由于只需要使第一个事件的冲突值最小，显然可以贪心，于是将 $m$ 个事件按冲突值从大到小排序。

考虑对于当前事件 $(i,j)$，如果能分开 $i$ 和 $j$ ，那么一定要分开。也就是说要维护两个集合，显然需要使用并查集。但是普通并查集是维护不了两个集合的，因此需要开两个并查集。

考虑设 $[1,n]$ 代表监狱 A，$[n+1,2n]$ 代表监狱 B。如果 $A_x$ 和 $A_y$ 在同一集合中，代表 $x$ 与 $y$ 在同一监狱，会发生冲突；如果 $A_x$ 和 $B_y$ 在同一集合中，代表 $x$ 与 $y$ 在不同监狱，不会发生冲突。

然后按冲突值从大到小枚举每个事件，如果对于当前事件 $(i,j)$，$A_i$ 和 $A_j$ 已经在同一集合内，那么答案即为该事件的冲突值；否则分别将 $A_x,B_y$ 和 $A_y,B_x$ 合并。

注意如果都没有冲突，要输出 $0$。

时间复杂度 $O(mlogm)$。

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
ll n,m,sum,opt,fa[150005];
ll find(ll x)
{
    if(fa[x]==x)
        back x;
    back fa[x]=find(fa[x]);
}
struct node
{
	ll x,y,w;
}a[500005];
bool cmp(node a,node b)
{
	back a.w>b.w;
}
int main()
{
    n=read(),m=read();
    for(ri i=1;i<=2*n;i++)
        fa[i]=i;
    for(ri i=1;i<=m;i++)
    	a[i].x=read(),a[i].y=read(),a[i].w=read();
    sort(a+1,a+m+1,cmp);
    for(ri i=1;i<=m;i++)
    {
    	if(find(a[i].x)==find(a[i].y))
    	{
    		cout<<a[i].w<<"\n";
    		back 0;
    	}
    	else
			fa[find(a[i].x+n)]=find(a[i].y),fa[find(a[i].x)]=find(a[i].y+n);	
    }
    cout<<0<<"\n";
    back 0;
}
```
