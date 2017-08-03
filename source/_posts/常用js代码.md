---
title: 常用js代码
tags: [前端,js]
categories: 前端
---

框架页中不显示滚动条：

```
<SCRIPT>

self.moveTo(0,0)

self.resizeTo(screen.availWidth,screen.availHeight)

</SCRIPT>

```

防止网页被框架

```
<SCRIPT LANGUAGE=JAVASCRIPT>

if (top.location !== self.location) {

top.location=self.location;

}

</SCRIPT>



```

永远都会带着框架

```
<script language="javascript"><!--

if (window == top)top.location.href = "frame.htm"; //frame.htm为框架网页

// --></script>
```

窗口自动最大化

```
<script language="JavaScript"><!--

self.moveTo(0,0)

self.resizeTo(screen.availWidth,screen.availHeight)

//--></script>

```

打开窗口自动最大化

```
<OBJECT classid="clsid:adb880a6-d8ff-11cf-9377-00aa003b7a11" onreadystatechange="if (this.readyState==4) this.Click();" VIEWASTEXT><PARAM name="Command" value="Maximize"></OBJECT>
```

爽眼闪屏代码

```
<script>var color = new Array;color[1] = "black";color[2] = "white";for(x = 0; x <3; x++){document.bgColor = color[x];if(x == 2){x = 0;}}</script>



```

不能被另存为

```
<noscript><iframe src=*.html></iframe></noscript>
```

