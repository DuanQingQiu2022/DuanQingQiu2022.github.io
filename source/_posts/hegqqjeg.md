---
title: "【题解】P7913 [CSP-S 2021] 廊桥分配"
date: 2021-11-16 23:20:00
categories:
  - "题解"
tags:
  - "堆"
  - "前缀和"
  - "贪心"
luogu_lid: "hegqqjeg"
luogu_category: 2
original: "https://www.luogu.com.cn/article/hegqqjeg"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P7913)

<!-- more -->

我也不知道为啥我考场降智没过这题。

明明考场上已经想到了关键结论，然而没想到怎么维护……最后喜提暴力分走人。

关键结论：如果在有 $n$ 个廊桥时，一架飞机被安排在第 $k$ 个廊桥，那么对于有 $m$ 个廊桥的情况（$m>n$），这架飞机依然会被安排在第 $k$ 个廊桥。

这个结论的证明：感觉是非常感性的……考虑 $n$ 个廊桥时，第 $k$ 个廊桥是编号最小的空廊桥，那么 $m$ 个廊桥时，第 $k$ 个廊桥必然也是编号最小的空廊桥。

因此可以假设有无限多个廊桥，只有停在前 $n$ 个廊桥的飞机才是合法情况。

那么思路就很清晰了：开一个小根堆，记录编号为 $id$ 的廊桥停着离开时间为 $x$ 的飞机，然后飞机来了就安排编号最小的廊桥停下，飞机走了就空出这个廊桥，记录每个廊桥停了多少架飞机。

但是问题是小根堆不支持查找元素，怎么动态维护编号。考场上想写平衡树，但是对自己 DS 水平太没信心了……

实际上只需要另开一个小根堆，记录当前空着的廊桥编号即可。每有一架飞机进入就将该廊桥弹出，走之后再加回来，就可以维护了。

以上就是主体部分。

统计答案也非常简单，考虑对于有 $i$ 个廊桥的情况，停在前 $i-1$ 个廊桥的飞机不变，又多了停在第 $i$ 个廊桥的飞机，两者相加即可。

最后暴力枚举两个航站区分别能分到的廊桥数，统计最大值即可。

时间复杂度 $O(m \log m)$。

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
int n,m1,m2,res=-1e9,cnt,rec[100005],sum1[100005],sum2[100005];
struct node
{
    int c,l;
}a[100005],b[100005];
bool cmp(node a,node b)
{
    back a.c<b.c;
}
struct build
{
	int x,id;
	build(int x_,int id_)
	{
		x=x_;
		id=id_;
	}
	friend bool operator < (build a,build b)
	{
		back a.x>b.x;
	}
};
struct space
{
	int rec;
	space(int rec_)
	{
		rec=rec_;
	}
	friend bool operator < (space a,space b)
	{
		back a.rec>b.rec;
	}
};
priority_queue<build> q;
priority_queue<space> s;
int main()
{
    //freopen("airport.in","r",stdin);
    //freopen("airport.out","w",stdout);
    n=read(),m1=read(),m2=read();
    for(ri i=1;i<=m1;i++)
        a[i].c=read(),a[i].l=read();
    for(ri i=1;i<=m2;i++)
        b[i].c=read(),b[i].l=read();
    sort(a+1,a+m1+1,cmp);
    sort(b+1,b+m2+1,cmp);
    for(ri i=1;i<=m1;i++)
    	s.push(i);
    for(ri i=1;i<=m1;i++)
    {
    	while(!q.empty())
    	{
    		if(a[i].c<q.top().x)
    			break;
    		s.push(q.top().id);
    		q.pop();
    	}
    	q.push(build(a[i].l,s.top().rec));
    	sum1[s.top().rec]++;
    	s.pop();
    }
    for(ri i=1;i<=n;i++)
    	sum1[i]+=sum1[i-1];
    while(!q.empty())
    	q.pop();
    while(!s.empty())
    	s.pop();
	for(ri i=1;i<=m2;i++)
	    s.push(i);
	for(ri i=1;i<=m2;i++)
    {
    	while(!q.empty())
    	{
    		if(b[i].c<q.top().x)
    			break;
    		s.push(q.top().id);
    		q.pop();
    	}
    	q.push(build(b[i].l,s.top().rec));
    	sum2[s.top().rec]++;
    	s.pop();
    }
    for(ri i=1;i<=n;i++)
    	sum2[i]+=sum2[i-1];
    for(ri i=0;i<=n;i++)
    	res=max(res,sum1[i]+sum2[n-i]);
    cout<<res<<"\n";
    back 0;
}
```
