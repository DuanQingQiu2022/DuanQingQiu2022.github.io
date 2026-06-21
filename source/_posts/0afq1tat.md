---
title: "【题解】CF525E Anya and Cubes"
date: 2022-05-18 13:18:30
categories:
  - "文章"
luogu_lid: "0afq1tat"
luogu_category: 2
original: "https://www.luogu.com.cn/article/0afq1tat"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/CF525E)

<!-- more -->

折半搜索练习题。

首先 $S \le 10^{16}$，打一个 $ \le 19$ 的阶乘表即可。

然后考虑每个数有 不选、选、选且阶乘 三种情况，暴力的话就是 $O(3^n)$。

考虑优化，折半搜索能够使用当且仅当有优于暴力枚举复杂度的合并方法。（折半搜索本质上是把状态分成两半，然后低复杂度合并两边的合法状态数，如果暴力用状态数平方枚举复杂度会退化）

考虑记录前一半使用 $i$ 次阶乘，和为 $j$ 的方案数 $ans_{i,j}$，然后枚举后一半的方案数，这样当后一半枚举出一个合法方案时可以直接 $O(n)$ 枚举合并，复杂度 $O(n\times 3^{\frac{n}{2}})$。

代码：

```cpp
#include<bits/stdc++.h>
#define ll long long
#define ull __int128
#define ri register int
#define back return
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
ll n,k,s,ans,fac[35],a[35]; 
unordered_map<ll,ll> ans1[35]; 
void dfs1(int now,ll sum,int cnt)
{
	if(sum>s)
		back ;
	if(now>n/2)
	{
		ans1[cnt][sum]++;
		back ;
	}
	dfs1(now+1,sum,cnt);
	dfs1(now+1,sum+a[now],cnt);
	if(cnt<k&&a[now]<=19)
		dfs1(now+1,sum+fac[a[now]],cnt+1);
}
void dfs2(int now,ll sum,int cnt)
{
	if(sum>s)
		back ;
	if(now>n)
	{
		for(ri i=0;i<=k-cnt;i++)
			ans+=ans1[i][s-sum];
		back ;
	}
	dfs2(now+1,sum,cnt);
	dfs2(now+1,sum+a[now],cnt);
	if(cnt<k&&a[now]<=19)
		dfs2(now+1,sum+fac[a[now]],cnt+1);
}
int main()
{
   	n=read(),k=read(),s=read();
   	for(ri i=1;i<=n;i++)
   		a[i]=read();
   	fac[0]=0,fac[1]=1;
   	for(ri i=2;i<=19;i++)
   		fac[i]=fac[i-1]*i;
   	dfs1(1,0,0);
   	dfs2(n/2+1,0,0);
   	cout<<ans<<"\n";
    back 0;
}
```
