---
title: "【题解】P4168 [Violet]蒲公英"
date: 2022-01-22 22:53:51
categories:
  - "文章"
luogu_lid: "na1shawm"
luogu_category: 1
original: "https://www.luogu.com.cn/article/na1shawm"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P4168)

我已经写过这个分块好多遍了……然后还是调了很久很久，感觉自己行将就木。

考虑分块，设块数为 $t$。

预处理出 $sum_{i,j}$ 代表块 $i$ 到块 $j$ 的众数，$cnt_{i,j}$ 代表这个众数的出现次数。显然在求出 $sum_{i,j-1}$ 的基础上，可以在 $O(\dfrac{n}{t})$ 的时间内求出 $sum_{i,j}$，而一共有 $t^2$ 个区间，因此预处理复杂度是 $O(nt)$。

同时预处理出每个数值在序列中出现的位置，对每个数值开 vector 存一下，当然需要离散化。不过这里对大小没有要求，因此直接给每个数值编号就行。

然后考虑每次询问的时候，如果 $l,r$ 在一个块内，那就直接暴力扫一遍；如果 $l,r$  不在同一块内，设 $l$ 在第 $p$ 个块，$r$ 在第 $q$ 个块，那么可以把区间分成三部分：$[l,R_p],[L_{p+1},R_{q-1}],[L_q,r]$。

然后 $[L_{p+1},R_{q-1}]$ 这部分已经求过了，所以只需要求 $[l,R_p]$ 和 $[L_q,r]$ 内的数分别出现了多少次。然后在每个数的 vector 内部二分查找一下第一个 $ \ge l$ 的下标和最后一个 $\le r$ 的下标即可。

时间复杂度 $O(nt+\dfrac{mn \log n}{t})$，$n,m$ 同阶，取 $t= \sqrt{n \log n}$，最终复杂度为 $n \sqrt{n \log n}$。

细节是每次预处理 $sum_{i,j}$ 时要将初始值设为 $sum_{i,j-1}$ 再处理。

代码：

```cpp
#include<bits/stdc++.h>
#include<iostream>
#define ll long long
#define back return 
#define ri register int 
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
int n,m,t,len,a[40005],pos[40005],maxx[40005],L[40005],R[40005]; 
int cnt[905][905],sum[905][905];
int jsq[40005],b[40005];
vector<int> q[40005];
unordered_map<int,int> vis;
ll ask(ll l,ll r)
{
	int max1=0,ans=5e9,p1=pos[l],q1=pos[r];
	if(p1==q1)
	{
		for(ri i=l;i<=r;i++)
		{
			int fir=lower_bound(q[b[i]].begin(),q[b[i]].end(),l)-q[b[i]].begin();
			int sec=(--upper_bound(q[b[i]].begin(),q[b[i]].end(),r))-q[b[i]].begin();
			int now=sec-fir+1;
			if(max1==now)
				ans=min(ans,a[i]);
			if(max1<now)
				max1=now,ans=a[i]; 
		}
		back ans;
	}
	if(sum[p1+1][q1-1])
		max1=cnt[p1+1][q1-1],ans=sum[p1+1][q1-1];
	for(ri i=l;i<=R[p1];i++)
	{
		int fir=lower_bound(q[b[i]].begin(),q[b[i]].end(),l)-q[b[i]].begin();
		int sec=(--upper_bound(q[b[i]].begin(),q[b[i]].end(),r))-q[b[i]].begin();
		int now=sec-fir+1;
		if(max1==now)
			ans=min(ans,a[i]);
		if(max1<now)
			max1=now,ans=a[i];
	}
	for(ri i=L[q1];i<=r;i++)
	{
		int fir=lower_bound(q[b[i]].begin(),q[b[i]].end(),l)-q[b[i]].begin();
		int sec=(--upper_bound(q[b[i]].begin(),q[b[i]].end(),r))-q[b[i]].begin();
		int now=sec-fir+1;
		if(max1==now)
			ans=min(ans,a[i]);
		if(max1<now)
			max1=now,ans=a[i];
	}
	back ans;	
}
int main()
{
	n=read(),m=read();
	int js=0;
	for(ri i=1;i<=n;i++)
	{
		a[i]=read();
		if(vis[a[i]])
			b[i]=vis[a[i]];
		else
			++js,vis[a[i]]=js,b[i]=js;
	}
	t=sqrt(n*log2(n)),len=n/t;
	for(ri i=1;i<=t;i++)
		L[i]=(i-1)*len+1,R[i]=i*len;
	if(R[t]<n)
		t++,L[t]=R[t-1]+1,R[t]=n;
	for(ri i=1;i<=t;i++)
		for(ri j=L[i];j<=R[i];j++)
			pos[j]=i;
	for(ri i=1;i<=t;i++)
	{
		memset(jsq,0,sizeof(jsq));
		for(ri j=i;j<=t;j++)
		{
			cnt[i][j]=cnt[i][j-1],sum[i][j]=sum[i][j-1];
			for(ri k=L[j];k<=R[j];k++)
			{
				jsq[b[k]]++;
				if(cnt[i][j]==jsq[b[k]])
					sum[i][j]=min(sum[i][j],a[k]);
				if(cnt[i][j]<jsq[b[k]])
					cnt[i][j]=jsq[b[k]],sum[i][j]=a[k];		
			}	
		}			
	}
	for(ri i=1;i<=n;i++)
		q[b[i]].push_back(i);
	ll x=0;
	while(m--)
	{
		ll l=read(),r=read();
		l=(l+x-1)%n+1,r=(r+x-1)%n+1;
		if(l>r)
			swap(l,r);
		x=ask(l,r);
		cout<<x<<"\n";
	}
    back 0;
}
```


