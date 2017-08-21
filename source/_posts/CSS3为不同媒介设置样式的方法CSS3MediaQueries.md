---
title: CSS3为不同媒介设置样式的方法（CSS3 Media Queries）
tags: [前端, css]
categories: 前端
---
随着智能手机、平板电脑越来越流行，许多网站都开始考虑为这些移动设备开发一套专属布局和样式。幸好 CSS3 提供了针对不同设备的查询规则，让这一目的变得非常容易实现。

```
<style type="text/css">
/*
	说明：CSS3 为不同媒介设置样式的方式（CSS3 Media Queries）
	来源：http://www.stuffandnonsense.co.uk/blog/about/hardboiled_css3_media_queries/
	整理：CodeBit.cn [ http://www.codebit.cn ]
*/

/* 智能手机 (纵向 和 横向) ----------- */
@media only screen 
and (min-device-width : 320px) 
and (max-device-width : 480px) {
/* Styles */
}

/* 智能手机 (横向) ----------- */
@media only screen 
and (min-width : 321px) {
/* Styles */
}

/* 智能手机 (纵向) ----------- */
@media only screen 
and (max-width : 320px) {
/* Styles */
}

/* iPad 系列 (纵向 和 横向) ----------- */
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) {
/* Styles */
}

/* iPad 系列 (横向) ----------- */
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) 
and (orientation : landscape) {
/* Styles */
}

/* iPad 系列 (纵向) ----------- */
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) 
and (orientation : portrait) {
/* Styles */
}

/* 台式机 和 笔记本 ----------- */
@media only screen 
and (min-width : 1224px) {
/* Styles */
}

/* 大屏幕 ----------- */
@media only screen 
and (min-width : 1824px) {
/* Styles */
}

/* iPhone 4 ----------- */
@media
only screen and (-webkit-min-device-pixel-ratio : 1.5),
only screen and (min-device-pixel-ratio : 1.5) {
/* Styles */
}
</style>
```

当然，将所有样式放在一起不是一个好主意，你可以将不同设备特定的 CSS 放到不同文件中，然后再通过 link 节点的 media 属性来加载：

```
<head>

<link rel="stylesheet" href="smartphone.css" 
media="only screen and (min-device-width : 320px) 
and (max-device-width : 480px)">

<link rel="stylesheet" href="smartphone-landscape.css" 
media="only screen and (min-width : 321px)">

<link rel="stylesheet" href="smartphone-portrait.css" 
media="only screen and (max-width : 320px)">

<link rel="stylesheet" href="ipad.css" 
media="only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px)">

<link rel="stylesheet" href="ipad-landscape.css" 
media="only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) 
and (orientation : landscape)">

<link rel="stylesheet" href="ipad-portrait.css" 
media="only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) 
and (orientation : portrait)">

<link rel="stylesheet" href="widescreen.css" 
media="only screen and (min-width : 1824px)">

<link rel="stylesheet" href="iphone4.css" 
media="only screen 
and (-webkit-min-device-pixel-ratio : 1.5), 
only screen and (min-device-pixel-ratio : 1.5)">

</head>
```