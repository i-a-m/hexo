---
title: ajax的错误处理
tags: [前端,js]
categories: 前端

---

####jQuery中用Ajax时很方便的，大家都知道像下面的调用

   ```
$.ajax({

     type:"GET",

    url:"http://10.10.10.1&quot;,

    dataType:"JSON",

    beforeSend:function(){},

    success:function(msg){alert(msg)},

    error:function(){}

})

   ```

####上面的error是处理错误的常用方法，但是当URL无法连接 时，error就不能正常处理了，用firebug调试的时候发现当Ajax请求超时时会报msg is null，于是在这个时候可以用msg-即返回的内容判断，试着修改一下代码:

```


 success:function(msg){

if(!msg){
                              alert("未知错误!")
                             $(".pop_inner h3").html("连接数据库失败!");//例子
                              return false;

}

 

可 以正常处理错误
```

