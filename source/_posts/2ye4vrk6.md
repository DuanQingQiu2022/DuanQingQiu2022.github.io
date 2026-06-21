---
title: "【题解】P3567 [POI 2014] KUR-Couriers"
date: 2025-11-25 23:55:30
categories:
  - "题解"
tags:
  - "二分"
luogu_lid: "2ye4vrk6"
luogu_category: 2
original: "https://www.luogu.com.cn/article/2ye4vrk6"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P3567)

<!-- more -->

这个题本身没啥好说的，$m$ 次询问求区间绝对众数一眼随机化，在区间里随机选 $k$ 个数判断其是否为答案，这样做不正确的概率显然不超过 $\dfrac{1}{2^k}$，$m$ 次询问中有错误的概率不超过 $1-(1-\frac{1}{2^k})^m$，$k$ 取到 20 以上就基本没问题了。

然后问题就转变为如何快速求一个数在区间中的出现次数。这个显然就对每个数开个 vector 存它出现的所有位置然后二分一下就可以了。

但是这样写会被卡常数，考虑更优美的写法。

正常思路是写成 upper_bound(r)-lower_bound(l)，但这样要做两次二分。

考虑只 lower_bound(l)，求出左端点 $L$ 后直接判断 vector 中 下标 $L+\left\lfloor{\dfrac{len}{2}}\right\rfloor$ 是否 $\le r$ 即可。

这样只需要一次二分即可完成目标。

然后另一个核心优化是二分之前先判断当前随机数在 $[1,n]$ 中出现次数是否超过区间长度一半，不合法就不用二分了。

加上以上这两个已经可以过了。当然，你还可以使用 Xorshift 代替 rand 或 mt19937 等较慢的随机数，或者在 $len$ 较小的时候使用确定性的摩尔投票法求解。

时间复杂度 $O(mk \log n)$。

放个代码吧。

```cpp
#include<bits/stdc++.h>
#define ll long long
#define back return
#define ri register int
#define ull unsigned ll
#define ld long double
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
const int N=5e5+50;
int n,m,a[N];
vector<int> p[N];
unsigned int x=19260817;
inline unsigned int Rand() 
{
    x^=(x<<5);
    x^=(x>>11);
    x^=(x<<54);
    back x;
}
int main()
{
	//srand(unsigned(time(0)));
	//mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());
	ios::sync_with_stdio(false);
	n=read(),m=read();
	for(ri i=1;i<=n;i++)
		a[i]=read(),p[a[i]].push_back(i);
	while(m--)
	{
		int l=read(),r=read();
		int j=0,f=0,len=r-l+1;
		if(len<=200)
		{
			int now=0,k=0,cnt=0;
			for(ri i=l;i<=r;i++)
			{
				if(!k)
					now=a[i];
				if(a[i]!=now)
					k--;
				else
					k++;
			}
			for(ri i=l;i<=r;i++)
				if(a[i]==now)
					cnt++;
			if(cnt*2>len)
				cout<<now<<"\n";		
			else
				cout<<0<<"\n";
			continue;
		}
		while(j<=20)
		{
			j++;
    		int id=Rand()%len+l,cur=a[id],siz=p[cur].size();
    		if(siz*2<=len)
    			continue;
			int st=lower_bound(p[cur].begin(),p[cur].end(),l)-p[cur].begin(),ed=st+len/2;
			if(ed<siz&&p[cur][ed]<=r)
            {
                f=1;
				cout<<cur<<"\n";
				break;
            }
		}
		if(!f)
			cout<<0<<"\n";
	}
	back 0;
}
```
