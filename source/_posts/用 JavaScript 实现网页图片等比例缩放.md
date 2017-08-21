---
title: 用 JavaScript 实现网页图片等比例缩放
tags: [前端, js]
categories: 前端
---
在处理网页图片时，特别是一些图片列表的应用里面，很难保证图片统一大小，直接设置图片大小又会导致图片拉伸，造成图片模糊，本文介绍的代码可以在图片加载完成后自动按比例调整图片大小。

[用 JavaScript 实现网页图片等比例缩放 – 示例](http://www.codebit.cn/examples/javascript-resize-image-example)

```
<script language="JavaScript" type="text/javascript">
<!--
// 说明：用 JavaScript 实现网页图片等比例缩放
// 整理：http://www.CodeBit.cn

function DrawImage(ImgD,FitWidth,FitHeight){
	var image=new Image();
	image.src=ImgD.src;
	if(image.width>0 && image.height>0){
		if(image.width/image.height>= FitWidth/FitHeight){
			if(image.width>FitWidth){
				ImgD.width=FitWidth;
				ImgD.height=(image.height*FitWidth)/image.width;
			}else{
				ImgD.width=image.width;
				ImgD.height=image.height;
			}
		} else{
			if(image.height>FitHeight){
				ImgD.height=FitHeight;
				ImgD.width=(image.width*FitHeight)/image.height;
			}else{
				ImgD.width=image.width;
				ImgD.height=image.height;
			}
		}
	}
}
//-->
</script>

```

调用方式：

```
<img src="1148202890.jpg" alt="自动缩放后的效果" onload="javascript:DrawImage(this,200,200);" />

```

> 如果图片较大，建议在图片标签里面同时设置期望的图片大小，这样不会导致页面在加载中撑开，该大小不会影响最终缩放效果。可以修改上面的代码为：

```
<img src="1148202890.jpg" alt="自动缩放后的效果" width="200" height="200" onload="javascript:DrawImage(this,200,200);" />
```