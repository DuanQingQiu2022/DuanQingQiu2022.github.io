---
title: "【题解】P2397 yyy loves Maths VI (mode)"
date: 2021-08-28 18:40:10
categories:
  - "题解"
tags:
  - "模拟"
luogu_lid: "6bpsazzi"
luogu_category: 2
original: "https://www.luogu.com.cn/article/6bpsazzi"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P2397)

<!-- more -->

摩尔投票法的模板题。

摩尔投票法：当一个数的重复次数超过数组长度的一半，每次将两个不相同的数删除，最终剩下的就是要找的数。

证明相当直观，考虑极限情况下至少会有一个数剩下，那么这个数必然是答案，于是就证明了这个结论。

基于这个结论，每次记录出现次数最多的数，和这个数现在出现的次数即可，如果当前读入的数不是出现次数最多的数就将出现次数最多的数出现次数 $-1$ ，如果出现次数 $\le0$ 就将出现次数最多的数更新成当前值即可。

时间复杂度 $O(n)$，空间复杂度 $O(1)$，优于桶排序。

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
    while(!isdigit(ch))
    {
        if(ch=='-') 
            f=-1;
        ch=getchar();
    }
    while(isdigit(ch))
    {
        x=x*10+ch-'0';
        ch=getchar();
    }
    back x*f;
}
ll n,cnt,sum,maxx;
int main()
{
	n=read();
	while(n--)
	{	
		ll a;
		a=read();
		if(a==maxx)
			sum++;
		else
			sum--;
		if(sum<=0)
			maxx=a,sum=0;
	}
	cout<<maxx<<"\n";
    back 0;
}
```
