---
title: "【题解】P2114 [NOI2014] 起床困难综合症"
date: 2022-05-12 22:26:23
categories:
  - "题解"
luogu_lid: "nwmov3ku"
luogu_category: 2
original: "https://www.luogu.com.cn/article/nwmov3ku"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P2114)

<!-- more -->

题意：选一个 $[0,m]$ 的整数，使得它经过 $n$ 次给定位运算后结果最大，求这个最大结果。

首先要认识到 或，与，异或 这三种位运算都是不进位的，也就是每一位的结果独立。

所以直接对初始数二进制下的每一位贪心选取，从高到低考虑每一位填 $0$ 还是 $1$，可以 $O(n)$ 计算出这一位经过 $n$ 次位运算后的结果，贪心比较哪种更优。

同时注意如果当前位填 $1$ 之后大小超过了 $m$ 则不能填 $1$，计算的时候注意跟 $t_i$ 的对应位进行运算。

时间复杂度 $O(n \log t_i)$。

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
int n,m,ans,st,t[100005];
string s[100005];
int check(int bit,int x)
{
	for(ri i=1;i<=n;i++)
		if(s[i][0]=='A')
			x&=((t[i]>>bit)&1);
		else if(s[i][0]=='O')
			x|=((t[i]>>bit)&1);
		else
			x^=((t[i]>>bit)&1);
	back x;
}
int main()
{
	cin>>n>>m;
	for(ri i=1;i<=n;i++)
		cin>>s[i]>>t[i];
	for(ri i=29;i>=0;i--)
	{
		int res0=check(i,0),res1=check(i,1);
		if(st+(1<<i)<=m&&res1>res0)
			st+=(1<<i),ans+=(res1<<i);
		else
			ans+=(res0<<i);
	}
	cout<<ans<<"\n";
	back 0;
}
```
