---
title: "【题解】P1120 小木棍 ［数据加强版］"
date: 2021-10-09 13:07:34
categories:
  - "文章"
luogu_lid: "k7y1nv4n"
luogu_category: 2
original: "https://www.luogu.com.cn/article/k7y1nv4n"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1120)

<!-- more -->

**UPD：这份代码由于没有加二分优化，现在测修改后的数据会T一个点**

应该是一道搜索入门题……心态被这题搞崩了。

首先考虑可能的答案 $len$，若所有合法木棍的长度总和为 $sum$，则 $len$ 必然是 $sum$ 的约数，且 $len$ 必然大于所有合法木棍中最长木棍的长度。

于是考虑大力枚举 $len$，然后对每个可能的 $len$ 进行搜索。

搜索框架比较直观，若当前需要拼 $cnt$ 根原始木棍（$cnt=\dfrac{sum}{len}$)考虑设置搜索状态如下：当前在拼第 $now$ 根木棍，拼的这根木棍当前长度为 $ln$，上一根拼进来的小木棍为 $a_{last}$。

然后每次搜索时枚举所有没用过的木棍 $a_i$，如果 $a_i+ln \le len$ 就搜索，$now>cnt$ 时答案就是当前的 $len$。

这个爆搜差不多是 $O(n!)$ 的，考虑剪枝。

剪枝 $1$：考虑将木棍按长度排序，枚举时从大到小枚举，正确性显然。并且枚举时从 $a_{last}$ 开始枚举。

剪枝 $2$：失败标记。考虑爆搜时每次搜索失败都要回到 $a_{last}$ 重新枚举，这样前面已经搜索失败的木棍可能又会被再次搜索到，所以考虑删掉这些木棍。不妨设当前枚举到木棍 $a_i$，当搜索失败时令 $fail=a_i$，再枚举碰到 $fail$ 的时候就可以直接跳过。（注意回溯的时候要清空 $vis_i$）

剪枝 $3$：如果搜索失败之后发现当前长度为 $0$，那么说明当前可用木棍中最长的木棍都拼不进去，那么必然失败。

剪枝 $4$：如果搜索失败之后发现当前长度为 $len$，那么说明当前木棍即使拼好了也完不成，那么必然失败。

经过以上剪枝之后即可通过本题。

注意枚举 $len$ 时不要在循环内部定义！

代码：

```cpp
#include<bits/stdc++.h>
#define ri register int
#define back return
#define ll long long
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
int n,len,sum,cnt,a[105],vis[105];
bool cmp(int a,int b)
{
	back a>b;
}
bool dfs(int now,int ln,int last)
{
	if(now>cnt)
		back 1;
	if(ln==len)
		back dfs(now+1,0,1);
	int fail=0; 
	for(ri i=last;i<=n;i++)	
		if(!vis[i]&&ln+a[i]<=len&&fail!=a[i])
		{
			vis[i]=1;
			if(dfs(now,ln+a[i],i))
				back 1;
			fail=a[i];
			vis[i]=0;
			if(!ln||ln+a[i]==len)
				back 0;
		}
	back 0;
}
int main()
{
    n=read();
    for(ri i=1;i<=n;i++)
    {
    	int x;
    	x=read();
    	if(x<=50)
    		a[++cnt]=x,sum+=x;
    }
    n=cnt;
    sort(a+1,a+n+1,cmp);
    for(len=a[1];len<=sum;len++)
	{
		if(sum%len!=0)
			continue;
		cnt=sum/len;
		memset(vis,0,sizeof(vis));
		if(dfs(1,0,1))
		{
			cout<<len<<"\n";
			back 0;
		}
	}
    back 0;  
}

```
