---
title: "【题解】P5661 [CSP-J2019] 公交换乘"
date: 2021-02-28 15:33:49
categories:
  - "题解"
luogu_lid: "koebbe3b"
luogu_category: 2
original: "https://www.luogu.com.cn/article/koebbe3b"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P5661)

<!-- more -->

CSP-J 2019 T2。

直接按照题意模拟即可，用两个普通队列分别存储每张优惠票的价格和它过期的时间。

每次输入前检查一遍是否有过期的优惠票，如果有就把它弹出队列。

坑点是可能会出现符合条件的优惠票不在队首的情况，这个时候就要遍历整个队列，找到需要使用的优惠票并弹出。

但是为了保证优惠票时间单调递增，需要依次将队首元素放入队尾，然后弹出队首元素，即可实现弹出正确优惠票后队列依然保持单调递增。

时间复杂度$O(45n)$，一般跑不满。

代码：

```cpp
#include<bits/stdc++.h>
#include<iostream>
#define ll long long
#define back return
#define ri register int
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
struct node
{
	int p,t,flag;
}a[100005];
int n,sum,flag1,cnt; 
queue<int> q;
queue<int> ti;
int main()
{
	n=read();
	for(ri i=1;i<=n;i++)
	{
		a[i].flag=read();
		a[i].p=read();
		a[i].t=read();
		while(!ti.empty()&&a[i].t-ti.front()>45)
			q.pop(),ti.pop();		
		if(a[i].flag==0)
		{
			q.push(a[i].p);
			ti.push(a[i].t);
			sum+=a[i].p;
		}	
		if(a[i].flag==1)
		{
			if(!q.empty())
			{
				int lq=q.size();
				for(ri j=1;j<=lq;j++)
				{
					if(q.front()>=a[i].p&&flag1==0)
					{
						q.pop();
						ti.pop();
						flag1=1;
					}
					else
					{
						q.push(q.front());
						ti.push(ti.front());
						q.pop();
						ti.pop();
					}
				}
			}		
			if(flag1==0)
				sum+=a[i].p;
		}
		flag1=0;
	}		
	cout<<sum<<endl;	
	back 0;
}
```
