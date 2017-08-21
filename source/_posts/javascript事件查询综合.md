---
title: javascript事件查询综合
tags: [前端,js]
categories: 前端
---
javascript事件查询综合

| **功能函数**                          | **描述**                                   |
| --------------------------------- | ---------------------------------------- |
| click()                           | 对象.click() 使对象被点击                        |
| closed                            | 对象.closed 对象窗口是否已关闭true/false            |
| clearTimeout(对象)                  | 清除已设置的setTimeout对象                       |
| clearInterval(对象)                 | 清除已设置的setInterval对象                      |
| confirm("提示信息")                   | 弹出确认框，确定返回true取消返回false                  |
| cursor:样式                         | 更改鼠标样式 hand crosshair text wait help default auto e/s/w/n-resize |
| event.clientX                     | 返回最后一次点击鼠标X坐标值                           |
| event.clientY                     | 返回最后一次点击鼠标Y坐标值                           |
| event.offsetX                     | 返回当前鼠标悬停X坐标值                             |
| event.offsetY                     | 返回当前鼠标悬停Y坐标值                             |
| document.lastModified             | 网页最后一次更新时间                               |
| document.ondblclick=x             | 当双击鼠标产生事件                                |
| document.onmousedown=x            | 单击鼠标键产生事件                                |
| document.body.scrollTop           | 返回和设置当前竖向滚动条的坐标值，须与函数配合                  |
| document.body.scrollLeft          | 返回和设置当前横向滚动务的坐标值，须与函数配合                  |
| document.title                    | document.title="message",当前窗口的标题栏文字      |
| document.bgcolor                  | document.bgcolor="颜色值";改变窗口背景颜色          |
| document.Fgcolor                  | document.Fgcolor="颜色值";改变正文颜色            |
| document.linkcolor                | document.linkcolor="颜色值";改变超联接颜色         |
| document.alinkcolor               | document.alinkcolor="颜色值";改变正点击联接的颜色     |
| document.VlinkColor               | document.VlinkColor="颜色值";改变已访问联接的颜色     |
| document.forms.length             | 返回当前页form表单数                             |
| document.anchors.length           | 返回当前页锚的数量                                |
| document.links.length             | 返回当前页联接的数量                               |
| document.onmousedown=x            | 单击鼠标触发事件                                 |
| document.ondblclick=x             | 双击鼠标触发事件                                 |
| window.status                     | 将状态栏设置默认显示                               |
|                                   |                                          |
| isNumeric                         | 判断是否是数字                                  |
| innerHTML                         | xx=对象.innerHTML, 输入某对象标签中的html源代码        |
| innerText                         | divid.innerText=xx, 将以div定位以id命名的对象值设为XX |
| location.reload()                 | 使本页刷新，target可等于一个刷新的网页                   |
| Math.random()                     | 随机涵数,只能是0到1之间的数,如果要得到其它数,可以为*10,再取整      |
| Math.floor(number)                | 将对象number转为整数，舍取所有小数                     |
| Math.min(1,2)                     | 返回1,2哪个小                                 |
| Math.max(1,2)                     | 返回1,2哪个大                                 |
|                                   |                                          |
| navigator.appName                 | 返回当前浏览器名称                                |
| navigator.appVersion              | 返回当前浏览器版本号                               |
| navigator.appCodeName             | 返回当前浏览器代码名字                              |
| navigator.userAgent               | 返回当前浏览器用户代标志                             |
| onsubmit                          | onsubmit="return(xx())", 使用函数返回值         |
| opener                            | opener.document.对象, 控制原打开窗体对象            |
| prompt                            | xx=window.prompt("提示信息","预定值"); 输入语句     |
| parent                            | parent.框架名.对象, 控制框架页面                    |
| return                            | return false 返回值                         |
| random                            | 随机参数（0至1之间）                              |
| reset()                           | form.reset(), 使form表单内的数据重置              |
| split()                           | string.split("") 将string对象字符以逗号隔开        |
| submit()                          | form对象.submit(), 使form对象提交数据             |
| charAt()                          | charAt(x)对象,反回指定对象的第多少位的字母               |
| lastIndexOf("string")             | 从右到左询找指定字符，没有返回-1                        |
| indexOf("string")                 | 从左到右询找指定字符，没有返回-1                        |
| LowerCase()                       | 将对象全部转为小写                                |
| UpperCase()                       | 将对象全部转为大写                                |
| substring(0,5)                    | string.substring(x,x), 返回对象中从0到5的字符      |
| setTimeout("function",time)       | 设置一个超时对象                                 |
| setInterval("function",time)      | 设置一个超时对象                                 |
| toLocaleString()                  | x.toLocaleString(), 从x时间对象中获取时间，以字符串型式存在 |
| typeof(变量名)                       | 检查变量的类型，值有：String, Boolean, Object, Function, Underfined |
| window.event.button==1/2/3        | 鼠标键左键等于1, 右键等于2两个键一起按为3                  |
| window.screen.availWidth          | 返回当前屏幕宽度(空白空间)                           |
| window.screen.availHeight         | 返回当前屏幕高度(空白空间)                           |
| window.screen.width               | 返回当前屏幕宽度(分辨率值)                           |
| window.screen.height              | 返回当前屏幕高度(分辨率值)                           |
| window.document.body.offsetHeight | 返回当前网页高度                                 |
| window.document.body.offsetWidth  | 返回当前网页宽度                                 |
| window.resizeTo(0,0)              | 将窗口设置宽高                                  |
| window.moveTo(0,0)                | 将窗口移到某位置                                 |
| window.focus()                    | 使当前窗口获得焦点                                |
| window.scroll(x,y)                | 窗口滚动条坐标，y控制上下移动，须与函数配合                   |
| window.open()                     | window.open("地址","名称","属性")              |

​     

​     

| **属性**                                   | **描述**     |
| ---------------------------------------- | ---------- |
| toolbar                                  | 工具栏        |
| location                                 | 地址栏        |
| directions，status                        | 状态栏        |
| menubar                                  | 菜单栏        |
| scrollbar                                | 滚动条        |
| resizable                                | 改变大小       |
| width                                    | 宽          |
| height                                   | 高          |
| fullscreen                               | 全屏         |
| scrollbars                               | 全屏时无滚动条无参数 |
| channelmode                              | 宽屏         |
| left                                     | 打开窗口x坐标    |
| top                                      | 打开窗口y坐标    |
| 事例：window.location = ‘view-source:’ + window.location.href 应用事件查看网页源代码; |            |

​     

​     

| **日期函数**           | **描述**       |
| ------------------ | ------------ |
| a=new Date()       | 创建a为一个新的时期对象 |
| y2=a.getYear()     | 获取年份值，两位数年份  |
| y4=a.getFullYear() | 获取全年份数，四位数年份 |
| m=a.getMonth()     | 获取月份值        |
| d=a.getDate()      | 获取日期值        |
| w=a.getDay()       | 获取当前星期值      |
| h=a.getHours()     | 获取当前小时数      |
| i=a.getMinutes()   | 获取当前分钟数      |
| s=a.getSeconds()   | 获取当前秒钟数      |

​    对象.style.fontSize="文字大小";
​    单位：mm/cm/in英寸/pc帕/pt点/px象素/em文字高
​    1in=1.25cm
​    1pc=12pt
​    1pt=1.2px(800*600分辩率下)

​    文本字体属性：
​    fontSize大小
​    family字体
​    color颜色
​    fontStyle风格，取值为normal一般,italic斜体,oblique斜体且加粗
​    fontWeight加粗,取值为100到900不等,900最粗,light,normal,bold
​    letterSpacing间距,更改文字间距离,取值为,1pt,10px,1cm
​    textDecoration:文字修饰;取值,none不修饰,underline下划线,

