---
title: Javascript 预览代码
tags: [前端, js]
categories: 前端
---
在我们编写了客户端代码，如 css、javascript、(x)html后，通常需要进行调试，而本代码可以让您在新打开的窗口中预览，方便及时修改。同时也可以用于代码演示。

[Javascript 预览代码 – 示例](http://www.codebit.cn/examples/code-preview-example)

```
<textarea cols="70" rows="20" id="code"></textarea>

<script type="text/javascript">
<!--
function openWindow()
{
	newWindow = window.open('','newWindow','height=300,width=500,scrollbars=auto');  
	if (newWindow != null)
	{
		var windowHTML= document.getElementById('code').value;

		newWindow.document.write(windowHTML);
		newWindow.focus();
	}
}
//-->
</script>

<br /><br />
<input value='预览代码' onclick="openWindow();" type="button" />
```