---
title: "【题解】P2440 木材加工"
date: 2021-11-18 21:40:23
categories:
  - "题解"
tags:
  - "二分"
luogu_lid: "v28x5xsw"
luogu_category: 2
original: "https://www.luogu.com.cn/article/v28x5xsw"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P2440)

<!-- more -->

傻逼题。

$1 \le n \le 10^5$，考虑二分。

显然答案满足单调性，所以可以直接二分答案，暴力判断一下是否满足条件即可。

二分边界可以随便设，比如 $l=1,r=L_n$ 就不错。

时间复杂度 $O(n \log n)$。

代码：

```cpp
#include<bits/stdc++.h>
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
ll n,k,a[100005],ans=-1e9;
int main()
{
   	n=read(),k=read();
   	for(ri i=1;i<=n;i++)
   		a[i]=read();
   	sort(a+1,a+n+1);
   	int l=1,r=a[n];
   	while(l<=r)
   	{
   		ll mid=(l+r)/2,sum=0;
   		for(ri i=1;i<=n;i++)
   			sum+=a[i]/mid;
   		if(sum>=k)
   			l=mid+1,ans=max(ans,mid);
   		else
   			r=mid-1;
   	}
   	if(ans==-1e9)
   		cout<<0<<"\n";
   	else
   		cout<<ans<<"\n";
    back 0;
}
```
