---
title: 使pre的内容自动换行
tags: [前端]
categories: 前端
---

<pre> 元素可定义预格式化的文本。被包围在 pre 元素中的文本通常会保留空格和换行符。而文本也会呈现为等宽字体。

<pre> 标签的一个常见应用就是用来表示计算机的源代码。

而我们经常碰到的一个问题是如果一个代码上碰到有图片或者网页地址就会使代码很长，结果会造成页面撑开或者代码超出边界。非常难受，如果用overflow:hidden那么会将原来的代码隐藏掉，用overflow:auto则会出现滚动条，代码也不方便阅读。

点击查看：[http://www.css88.com/demo/pre/index-1.html](http://www.css88.com/demo/pre/index-1.html)

今天折腾了一个晚上终于搞定<pre>的内容自动换行的问题：

1.先尝试使用：word-wrap: break-word;将内容自动换行，IE，OP，Chrome，Safari都可以，FF就悲剧了。

点击查看：[http://www.css88.com/demo/pre/index-2.html](http://www.css88.com/demo/pre/index-2.html)

2.查看了pre的浏览器默认样式：

```
xmp, pre, plaintext {
  display: block;
  font-family: -moz-fixed;
  white-space: pre;
  margin: 1em 0;
}
```

```
都有这个white-space: pre，看看white-space的值：
```

| 值        | 描述                                  |
| -------- | ----------------------------------- |
| normal   | 默认。空白会被浏览器忽略。                       |
| pre      | 空白会被浏览器保留。其行为方式类似 HTML 中的 <pre> 标签。 |
| nowrap   | 文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。  |
| pre-wrap | 保留空白符序列，但是正常地进行换行。                  |
| pre-line | 合并空白符序列，但是保留换行符。                    |
| inherit  | 规定应该从父元素继承 white-space 属性的值。        |

有个pre-wrap，保留空白符序列，但是正常地进行换行。

这样就OK了搞定，我们只要加上样式：

pre {

white-space: pre-wrap;

word-wrap: break-word;

}

就能使<pre>的内容自动换行了。