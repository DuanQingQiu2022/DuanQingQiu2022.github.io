---
title: "【题解】P1489 猫狗大战"
date: 2026-01-11 04:24:31
categories:
  - "题解"
tags:
  - "背包"
  - "动态规划"
luogu_lid: "t9qhsr1s"
luogu_category: 2
original: "https://www.luogu.com.cn/article/t9qhsr1s"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1489)

<!-- more -->

我喜欢这个题目背景。

题本身没什么好说的，设 $f_{i,j}$ 表示前 $i$ 个人中一方血量为 $j$ 的方案是否可行，倒序枚举 $j$ 转移即可。

注意转移时人数要枚举到 $\lfloor \dfrac{n+1}{2}\rfloor$。

时间复杂度 $O(n^2\sum a_i)$。

::::success[Code]
```cpp
int main()
{
	n=read();
	for(ri i=1;i<=n;i++)
		a[i]=read(),sum+=a[i];
	dp[0][0]=1;
	for(ri i=1;i<=n;i++)
		for(ri j=sum;j>=0;j--)
			if(j>=a[i])
				for(ri k=1;k<=(n+1)/2;k++)
					dp[k][j]|=dp[k-1][j-a[i]];
	for(ri i=sum/2;i>=0;i--)
		if(dp[n/2][i]||dp[n/2+1][i])
		{
			cout<<i<<" "<<sum-i<<"\n";
			break;
		}
	return 0;
}
```
::::
