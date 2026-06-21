---
title: "【题解】P2158 [SDOI2008] 仪仗队"
date: 2021-10-07 22:15:10
categories:
  - "题解"
luogu_lid: "uiqte2s6"
luogu_category: 2
original: "https://www.luogu.com.cn/article/uiqte2s6"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P2158)

<!-- more -->

这似乎是欧拉函数的板子……就先当欧拉函数学习笔记吧。

欧拉函数 $φ(n)$ ：$1\sim n$ 中与 $n$ 互质的数的个数。

计算公式：$φ(n)=n \times\prod\limits_{p|n}^{}(1-\dfrac{1}{p})$（$p$ 为质数）

证明大概需要容斥一下，略去吧。

于是根据这个公式，求欧拉函数只需要分解质因数即可。

然后利用埃氏筛，可以轻易做到 $O(nlogn)$ 求 $1\sim n$ 的欧拉函数。（通过一些优化可以用线性筛做到 $O(n)$ 递推）

回头看这道题，观察可知除了 $(1,1),(1,2),(2,1)$ 以外的其余点 $(x,y)$，它能够被看到当且仅当 $x≠y$ 且 $\gcd(x,y)=1$。考虑对于 $n \times n$ 的方阵来说，能被看到的所有点关于直线 $y=x$ 对称，因此只需要统计其中一半即可。

不妨令 $x<y$，发现有 $2 \le x<y \le n$，那么其实只需要处理一个 $(n-1) \times (n-1)$ 的方阵即可。于是处理一下 $2 \sim (n-1)$ 的欧拉函数，最后加上之前没算的三个点即可。

答案就是 $3+2 \times \sum\limits_{i=2}^{n-1}φ(i)$。

时间复杂度 $O(nlogn)$。

代码：

```cpp
#include<bits/stdc++.h>
#define ri register int
#define back return
#define ll long long
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
int n,phi[40005];
ll ans;
void euler(int n)
{
	for(ri i=2;i<=n;i++)
		phi[i]=i;
	for(ri i=2;i<=n;i++)
		if(phi[i]==i)
			for(ri j=i;j<=n;j+=i)
				phi[j]=phi[j]/i*(i-1);
}
int main()
{
    n=read();
    if(n==1)
    {
    	cout<<0<<"\n";
    	back 0;
    }
    euler(n);
    for(ri i=2;i<=n-1;i++)
    	ans+=phi[i];
    cout<<2*ans+3<<"\n";
    back 0;  
}
```
