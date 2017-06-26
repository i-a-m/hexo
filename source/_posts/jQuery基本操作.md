---
title: jQuery基本操作
tags: [Django,Python,]
categories: Python
---

**jQuery简介**

　　jQuery是一个兼容多浏览器的javascript库，极大地简化了 JavaScript 编程,核心理念是write less,do more(写得更少,做得更多)，对javascript进行了封装，是的更加便捷的开发，并且在兼容性方面十分优秀。

jQuery 库特性：

**1、选择器**

```
<div class="dd"></div>
<div id="demo">
    <p>Hello Word</p>
</div>
```

基本选择器

　　1、id选择器

```
$("#demo") 　　//选取 id="demo" 的元素
```

　　2、标签选择器

```
$("p") 　　　　　//选取所有 <p> 元素
```

　　3、class选择器

```
$(".dd") 　　 　  //选取所有 class="dd" 的元素
```

　　4、*

```
$("*")　　　　　 //匹配所有元素
```

其他

```
$(".dd,#demo,p")     //匹配多个元素

$("#demo p")　 //匹配id="demo" 下的 p 元素
```

 基本筛选器

```
<ul>
    <li>list item 1</li>
    <li>list item 2</li>
    <li>list item 3</li>
    <li>list item 4</li>
    <li>list item 5</li>
</ul>
```

```
$("li:first")　　　//获取第一个元素
$("li:last ")　     //获取最后一个元素

$("li:eq(1)")　　//获取索引值为1的元素　　  
$("li:gt(1)")       //获取大于该索引的元素
$("li:lt(1)")        //获取大于该索引的元素

$("li:even")　　//匹配所有索引值为偶数的元素，从 0 开始计数
$("li:odd　")     //匹配奇数
```



属性

　　1、[attribute]

　　　　$("div[id]");　　查找所有含有id属性的div元素

　　2、[attribute=value]

```
<input type="checkbox" name="checkname" value="name1" />
<input type="checkbox" name="checkname" value="name2" />
<input type="checkbox" name="demo" value="name3" />
```

　　　　$("input[name='checkname']");　　查找所有 name 属性是 checkname 的 input 元素

　　3、[attribute!=value]　　不等于

　　4、[attribute^=value]　　

　　　　　　$("input[name^='news']")　　　　查找所有 name 以 'news' 开始的 input 元素

　　　　[attribute$=value]　　　　以什么结尾

　　　　[attribute*=value]　　　　包含某些值

表单

　　1、$(":input")　　查找所有input标签

　　2、$(":text")　　查找所有input下type=text的标签（ 等于$("input[type='text']") ）

　　:password　　:radio　　:checkbox　　:submit　　:image　　:reset　　:button　　:file　　同上

　　

**2、筛选（过滤、查找）**

```
<ul>
    <li>list item 1</li>
    <li>list item 2</li>
    <li>list item 3</li>
    <li>list item 4</li>
    <li>list item 5</li>
</ul>
```



过滤（常用）：`　`

　　1、$("`li`").`first()`　　　　　  获取第一个元素

　　2、$("`li`").last()　　　　　　  获取最后一个元素

　　3、$("`li`").eq(1)　　　　　　  根据索引获取

　　4、$(this).hasClass("demo")   查看是否有class=demo的元素，返回true或false``

　　5、map（callback）



```
<script>
    //map会循环多个标签中的每一个标签，每一个标签被循环时都会执行map内部的函数并获取返回值，
    //并将所有返回值封装到一个数组中返回
    var list=$("li").siblings().map(function(){

        return $(this).text();//this这里就是当前循环标签
    });
</script>
```



查找（常用）：

　　1、children()

`　　　　$("div").children()　　 　　查`找DIV中的每个子元素

　　2、find()

　　　　`$("p").find("span")　　 　　从p下面的所有元素中去找span标签`

　　3、next()　　　　　　　   　　　下一个元素

　　4、nextAll()　　　　　　　　　　当前元素之后的所有同级别元素

　　5、nextUntil()　　　　　　　　  查找什么之后 直到 什么之前的元素

　　　　`$("#term-1").nextUntil("#term-2").css("color", "green");　　给#term-1后面直到"#term-2前的元素加上红色背景`



```
<dl>
    <dt id="term-1">term 1</dt>
    <dd>definition 1-a</dd>
    <dd>definition 1-b</dd>
    <dd>definition 1-c</dd>

    <dt id="term-2">term 2</dt>
    <dd>definition 2-a</dd>
    <dd>definition 2-b</dd>
</dl>
```



　　6、prev()、prevall()、prevUntil()　　往上找、类似next

　　7、parent()　　查找父元素　　parents() 　　查找所有祖先  　　parentsUntil()　　一直找祖先，直到找到规定元素为止

　　8、siblings()　　　　查找所有兄弟姐妹的元素

 

**3、属性**

css

```
addClass()　　　　　　　　//为每个匹配的元素添加类名

removeClass()　　　　　　//为每个匹配的元素删除指定类

toggleClass()　　　　　　 //如果存在就删除这个类，不存在就添加这个类
```

 

HTML代码/文本/值

　　html()

```
$('p').html();　　　　//获取p元素的内容

$("p").html("Hello <b>world</b>!");　　//设置p元素的内容
```

　　text()

```
$('p').text();　　　　//获取p元素的文本内容（只获取文本）

$("p").text("Hello world!");　　//设置p元素的文本内容
```

　　val()　

```
$("input").val();　　//获取文本框中的值

$("input").val("hello world!");　　//设置文本框中的值
```

 

属性

　　attr()　　　　设置或返回被选元素的属性值。

```
$("img").attr("src");    //获取所有图像的src属性值。
$("img").attr("src","test.jpg");    //设置属性
```

　　removeAttr(name)　　删除一个属性

```
$("img").removeAttr("src");    //删除src属性
```

　　prop()

```
$("input[type='checkbox']").prop("checked");    //选中复选框为true，没选中为false
```

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <div>
        <input type="button" value="全选" onclick="CheckAll()">
        <input type="button" value="反选" onclick="CheckReverse()">
        <input type="button" value="取消全选" onclick="CheckCancel()">
    </div>

    <div id='checklist'>
        <input type='checkbox' value='1'/>选择一
        <input type='checkbox' value='2'/>选择二
        <input type='checkbox' value='3'/>选择三
    </div>
<script src="jquery-2.2.3.js"></script>
<script>
    function CheckAll(){
            //$("#checklist").find(":checkbox").attr("checked","checked");
            $("#checklist").find(":checkbox").prop("checked",true);
        }
        function CheckReverse(){
            $("#checklist").find(":checkbox").each(function(){
                if ($(this).prop("checked")){
                    $(this).prop("checked",false);
                }else {
                    $(this).prop("checked",true);
                }
            })
        }
        function CheckCancel(){
            //$("#checklist").find(":checkbox").removeAttr("checked");
            $("#checklist").find(":checkbox").prop("checked",false);
        }
</script>
</body>
</html>
```



 

4、CSS

CSS　

　　css()　　　　访问匹配元素的样式属性。

```
$("p").css("color");    //获取
$("p").css("color","red");    //设置
$("p").css({ "color": "red", "background": "blue" }); //支持字典设置
```

位置

　　offset()　　获取匹配元素在当前视口的相对偏移。

```
<p>Hello</p>
<p>Hello Word</p>
```

```
var obj=$("p:eq(1)");
var obj_top = obj.offset().top;    
var obj_left = obj.offset().left;    
console.log(obj_top,obj_left)
```

　　position()　　获取匹配元素相对父元素的偏移

 

　　scrollTop()　　获取匹配元素相对滚动条顶部的偏移

```
$(window).scrollTop(0);    //设置为0,返回顶部
```

　　scrollLeft()

 

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <style>
        .back{
            position: fixed;
            bottom: 0px;
            right: 0px;
        }
        .hide{
            display: none;
        }
    </style>
</head>
<body>

<div style="height: 2000px;"></div>
<div onclick="GoTop()" class="back hide">返回顶部</div>

<script src="jquery-2.2.3.js"></script>
<script type="text/javascript">

    function GoTop(){
        //返回顶部
        $(window).scrollTop(0);
    }

    $(function(){
        $(window).scroll(function(){
            //当滚动滑轮时，执行函数体

            //获取当前滑轮滚动的高度
            var top = $(window).scrollTop();

            if(top>100){
                //展示“返回顶部”
                $('.back').removeClass('hide');
            }else{
                //隐藏“返回顶部”
                $('.back').addClass('hide');
            }
        });
    });
</script>

</body>
</html>
```



```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .float_left{
            float: left;
        }
        .leftdiv{
            position:fixed;
            width: 300px;
            height:100px;left:0px;top:0px;
        }
        .rightdiv{
            margin-left: 300px;
        }
        .color{
            background-color: red;
        }
    </style>
</head>
<body>
    <div id="skip" class="float_left leftdiv">
        <p>第一章</p>
        <p>第二章</p>
        <p>第三章</p>
    </div>

    <div class="float_left rightdiv">
        <div class="chap" style="height: 500px">
            <h1>第一章</h1>
        </div>
         <div class="chap" style="height: 1000px">
            <h1>第二章</h1>
        </div>
        <div class="chap" style="height: 50px">
            <h1>第三章</h1>
        </div>
    </div>

    <script src="jquery-2.2.3.js"></script>
    <script>
        $(function(){
            $(window).scroll(function(){
                var scroll_top = $(window).scrollTop();//滚动的长度
                var li = [];
                $.each($(".chap"),function(i){
                    var current_height=$($(".chap")[i]).offset().top;//把所有章节的高度放入列表
                    li.push(current_height);
                });
                $.each(li,function(i){
                    if(scroll_top+$(window).height() == $(document).height()){  //如果滚动到底部
                            $($("#skip").children().last()).addClass("color");
                            $($($("#skip").children().last()).siblings()).removeClass("color");
                        }
                    if(scroll_top>li[i]){
                        $($("#skip").children().eq(i)).addClass("color");
                        $($($("#skip").children().eq(i)).siblings()).removeClass("color");
                    }
                })
            })
        })
    </script>

</body>
</html> 
```

尺寸

```
height()        //元素当前的高度
innerHeight()        //元素内部区域高度
outerHeight()        //元素外部区域高度

width()        //元素当前的宽度
innerWidth()        //元素内部区域宽度
outerWidth()        //元素外部区域宽度 
```

5、文档处理

内部插入

　　append()　　　   　像匹配元素**内部结尾处**插入内容

　　appendTo()　　　　把所有匹配的元素**追加**到另一个指定的元素的元素集合中。

```
$("#aa").prependTo("#foo");　　//把#aa匹配的元素前置到#foo匹配的标签中
```

　　prepend()　　　  　像匹配元素**内部开始处**插入内容

　　prependTo()　　　 把所有匹配的元素**前置**到另一个指定的元素的元素集合中。

外部插入

　　after()　　　　　　 在每个匹配**元素之后**插入内容

　　before()　　　　　 在每个匹配**元素之前**插入内容

　　insertAfter()　　　 把所有匹配的元素插入到另一个、指定的元素元素集合的**后面**。

　　insertBefore() 　　 把所有匹配的元素插入到另一个、指定的元素元素集合的**前面**。

包裹

　　wrap()　　　　　　把所有匹配的元素用其他元素的结构化标记包裹起来。

```
//把所有p标签用一个新创建的div包裹起来
$("p").wrap("<div class='wrap'></div>");

//用ID是"content"的div将每一个段落包裹起来
$("p").wrap($("#content");
```

　　unwrap()　　　　 移出元素的父元素。这能快速取消 .wrap()方法的效果

替换

　　replaceWith()　　将所有匹配的元素替换成指定的HTML或DOM元素。

```
//把所有p标签换成指定div
$("p").replaceWith("<div>111</div>");
```

　　replaceAll(selector)

```
//把所有p标签替换成指定的div
$("<div>111</div>").replaceAll("p");
```

 

删除

　　empty()　　　　  删除匹配的元素集合中所有的子元素

　　remove()　　　　删除匹配的元素

复制

　　clone()　　　　　复制并且选中这些克隆的副本

```
//复制id=demo的元素并前置到所有段落中
$("#demo").clone().prependTo("p");
```



```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <div id="search">
        <div class="condition">
            <a onclick="AddCondition(this,'#search')"> + </a>
            <input />
        </div>
    </div>
    <script src="jquery-2.2.3.js"></script>
    <script>
        function AddCondition(ths,search){
            //复制condition所在div
            var cop=$(ths).parent().clone();
            //修改复制标签的内容
            cop.children(':first').text('-').attr("onclick","RemoveCondition(this,'#search')");
            //添加标签
            cop.appendTo("#search")
        }
        function RemoveCondition(ths,search){
            //移除标签
            $(ths).parent().remove();
        }

    </script>
</body>
</html> 
```

6、事件

ready()　　　　在DOM加载完成时绑定一个要执行的函数。

```
$(document).ready(function(){
  // 执行代码
});

//或

$(function(){
  // 执行代码
});
```



bind()　　为每个匹配元素的特定事件绑定事件处理函数。



```
$("p").bind("click", function(){
  alert( $(this).text() );
});
//或
$("p").click（function(){
  alert( $(this).text() );
});
```

unbind()　　移除bind事件



```
var foo = function () {
  // 处理某个事件的代码
};

$("p").bind("click", foo); // 当点击段落的时候触发 foo 

$("p").unbind("click", foo); //再也不会触发 foo
```

delegate()　　 事件适用于处理程序当前或未来的元素（比如由脚本创建的新元素）。

　　　　和bind区别：bind是绑定了在执行，delegate是要执行时在去绑定

undelegate()　　移除

 

one()　　为每一个匹配元素的特定事件（像click）绑定一个一次性的事件处理函数。

```
$("p").one("click", function(){
  alert( $(this).text() );
});
```

 

具体事件相关：[http://www.php100.com/manual/jquery/](http://www.php100.com/manual/jquery/)

7、ajax

普通本域ajax请求



```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
    <input id="n1" name="name" />
    <input type="button" value="提交" onclick="SubmitData();"/>

    <script src="jquery-2.2.3.js"></script>
    <script>
        function SubmitData(){
            // 获取值
            var inpVal = $('#n1').val();
            var inpName = $('#n1').attr('name');

            $.ajax({
                url: "http://127.0.0.1:8000/index/",
                data: {'kk': 123, inpName: inpVal},
                type: 'POST',
                success: function(arg){
                    // 当请求执行完成之后，自动调用
                    // arg:服务器返回的数据
                    console.log(arg);
                },
                error: function(){
                    // 当请求错误之后，自动调用
                }
            })
        }
    </script>
</body>
</html>
```



跨域ajax请求



```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
    <input type="button" value="获取节目" onclick="SubmitData();"/>
    <div id="container">
    </div>
    <script src="jquery-2.2.3.js"></script>
    <script>
        function SubmitData(){
            // 获取值
            $.ajax({
                url: "",//
                data: {},
                type: 'GET',
                dataType: 'jsonp',//发送格式
                //callback和list相当于指定要发送的key和value，之后callback用来获取封装在list中的数据
                jsonp: 'callback',
                jsonpCallback: 'list',
                success: function(arg){
                    console.log(arg);
                    // arg,服务器返回的数据
                },
                error: function(){
                    // 当请求错误之后，自动调用
                }
            })
        }
    </script>
</body>
</html>
```



 比如后端返回的数据格式：return HttpResponse("list("+json.dumps({"aa":11})+")")

更多ajax相关：[点击](http://www.php100.com/manual/jquery/jQuery.Ajax.html)

 

8、扩展方法

jQuery.extend(object)　　　　扩展jQuery对象本身，在jQuery命名空间上增加新函数

增加函数

```
//自定义一个方法aaa
$.extend({
    "aaa":function(){
        return 123456;
    }
});
var result= $.aaa();
console.log(result);
```

自执行函数写法



```
(function(jQuery){
    jQuery.extend({
        "aaa":function(arg){
            return arg;
        }
    })
})(jQuery);
console.log($.aaa("Hello"));
```



```
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
    <div style="border: 1px solid #ddd;width: 600px;position: absolute;">
        <div id="title" style="background-color: black;height: 40px;color: white;">
            标题
        </div>
        <div style="height: 300px;">
            内容
        </div>
    </div>
<script type="text/javascript" src="jquery-2.2.3.js"></script>
<script>
    $(function(){
        // 页面加载完成之后自动执行
        $('#title').mouseover(function(){
            $(this).css('cursor','move');
        }).mousedown(function(e){
            //console.log($(this).offset());
            var _event = e || window.event;
            // 原始鼠标横纵坐标位置
            var ord_x = _event.clientX;
            var ord_y = _event.clientY;

            var parent_left = $(this).parent().offset().left;
            var parent_top = $(this).parent().offset().top;

            $(this).bind('mousemove', function(e){
                var _new_event = e || window.event;
                var new_x = _new_event.clientX;
                var new_y = _new_event.clientY;

                var x = parent_left + (new_x - ord_x);
                var y = parent_top + (new_y - ord_y);

                $(this).parent().css('left',x+'px');
                $(this).parent().css('top',y+'px');

            })
        }).mouseup(function(){
            $(this).unbind('mousemove');
        });
    })
</script>

</body>
</html>
```

 

图片轮播：http://bxslider.com

更多图标：http://fontawesome.io

 

更多相关：http://www.php100.com/manual/jquery/