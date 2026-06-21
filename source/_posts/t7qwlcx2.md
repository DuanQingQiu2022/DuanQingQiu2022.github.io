---
title: "【题解】P4555 [国家集训队]最长双回文串"
date: 2021-08-05 08:28:44
categories:
  - "题解"
tags:
  - "manacher"
  - "字符串"
  - "递推"
luogu_lid: "t7qwlcx2"
luogu_category: 2
original: "https://www.luogu.com.cn/article/t7qwlcx2"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P4555)

<!-- more -->

看到回文串，自然考虑 mancher 算法。如果把两个最长的回文串拼在一起，显然是满足题意的。

但是普通的 manacher 并不能维护这种信息，所以需要维护一些别的东西。

暴力怎么做？暴力就是 $O(n)$ 依次枚举断点再跑 manacher，这样做显然是 $O(n^2)$ 的，考虑优化这个暴力。

发现暴力的瓶颈在于每次枚举断点都要跑一遍 manacher。我们希望每次枚举断点能够 $O(1)$ 得到答案，那么自然想到使用 manacher 预处理。

由于 manacher 算法是枚举每一个字符，判断其最长回文串的半径，那么不妨令 $lt_i$ 为以字符 $i$ 为右端点的最长回文串长度，$rt_i$ 为以字符 $i$ 为左端点的最长回文串长度。考虑对于字符 $i$，它到右边界 $r$ 的距离为 $p_i-1$，那么我们在枚举字符 $i$ 的时候，可以顺带处理出目前已知字符串的右端点 $lt_{i+p_i-1}$ 和左端点 $rt_{i-p_i+1}$。那么断点就是已知回文串的对称中心，也就是说它们的最小值一定是左右端点到对称中心的距离，即 $p_i-1$。

预处理之后，考虑递推每一个 $rt_i$ 和 $lt_i$。由于之前记录的是对于字符 $i$ 的最大值，而这个最大值在局部并没有意义，因此需要递推转移。又因为显然特殊字符为断点是最优解，因此只需要递推所有特殊字符为断点的情况即可。

由于右端点每左移 $2$ 位，回文串长度至多 $-2$，因此显然的转移是  $lt_i=max({lt_{i+2}-2,lt_i})$，倒序转移。同理左端点每右移 $2$ 位，回文串长度至多 $-2$，因此转移是 $rt_i=max({rt_{i-2}-2,rt_i})$，正序转移。

递推之后，发现对于断点 $i$，答案就是 $lt_i+rt_i$。由于是特殊字符为断点，所以不需要考虑 字符 $i$ 本身，它对答案没有贡献。于是直接 $O(n)$ 枚举断点更新最大值即可。

细节：注意判断 $lt_i$ 和 $rt_i$ 非零。

时间复杂度 $O(n)$。

代码：
```cpp
#include<bits/stdc++.h>
#define ll long long
#define back return
#define ri register int
#define ull unsigned long long 
using namespace std;
char s[2000005],s1[2000005],s2[2000005];
int cnt=1,sum,p[2000005],lt[2000005],rt[2000005];
void read()
{
	char ch=getchar();
    while(ch>='a'&&ch<='z')
    {
      	s[++cnt]=ch;
      	s[++cnt]='*';
      	ch=getchar();
    }
}
void manacher(char s[],int len)
{
	memset(p,0,sizeof(p));
	int mid=0,r=0;
	for(ri i=1;i<=len;i++)
	{
		if(i<=r)
			p[i]=min(p[2*mid-i],r-i+1);
		else
			p[i]=1;
		while(s[i-p[i]]==s[i+p[i]]&&i-p[i]!=0)
			p[i]++;
		rt[i-p[i]+1]=max(rt[i-p[i]+1],p[i]-1);
		lt[i+p[i]-1]=max(lt[i+p[i]-1],p[i]-1);
		if(i+p[i]>r)
			r=i+p[i]-1,mid=i;
	}
}
int main()
{
	s[cnt]='*';
	read();
	manacher(s,cnt);
	for(ri i=1;i<=cnt;i+=2)
		rt[i]=max(rt[i-2]-2,rt[i]);
	for(ri i=cnt;i>=1;i-=2)
		lt[i]=max(lt[i+2]-2,lt[i]);
	for(ri i=1;i<=cnt;i+=2)
		if(lt[i]!=0&&rt[i]!=0)
			sum=max(sum,lt[i]+rt[i]);
	cout<<sum<<endl;
	back 0;
}
```
