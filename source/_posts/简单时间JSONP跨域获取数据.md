---
title: 简单时间JSONP跨域获取数据
tags: [前端,js]
categories: 前端
---
 代码:

```
 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"&gt;

<html xmlns="http://www.w3.org/1999/xhtml"&gt;

<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>Untitled Document</title>

<script type="text/javascript">

loadJson("http://www.showfan.cn/demo.json",showData)

function loadJson(url,callback){

var script=document.createElement("script");

script.setAttribute("id","script");

script.setAttribute("src",url);

var head=document.getElementsByTagName("head")[0];

//document.getElementsByName("head").item(0).appendChild(script,head);

head.appendChild(script);

callback;

}

 

function showData(txt){

//alert(txt.StatusInfo.ReturnCode)

var len=txt.Items.length;

//alert(len);

for(var i=0;i<len;i++){

document.write(txt.Items[i].Title+"<br/>");

}

 

}

</script>

</head>

<body>

</body>

</html>
```

