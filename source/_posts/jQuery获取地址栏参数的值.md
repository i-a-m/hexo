---
title: jQuery获取地址栏参数的值
tags: [jQuery,js,前端]
categories: 前端
---
####获取地址栏参数
```
function GetQueryString(name)
						{
						     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
						     var r = window.location.search.substr(1).match(reg);
						     if(r!=null)return  unescape(r[2]); return null;
						}
						var seqid = GetQueryString("seqid");//获取seqid的值
```

#### 简便获取地址栏id的值

```
var paraString = window.location.href;
				    	var id= paraString.substring(paraString.indexOf("=")+1,paraString.Length).split("&");
```

