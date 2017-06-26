---
title: 有关ie浏览器怪异模式QuirksMode对HTML页面的影响的解决办法 
tags: [前端,兼容性]
categories: 前端
---
```


一：

把 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
改为  
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0//EN" "w3.org/TR/html4/strict.dtd">
 就不会出现Quirks Model了，问题也就解决了

二：
表 3 x-ua-compatible 影响文档类型
x-ua-compatible	doctype	Document
 Mode
<meta http-equiv="X-UA-Compatible" content="IE=5" >	无影响	IE5 quirks
<meta http-equiv="X-UA-Compatible" content="IE=7/8/9/10" >	无影响	IE7/8/9/10 Standards
<meta
 http-equiv="X-UA-Compatible" content="IE=Edge" >	无影响	IE 最新版本的 Standards
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7/8/9" >	<!DOCTYPE html>	IE7/8/9 Standards
不存在	IE5 quirks
<meta
 http-equiv="X-UA-Compatible" content="IE=EmulateIE10" >	<!DOCTYPE html>	IE10 Standards
不存在	IE10 quirks
参考网站http://www.ibm.com/developerworks/cn/web/1310_shatao_quirks/


三：

html里面写的有ie7兼容运行的语句吧，看看源代码有没有类似下面的语句<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
```

