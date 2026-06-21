---
title: "【题解】P3939 数颜色"
date: 2022-01-22 23:26:26
categories:
  - "文章"
luogu_lid: "v6epgrh0"
luogu_category: 1
original: "https://www.luogu.com.cn/article/v6epgrh0"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P3939)

这个真的是经典诈骗题了。

我每次第一眼看到这题就想带修莫队，明显是 DS 学魔怔了。而且带修莫队啥也过不了。

考虑小清新做法，直接对每个颜色开一个 vector 记录其出现的位置，然后对于每个询问暴力二分，每个交换操作直接按题意模拟即可。注意交换的时候如果 $a_x=a_{x+1}$ 就不用换。

这个题修改操作太垃圾了，因此随便用 vector 乱搞一下就过了。

时间复杂度 $O(m \log n)$。

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
int n,m,a[300005]; 
vector<int> q[300005];
int main()
{
	n=read(),m=read();
	for(ri i=1;i<=n;i++)
		a[i]=read();
	for(ri i=1;i<=n;i++)
		q[a[i]].push_back(i);
	while(m--)
	{
		int opt=read();
		if(opt==1)
		{
			int l=read(),r=read(),c=read();
			int fir=lower_bound(q[c].begin(),q[c].end(),l)-q[c].begin();
			int sec=--upper_bound(q[c].begin(),q[c].end(),r)-q[c].begin();
			cout<<sec-fir+1<<"\n";
		}
		else
		{
			int x=read();
			if(a[x]==a[x+1])
				continue;
			int f1=lower_bound(q[a[x]].begin(),q[a[x]].end(),x)-q[a[x]].begin();
			int f2=lower_bound(q[a[x+1]].begin(),q[a[x+1]].end(),x+1)-q[a[x+1]].begin();
			q[a[x]][f1]++,q[a[x+1]][f2]--;
			swap(a[x],a[x+1]);
		}
	}
    back 0;
}
```



