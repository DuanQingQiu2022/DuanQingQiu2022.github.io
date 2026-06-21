---
title: "【题解】P5431 【模板】乘法逆元 2"
date: 2021-09-07 13:24:16
categories:
  - "文章"
luogu_lid: "2wexelap"
luogu_category: 2
original: "https://www.luogu.com.cn/article/2wexelap"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P5431)

<!-- more -->

这题主要考察一些模运算的基本操作和奇怪的科技。

先推个式子。

令 $s=\prod\limits_{i=1}^na_i$，则 $\sum\limits_{i=1}^n\dfrac{k^i}{a_i}=\sum\limits_{i=1}^n\dfrac{k^i \times s/a_i}{s}$。

逐项分析，$\sum\limits_{i=1}^nk^i$ 可以直接 $O(n)$ 递推（不会真有人跟我一样 nt 用 $O(nlogn)$ 快速幂吧），$s/a_i$ 可以转化为 $\prod\limits_{j=1}^{i-1}a_i \times \prod\limits_{j=i+1}^na_i$，这样可以 $O(n)$ 预处理前缀积和后缀积，只需要最后除以一次 $s$ 即可。

显然除以 $s$ 需要写成 $\times s$ 的逆元。由于此题模数 $p$ 为质数，可以直接使用费马小定理求逆，跑一遍快速幂即可。

这样只需要一次求逆，时间复杂度 $O(n)$。

细节：如果分别预处理前缀积，后缀积和 $\sum\limits_{i=1}^nk^i$的值会 MLE。因此需要处理完前缀积和后缀积后，用之前输入的数组 $a_i$ 处理 $\sum\limits_{i=1}^nk^i$ 的值即可。

代码：
```cpp
#include<bits/stdc++.h>
#define back return
#define ll long long
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
ll ksm(ll a,ll b,ll p)
{
	ll ans=1,base=a;
	if(p==1)
		back 0;
	while(b>0)
	{
		if(b&1)
			ans=ans*base%p;
		base=base*base%p;
		b/=2;
	}
	back ans%p;
}
ll n,p,k,res;
ll a[5000005];
ll pre[5000005],suf[5000005];
int main()
{
	n=read(),p=read(),k=read();
	pre[0]=1;//前缀积 
	suf[n+1]=1;//后缀积 
	for(ri i=1;i<=n;i++)
	{
		a[i]=read();
		pre[i]=pre[i-1]*a[i]%p;
	}
	for(ri i=n;i>=1;i--)
		suf[i]=suf[i+1]*a[i]%p;
	a[0]=1;
	for(ri i=1;i<=n;i++)
		a[i]=a[i-1]*k%p;
	for(ri i=1;i<=n;i++)
		res+=pre[i-1]*suf[i+1]%p*a[i]%p; 
	printf("%lld",res%p*ksm(pre[n],p-2,p)%p);
	back 0;
}
```
