---
title: 用 Javascript 验证表单（form）中的单选（radio）值
tags: [前段, js]
categories: 前端
---
在用 Javascript 验证表单（form）中的单选框（radio）是否选中时，很多新手都会遇到问题，原因是 radio 和普通的文本框在获取值的时候有很大不同，本文介绍了一个较为通用的获取 radio 值的方法，希望对新手有用。

[用 Javascript 验证表单（form）中的单选（radio）值 – 示例](http://www.codebit.cn/examples/validate-radio-value-example) 

```
<script type="text/javascript">
 
// 说明： 用 Javascript 验证表单（form）中的单选（radio）值
// 作者： CodeBit.cn  ( http://www.CodeBit.cn )
 
function getRadioValue(radio)
{
	if (!radio.length && radio.type.toLowerCase() == 'radio') 
	{ return (radio.checked)?radio.value:'';  }
 
	if (radio[0].tagName.toLowerCase() != 'input' || 
		radio[0].type.toLowerCase() != 'radio')
	{ return ''; }
 
	var len = radio.length;
	for(i=0; i<len; i++)
	{
		if (radio[i].checked)
		{
			return radio[i].value;
		}
	}
	return '';
}
 
</script>

```

radio 和 checkbox 一样，都是 name 相同，值有多个，在获取 radio 值的时候，我们不能按照普通文本框 .value 的方式，而是要判断哪个被选中了。

当一组 radio 有多个选项时，我们可以通过循环，以 radio[i] 的方式判断某个选项是否被选中来返回值，但是当一组 radio 只有一个选项时，获取值的方式又有变化，代码中以 return (radio.checked)?radio.value:”; 这样的方式直接判断是否选中，然后返回对应值。

上面的代码传入的参数是 radio 对象，如： 

var radioTest = document.forms[‘testForm’].elements[‘radioTest’];
if (getRadioValue(radioTest) == ”)
{ …… }

根据判断结果执行你想要的操作。