---
title: "【题解】P1297 [国家集训队]单选错位"
date: 2021-10-08 11:05:06
categories:
  - "文章"
luogu_lid: "2vk4p9an"
luogu_category: 2
original: "https://www.luogu.com.cn/article/2vk4p9an"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P1297)

注意到每道选择题的选项个数不一样，所以可以根据每道题的选项个数进行分类讨论。

对于第 $i$ 道题，如果 $a_i=a_{i+1}$，那么期望显然是 $\dfrac{1}{a_i}$。

如果 $a_i<a_{i+1}$，那么期望显然是 $\dfrac{a_i}{a_{i+1}}\times\dfrac{1}{a_i}=\dfrac{1}{a_{i+1}}$。

如果 $a_i>a_{i+1}$，那么期望显然是 $\dfrac{a_{i+1}}{a_{i}}\times\dfrac{1}{a_{i+1}}=\dfrac{1}{a_{i+1}}$。

然后这三个式子可以合并成一个式子，即 $\dfrac{1}{\max(a_i,a_{i+1})}$。

根据期望的可加性，只需要把每道题的期望值加起来即可。注意第 $n$ 道题抄在了第一道题上，所以不妨令 $a_{n+1}=a_1$，这样就变成了一条链。

答案就是 $\sum\limits_{i=2}^{n+1} \dfrac{1}{\max(a_i,a_{i+1})}$。注意转成 double 类型。

时间复杂度 $O(n)$。

代码：
```cpp
#include<bits/stdc++.h>
#define back return
#define ll long long
#define ri register int
using namespace std;
int n,A,B,C,a[20000005];
void pre()
{
	scanf("%d%d%d%d%d", &n, &A, &B, &C, a + 1);
	for (int i = 2; i <= n; i++)
		a[i] = ((long long) a[i - 1] * A + B) % 100000001;
	for (int i = 1; i <= n; i++)
		a[i] = a[i] % C + 1;
}
double ans;
int main()
{
	pre();
	a[n+1]=a[1];
	for(ri i=1;i<=n;i++)
		ans+=1/(double)max(a[i],a[i+1]);
	cout<<fixed<<setprecision(3)<<ans<<"\n";
	back 0;
}
```
