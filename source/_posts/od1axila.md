---
title: "【题解】P14835 [THUPC 2026 初赛] 又一个 01 串问题"
date: 2025-12-25 14:09:52
categories:
  - "题解"
tags:
  - "贪心"
  - "位运算"
luogu_lid: "od1axila"
luogu_category: 2
original: "https://www.luogu.com.cn/article/od1axila"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P14835)

<!-- more -->

THUPC 2026 G。

赛时想了一个很搞笑的贪心就是倒序遍历往较短的序列里加 1，较长的序列里加 0，被随便卡掉了。

::::info[Hack]
考虑字符串为 1110010100 即可。
::::

后来对拍了一下发现组成答案的两个串中，其中一个必然形如前缀全是 0，后缀全是 1 的结构。这个显然就相当于有一个串全是 1，其余的数组成另一个串。

那么问题转化为从最左边取出 $k$ 个 1 组成一个数，其余的位置组成另一个数，求满足两个数之和最小的 $k$。

考虑当前有一个 1 在原串的第 $i$ 位上，即它后面还有 $n-i$ 位。显然往已经有 $k$ 个 1 的数里再添加一个 1，它对这个数的贡献是 $2^k$。如果不加入它的话，它对另一个数的贡献是 $2^{n-i}$。因此满足 $k<n-i$ 就加进去。

扫一遍原串求出 $k$ 之后直接求和即可。

这个策略的证明也比较直观。如果全 1 串中间有 0 的话它必然可以成为另一个串的前导 0，如果全 1 串末尾有 0 的话它前面的 1 必然已经被加过了，所以它也可以成为另一个串的前导 0，就证完了。

时间复杂度 $O(n)$。

代码：

```cpp
#include<bits/stdc++.h>
#define ll long long
#define back return
#define ri register int
#define ull unsigned ll
#define ld long double
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
ll ksm(ll a,ll b,ll p)
{
	ll ans=1,base=a;
	while(b)
	{
		if(b&1)
			ans=ans*base%p;
		base=base*base%p;
		b>>=1;
	}
	back ans;
}
ll T,n,m,p,ans[500500];
char c[500500];
vector<int> b1,b2;
int main()
{
	cin>>T;
	while(T--)
	{
		ll sum=0,k=0,id=0;
		cin>>n;
		for(ri i=1;i<=n;i++)
			cin>>c[i];
		for(ri i=1;i<=n;i++)
			if(c[i]=='1')
			{
				if(k<n-i)
					id=i,k++,b1.push_back(c[i]-'0');
				else
					break;
			}
		for(ri i=n;i>=1;i--)
		{
			if(i<=id&&c[i]=='1')
				continue;
			b2.push_back(c[i]-'0');
		}
		int mx=max(b1.size(),b2.size());
		for(ri i=0;i<mx;i++)
		{
			ll n1=0,n2=0;
			if(i<b1.size())
				n1=b1[i];
			if(i<b2.size())
				n2=b2[i];
			ans[i+1]=(ans[i]+n1+n2)/2,ans[i]=(ans[i]+n1+n2)%2;
		}		
		bool f=0;
		for(ri i=mx;i>=0;i--)
		{
			if(ans[i]==1&&!f)
				f=1;
			if(f)
				cout<<ans[i];	
		}
		if(!f)
			cout<<0;
		cout<<"\n";
		b1.clear(),b2.clear();
		for(ri i=0;i<=mx;i++)
			ans[i]=0;
	}
	back 0;
}
```
