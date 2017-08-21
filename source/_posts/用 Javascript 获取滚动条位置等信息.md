---
title:用 Javascript 获取滚动条位置等信息
tags: [前端, js]
categories: 前端
---
有时为了准确定位一个元素，我们需要获取滚动条的位置，这种需求经常出现在 tooltip 和 拖放等应用中，其实这个技术很简单，关键是要考虑浏览器的兼容性，本文就是介绍这一问题的解决方法。

其实这段代码在之前的 [“ 用 Javascript 实现锚点(Anchor)间平滑跳转”](http://www.codebit.cn/pub/html/javascript/tip/anchor_scroller/) 一文已经介绍过了，但是由于这个需求并且经常用到，因此，本站专门发布此文介绍，方便查阅。

```
<script type="text/javascript">
 
// 说明：用 Javascript 获取滚动条位置等信息
// 来源 ：ThickBox 2.1 
// 整理 ：CodeBit.cn ( http://www.CodeBit.cn )
 
function getScroll() 
{
	var t, l, w, h;
	
	if (document.documentElement && document.documentElement.scrollTop) {
		t = document.documentElement.scrollTop;
		l = document.documentElement.scrollLeft;
		w = document.documentElement.scrollWidth;
		h = document.documentElement.scrollHeight;
	} else if (document.body) {
		t = document.body.scrollTop;
		l = document.body.scrollLeft;
		w = document.body.scrollWidth;
		h = document.body.scrollHeight;
	}
	return { t: t, l: l, w: w, h: h };
}
 
</script>

```

具体示例请参考 [“ 用 Javascript 实现锚点(Anchor)间平滑跳转”](http://www.codebit.cn/pub/html/javascript/tip/anchor_scroller/) 一文。