---
title: "【题解】P4765 [CERC2014] The Imp"
date: 2025-05-09 17:02:20
categories:
  - "题解"
tags:
  - "动态规划"
  - "贪心"
  - "博弈论"
luogu_lid: "znhjw0sb"
luogu_category: 2
original: "https://www.luogu.com.cn/article/znhjw0sb"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P4765)

<!-- more -->

首先应该注意到双方都最优策略的情况下，双方都能够穷举所有情况并能看穿对方的决策，最终必然达成均衡状态，所以等价于你先选一个序列，然后恶魔再选择用几次魔法。

然后考虑这个序列怎么选。比较直观的一点是你肯定要先选 $v_i$ 较小的，即你选出的序列按 $v_i$ 升序排列。

这个很容易证明，如果 $v_1<v_2$，那么按照先 1 后 2 顺序贡献是 $\min(v_1-c_1,v_2-c_2-c_1)$，先 2 后 1 顺序贡献是 $\min(v_2-c_2,v_1-c_1-c_2)=v_1-c_1-c_2$，显然前者要优于后者。

所以实际上就是你选 $k+1$ 个物品然后看恶魔用几次魔法。

正常设置状态肯定是 $f_{i,j}$ 表示前 $i$ 个物品用了 $j$ 次魔法的答案。

考虑怎么转移。转移的意义是考虑第 $i$ 个物品能否作为第一个购买的，所以这个显然应该按 $v_i$ 降序来转移。（因为如果按照 $v_i$ 升序你只能维护最后一个）

然后转移方程就是 $f_{i,j}=\max(f_{i-1,j},\min(f_{i-1,j-1}-c_i,v_i-c_i))$。

初始化 $f_{i,0}=\max(f_{i-1,0},v_i-c_i)$。

单次时间复杂度 $O(nk)$。

```cpp
//行吧这题还要求放代码到底图啥呢搞不懂审核机制
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
int t,n,k;
ll dp[150005][10];
struct node
{
	ll c,v;
}a[150005];
bool cmp(node a,node b)
{
	back a.v>b.v;
}
int main()
{
	t=read();
	while(t--)
	{
		n=read(),k=read();
		for(ri i=1;i<=n;i++)
			a[i].v=read(),a[i].c=read();
		sort(a+1,a+n+1,cmp);
		dp[1][0]=max(0ll,a[1].v-a[1].c);
		for(ri i=2;i<=n;i++)
			dp[i][0]=max(dp[i-1][0],a[i].v-a[i].c);
		for(ri i=1;i<=n;i++)
			for(ri j=1;j<=min(i,k);j++)
				dp[i][j]=max(dp[i-1][j],min(dp[i-1][j-1]-a[i].c,a[i].v-a[i].c));
		cout<<dp[n][k]<<"\n";
	}
	back 0;
}
```
