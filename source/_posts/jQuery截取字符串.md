---
title: jQuery截取字符串
tags: [jquery,js,前端]
categories: 前端
---
substring 方法

返回位于 String 对象中指定位置的子字符串。

strVariable.substring(start, end)

"String Literal".substring(start, end)

参数

start

指明子字符串的起始位置，该索引从 0 开始起算。

end

指明子字符串的结束位置，该索引从 0 开始起算。

说明

 方法将返回一个包含从 start 到最后（不包含 end ）的子字符串的字符串。

substring 方法使用 start 和 end 两者中的较小值作为子字符串的起始点。例如， strvar.substring(0, 3) 和 strvar.substring(3, 0) 将返回相同的子字符串。

如果 start 或 end 为 NaN 或者负数，那么将其替换为0。

子字符串的长度等于 start 和 end 之差的绝对值。例如，在 strvar.substring(0, 3) 和 strvar.substring(3, 0) 返回的子字符串的的长度是 3。

示例

下面的示例演示了 substring 方法的用法。

```
function SubstringDemo(){

   var ss;                         // 声明变量。

   var s = "The rain in Spain falls mainly in the plain..";

   ss = s.substring(12, 17);   // 取子字符串。

   return(ss);                     // 返回子字符串。

}

```



substr 方法

返回一个从指定位置开始的指定长度的子字符串。

stringvar.substr(start [, length ])

参数

stringvar

必选项。要提取子字符串的字符串文字或 String 对象。

start

必选项。所需的子字符串的起始位置。字符串中的第一个字符的索引为 0。

length

可选项。在返回的子字符串中应包括的字符个数。

说明

如果 length 为 0 或负数，将返回一个空字符串。如果没有指定该参数，则子字符串将延续到 stringvar 的最后。

示例

下面的示例演示了substr 方法的用法。

```
function SubstrDemo(){

   var s, ss;                // 声明变量。

   var s = "The rain in Spain falls mainly in the plain.";

   ss = s.substr(12, 5); // 获取子字符串。

   return(ss);               // 返回 "Spain"。

}

```



split 方法

将一个字符串分割为子字符串，然后将结果作为字符串数组返回。

stringObj.split([separator[, limit]])

参数

stringObj

必选项。要被分解的 String 对象或文字。该对象不会被 split 方法修改。

separator

可选项。字符串或 正则表达式 对象，它标识了分隔字符串时使用的是一个还是多个字符。如果忽略该选项，返回包含整个字符串的单一元素数组。

limit

可选项。该值用来限制返回数组中的元素个数。

说明

split 方法的结果是一个字符串数组，在 stingObj 中每个出现 separator 的位置都要进行分解。separator 不作为任何数组元素的部分返回。

示例

下面的示例演示了 split 方法的用法。

```
function SplitDemo(){   var s, ss;

   var s = "The rain in Spain falls mainly in the plain.";

   // 在每个空格字符处进行分解。

   ss = s.split(" ");

   return(ss);

}

```

