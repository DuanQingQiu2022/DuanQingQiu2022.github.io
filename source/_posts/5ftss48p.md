---
title: "【题解】P7273 ix35 的等差数列"
date: 2021-10-13 23:57:56
categories:
  - "题解"
luogu_lid: "5ftss48p"
luogu_category: 2
original: "https://www.luogu.com.cn/article/5ftss48p"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P7273)

<!-- more -->

这题真的好巧妙啊……

一个十分直观的思路是暴力枚举公差 $d$。（$0 \le d \le \dfrac{w}{n-1}$）

怎么判断修改次数呢？根据等差数列的定义，有 $a_1+d \times (i-1)=a_i$，直接判断 $a_i$ 是否等于 $a_1+d \times (i-1)$。

但是这样做永远不会改变 $a_1$ 的值，所以是个显然的假做法。

考虑正解怎么做。不难发现应该寻找修改次数最少的 $a_1$。那么可以统计当第 $i$ 项确定为 $a_i$ 时，数列首项 $a_1$ 是否需要修改。于是将上面的式子变形，得到 $a_1=a_i-d \times (i-1)$，令 $b_{d,a_i-d \times (i-1)}$ 代表公差为 $d$ 时，$a_1$ 需要修改的最大次数，用 $n$ 减去最大次数即可。

注意特判 $n=1$ 的情况。

坑点：数列的每一项必须是 $[1,w]$ 内的正整数，所以修改后的 $a_1>0,a_n \le w$，需要特判掉不合法的情况。

时间复杂度 $O(w)$。

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
int d,n,w,maxx=-1,a[300005];
unordered_map<int,unordered_map<int,int> >b;
int main()
{
	n=read(),w=read();
	for(ri i=1;i<=n;i++)
		a[i]=read();
    if(n==1)
    {
        cout<<0<<"\n";
        back 0;
    }
	for(ri d=0;d<=w/(n-1);d++)
		for(ri i=1;i<=n;i++)
            if(a[i]+d*(n-i)<=w&&a[i]-d*(i-1)>0)
			    b[d][a[i]-d*(i-1)]++,maxx=max(maxx,b[d][a[i]-d*(i-1)]);				
	cout<<n-maxx<<"\n";		
	back 0;	
}
```
