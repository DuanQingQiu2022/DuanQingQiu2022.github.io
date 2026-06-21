---
title: "【题解】P1020 [NOIP1999 普及组] 导弹拦截"
date: 2021-09-24 23:22:17
categories:
  - "题解"
luogu_lid: "2zduboe4"
luogu_category: 2
original: "https://www.luogu.com.cn/article/2zduboe4"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1020)

<!-- more -->

题意：给你一个长度为 $n$ 的数列 $a_i$，求它的最长不上升子序列长度和最长上升子序列长度。

这题应该是板子题了……有一个十分经典的 $O(nlogn)$ 做法。

以第一问为例，考虑最长不上升子序列长度。

考虑维护一个长度为 $len$ 的数列 $d_i$，代表前 $i$ 个数中的最长不上升子序列长度为 $len$。由于我们只关心长度而不关心子序列的组成元素，因此我们只要保证 $len$ 单调不降即可，至于 $d_i$ 的具体值并不重要。

因此十分显然的维护：若 $d_{len}≥a_i$，$d_{len+1}=a_i$；若 $d_{len}<a_i$，那么找到 $d$ 中第一个比 $a_i$ 小的数 $d_j$，然后把 $d_j$ 更新成 $a_i$ 即可。

又因为 $d_i$ 是个单调不升的数列，因此直接二分查找一下即可，这样复杂度就是 $O(nlogn)$。（用 lower_bound 等也可）

求最长上升子序列同理，改一下不等式判断方向和二分细节即可。

这个做法为什么是正确的：

若 $d_{len}<a_i$，显然此时将 $d_j$ 替换成 $a_i$ 不会使 $len$ 变小；考虑 $d_j$ 的位置，若 $j=len$，那么将 $d_j$ 更新为 $a_i$ 会让后面的数可选择范围更大，显然严格不劣；如果 $j<len$，那么无论 $d_j$ 改成什么对以后的答案都没有影响（因为答案更新只取决于 $d_{len}$ 的大小）

于是就证明了这个做法的正确性。

代码：
```cpp
#include<bits/stdc++.h>
#define ll long long
#define ri register int
#define back return
using namespace std;
int n,a[100005],d[100005],len,x;
int main()
{
	while(cin>>a[++n]);
    n--;
	d[1]=a[1],len=1;
	for(ri i=2;i<=n;i++)
	{
		if(d[len]>=a[i])
			d[++len]=a[i];
		else
		{
			int l=1,r=len,mid=(l+r)/2;
			while(l<r)
			{
				if(d[mid]>=a[i])
					l=mid+1;
				else
					r=mid;
                mid=(l+r)/2;	
			}
			d[mid]=a[i];
		}
	}
	cout<<len<<"\n";
    for(ri i=1;i<=n;i++)
        d[i]=0;
    d[1]=a[1],len=1;
	for(ri i=2;i<=n;i++)
	{
		if(d[len]<a[i])
			d[++len]=a[i];
		else
		{
			int l=1,r=len,mid=(l+r)/2;
			while(l<r)
			{
				if(d[mid]>=a[i])
					r=mid;
				else
					l=mid+1;
                mid=(l+r)/2;	
			}
			d[mid]=a[i];
		}
	}
	cout<<len<<"\n";
	back 0;
}
```
