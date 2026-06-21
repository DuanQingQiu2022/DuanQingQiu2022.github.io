---
title: "【题解】P4643 [国家集训队]阿狸和桃子的游戏"
date: 2021-03-14 19:53:20
categories:
  - "题解"
tags:
  - "贪心"
  - "博弈论"
luogu_lid: "iwhpcamv"
luogu_category: 2
original: "https://www.luogu.com.cn/article/iwhpcamv"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P4643)

<!-- more -->

这道题的思路比较巧妙。

双方在最优策略下选点，肯定会选点权最大的点。如果这道题没有边权，那就是道水题了，直接贪心选权值最大的点即可。

所以我们考虑，能否把边权转化为点权。

由于每个点都必须染色，那么对于任意一点，这个点一定属于阿狸或者桃子两人中的一个。那么如果对于 $u,v$ 两点，均属于同一个人，那么直接把连接 $u,v$ 两点的这条边 $e$ 的边权 $c(e)$ 平均加到两条边上即可。

如果不属于同一个人，由于我们只关心两个人得分的差值，那么这两个点的点权分别加上 $\dfrac{c(e)}{2}$，对最终结果不会有任何改变。

那么我们得出结论：对于每一个点，只需要将它的点权加上所有以它为端点的边的边权的一半即可。

直接根据这个思路进行处理，为了运算方便可以把所有权值都 $×2$，最后输出时再 $÷2$。

然后就可以暴力贪心，排序后输出所有偶数点的权值和 $-$ 所有奇数点的权值和。

时间复杂度 $O(nlogn+m)$。

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
int n,m,w[10005];
double sum1,sum2;
int main()
{
	n=read(),m=read();
	for(ri i=1;i<=n;i++)
	{
		w[i]=read();
		w[i]*=2;
	}	
	for(ri i=1;i<=m;i++)
	{
		int a,b,c;
		cin>>a>>b>>c;
		w[a]+=c;
		w[b]+=c;
	}
	sort(w+1,w+n+1);
	for(ri i=1;i<=n-1;i+=2)
		sum1+=w[i];
	for(ri i=2;i<=n;i+=2)
		sum2+=w[i];
	cout<<(sum2-sum1)/2<<endl;
    back 0;
}
```
