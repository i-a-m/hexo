---
title: ajax登录
tags: [ajax,前端,js]
categories: 前端
---

####login.htm：真正的登录界面，负责登录逻辑 代码

```
<script type="text/javascript" src="js/jquery-1.3.2.js"></script>
<script type="text/javascript">
$().ready(function () {
  $('#Login').click(function () {
    if ($('#username').val() == "" || $('#password').val() == "") {
    alert("用户名或密码不能为空！");
  }
	else {
  $.ajax({
    type: "POST",
    url: "Ajax/LoginHandler.ashx",
    data: "username=" + escape($('#username').val()) + "&password=" + escape($('#password').val()),
    beforeSend: function () {
 		$("#loading").css("display", "block"); //点击登录后显示loading，隐藏输入框
  		$("#login").css("display", "none");
  },
  success: function (msg) {
  		$("#loading").hide(); //隐藏loading
 	 	if (msg == "success") {
  		//parent.tb_remove();
  		parent.document.location.href = "admin.htm"; //如果登录成功则跳到管理界面
  		parent.tb_remove();
  }
    if (msg == "fail") {
      alert("登录失败！");
    }
  },
  complete: function (data) {
    $("#loading").css("display", "none"); //点击登录后显示loading，隐藏输入框
    $("#login").css("display", "block");
  },
 	 error: function (XMLHttpRequest, textStatus, thrownError) {
  }
  });
  }
  });
  });
</script>
 
<div id="loading" style="text-align: center; display: none; padding-top: 10%">
<img src="images/loadingajax.gif" alt="loading" />
</div>
<div id="login" style="text-align: center">
<div style="position:absolute; right:0; top:0"><img src="images/closebox.png" onclick="parent.tb_remove()" alt="点击关闭" style="cursor:pointer" /></div>
 
<table border="0" cellpadding="3" cellspacing="3" style="margin: 0 auto;">
<tr>
<td style="text-align: right; padding: 10px">
<label>
用户名:</label>
</td>
<td>
<input id="username" type="text" size="20" />
</td>
</tr>
<tr>
<td style="text-align: right; padding: 10px">
<label>
密码:</label>
</td>
<td>
<input id="password" type="password" size="20" />
</td>
</tr>
<tr align="right">
<td colspan="2">
<input type="submit" id="Login" value="&nbsp;&nbsp;登&nbsp;录&nbsp;&nbsp;" style="margin-right: 50px">&nbsp;
<input type="submit" id="LoginCancel" value="&nbsp;&nbsp;取&nbsp;消&nbsp;&nbsp;" onclick="parent.tb_remove()">
</td>
</tr>
</table>
</div>
 
LoginHandler.ashx：ajax处理类，简单的逻辑
 
代码 
//此处连接数据库查看是否有此用户，此处为了方便起见，直接判断
if (username == "admin" && password == "1")
{
context.Response.Write("success");
//存储session
}
else
{
context.Response.Write("fail");
}
```

 ok，一个简单的登录功能就完成了，当然此处在登录的时候没有进行密码加密。

####下面我们来看看jQuery的加密插件MD5插件， 使用十分方便，加入md5.js的引用就可以使用$.md5()函数对字符串进行加密，


如下对上述代码做稍微改变，即可看到加密后的字符串，


login.htm中：


```data: "username=" + escape($('#username').val()) + "&password=" + $.md5(escape($('#password').val())),```

```success: function (msg) {
$("#loading").hide(); //隐藏loading

alert(msg);

if (msg == "success") {

//parent.tb_remove();

parent.document.location.href = "admin.htm"; //如果登录成功则跳到管理界面

parent.tb_remove();

}

if (msg == "fail") {

alert("登录失败！");

}

}
```

LoginHandler.ashx中加密码返回即可：

context.Response.Write(password);

ok，再次运行程序会弹出 输入密码的MD5加密之后的字符串。

