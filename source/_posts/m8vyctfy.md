---
title: "【题解】P1880 [NOI1995] 石子合并"
date: 2021-08-28 17:03:04
categories:
  - "题解"
luogu_lid: "m8vyctfy"
luogu_category: 2
original: "https://www.luogu.com.cn/article/m8vyctfy"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1880)

<!-- more -->

区间 $dp$ 典中典。

做法很一眼，记录 $dp[i][j]$ 为从 $i$ 合并到 $j$ 的最大分数，然后在 $[i,j)$ 中枚举断点 $k$ 即可。

环形问题直接断环为链，然后预处理一下前缀和，就可以得到当前合并的得分，显然 $[i,j]$ 最后一次合并的得分就是 $sum[j]-sum[i-1]$。

于是可以得到最大值的转移方程 $dp[i][j]=\max(dp[i][j],dp[i][k]+dp[k+1][j]+sum[j]-sum[i-1])$。求最小值同理。

但是需要考虑几个细节：

首先应该枚举区间长度 $len$ 和左端点 $i$， 并且 $2 \le len \le n$。如果直接枚举左右端点会出现中间值未处理的非法情况。

其次枚举左端点的时候要枚举到 $2n$。

时间复杂度 $O(n^3)$。

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
ll n,a[1001],dpmax[405][405],dpmin[405][405],sum[1001],maxx=-1,minn=1e9;
int main()
{
	n=read();
	for(ri i=1;i<=n;i++)
		a[i]=read(),a[i+n]=a[i];
	for(ri i=1;i<=n*2;i++)
		sum[i]=sum[i-1]+a[i];
	for(ri len=2;len<=n;len++)
		for(ri i=1;i<=2*n;i++)
		{
			int j=i+len-1;
			dpmin[i][j]=1e9;
			for(ri k=i;k<j;k++)
			{
				dpmax[i][j]=max(dpmax[i][j],dpmax[i][k]+dpmax[k+1][j]+(sum[j]-sum[i-1]));
				dpmin[i][j]=min(dpmin[i][j],dpmin[i][k]+dpmin[k+1][j]+(sum[j]-sum[i-1]));  
			} 
		}
	for(ri i=1;i<=n;i++)
		maxx=max(maxx,dpmax[i][i+n-1]),minn=min(minn,dpmin[i][i+n-1]);			
	cout<<minn<<"\n"<<maxx<<"\n";			
    back 0;
}
```
