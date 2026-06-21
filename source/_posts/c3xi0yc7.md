---
title: "【题解】CF1436A Reorder"
date: 2021-04-11 22:30:34
categories:
  - "题解"
luogu_lid: "c3xi0yc7"
luogu_category: 2
original: "https://www.luogu.com.cn/article/c3xi0yc7"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/solution/CF1436A)

<!-- more -->

题面求 $\sum_{i=1}^n\sum_{j=i}^n\dfrac{a_j}{j}$。

直接将式子展开，

$\sum_{i=1}^n\sum_{j=i}^n\dfrac{a_j}{j}$

$=\dfrac{a_1}{1}+\dfrac{a_2}{2}+\dfrac{a_2}{2}+...+\dfrac{a_n}{n}$

$=a_1+a_2+...+a_n$

$=\sum_{i=1}^na_i$

然后直接判断 $\sum_{i=1}^na_i$ 是否和 $m$ 相等即可。

时间复杂度 $O(tn)$。

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
	while(!isdigit(ch))
    {
        if (ch=='-') 
            f=-1;
        ch=getchar();
    }
	while(isdigit(ch))
    {
        x=x*10+ch-48;
        ch=getchar();
    }
	back x*f;
}
bool flag;
int t,n,m,a[200005];
int main()
{
	cin>>t;
	while(t--)
	{
		cin>>n>>m;
		ll sum=0;
		for(ri i=1;i<=n;i++)
		{
			a[i]=read();
			sum+=a[i];
		}
		if(sum==m)
			cout<<"YES"<<endl;
		else
			cout<<"NO"<<endl;
	}
    back 0;
}
```
