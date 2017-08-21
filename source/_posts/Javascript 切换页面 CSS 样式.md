---
title: Javascript 切换页面 CSS 样式
tags: [前端, js]
categories: 前端
---
越来越多的网站制作者期望为自己的网站设计多种风格，以便访问者能够选择自己喜欢的样式进行浏览，本文介绍的就是一个切换页面样式的解决方案。

[Javascript 切换页面 CSS 样式 – 示例](http://www.codebit.cn/examples/css-switcher-example)

```
// 说明：Javascript 切换页面 CSS 样式
// 整理：http://www.CodeBit.cn

function setActiveStyleSheet(title) {
	var i, a, main;
	for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
		if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
			a.disabled = true;
			if(a.getAttribute("title") == title) a.disabled = false;
		}
	}
}

function getActiveStyleSheet() {
	var i, a;
	for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
		if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
	}
	return null;
}

function getPreferredStyleSheet() {
	var i, a;
	for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
		if(a.getAttribute("rel").indexOf("style") != -1
			&& a.getAttribute("rel").indexOf("alt") == -1
			&& a.getAttribute("title")
		) return a.getAttribute("title");
	}
	return null;
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

window.onload = function(e) {
	var cookie = readCookie("style");
	var title = cookie ? cookie : getPreferredStyleSheet();
	setActiveStyleSheet(title);
}

window.onunload = function(e) {
	var title = getActiveStyleSheet();
	createCookie("style", title, 365);
}

var cookie = readCookie("style");
var title = cookie ? cookie : getPreferredStyleSheet();
setActiveStyleSheet(title);

```

css 标签调用方式：

```
<link rel="stylesheet" type="text/css" href="css/white.css" title="white" />
<link rel="alternate stylesheet" type="text/css" href="css/black.css" title="black" />

```

切换方式：

```
<a href="#" onclick="setActiveStyleSheet('white'); return false;">白色背景</a>

<a href="#" onclick="setActiveStyleSheet('black'); return false;">黑色背景</a>
```