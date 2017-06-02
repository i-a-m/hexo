---
title: css背景
tags: [前端,css]
categories: 前端
---



我们在做网页的时候，当背景是一张完整的图片，不动让其跟随滚动条滚动，怎么办？下面详细讲解一下。

CSS代码示例-背景颜色属性(background-color):

```
<html>
<head>
<title>背景颜色 background-color</title>
<style type="text/css"> body {background-color:#99FF00;} </style> </head>

<body> 
<p>这个HTML使用了CSS的background-color属性，将HTML的背景颜色变成翠绿色。<p> 
</body> 
</html>
```

演示结果： 这个HTML使用了CSS的background-color属性，将HTML的背景颜色变成翠绿色。

CSS代码示例-背景图片属性(background-image):

```
<html><head>
<title>背景图片background-image</title></head>
<body style="background-image:url(../images/css_tutorials/background.jpg)"> <p>这个HTML使用了CSS的background-image属性，设置了背景图片。<p>
</body></html>
```

演示结果： 这个HTML使用了CSS的background-image属性，设置了背景图片。

CSS代码示例- 背景重复属性(background-repeat)

```
<html><head>
<title>背景重复 background-repeat</title> 
<style type="text/css"> body {background-image:url(../images/css_tutorials/background.jpg); background-repeat:repeat-y} </style> </head>
<body> 
<p>这个HTML使用了CSS的background-repeat属性，使背景图片竖向重复。<p>
<p>常用的background-repeat的属性值有: repeat-x(横向重复)，repeat-x(横向重复), no-repeat(不重复)。</p>
<p>background-repeat属性要和background-image一起用。</p> 
</body> </html>
```

演示结果： 这个HTML使用了CSS的background-repeat属性，使背景图片竖向重复。 常用的background-repeat的属性值有: repeat-x(横向重复)，repeat-x(横向重复), no-repeat(不重复)。 background-repeat属性要和background-image一起用。

 

CSS代码示例-背景附着属性(background-attachment)-[**背景图固定不动，不跟随滚动条滚动**]：

```
<html><head>
<title>背景附着属性 background-attachment</title>
<style type="text/css">
body {background-image:url(../images/css_tutorials/background.jpg); background-repeat:no-repeat; background-attachment:fixed} </style> 
</head>
<body> 
<p>这个HTML使用了CSS的background-attachment属性，将背景图片固定，不随内容滚动而滚动。<p>
<p>背景附着(background-attachment)属性有两个值。一个是scroll，表示随内容滚动而动；一个是fixed，表示固定不动，不受内容滚动影响。缺省值是scroll。</p>
<p>background-attachment要和background-image一起用。</p>
</body></html>
```



演示结果： 这个HTML使用了CSS的 background-attachment 属性，**将背景图片固定，不随内容滚动而滚动**。

背景附着(background-attachment)属性有两个值。一个是scroll，表示随内容滚动而动；一个是fixed，表示固定不动，不受内容滚动影响。缺省值是scroll。

background-attachment要和background-image一起用。

这个HTML使用了CSS的background-attachment属性，将背景图片固定，不随内容滚动而滚动。

背景附着(background-attachment)属性有两个值。一个是scroll，表示随内容滚动而动；一个是fixed，表示固定不动，不受内容滚动影响。缺省值是scroll。

 

CSS代码示例-背景位置属性(background-position)：



```
<html><head>
<title>背景位置属性 background-position</title>
<style type="text/css">
body {background-image:url(../images/css_tutorials/background.jpg);background-repeat:no-repeat;background-position:20px 60px}</style>
</head>
<body>
<p>这个HTML使用了CSS的background-position属性。这个属性和background-image属性连在一起使用，决定了背景图片的最初位置。</p>
<p>上面的代码表示背景图片的初始位置距离网页最左面20px，距离网页最上面60px。</p>
</body></html>
```



演示结果： 这个HTML使用了CSS的background-position属性。这个属性和background-image属性连在一起使用，决定了背景图片的最初位置。

上面的代码表示背景图片的初始位置距离网页最左面20px，距离网页最上面60px。

 

CSS代码示例-背景属性(background)：



```
<html><head>
<title>背景属性 background</title>
<style type="text/css">body{background:#99FF00 url(../images/css_tutorials/background.jpg) no-repeat fixed 40px 100px} </style>
</head>
<body><p>这个属性是设置背景相关属性的一种快捷的综合写法，包括background-color, background-image, background-repeat, backgroundattachment, background-position。</p>
<p>这个HTML所用的背景属性表示，网页的背景颜色是翠绿色，背景是background.jpg图片，图片不重复显示，背景图片不随内容滚动而动，背景图片距离网页最左面40px，距离网页最上面100px。</p>
</body></html>
```



演示结果： 这个属性是设置背景相关属性的一种快捷的综合写法， 包括background-color, background-image, background-repeat, backgroundattachment, background-position。

这个HTML所用的背景属性表示，网页的背景颜色是翠绿色，背景图片是background.jpg图片，背景图片不重复显示，背景图片不随内容滚动而动，背景图片距离网页最左面40px，距离网页最上面100px。

这个属性是设置背景相关属性的一种快捷的综合写法， 包括background-color, background-image, background-repeat, backgroundattachment, background-position。