---
title: jQuery.session的用法
tags: [js,前端,存储]
categories: 前端
---
　今天分享的是使用jquery来处理session。我们将使用sessionStorage对象，它类似与localStorage对象，只是sessionStorage是用来储存session数据的。当用户关闭浏览器这个数据会被清除掉。

JquerySession是一个基于jquery的用来处理session的库，使用它可以简化我们的工作。在使用之前需要引入jquery。

### 语法：

```
添加数据
    $.session.set('key', 'value')

删除数据
    $.session.remove('key');

获取数据
    $.session.get('key');

清除数据
    $.session.clear();
```

[下载jQuery.session.js](/about/jquerysession.js)