---
title: jQuery.cookie的用法
tags: [js,前端,存储]
categories: 前端
---
Cookies是一种能够让网站服务器把少量数据储存到客户端的硬盘或内存，或是从客户端的硬盘读取数据的一种技术当你浏览某网站时，你硬盘上会生产一个非常小的文本文件，它可以记录你的用户ID、密码、浏览过的网页、停留的时间等信息。当你再次来到该网站时，网站通过读取Cookies，得知你的相关信息，就可以做出相应的动作，如在页面显示欢迎你的标语，或者让你不用输入ID、密码就直接登录等等。从本质上讲，它可以看作是你的身份证。

使用传统的Javascript来设置和获取Cookies信息很麻烦，要写上几个函数来处理，幸运的是jQuery帮我们做了很多事，借助jQuery cookie插件，我们可以轻松的创建、获取和删除Cookies。jQuery cookie是个很好的cookie插件，大概的使用方法如下：

**写入cookie**

```
$.cookie("this-cookie","this-value",{
    expires:10,//有效日期
    path:"/",//cookie的路 径
    domanin:    //cookie的域名
    secure:true //true,cookie的传输会要求一个安全协议,否则反之
         
});
```

**读取cookie**

```
$.cookie("this-cookie")
```

**删除cookie**

```
$.cookie("this-cookie",null)  
```

#### 或者

```
//清除所有cookie函数
			function clearAllCookie() {
				var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
				if(keys) {
					for(var i = keys.length; i--;)
						document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
				}
			}
```

#### demo

```
<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<script src="js/jquery.min.js"></script>
		<script src="js/jquery.cookie.js"></script>
		<script>
			$(document).ready(function() {
				//所创建的cookie有效期默认到用户关闭浏览器为止
				$.cookie('the_cookie', '五颜六色千变万化');
				//创建一个cookie并设置 cookie的有效路径： 
				$.cookie('the_cookie_expires_07', '世界是座魔方大厦', {
					expires: 7
				});
				//读取cookie
				var value = $.cookie('the_cookie');
				var value_07 = $.cookie('the_cookie_expires_07');
				$('p').html('读取cookie的值：' + value + '<br />' + '读取cookie存在7天的值：' + value_07);
			});

			//清除所有cookie函数
			function clearAllCookie() {
				var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
				if(keys) {
					for(var i = keys.length; i--;)
						document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
				}
			}
		</script>
		<title></title>
	</head>

	<body>
		
		<p></p>
		
		<button onclick="clearAllCookie();">清除所有的cookie</button>
		
	</body>

</html>
```

deno:

```
$(function(){
            $("ul li").click(function(){
                $("#"+this.id).addClass("cur").siblings().removeClass("cur"); //切换选中后的样式
                $("#colortable").attr("href",this.id+".css");//每次切换更换相对应的样式表
                $.cookie("cookie",//写入cookie
                        this.id,//需要cookie写入的业务
                        {
                        "path":"/", //cookie的默认属性
                        "expires":10 //有效天数
                })
            });
            var cookie=$.cookie("cookie"); //读取cookie
            if(cookie){
                    $("#"+cookie).addClass("cur").siblings().removeClass("cur");
                    $("#colortable").attr("href",cookie+".css");
                    $.cookie("cookie",cookie,{
                        "path":"/",
                        "expires":10
                    })
                }
        })
```

html:

```
<li id="colour_1">红色</li>
<li id="colour_2">黑色</li>
```

一个简单的换肤效果就出来了

如果用谷歌浏览器打开 记得要在服务器端哦。。
上面这个demo要注意的地方有：
被点击的盒子。class或者id等 跟对应的样式表名字一样。
这样就完成了拉。。
整理后的代码

```
$(function(){
            $("ul li").click(function(){
                Mycookie(this.id)
            });
            var cookie=$.cookie("cookie"); //读取cookie
            if(cookie){
                Mycookie(cookie);
            }
        })
        function Mycookie(thiscookie){
            $("#"+thiscookie).addClass("cur").siblings().removeClass("cur");
            $("#colortable").attr("href",thiscookie+".css");
            $.cookie("cookie",thiscookie,{
                "path":"/",
                "expires":10
            })
        }
```

[下载jQuery.cookie.js](/about/jquery.cookie.js)

