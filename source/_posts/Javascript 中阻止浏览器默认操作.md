---
title: Javascript 中阻止浏览器默认操作
tags: [前段, js]
categories: 前端
---
 在浏览器事件中，会触发一些默认动作，比如：点击一个链接时，执行完捕获／冒泡动作后，会触发链接的默认事件：跳转到指定链接地址。

在很多时候，我们需要改变这些默认操作，比如：点击一个链接时，我们执行一些 ajax 操作，但是我们并不希望执行跳转动作，于是，就有了本文：阻止浏览器默认操作。 

其实这并不是一个非常难的课题，单独拿出来的原因还是浏览器兼容问题：

```
<script type="text/javascript">
 
// 说明：Javascript 中阻止浏览器默认操作
// 作者：John Resig
// 来源：CodeBit.cn ( http://www.CodeBit.cn )
 
function stopDefault( e ) {
	// Prevent the default browser action (W3C)
	if ( e && e.preventDefault )
		e.preventDefault();
	// A shortcut for stoping the browser action in IE
	else
		window.event.returnValue = false;
	return false;
}
</script>

```

使用示例：

```
<a href="http://www.google.com" id="testLink">Google</a>
 
<script type="text/javascript">
var test = document.getElementById('testLink');
test.onclick = function(e) {
	alert('我的链接地址是：' + this.href + ', 但是我不会跳转。');
	stopDefault(e);
}
</script>
```