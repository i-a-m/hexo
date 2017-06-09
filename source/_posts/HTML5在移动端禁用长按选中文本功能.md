---
title: HTML5在移动端禁用长按选中文本功能
tags: [前端,html]
categories: 前端
---
在手机浏览器中，长按可选中文本，但如果在应用中，会给人一种异样的感觉，最好还是禁用此功能为上。

```
* {
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -khtml-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}	
```

