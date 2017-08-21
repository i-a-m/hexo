---
title: 接口调用范例javascript+JSON
tags: [前端,js]
categories: 前端
---
 (本例以获取追信组件列表为例演示JavaScript+JSON方法调用)

提示:

本例中URL附带的相关参数详见常规接口参数

个别设备用不支持使用jQuery开发

```
<o:p> </o:p>
一、使用js框架jQuery开发:<o:p></o:p>

<o:p> </o:p>

1.引入jQuery<o:p></o:p>

<o:p> </o:p>

  <script type="text/javascript" src="js/jquery.js">script><o:p></o:p>

<o:p> </o:p>

2.相关代码<o:p></o:p>

<o:p> </o:p>

  <script type="text/javascript"><o:p></o:p>

      $(document).ready(function(){//页面DOM元素载入完毕<o:p></o:p>

              var url = "http://api.zhui.cn/content/ZIDList.ashx?showmode=2&jsoncallback=?&quot;;//获取数据URL地址,可从上面相关接口介绍中获取<o:p></o:p>

            var list=$("

");//定义相关元素<o:p></o:p>

            list.appendTo("body");//并加入页面中<o:p></o:p>

            $.getJSON(url,function(msg){//开始调用<o:p></o:p>

                $.each(msg.Items,function(i,item){//遍历获取的数据<o:p></o:p>

                   $("

"+item.ZName+"").appendTo(list);//整合返回的数据,插入页面<o:p></o:p>

                })<o:p></o:p>

            })<o:p></o:p>

     })<o:p></o:p>

      script>

<o:p> </o:p>

<o:p> </o:p>

<o:p> </o:p>

二、使用JavaScript开发:<o:p></o:p>

<o:p> </o:p>

1.相关代码(代码放在body下)<o:p></o:p>

<o:p> </o:p>

      <script type="text/javascript"><o:p></o:p>

     function json(msg){//定义函数，函数名随意，不过要和下面URL参数jsoncallback的值相吻合<o:p></o:p>

               var len=msg.Items.length;<o:p></o:p>

                for(var i=0;i<len;i++){<o:p></o:p>

                var z=msg.Items[i].ZName;<o:p></o:p>

                var txt=document.createTextNode(z);<o:p></o:p>

                var li=document.createElement("li");<o:p></o:p>

              var ul=document.createElement("ul");<o:p></o:p>

                li.appendChild(txt);<o:p></o:p>

              ul.appendChild(li);<o:p></o:p>

                document.getElementsByTagName("body")[0].appendChild(ul);<o:p></o:p>

               }<o:p></o:p>

             }<o:p></o:p>

   script><o:p></o:p>

   <script type="text/javascript" src="http://api.zhui.cn/content/ZIDList.ashx?showmode=2&jsoncallback=json"&gt;script> //调用<o:p></o:p>

<o:p> </o:p>

<o:p> </o:p>

<o:p> </o:p>
```

