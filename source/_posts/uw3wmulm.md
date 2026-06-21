---
title: "【题解】P5020 [NOIP2018 提高组] 货币系统"
date: 2021-07-17 23:50:20
categories:
  - "题解"
tags:
  - "背包"
  - "动态规划"
luogu_lid: "uw3wmulm"
luogu_category: 2
original: "https://www.luogu.com.cn/article/uw3wmulm"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P5020)

<!-- more -->

首先有一个显然的结论：$m≤n$。

证明很简单，因为最坏的情况下也可以把原来的货币系统抄一遍。

于是我们可以知道，$b$ 一定是 $a$ 的子集。证明显然。

因此，想要优化原先的货币系统，必然要删去原先 $a$ 中的一些元素。也就是说，原来 $a$ 中的某些元素是无用的，即可以被其他已有元素表示出来的。

于是问题转化为找到 $a$ 中能被其余元素表示的元素，这里认为 $a$ 是有序数列。

考虑设置状态。记 $f[i]$ 代表钱数为 $i$ 是否能被表示，如果是已有元素则 $f[i]=1$，能被表示则 $f[i]=2$，最后枚举一下所有 $f[i]=1$ 的个数即可。

小细节：枚举钱数是否能被表示时只需要枚举到 $a[n]$ 即可。因为可以发现，货币系统能够表示的货币周期为 $a[n]$，所以继续枚举是没有意义的。

时间复杂度 $O(Tna_i)$。

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
ll n,m,t,a[100005],f[100005]; 
int main()
{
	t=read();
	while(t--)
	{
		n=read();
		ll sum=0;
		memset(f,0,sizeof(f));	
		for(ri i=1;i<=n;i++)
		{
			a[i]=read();
			f[a[i]]=1;
		}	
		sort(a+1,a+n+1);
		for(ri i=1;i<=a[n];i++)
		{
			if(f[i]==1||f[i]==2)
			{
				for(ri j=1;j<=n;j++)
				{
					if(i+a[j]<=a[n])
						f[i+a[j]]=2;
				}
					
			}
		}
		for(ri i=1;i<=a[n];i++)
			if(f[i]==1)
				sum++;
		cout<<sum<<endl;
	}
    back 0;
}
```
