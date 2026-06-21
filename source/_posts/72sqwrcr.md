---
title: "【题解】P2827 [NOIP2016 提高组] 蚯蚓"
date: 2021-12-10 23:31:17
categories:
  - "文章"
luogu_lid: "72sqwrcr"
luogu_category: 2
original: "https://www.luogu.com.cn/article/72sqwrcr"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P2827)

<!-- more -->

操作次数 $m \le 10^7$，显然需要 $O(1)$ 操作。

看到 $O(1)$ 操作的题，首先要想普通队列单调性。

考虑初始时数列单调递减，如果不考虑增加的长度 $q$，可以发现每次操作之后分成的两个部分分别单调递减。于是可以把这两个部分分别存放在不同队列中，原始序列也存放在一个队列中，这样就能保证这三个队列中的元素都是单调递减的。

但是棘手的是需要进行修改操作，这样就不能保证队列是单调递减的了。

考虑先不进行修改操作，类似线段树那样打一个延迟标记 $last$，表示这个值上一次被修改是第 $last$ 次操作时。那么每次操作时要取三个队列的队首元素最大值，取队首元素的时候顺带着更新一下元素值即可。

这样处理完之后可以发现三个队列仍然分别单调递减，于是可以在线性的复杂度内合并这三个队列，使得合并后序列仍然有序，合并方法同上述操作。注意合并的时候要将所有元素值都更新一次。

时间复杂度 $O(n \log n+m)$。

代码：

```cpp
#include<bits/stdc++.h>
#include<iostream>
#define ll long long
#define ri register int
#define back return
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
	ll x,last;
	node(ll x_,ll last_)
	{
		x=x_;
		last=last_;
	}
};
ll n,m,q,u,v,t,a[10000005];
queue<node> q1,q2,q3;
bool cmp(ll a,ll b)
{
	back a>b;
}
int main()
{
   	n=read(),m=read(),q=read(),u=read(),v=read(),t=read();
   	for(ri i=1;i<=n;i++)
   		a[i]=read();
   	sort(a+1,a+n+1,cmp);
	for(ri i=1;i<=n;i++)
		q1.push(node(a[i],1));
	for(ri i=1;i<=m;i++)
	{
		ll c1,c2,c3;
		if(q1.empty())
			c1=-1e14;
		else
			c1=q1.front().x+(i-q1.front().last)*q;
		if(q2.empty())
			c2=-1e14;
		else
			c2=q2.front().x+(i-q2.front().last)*q;
		if(q3.empty())
			c3=-1e14;
		else
			c3=q3.front().x+(i-q3.front().last)*q;
		if(c1>=c2&&c1>=c3)
		{
			if(i%t==0)
				cout<<c1<<" ";
			q1.pop(),q2.push(node(c1-u*c1/v,i+1)),q3.push(node(u*c1/v,i+1));
			continue;
		}	
		if(c2>=c1&&c2>=c3)	
		{
			if(i%t==0)
				cout<<c2<<" "; 
			q2.pop(),q2.push(node(c2-u*c2/v,i+1)),q3.push(node(u*c2/v,i+1));
			continue;
		}
		if(c3>=c2&&c3>=c1)
		{
			if(i%t==0)
				cout<<c3<<" ";
			q3.pop(),q2.push(node(c3-u*c3/v,i+1)),q3.push(node(u*c3/v,i+1));
			continue;
		}		
	}
	cout<<"\n";
	int cnt=0;
	while(!q1.empty()||!q2.empty()||!q3.empty())
	{
		ll c1,c2,c3;
		if(q1.empty())
			c1=-1e14;
		else
			c1=q1.front().x+(m-q1.front().last+1)*q;
		if(q2.empty())
			c2=-1e14;
		else
			c2=q2.front().x+(m-q2.front().last+1)*q;
		if(q3.empty())
			c3=-1e14;
		else
			c3=q3.front().x+(m-q3.front().last+1)*q;
		if(c1>=c2&&c1>=c3)
			a[++cnt]=c1,q1.pop();
		if(c2>=c1&&c2>=c3)	
			a[++cnt]=c2,q2.pop();
		if(c3>=c2&&c3>=c1)
			a[++cnt]=c3,q3.pop();
	}
	for(ri i=t;i<=cnt;i+=t)
		cout<<a[i]<<" ";
	back 0;
}
```
