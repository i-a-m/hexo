---
title: 用JS\JQUERY获取地址栏参数的方法
tags: [js,前端,正则]
categories: 正则
---
## 正则获取

方法一：采用正则表达式获取地址栏参数：（ 强烈推荐，既实用又方便！）

```
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

// 调用方法
alert(GetQueryString("参数名1"));
alert(GetQueryString("参数名2"));
alert(GetQueryString("参数名3"));
123456789101112123456789101112
```

**下面举一个例子:**

若地址栏URL为：abc.html?id=123&url=[http://www.maidq.com](http://www.maidq.com/)

那么，但你用上面的方法去调用：alert(GetQueryString(“url”));

则会弹出一个对话框：内容就是 [http://www.maidq.com](http://www.maidq.com/)

如果用：alert(GetQueryString(“id”));那么弹出的内容就是 123 啦；

当然如果你没有传参数的话，比如你的地址是 abc.html 后面没有参数，那强行输出调用结果有的时候会报错：

所以我们要加一个判断 ，判断我们请求的参数是否为空，首先把值赋给一个变量：

```
var myurl=GetQueryString("url");
if(myurl !=null && myurl.toString().length>1)
{
   alert(GetQueryString("url"));
}1234512345
```

这样就不会报错了！

## 传统方法

这个比较复杂，也不好用，有兴趣的可以去原文看。我觉得还是正则的这个好，简单实用。