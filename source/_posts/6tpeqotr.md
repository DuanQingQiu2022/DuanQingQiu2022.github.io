---
title: "【题解】CF1436B Prime Square"
date: 2021-03-29 21:39:33
categories:
  - "题解"
luogu_lid: "6tpeqotr"
luogu_category: 2
original: "https://www.luogu.com.cn/article/6tpeqotr"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/CF1436B)

<!-- more -->

显然是简单构造题，一般这种题都有通解。看到每个数都不是素数，首先想到 $0$ 和 $1$。

考虑只用 $0$ 和 $1$ 构造这个矩阵。由于每一行每一列最多只能有两个 $1$，自然想到螺旋阶梯形放置，这样就可以保证除了第一列和最后一行以外其余任意行列都有且仅有两个 $1$，最后再在矩形左下角补上一个 $1$ 即可。

示意图如下。

```cpp
1 1 0 0 0
0 1 1 0 0
0 0 1 1 0
0 0 0 1 1
1 0 0 0 1
```

时间复杂度 $O(tn^2)$。

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
bool flag;
int t,n,a[200005];
int main()
{
	cin>>t;
	while(t--)
	{
		cin>>n;
		for(ri i=1;i<=n;i++)
		{
			for(ri j=1;j<=n;j++)
			{
				if(j==i||j==i+1||(i==n&&j==1))
					cout<<1<<" ";
				else
					cout<<0<<" ";
			}
			cout<<endl;
		}						
	}
    back 0;
}
```
