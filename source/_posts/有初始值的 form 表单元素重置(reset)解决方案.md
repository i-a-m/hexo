---
title: 有初始值的 form 表单元素重置(reset)解决方案
tags: [前端, js]
categories: 前端
---
有初始值的 form 表单在点击默认的 Reset 按钮时，表单元素并不能清空，而是恢复初始值，相信这并不是我们期望的，本文介绍的是用 javascript 解决这一问题的方法。

[有初始值的 form 表单元素重置(reset)解决方案 – 示例](http://www.codebit.cn/examples/clear-form-example)

```
<script language="JavaScript" type="text/javascript">
<!--
// 说明：有初始值的 form 表单元素重置(reset)解决方案
// 整理：http://www.CodeBit.cn

function clearForm(formName) {
	var formObj = document.forms[formName];
	var formEl = formObj.elements;
	for (var i=0; i<formEl.length; i++)
	{
		var element = formEl[i];
		if (element.type == 'submit') { continue; }
		if (element.type == 'reset') { continue; }
		if (element.type == 'button') { continue; }
		if (element.type == 'hidden') { continue; }

		if (element.type == 'text') { element.value = ''; }
		if (element.type == 'textarea') { element.value = ''; }
		if (element.type == 'checkbox') { element.checked = false; }
		if (element.type == 'radio') { element.checked = false; }
		if (element.type == 'select-multiple') { element.selectedIndex = -1; }
		if (element.type == 'select-one') { element.selectedIndex = -1; }
	}
}
//-->
</script>

```

示例：

```
<form method="post" action="" name="testForm">

	<input type="text" value="text" size="30" /> <br />
	<textarea name="" rows="3" cols="30">textarea</textarea> <br />
	a<input type="checkBox" name="a" value="a" />
	b<input type="checkBox" name="a" value="b" checked="checked" />
	c<input type="checkBox" name="a" value="c" checked="checked" />
	d<input type="checkBox" name="a" value="d" />
	e<input type="checkBox" name="a" value="e" /> <br />
	2<input type="radio" name="b" value="2" />
	3<input type="radio" name="b" value="3" checked="checked" /><br />

	test1:<select name="" multiple="multiple">
		<option value="11111111">11111111</option>
		<option value="22222222" selected="selected">22222222</option>
		<option value="33333333" selected="selected">33333333</option>
		<option value="44444444">44444444</option>
		<option value="55555555">55555555</option>
	</select>

	<br /><br />

	test2:<select name="">
		<option value="11">11</option>
		<option selected="selected">22</option>
		<option value="33">33</option>
		<option value="44">44</option>
		<option value="55">55</option>
	</select>

	<br /><br />

	<input type="submit" value="Submit" />
	<input type="reset" value="Reset" />
	<input type="button" value="Button" />

	<input type="button" value="Javascript Clear" onclick="clearForm('testForm')" />

</form>
```