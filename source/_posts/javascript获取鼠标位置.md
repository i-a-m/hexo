---
title: javascript获取鼠标位置
tags: [前端,js]
categories: 前端
---

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-
transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"&gt;
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>JS获得鼠标位置（兼容多浏览器ie,firefox）脚本之家修正版</title>
</head>

<body>

<script>
function mouseMove(ev)
{
ev= ev || window.event;
var mousePos = mouseCoords(ev);
//alert(ev.pageX);
document.getElementById("xxx").value = mousePos.x;
document.getElementById("yyy").value = mousePos.y;
}

function mouseCoords(ev)
{
if(ev.pageX || ev.pageY){
return {x:ev.pageX, y:ev.pageY};
}
return {
x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
y:ev.clientY + document.body.scrollTop - document.body.clientTop
};
}

document.onmousemove = mouseMove;
</script>
鼠标 X 轴:
<input id=xxx type=text>

鼠标 Y 轴:
<input id=yyy type=text>
</body> 
```

