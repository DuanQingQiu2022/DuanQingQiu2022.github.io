---
title: "【题解】P2508 [HAOI2008]圆上的整点"
date: 2021-07-08 23:21:02
categories:
  - "文章"
luogu_lid: "ag9pbgj1"
luogu_category: 2
original: "https://www.luogu.com.cn/article/ag9pbgj1"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P2508)

题目要求 $x^2+y^2=r^2$，即 $x^2=(r+y)(r-y)$。

令 $gcd(r+y,r-y)=u$，则显然有 $r+y=a^2u$，$r-y=b^2u$

于是有 $x=abu$，$y=\dfrac{(b^2-a^2)u}{2}$，$(a^2+b^2)=\dfrac{2r}{u}$。

可以枚举所有 $2r$ 的约数 $u$，然后对于每一个 $u$，枚举满足条件的 $a$ 并求出 $b$，然后判断所得的 $a,b,x,y$ 是否满足题意即可。

注意到这样枚举一定会产生重复，因此每组合法解在一个象限内对答案的贡献为 $1$，即对答案的总贡献为 $4$。

这样枚举会忽略整点在坐标轴上的情况。显然一个圆必定与坐标轴共有 $4$ 个交点且均为整点，因此答案应该 $+4$。

时间复杂度不太会算，大约就是 $O(\sqrt{r})$。

代码：
```cpp
#include<bits/stdc++.h>
#define ll long long
#define back return
#define ri register int
#define ull unsigned long long
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
ll gcd(ll a,ll b)
{
	if(!b)
		back a;
	back gcd(b,a%b); 
}
ll flag,cnt;
ll r,sum;
void maindo(ll n)
{
	ll u=2*r/n;
	for(ri i=1;i<=sqrt(n/2);i++)
	{
		ll a=i,b=sqrt(n-i*i),x=a*b*u,y=(b*b-a*a)*u/2;	
		if(a*a+b*b==n&&gcd(a,b)==1&&y>0&&x*x+y*y==r*r)
			sum+=4;
	}
			
}
int main()
{
	cin>>r;
	for(ri i=1;i<=sqrt(2*r);i++)
	{
		if(2*r%i==0)
		{
			maindo(2*r/i);
			if(i*i!=2*r)
				maindo(i);
		}
	}
	cout<<sum+4<<endl;
    back 0;
}
```
