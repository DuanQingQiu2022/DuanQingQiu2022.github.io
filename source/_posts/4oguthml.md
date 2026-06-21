---
title: "【题解】P3628 [APIO2010]特别行动队"
date: 2022-02-09 23:43:30
categories:
  - "题解"
luogu_lid: "4oguthml"
luogu_category: 2
original: "https://www.luogu.com.cn/article/4oguthml"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P3628)

<!-- more -->

十年前的 APIO 还会考斜优板子，十年后的 APIO 我都不知道出了些什么神仙题……当然这个可能在当时也是神仙题……OI 界进步太可怕了……

感慨一下。不难看出这题是个斜优板子。

直接设 $dp_i$ 为前 $i$ 个士兵分成若干批的最大战斗力，不难写出转移方程 $dp_i=\max_{0 \le j<i} \left\{dp_j+{a(s_i-s_j)^2+b(s_i-s_j)+c}\right\}$，其中 $s_i$ 为前缀和。

打开有 $dp_i=dp_j+a{s_i}^2-2as_is_j+a{s_j}^2+bs_i-bs_j+c$。

根据斜率式 $b=y-kx$，整理可得 $b=dp_i+a{s_i}^2+bs_i+c,y=dp_j+a{s_j}^2,k=2as_i+b,x=s_j$。

然后要让 $dp_i$ 最大，就要维护一个上凸壳。由于 $k$ 是单调递减的（$a<0$），所以 $b$ 单调递增，于是只需要保留上凸壳斜率 $\le k$  的部分（必须取等），每次取凸壳左端点即可得到最优解。

单调队列维护即可，时间复杂度 $O(n)$。

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
ll n,a,b,c,t[1000005],s[1000005],dp[1000005];
ll q[1000005],l,r; 
double slope(ll i,ll j)
{
	back (dp[j]-dp[i]+a*(s[j]*s[j]-s[i]*s[i]))/(s[j]-s[i]);
}
int main()
{
	//freopen("s1.in","r",stdin);
    n=read();
    a=read(),b=read(),c=read();
    for(ri i=1;i<=n;i++)
    	t[i]=read();
    for(ri i=1;i<=n;i++)
		s[i]=s[i-1]+t[i];
	l=1,r=1;
	for(ri i=1;i<=n;i++)
	{
		ll k=2*a*s[i]+b;
		while(l<r&&slope(q[l],q[l+1])>k)
			l++;
		int j=q[l];
		dp[i]=dp[j]+a*(s[i]-s[j])*(s[i]-s[j])+b*(s[i]-s[j])+c;
		while(l<r&&slope(q[r-1],q[r])<=slope(q[r],i))
			r--;
		q[++r]=i;
	}
    cout<<dp[n]<<"\n";
   	back 0;
}
```
