---
title: 用 Javascript 验证表单（form）中多选框（checkbox）值
tags: [前段, js]
categories: 前端
---
和单选框一样，许多新手在用 Javascript 验证表单（form）中多选框（checkbox）的值时，都会遇到问题，原因是 checkbox 和普通的文本框在获取值的时候有很大不同，本文介绍了一个较为通用的获取 checkbox 值的方法，希望对新手有用。

[用 Javascript 验证表单（form）中多选框（checkbox）值 – 示例](http://www.codebit.cn/examples/validate-checkbox-value-example) 

```
<script type="text/javascript">
 
// 说明： 用 Javascript 验证表单（form）中多选框（checkbox）的值
// 作者： CodeBit.cn  ( http://www.CodeBit.cn )
 
function getCheckboxValue(checkbox)
{
	if (!checkbox.length && checkbox.type.toLowerCase() == 'checkbox')
	{ return (checkbox.checked)?checkbox.value:'';  }
	
	if (checkbox[0].tagName.toLowerCase() != 'input' || 
		checkbox[0].type.toLowerCase() != 'checkbox')
	{ return ''; }
 
	var val = [];
	var len = checkbox.length;
	for(i=0; i<len; i++)
	{
		if (checkbox[i].checked)
		{
			val[val.length] = checkbox[i].value;
		}
	}
	
	return (val.length)?val:'';
}
 
</script>

```

和 radio 一样，都是 name 相同，值有多个，在获取 checkbox 值的时候，我们不能按照普通文本框 .value 的方式，而是要判断哪个被选中了。

当一组 checkbox 有多个选项时，我们可以通过循环，以 checkbox[i] 的方式判断某个选项是否被选中来返回值，但是当一组 checkbox 只有一个选项时，获取值的方式又有变化，代码中以 (checkbox.checked)?checkbox.value:”; 的方式直接判断是否选中，然后返回对应值。

上面的代码传入的参数是 checkbox 对象，如： 

var checkboxTest = document.forms[‘testForm’].elements[‘checkboxTest’];
if (getCheckboxValue(checkboxTest) == ”)
{ …… }

根据判断结果执行你想要的操作。