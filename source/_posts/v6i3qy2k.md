---
title: "【题解】P1308 [NOIP2011 普及组] 统计单词数"
date: 2021-07-28 21:51:05
categories:
  - "题解"
tags:
  - "字符串"
  - "模拟"
luogu_lid: "v6i3qy2k"
luogu_category: 2
original: "https://www.luogu.com.cn/article/v6i3qy2k"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1308)

<!-- more -->

写这篇主要是记录几个字符串的常见操作，这道题本身没有什么好说的。

细节 $1$：输入方式 `getline`，避免被吞空格。

细节 $2$：两边加空格，防止匹配子串的时候匹配到单词中间连续的一段。

细节 $3$：巧用 `string::npos`。（`find` 函数返回 `string::npos 
` 时代表查找没有匹配）
    
细节 $4$：巧用 `find ` 函数。` b.find(a)` 指在字符串 $b$ 中寻找子串 $a$。`b.find(a,c+1)` 指从 $b$ 的第 $c+1$ 个字符开始查找子串 $a$。 `find` 函数的返回值是查找到的第一个位置，若查找失败则返回 `string::npos`。
    
其余部分就直接按题意模拟即可。

时间复杂度 $O(|S|)$。

代码：
```cpp
#include<bits/stdc++.h>
#include<iostream>
#define ll long long
#define back return
#define ri register int 
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
ll sum,ans,lsbl;
string a,b;
int main()
{
    getline(cin,a);
    getline(cin,b);
    int la=a.size(),lb=b.size();
    for(ri i=0;i<la;i++)
    	if(a[i]>=97)
    		a[i]-=32;
    for(ri i=0;i<lb;i++)
    	if(b[i]>=97)
    		b[i]-=32;
    a=' '+a+' ';
    b=' '+b+' ';
    if (b.find(a)==string::npos)
	{
        cout<<-1<<endl;
        back 0;
    }
    ans=lsbl=b.find(a);
    while(lsbl!=string::npos)
	{
        sum++;
        lsbl=b.find(a,lsbl+1);
    }
    cout<<sum<<" "<<ans<<endl;
    back 0;
}
```
