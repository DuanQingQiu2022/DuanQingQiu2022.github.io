---
title: "【题解】CF2A Winner"
date: 2021-08-01 14:00:33
categories:
  - "题解"
luogu_lid: "hw7w0h4b"
luogu_category: 2
original: "https://www.luogu.com.cn/article/hw7w0h4b"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/CF2A)

<!-- more -->

一眼STL大法好。直接用 $map$ 映射存储每个选手的得分即可。

然后找出最大得分，记录哪些人的得分最高，再重新模拟一遍找出最先达到最高得分者即可。

注意判断最先达到最高得分时应为 $≥$ 而非 $=$。

时间复杂度 $O(nlogn)$。

代码：
```cpp
#include<bits/stdc++.h>
#include<iostream>
#define ll long long
#define back return
#define ri register int
#define ull unsigned long long 
using namespace std;
int read()
{
    int x=0,f=1;
    char ch=getchar();
    while(!isdigit(ch))
    {
        if (ch=='-') 
            f=-1;
        ch=getchar();
    }
    while(isdigit(ch))
    {
        x=x*10+ch-48;
        ch=getchar();
    }
    back x*f;
}
string s[10001];
int a[10001],n,cnt,maxx=-1e9;
map<string,int> m,flag;
int main()
{
	cin>>n;
	for(ri i=1;i<=n;i++)
	{
		cin>>s[i]>>a[i];
		m[s[i]]+=a[i];
	}	
	for(ri i=1;i<=n;i++)
		maxx=max(maxx,m[s[i]]);
	for(ri i=1;i<=n;i++)
		if(m[s[i]]==maxx)
			flag[s[i]]=1;
	m.clear();
	for(ri i=1;i<=n;i++)
	{
		m[s[i]]+=a[i];
		if(m[s[i]]>=maxx&&flag[s[i]]==1)
		{
			cout<<s[i]<<endl;
			back 0;
		}		
	}	
    back 0;
}
```
