---
title: "【题解】P3805 【模板】manacher 算法"
date: 2021-08-04 15:44:31
categories:
  - "文章"
luogu_lid: "vmxx3qr9"
luogu_category: 2
original: "https://www.luogu.com.cn/article/vmxx3qr9"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P3805)

<!-- more -->

算法实现：枚举字符串中的所有字符，记录以每个字符为中心的回文串半径，最后找出最大值即可。

具体操作：记 $p_i$ 为以第 $i$ 个字符为中心的回文串半径，$mid$ 表示已知所有右侧回文串中最靠右的对称中心，$r$ 表示已知所有回文串的最右边界。为了避免字符串长度奇偶不一产生的问题，在每个字符两边加一个特殊字符，这样显然回文串的性质不发生改变，不会影响最终结果。

记新得到的字符串为 $s$，依次枚举 $s$ 中每个字符，对于第 $i$ 个字符 $s_i$ ，它关于 $mid$ 对称字符为 $s_{2mid-i}$，那么对于 $i<r$，即现在枚举的字符在已知范围内的情况，要么它与它的对称字符半径相同，要么它的半径就是它到右边界的距离，那么显然的转移是 $p_i=min(p_{2mid-i},r-i+1)$。

通过以上转移得到 $p_i$ 值后，按照题意不断更新 $p_i$ 和 $r$，求出 $p_i$ 的最大值 $p_{max}$ 即可，注意枚举时数组不能越界。

但是此时的字符串并不是输入的字符串。输入字符串长度为 $n$，而现在的字符串长度为 $2n+1$。因此实际回文串的长度应为 $p_{max}-1$。

这样做的复杂度是线性的。因为每更新 $p_i$ 和 $r$ 之后，$r$ 是单调递增，因此更新 $p_i$ 的过程相当于使 $r$ 不断逼近 $2n+1$，因此这部分复杂度是 $O(n)$。

时间复杂度 $O(n)$。

代码：
```cpp
#include<bits/stdc++.h>
#define ll long long
#define back return
#define ri register int
#define ull unsigned long long 
using namespace std;
char s[22000005];
int cnt=1,sum=-1e9,p[22000005];
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
int main()
{
	s[cnt]='*';
	read(); 
	int mid=0,r=0;
	for(ri i=1;i<=cnt;i++)
	{
		if(i<=r)
			p[i]=min(p[2*mid-i],r-i+1);
		while(s[i-p[i]]==s[i+p[i]]&&i-p[i]!=0)
			p[i]++;
		if(i+p[i]>r)
			r=i+p[i]-1,mid=i;
		sum=max(sum,p[i]);
	}
	cout<<sum-1<<endl;
	back 0;
}
```
