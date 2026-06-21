---
title: "【题解】P2024 [NOI2001] 食物链"
date: 2021-09-27 14:20:33
categories:
  - "题解"
tags:
  - "并查集"
luogu_lid: "jzit4mau"
luogu_category: 2
original: "https://www.luogu.com.cn/article/jzit4mau"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P2024)

<!-- more -->

扩展域并查集练手好题。

这题要维护 A、B、C 三类动物的关系。由于这个关系是一个环形，显然普通并查集是维护不了的，于是就需要使用扩展域并查集。

考虑开一个三倍大小的并查集，$[1,n]$ 存 A 类的所有动物，$[n+1,2n]$ 存 B 类的所有动物，$[2n+1,3n]$ 存 C 类的所有动物，每次操作分别更新这三类动物的关系。

对于操作 $1$，$x,y$ 是同类等价于 $x$ 不吃 $y$ 并且 $y$ 不吃 $x$，于是判断 $x$ 是否是 $y$ 的天敌和 $y$ 是否是 $x$ 的天敌即可，如果都不是，那么说明这句话是真话，要同时更新 A、B、C 三类动物的关系。具体来说，$x$ 的天敌必然是 $y$ 的天敌，$x$ 的食物必然是 $y$ 的食物，$x$ 的同类必然是 $y$ 的同类，分别合并即可。

对于操作 $2$，$x$ 吃 $y$ 等价于 $x,y$ 不是同类且 $y$ 不吃 $x$，判断一下即可，同样也要更新 A、B、C 三类动物的关系。

对上面说明的一些补充：记动物种类分别是 $A_x,B_x,C_x,A_y,B_y,C_y$。$A_x$ 和 $B_y$ 在一个集合内，说明 $x$ 吃 $y$。$A_x$ 和 $A_y$ 在一个集合内，证明 $x,y$ 是同类。以此类推进行合并操作即可。

还有题目中一些简单信息特判掉就行了。

由于只用了路径压缩，时间复杂度应该是 $O(klogn)$。

代码：

```cpp
#include<bits/stdc++.h>
#define ll long long
#define back return
#define ri register int
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
int n,k,sum,opt,fa[150005];
int find(int x)
{
    if(fa[x]==x)
        back x;
    back fa[x]=find(fa[x]);
}
int main()
{
    n=read(),k=read();
    for(ri i=1;i<=3*n;i++)
        fa[i]=i;
    for(ri i=1;i<=k;i++)
    {
        int x,y;
        opt=read(),x=read(),y=read();
        if(x>n||y>n)
        {
            sum++;
            continue;
        }
        if(opt==1)
        {
            if(find(x)!=find(y+n)&&find(x+n)!=find(y))// x 不吃 y && y 不吃 x 
                fa[find(x)]=find(y),fa[find(x+n)]=find(y+n),fa[find(x+2*n)]=find(y+2*n);// Ax Ay,Bx By,Cx Cy
            else
                sum++;
        }
        if(opt==2)
        {
            if(x==y)
            {
                sum++;
                continue;
            }
            if(find(x)==find(y)||find(x+n)==find(y))// x 与 y 同类 || y 吃 x 
                sum++;
            else
                fa[find(x)]=find(y+n),fa[find(x+n)]=find(y+2*n),fa[find(x+2*n)]=find(y); //Ax By,Bx Cy,Cx,Ay                                       
        }
    }
    cout<<sum<<"\n";
    back 0;
}
```
