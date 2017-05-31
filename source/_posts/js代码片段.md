---
title: js代码片段
tags: [前端,js,代码块]
categories: 前端 
---

```
var html = [
	'<div id="' + id + '" class="article-share-box">',
		'<input class="article-share-input" value="' + url + '">',
	'</div>'	
	].join('');
var box = $(html);
$('body').append(box);
```

```
$.getJSON("../db/content.json",function(data){  
	            var content = $("#content");  
	            var strHtml = "";
	            content.empty();
	            $.each(data,function(infoIndex,info){  
            		strHtml += "<div class='work'><a href="+info["href"]+"><img src="+info["img"]+" class='media' alt=''/><div class='caption'><div class='work_title'><h1>"+info["name"]+"</h1></div></div></a></div>"; 
	                })  
	            content.html(strHtml);
	            })
```

```
var node=$('#id');

第一种写法

if(node.is(':hidden')){　　//如果node是隐藏的则显示node元素，否则隐藏

　　node.show();　

}else{

　　node.hide();

}

第二种写法

if(!node.is(':visible')){　　//如果node是隐藏的则显示node元素，否则隐藏

　　node.show();　

}else{

　　node.hide();

}

if(node.is(':visible')){　　//如果node是显示的则隐藏node元素，否则显示

　　node.hide();

}else{

　　node.show();

}
```

```
jquery 获取a标签有几个
$('a').length，获取页面全部a的数量
$('#id a').length，获取指定元素下a的数量
```

```
jQuery remove() 方法

jQuery remove() 方法删除被选元素及其子元素。
实例

$("#div1").remove();
jQuery empty() 方法

jQuery empty() 方法删除被选元素的子元素。
实例

$("#div1").empty();
过滤被删除的元素

jQuery remove() 方法也可接受一个参数，允许您对被删元素进行过滤。

该参数可以是任何 jQuery 选择器的语法。

下面的例子删除 class="italic" 的所有 <p> 元素：
实例

$("p").remove(".italic");
```

```
npm install hexo-deployer-git --save

 按照如下内容修改blog-dev/_config.yml：

title: Palance's Blog   # 标题
subtitle:
description:
author: Palance Li
language: zh-CN         # 语言设置
url: http://palanceli.github.io/blog
root: /blog/

deploy:
  type: git
  repository: https://github.com/<自己的github账号>/blog.git
  branch: gh-pages
```

