---
title: "【题解】P2328 [SCOI2005] 超级格雷码"
date: 2025-12-28 23:11:05
categories:
  - "题解"
tags:
  - "P2328"
luogu_lid: "nuly3myy"
luogu_category: 2
original: "https://www.luogu.com.cn/article/nuly3myy"
disableNunjucks: true
---

[题目传送门](https://www.luogu.com.cn/problem/P2328)

<!-- more -->

这个构造太一眼了。差不多就是类似这样一直排下去。
```cpp
000 001 002 003
013 012 011 010
020 021 022 023
033 032 031 030
130 131 132 133
...
```

这个直接递归构造就可以。但是 AI 写得太好看了所以还是要放个 AI 写的代码。

复杂度瓶颈在输出，时间复杂度 $O(nb^n)$。

```cpp
#include <iostream>
#include <vector>
using namespace std;
char ord(int x)
{
	if(x>=0&&x<=9)
		return (char)(x+'0');
	return (char)('A'+x-10);
}
int b, n;
char ch[100005];

// depth: 当前填到第几位
// reverse: 当前这一位是否需要倒序（true为倒序，false为正序）
void dfs(int depth, bool reverse) {
    if (depth == n) {
        for (int i=0;i<n;i++) 
			cout << ch[i]; 
        cout << "\n";
        return;
    }

    // 根据 reverse 决定循环方向
    int start = reverse ? b - 1 : 0;
    int end   = reverse ? -1 : b;
    int step  = reverse ? -1 : 1;

    for (int i = start; i != end; i += step) {
        ch[depth] = ord(i);
        // 核心逻辑：
        // 下一位是否倒序 = (当前位是奇数) XOR (当前层本来就是倒序)
        // 这样可以实现：0开头(正)->正，1开头(正)->反，2开头(正)->正...
        // 以及在倒序的大组里自动反转这些逻辑
        bool next_reverse = (i % 2 != 0) ^ reverse;
        dfs(depth + 1, next_reverse);
    }
}

int main() {
    // 优化输出速度
    ios::sync_with_stdio(false);
    cin.tie(0);
    cin >> n >> b;
    dfs(0, 0); // 从第0位开始，默认正序

    return 0;
}
```
