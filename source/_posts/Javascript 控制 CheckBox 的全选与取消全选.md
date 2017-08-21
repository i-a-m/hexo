---
title: Javascript 控制 CheckBox 的全选与取消全选
tags: [前端, js]
categories: 前端
---
在批量处理列表数据时，往往会用到 CheckBox 的全选与取消全选，虽然她的实现原理很简单，但是对新手来说还是有些难度，本文介绍的方法，触发条件独立，可以全选或取消全选指定 name 的 CheckBox ， 同一页面可以有多组供全选的 CheckBox ，功能健全，通用性较强。

[Javascript 控制 CheckBox 的全选与取消全选 – 示例](http://www.codebit.cn/examples/javascript-checkbox-example)

```
<script type="text/javascript">
<!--
// 说明：Javascript 控制 CheckBox 的全选与取消全选
// 整理：http://www.CodeBit.cn

function checkAll(name)
{
	var el = document.getElementsByTagName('input');
	var len = el.length;
	for(var i=0; i<len; i++)
	{
		if((el[i].type=="checkbox") && (el[i].name==name))
		{
			el[i].checked = true;
		}
	}
}
function clearAll(name)
{
	var el = document.getElementsByTagName('input');
	var len = el.length;
	for(var i=0; i<len; i++)
	{
		if((el[i].type=="checkbox") && (el[i].name==name))
		{
			el[i].checked = false;
		}
	}
}
//-->
</script>

```

用法示例：

```
<input type="checkbox" name="test" value="" onclick="if(this.checked==true) { checkAll('test'); } else { clearAll('test'); }" /> 字母全选开关
<input type="checkbox" name="test" value="a" /> a
<input type="checkbox" name="test" value="b" /> b
<input type="checkbox" name="test" value="c" /> c
<input type="checkbox" name="test" value="d" /> d
<input type="checkbox" name="test" value="e" /> e
<input type="checkbox" name="test" value="f" /> f
<input type="checkbox" name="test" value="g" /> g

<br />

<input type="checkbox" name="num" value="" onclick="if(this.checked==true) { checkAll('num'); } else { clearAll('num'); }"  /> 数字全选开关
<input type="checkbox" name="num" value="1" /> 1
<input type="checkbox" name="num" value="2" /> 2
<input type="checkbox" name="num" value="3" /> 3

<br /><br />

<input type="button" value="选择所有的字母" onclick="checkAll('test')" />
<input type="button" value="清空选中的字母" onclick="clearAll('test')" />

<br /><br />

<input type="button" value="选择所有的数字" onclick="checkAll('num')" />
<input type="button" value="清空选中的数字" onclick="clearAll('num')" />
```