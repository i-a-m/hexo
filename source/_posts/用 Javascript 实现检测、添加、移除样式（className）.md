---
title: 用 Javascript 实现检测、添加、移除样式（className）
tags: [前段, js]
categories: 前端
---
在前台脚本中，我们经常要操作页面元素的样式，比如标签页切换时，将当前标签加上一个样式，当切换到其他标签时，再将样式还原，本文介绍的是直接添加和移除 className 的方法。

```
<script type="text/javascript">
 
// 说明：添加、移除、检测 className
// 整理：CodeBit.cn ( http://www.codebit.cn )
 
function hasClass(element, className) {
	var reg = new RegExp('(\s|^)'+className+'(\s|$)');
	return element.className.match(reg);
}
 
function addClass(element, className) {
	if (!this.hasClass(element, className))
	{
		element.className += " "+className;
	}
}
 
function removeClass(element, className) {
	if (hasClass(element, className)) {
    	var reg = new RegExp('(\s|^)'+className+'(\s|$)');
		element.className = element.className.replace(reg,' ');
	}
}
 
</script>
```