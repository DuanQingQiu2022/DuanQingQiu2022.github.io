---
title: "【笔记】Python 学习"
date: 2025-03-18 21:57:37
categories:
  - "笔记"
luogu_lid: "ab72faib"
luogu_category: 1
original: "https://www.luogu.com.cn/article/ab72faib"
disableNunjucks: true
---

sys.set_int_max_str_digits(50000)的作用是设置Python中整数转换为字符串时的最大位数限制。

<!-- more -->

在Python中，sys.set_int_max_str_digits()函数用于设置整数转换为字符串时的最大位数限制。默认情况下，这个限制是4300位。如果需要处理更大的整数，可以通过调用此函数并传入一个较大的数值来增加限制。（int 类型默认最多 4300 位，想处理更大的数要使用上述函数）

math.pow 主要处理浮点数，传参即使是整数也会被转成浮点数，**严重掉精度**！pow 可以传整数或浮点数，支持传三个参数实现快速幂。
