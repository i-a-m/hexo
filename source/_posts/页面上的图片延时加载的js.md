---
title: 页面上的图片延时加载的js
tags: [前端,js]
categories: 前端
---
​    效果可以直接看淘宝的商品分类页、还有QQ的商城页

​    相关地址：

​    [淘宝商城显示](http://list.taobao.com/browse/30-50029375/n-1----------------------0---------yes-------g,ge3denzxhazdumzsgy3tsnzq-----------------------42-grid-commend-0-all-50029375.htm?TBG=14153.14.7&ssid=r18-s18)

​     

​    

​    大家如果使用firebug去查看的话就会发现，当你滚动到相应的行时，当前行的图片才即时加载的，这样子的话页面在打开只加可视区域的图片，而其它隐藏的图片则不加载，一定程序上加快了页面加载的速度，对于比较长的页面来说，这个方案是比较好的。

​     

​    **实现原理** 

​    把所有需要延时加载的图片改成如下的格式：

​     

​     

​    然后在页面加载时，把所有使用了lazy_src的图片都保存到数组里，然后在滚动时计算可视区域的top，然后把延时加载的图片中top小于当前可视区域（即图片出现在可视区域内）的图片的src的值用lazy_src的来替换（加载图片）

​    **代码**

```
lazyLoad=(function() { 
var map_element = {}; 
var element_obj = []; 
var download_count = 0; 
var last_offset = -1; 
var doc_body; 
var doc_element; 
var lazy_load_tag; 
function initVar(tags) { 
doc_body = document.body; 
doc_element = document.compatMode == 'BackCompat' ? doc_body: document.documentElement; 
lazy_load_tag = tags || ["img", "iframe"]; 
}; 
function initElementMap() { 
var all_element = []; 
//从所有相关元素中找出需要延时加载的元素 
for (var i = 0, 
len = lazy_load_tag.length; i < len; i++) { 
var el = document.getElementsByTagName(lazy_load_tag[i]); 
for (var j = 0, 
len2 = el.length; j < len2; j++) { 
if (typeof(el[j]) == "object" && el[j].getAttribute("lazy_src")) { 
element_obj.push(all_element[key]); 
} 
} 
} 

for (var i = 0, 
len = element_obj.length; i < len; i++) { 
var o_img = element_obj[i]; 
var t_index = getAbsoluteTop(o_img);//得到图片相对document的距上距离 
if (map_element[t_index]) { 
map_element[t_index].push(i); 
} else { 
//按距上距离保存一个队列 
var t_array = []; 
t_array[0] = i; 
map_element[t_index] = t_array; 
download_count++;//需要延时加载的图片数量 
} 
} 

}; 
function initDownloadListen() { 
if (!download_count) return; 
var offset = (window.MessageEvent && !document.getBoxObjectFor) ? doc_body.scrollTop: doc_element.scrollTop; 
//可视化区域的offtset=document的高+ 
var visio_offset = offset + doc_element.clientHeight; 
if (last_offset == visio_offset) { 
setTimeout(initDownloadListen, 200); 
return; 
} 
last_offset = visio_offset; 
var visio_height = doc_element.clientHeight; 
var img_show_height = visio_height + offset; 
for (var key in map_element) { 
if (img_show_height > key) { 
var t_o = map_element[key]; 
var img_vl = t_o.length; 
for (var l = 0; l < img_vl; l++) { 
element_obj[t_o[l]].src = element_obj[t_o[l]].getAttribute("lazy_src"); 
} 
delete map_element[key]; 
download_count--; 
} 
} 
setTimeout(initDownloadListen, 200); 
}; 
function getAbsoluteTop(element) { 
if (arguments.length != 1 || element == null) { 
return null; 
} 
var offsetTop = element.offsetTop; 
while (element = element.offsetParent) { 
offsetTop += element.offsetTop; 
} 
return offsetTop; 
} 
function init(tags) { 
initVar(tags); 
initElementMap(); 
initDownloadListen(); 
}; 
return { 
init: init 
} 
})();
```

​    使用方法：把页面上需要延时加载的图片src改成为lazy_src，然后把上面的js放到body最后面，然后调用：lazyLoad.init();

​    调戏的方法可以使用firebug来查看一时图片是否是延时加载。

​    另外：

​    如果你的页面上存在有内容切换的栏目的话，可能在切换时切换的内容里的图片可能会不显示，处理的方法是在内容时单独图片加载处理，如：

```
///切换内容的代码... 
chlid.find("img[init_src]").each(function(){ 
$(this).attr("src",$(this).attr("init_src")); 
$(this).removeAttr("init_src"); 

});
```

