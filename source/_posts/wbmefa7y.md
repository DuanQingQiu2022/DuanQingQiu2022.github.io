---
title: "【题解】P1368 【模板】最小表示法"
date: 2022-03-09 17:56:46
categories:
  - "文章"
luogu_lid: "wbmefa7y"
luogu_category: 2
original: "https://www.luogu.com.cn/article/wbmefa7y"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1368)

都快省选了字符串还一点不会，赶紧退役不要拉低平均水平！！

题意：给 $n$ 个循环同构串，然后找出其中字典序最大的一个。

暴力：对所有的串遍历一遍，复杂度 $O(n^2)$。

发现这是一个环，所以断环为链，变成长度为 $2n$ 的链，记为 $s$。

这样对于每个 $1 \le i \le n$，可以用 $b_i$ 表示以 $i$ 开头，长度为 $n$ 的串。

然后考虑双指针扫描，假设第一个指针为 $i$，第二个指针为 $j$。

每次把 $i$ 和 $j$ 同时一位位向下移动，如果移动了 $n$ 次这两个串还是相等，那么这个串就是答案（感性理解显然）。

如果中途移动第 $k$ 次时，两个串不一样，即 $s_{i+k} \ne s_{j+k}$，那么停止移动。

不妨设 $s_{i+k}<s_{j+k}$，那么容易知道 $b_i$ 肯定不是答案。事实上，我们可以证明 $b_{i+1},b_{i+2}...b_{i+k}$ 都不是答案。

证明：$b_i$ 和 $b_j$  的前 $k-1$ 位相同。所以 $b_{i+p}(1 \le p \le k)$ 一定没有 $b_{j+p}$ 优，因为二者在 $s_{i+k}(s_{j+k})$ 之前的部分都相同，而 $s_{i+k}>s_{j+k}$，所以 $b_{i+p}$ 一定没有 $b_{j+p}$ 优。

这样我们就直接将 $i$ 移动至 $i+k+1$ 处继续扫描。当其中一个指针已经指向 $>n$ 位置的时候，就说明已经遍历了所有可能的串，这样位置较小的指针代表的串就是答案。

注意在扫描过程中，两个指针指向的位置不能相等，即恒有 $i \ne j$，如果 $i=j$ 则将某个指针向前移动一位即可。

由于两个指针均最多移动 $n$ 次，于是复杂度为 $O(n)$。

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
int n,a[600005];
int ans;
int main()
{
	n=read();
	for(ri i=1;i<=n;i++)	
		a[i]=read();
	for(ri i=n+1;i<=2*n;i++)
		a[i]=a[i-n];
	int i=1,j=2;
	while(i<=n&&j<=n)
	{
		int k=0;
		while(k<=n)
		{
			if(a[i+k]!=a[j+k])
				break;
			k++;
		}
		if(a[i+k]>a[j+k])
		{
			i=i+k+1;
			if(i==j)
				i++;
		}
		else
		{
			j=j+k+1;
			if(i==j)
				j++;
		}
		ans=min(i,j);
	}
	for(ri i=ans;i<=ans+n-1;i++)
		cout<<a[i]<<" ";
	cout<<"\n";
	back 0;
}
```
