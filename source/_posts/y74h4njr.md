---
title: "【题解】P2613 【模板】有理数取余"
date: 2021-09-08 12:34:41
categories:
  - "文章"
luogu_lid: "y74h4njr"
luogu_category: 2
original: "https://www.luogu.com.cn/article/y74h4njr"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P2613)

这模板就挺离谱的。

求 $\dfrac{a}{b} \bmod 19260817$，$a,b\le 10^{10001}$。

下记 $p=19260817$。

$p$ 是质数，所以不难发现这玩意就是一个费马小定理求逆元的板子题。瓶颈在于 $a,b$ 过大。

由于 $a^b \bmod p=(a \bmod p)^b \bmod p$，那么 $\dfrac{a}{b} \bmod p=a \times b^{p-2} \bmod p=(a \bmod p) \times (b \bmod p)^{p-2} \bmod p$。

然后写快读的时候边输入边取模，用快速幂求一下 $b^{p-2}$ 就完事了。

时间复杂度 $O(logp+|a|)$，其中 $|a|$ 为 $a$ 的数字位数。

（不判无解也能 AC）

代码：
```cpp
#include<bits/stdc++.h>
#define ll long long
#define ri register int
#define back return
#define ull unsigned ll
using namespace std;
const int mod=19260817;
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
		x=(x*10+ch-'0')%mod;
		ch=getchar();
	}
	back x*f%mod;
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
ll a,b;
int main()
{
	a=read(),b=read();
	cout<<a*ksm(b,mod-2,mod)%mod<<"\n";
	back 0;
}
```
