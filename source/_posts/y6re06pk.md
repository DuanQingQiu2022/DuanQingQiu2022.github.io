---
title: "【题解】P5174 圆点"
date: 2021-02-03 20:36:10
categories:
  - "文章"
luogu_lid: "y6re06pk"
luogu_category: 2
original: "https://www.luogu.com.cn/article/y6re06pk"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P5174)

<!-- more -->

数据范围 $R\le 10^{14}$，直接暴力 $O(R)$ 枚举显然过不了，考虑优化。

考虑对于圆内任意一个整点 $(x,y)$，该点所贡献的答案是 $x^2+y^2$。又因为  $x^2+y^2\le R$，因此 $y\le \sqrt{R-x^2}$，从而可以对于每一个 $x$ 计算一个象限内所有以 $x$ 为横坐标的点的权值和。

如果对于任意一个 $x$，设圆内以 $x$ 为横坐标的点的纵坐标最大值为 $n$,那么所求的权值和  $ans=\sum\limits_{i=1}^n(x^2+i^2)=\sum\limits_{i=1}^ni^2+nx^2=nx^2+\dfrac{n(n+1)(2n+1)}{6}$。

然后对这个式子直接枚举 $x$ 暴力求和，最后答案乘 $4$ 即可。复杂度 $O(\sqrt{R})$，可以通过。

然而直接求这个式子会爆 long long，所以每一次运算中间都需要取模，然后写个乘逆元即可。（$6$ 在模 $1e9+7$ 意义下的逆元是 $166666668$）

时间复杂度 $O(\sqrt{R})$。

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
const int mod=1e9+7;
ll R,sum;
int main()
{
	cin>>R;
	for(ll i=0;i<=sqrt(R);i++)
	{
		ll ymax=sqrt(R-i*i);
		sum+=((ll)(ymax*i%mod*i%mod)+(ll)ymax%mod*(ymax+1)%mod*(2*ymax+1)%mod*166666668%mod)%mod;
		sum%=mod;
	}	
	cout<<sum*4%mod<<endl;
    back 0;
}
```
