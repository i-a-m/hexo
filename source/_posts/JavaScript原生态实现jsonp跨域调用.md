---
title: JavaScript原生态实现jsonp跨域调用
tags: [前端,js]
categories: 前端
---
​    from:<http://www.izmax.cn/?p=164>

​        有了jQuery的getJSON真的很爽，可是在某些特殊情况下，不得不用原生态的JavaScript来做些什么，就练练手，整理了一下原生态方法实现jsonp跨域调用数据,废话补多少，贴上代码:

​        Demo:<http://www.izmax.cn/demo/jsonp.html>

```
 <body>
<ul id=”list”></ul>
</body>
<script type=”text/javascript”>
function json(url){
var u=url;
var len=u.Items.length;
for(var i=0;i<len;i++){
var z=u.Items[i].ZName;
//alert(c);
var txt=document.createTextNode(z);
var p=document.createElement(”li”);
p.appendChild(txt);
document.getElementById(”list”).appendChild(p);
}
}

</script>
<script type=”text/javascript” src=”http://api.zhui.cn/content/ZIDList.ashx?showmode=2&jsoncallback=json”></script&gt;
```

