---
title: Django进阶
tags: [Django,Python,]
categories: Python
---



```
一、Form

django中的Form一般有两种功能：1、输入html　　2、验证用户输入

1、输入html

from django.shortcuts import render
from django import forms

class UserForm(forms.Form):
    host = forms.CharField()
    port = forms.CharField()
    email = forms.EmailField()
    mobile = forms.CharField()


def user_list(request):
    obj = UserForm()
    return render(request,"index.html",{"obj":obj})
html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <form action="/app01/user_list/">
        <!--自动生成input标签-->
        <p>主机：{{ obj.host }}</p>
        <p>端口：{{ obj.port }}</p>
        <p>邮箱：{{ obj.email }}</p>
        <p>手机：{{ obj.mobile }}</p>
        <input type="submit">
    </form>
</body>
</html>
```

```
2、验证
from django.shortcuts import render
from django import forms

class UserForm(forms.Form):
    host = forms.CharField()
    port = forms.CharField()
    email = forms.EmailField()
    mobile = forms.CharField()

def user_list(request):
    obj = UserForm()
    if request.method == "POST":
        user_input_obj = UserForm(request.POST)#把提交过来的数据封装到UserForm，UserForm会自动把数据封装到user_input_obj
        if user_input_obj.is_valid():   #验证用户输入是否合法
            data = user_input_obj.clean()   #合法，获取数据
        else:
            error_msg = user_input_obj.errors   #不合法，返回错误信息
            return render(request,"index.html",{"obj":user_input_obj,"error":error_msg})
    return render(request,"index.html",{"obj":obj})
```

```
优化
def user_list(request):
    obj = UserForm(request.POST)#如果有数据，把提交过来的数据封装到UserForm，UserForm会自动把数据封装到user_input_obj
    if request.method == "POST":
        if obj.is_valid():   #验证用户输入是否合法
            data = obj.clean()   #合法，获取数据
        else:
            error_msg = obj.errors.as_data()   #不合法，返回错误信息
            return render(request,"index.html",{"obj":obj,"error":error_msg})
    return render(request,"index.html",{"obj":obj,})
```

```
html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <form action="/app01/user_list/" method="post">
        <!--自动生成input标签-->
        <p>主机：{{ obj.host }}<span>{{ error.host }}</span></p>
        <p>端口：{{ obj.port }}<span>{{ error.port }}</span></p>
        <p>邮箱：{{ obj.email }}<span>{{ error.email }}</span></p>
        <p>手机：{{ obj.mobile }}<span>{{ error.mobile }}</span></p>
        <input type="submit">
    </form>
</body>
</html>
```

```
3、定制From表单

（1）设置报错信息，添加属性样式

class UserForm(forms.Form):
    host = forms.CharField(error_messages={"required":"主机不能为空"},#设置显示的错误信息
                           widget=forms.TextInput(attrs={"class":"form-control",
                                                         "placeholder": "主机"})#添加属性和样式
                           )
    port = forms.CharField()
    email = forms.EmailField()
    mobile = forms.CharField()
```

```
（2）多行文本框
#多行文本框，备注
    memo = forms.CharField(required=False,  #可以为空
                           widget=forms.Textarea(attrs={"class":"form-control",
                                                         "placeholder": "备注"})#添加属性和样式
                           )
```

```
（3）下拉框
#下拉框
    user_type_choice=(
        (0,"普通用户"),
        (1,"高级用户")
    )
    user_type = forms.IntegerField(widget=forms.widgets.Select(choices=user_type_choice,
                                                                  attrs={'class': "form-control"}))
```

```
（4）动态生成select标签

文件中取数据

#动态下拉框
　　 u_type = forms.IntegerField(widget=forms.widgets.Select( attrs={'class': "form-control"}))

    def __init__(self, *args, **kwargs):
        super(UserForm, self).__init__(*args, **kwargs)
        import json
        f=open("u_type_db")
        data = f.read()
        data_tuple = json.loads(data)
        self.fields['u_type'].widget.choices = data_tuple
```

```
#u_type_db
[[0, "AAA"], [1, "BBB"],[2,"CCC"]]
```

```
数据库中取数据
def __init__(self, *args, **kwargs):
    super(UserForm, self).__init__(*args, **kwargs)
    data_tuple=models.UserInfo.objects.all().values_list('id','username')
    self.fields['u_type'].widget.choices = data_tuple
```

```
（5）自定义验证条件
#自定义验证
def mobile_validate(value):
    mobile_re = re.compile(r'^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$')
    if not mobile_re.match(value):
        raise ValidationError('手机号码格式错误')


class UserForm(forms.Form):
    mobile = forms.CharField(validators=[mobile_validate, ])#添加自定义手机号验证
```

```
4、漂亮显示错误信息
def user_list(request):
    obj = UserForm()
    if request.method == "POST":
        user_input_obj = UserForm(request.POST)#把提交过来的数据封装到UserForm，UserForm会自动把数据封装到user_input_obj
        if user_input_obj.is_valid():   #验证用户输入是否合法
            data = user_input_obj.clean()   #合法，获取数据
        else:
            error_msg = user_input_obj.errors   #不合法，返回错误信息
            return render(request,"index.html",{"obj":user_input_obj,"error":error_msg})
    return render(request,"index.html",{"obj":obj,})
```

```
默认显示ul样式as_ul()，不美观
error_msg = user_input_obj.errors   #不合法，返回错误信息
```

![img](http://images2015.cnblogs.com/blog/866760/201605/866760-20160520002229263-1869926807.png)

```
改成as_data()后只显示一个字符串格式
error_msg = user_input_obj.errors.as_data()   #不合法，返回错误信息
```

![img](http://images2015.cnblogs.com/blog/866760/201605/866760-20160520002305873-2024949274.png)

方法：

　　定义

![img](http://images2015.cnblogs.com/blog/866760/201605/866760-20160520002635669-893647495.png)

　　

```
在html顶部调用
{% load  form_tag %}
```

```
引用
<p>主机：{{ obj.host }}<span>{% error_message error.host %}</span></p>
```

```
as_json()　　用于ajax返回
error_msg = user_input_obj.errors.as_json()#不合法，返回错误信息
return HttpResponse(error_msg )
```

```
实例：

html

{% load  form_tag %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <form action="/app01/user_list/" method="post">
        <!--自动生成input标签,也可以自己写html标签-->
        <p>主机：{{ obj.host }}<span>{% error_message error.host %}</span></p><!--引用-->
        <p>端口：{{ obj.port }}<span>{{ error.port }}</span></p>
        <p>邮箱：{{ obj.email }}<span>{{ error.email }}</span></p>
        <p>手机：{{ obj.mobile }}<span>{{ error.mobile }}</span></p>
        <p>备注：{{ obj.memo }}<span>{{ error.memo }}</span></p>
        <p>用户类型：{{ obj.user_type }}<span>{{ error.user_type }}</span></p>
        <input type="submit">
    </form>
</body>
</html>
```

```
views
from django.shortcuts import render
from django import forms
import re
from django.core.exceptions import ValidationError

#自定义验证
def mobile_validate(value):
    mobile_re = re.compile(r'^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$')
    if not mobile_re.match(value):
        raise ValidationError('手机号码格式错误')

class UserForm(forms.Form):
    host = forms.CharField(error_messages={"required":"主机不能为空"},#设置显示的错误信息
                           widget=forms.TextInput(attrs={"class":"form-control",
                                                         "placeholder": "主机"})#添加属性和样式
                           )
    port = forms.CharField(error_messages={"required":"端口不能为空"})
    email = forms.EmailField(error_messages={"required":"邮箱不能为空"})
    mobile = forms.CharField(error_messages={"required":"手机不能为空"},
                             validators=[mobile_validate, ])#添加自定义验证

    #多行文本框，备注
    memo = forms.CharField(required=False,  #可以为空
                           widget=forms.Textarea(attrs={"class":"form-control",
                                                         "placeholder": "备注"})#添加属性和样式
                           )
    #下拉框
    user_type_choice=(
        (0,"普通用户"),
        (1,"高级用户")
    )
    user_type = forms.IntegerField(widget=forms.widgets.Select(choices=user_type_choice,
                                                                  attrs={'class': "form-control"}))

def user_list(request):
    obj = UserForm()
    if request.method == "POST":
        user_input_obj = UserForm(request.POST)#把提交过来的数据封装到UserForm，UserForm会自动把数据封装到user_input_obj
        if user_input_obj.is_valid():   #验证用户输入是否合法
            data = user_input_obj.clean()   #合法，获取数据
        else:
            error_msg = user_input_obj.errors.as_data()   #不合法，返回错误信息
            return render(request,"index.html",{"obj":user_input_obj,"error":error_msg})
    return render(request,"index.html",{"obj":obj,})
```

```
二、中间件

1、django 中的中间件（middleware），其实就是一个类，在请求到来和结束后，django会根据自己的规则在合适的时机执行中间件中相应的方法settings模块中，有一个 MIDDLEWARE_CLASSES 变量，其中每一个元素就是一个中间件

MIDDLEWARE_CLASSES = [
    #'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    #'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

```
中间件中可以定义四个方法，分别是：
process_request(self,request)

process_view(self, request, callback, callback_args, callback_kwargs)

process_exception(self, request, exception)

process_response(self, request, response)

每一个请求都是先通过中间件中的 process_request 函数，这个函数返回 None 或者 HttpResponse 对象，如果返回None ，继续处理其它中间件，如果返回一个 HttpResponse，就处理中止，返回到网页上Django 会从 MIDDLEWARE_CLASSES 中按照从上到下的顺序一个个执行中间件中的 process_request 函数，而其中 process_response 函数则是最前面的最后执行。

2、自定义中间件

创建中间件
```

![img](http://images2015.cnblogs.com/blog/866760/201605/866760-20160523060909569-1729536887.png) 

```
class RequestMiddleware(object):
    def process_request(self,request):
        print("process_request")
    def process_view(self, request, callback, callback_args, callback_kwargs):
        print("process_view")
    def process_exception(self, request, exception):
        print("process_exception")
    def process_response(self, request, response):
        print("process_response")
        return response

class RequestMiddleware2(object):
    def process_request(self,request):
        print("process_request2")
    def process_view(self, request, callback, callback_args, callback_kwargs):
        print("process_view2")
    def process_exception(self, request, exception):
        print("process_exception2")
    def process_response(self, request, response):
        print("process_response2")
        return response
```

```
注册中间件

settings.py

MIDDLEWARE_CLASSES = [
    #'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    #'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'app01.middleware.middle.RequestMiddleware',
    'app01.middleware.middle.RequestMiddleware2',
]
```

```
路由执行的函数
def index(request):
    print("index")
    return HttpResponse("index")
```

执行结果

![img](http://images2015.cnblogs.com/blog/866760/201605/866760-20160523061422100-90183468.png)

```
上面是中间没有HttpResponse返回时的执行流程顺序，先执行process_request和process_view方法，在执行路由定义的函数，最后从最后一个process_response 开始执行，process_exception只会在出现异常时执行

三、缓存

1、由于Django是动态网站，一般来说需要实时地生成访问的网页，展示给访问者，这样，内容可以随时变化，但是从数据库读多次把所需要的数据取出来，要比从内存或者硬盘等一次读出来 付出的成本大很多。最简单解决方式是使用：缓存，缓存将一个某个views的返回值保存至内存或者Redis中，一定时间内再有人来访问时，则不再去执行view中的操作，而是直接从内存或者Redis中之前缓存的内容拿到，并返回。

 settings配置

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',#表示利用文件系统缓存
        'LOCATION': os.path.join(BASE_DIR, 'cache'),#文件路径
        'TIMEOUT': 600,
        'OPTIONS': {
            'MAX_ENTRIES': 1000
        }
    }
}
```

```
views
import time
from django.shortcuts import HttpResponse,render
from django.views.decorators.cache import cache_page

@cache_page(60 * 15)#表示缓存15分钟
def index(request):
    data=time.time()
    return HttpResponse(data)
```



```
其它的一些内建可用的 Backends
'django.core.cache.backends.db.DatabaseCache'
'django.core.cache.backends.dummy.DummyCache'
'django.core.cache.backends.filebased.FileBasedCache'
'django.core.cache.backends.locmem.LocMemCache'
'django.core.cache.backends.memcached.MemcachedCache'
'django.core.cache.backends.memcached.PyLibMCCache'
更多相关：http://djangobook.py3k.cn/2.0/chapter15/
```



```
四、Session和Cookie
cookie保存在客户端的电脑上，session保存与服务器

session用来在服务器端保存用户会话状态信息，依赖于cookies

操作session：

　　获取　　session：request.session[key]

　　设置　　session：reqeust.session[key] = value

　　删除　　session：del request[key]

request.session.set_expiry(value)

tips:
value是个整数，session会在些秒数后失效。

value是个datatime或timedelta，session就会在这个时间后失效。

value是0,用户关闭浏览器session就会失效。

value是None,session会依赖全局session失效策略。
```

```
登录认证实例：
<form class="common_form" id="Form" method="post" action="/app01/login/">
    <div><h1 class="login_title">登录</h1></div>
    <div style="width: 600px">
        <div class="form_group"><input name="username" class="form-control" label='用户名' type="text" placeholder="用户名" require='true'></div>
    </div>
    <div style="width: 600px">
        <div class="form_group"><input name="password" class="form-control" label='密码' type="password" placeholder="密码" require='true'></div>
    </div>
    <div class="form_group"><input class="btn btn-info form_btn" type="submit" value="登录"></div>
</form>

html
```

```
def login(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        if username == "zhangsan" and password == "123456":
            request.session["IS_LOGIN"] = True  #创建session
            return redirect("/app01/home/")
    return render(request,"app01/login.html")

def home(request):
    islogin = request.session.get("IS_LOGIN",False)
    if islogin:#如果用户已登录
        return render(request,"app01/menus.html")
    else:
        return redirect("/app01/login/")

def logout(request):#退出
    try:
        del request.session['IS_LOGIN']
    except KeyError:
        pass
    return redirect("/app01/login/")

views

更多：http://docs.30c.org/djangobook2/chapter14/

　　　https://docs.djangoproject.com/en/1.9/ref/settings/#settings-sessions
```

```
五、Ajax

1、跨站请求伪造

django为用户实现防止跨站请求伪造的功能，通过中间件 django.middleware.csrf.CsrfViewMiddleware 来完成

GET 请求不需要 CSRF 认证，POST 请求需要正确认证才能得到正确的返回结果。一般在POST请求的表单中加入｛% csrf_token %}
```

```
<form id="Form" method="post" action="/app01/login/">
    ｛% csrf_token %}
    <input name='username'  type="text">
    <input name='password'  type="password">
    <input type="submit" value="登录">
</form>
```

`veiw中设置返回值：`

```
return render_to_response("app01/login.html",data,context_instance=RequestContext(request))　　
#或者
return render(request, "app01/login.html", data)
```

```
2、发送简单数据
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <input type="button" onclick="Ajaxsubmit();" value="提交"/>

    <script type="text/javascript" src="../../static/style/js/jquery-2.2.3.js"></script>
    <script>
        function Ajaxsubmit(){
            var host = '127.0.0.1';
            var port = '8000';
            $.ajax({
                url:"/app01/user_list/",
                type:'POST',
                data:{h:host,p:port},
                success:function(arg){
                }
            })
        }
    </script>
</body>
</html>
```

```
2、发送复杂数据类型

html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <input type="button" onclick="Ajaxsubmit();" value="提交"/>

    <script type="text/javascript" src="../../static/style/js/jquery-2.2.3.js"></script>
    <script>
        function Ajaxsubmit(){
             var userlist = [
                {'username':'zhangsan','arg':18},
                {'username':'lisi','arg':20},
            ];
            $.ajax({
                url:"/app01/user_list/",
                type:'POST',
                tradition: true,
                data:{data:JSON.stringify(userlist)},//序列化
                success:function(arg){
                     var callback_dict = $.parseJSON(arg);//这里把字符串转换为对象
                    //然后咱们就可以判断
                    if(callback_dict.status){//如果为True执行失败
                        alert('提交成功')
                    }else{//如果为False执行失败
                        alert(callback_dict.error)
                    }
                }
            });
        }
    </script>
</body>
</html>
```



```
views
def user_list(request):
    ret = {'status':True,'error':''}
    try:
        print request.POST
    except Exception,e:
        ret['status'] = False   #如果出错就把ret[status] = False
        ret['error'] = str(e)
    return HttpResponse(json.dumps(ret))    #返回ret字典
```

```
六、静态文件引用优化

在写项目时会导入很多静态文件，而有时要修改静态文件的目录名时就比较麻烦

原来导入方式

<script type="text/javascript" src="/static/style/js/jquery-2.2.3.js"></script>
```

```
优化 	在settings的TEMPLATES里添加　　'django.core.context_processors.static'
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR,'templates'),],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.core.context_processors.static',
            ],
        },
    },
]
```



```
优化后导入
<script type="text/javascript" src="{{ STATIC_URL }}style/js/jquery-2.2.3.js"></script>
```

```
这样要修改目录的话只需在配置文件里修改 STATIC_URL就可以了

七、上传文件

html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <form action="/app01/upload/" method="post" enctype="multipart/form-data">
        <p><input type="text" name="hostname"></p>
        <p><input type="file" name="file_name_1"></p>
        <input type="submit" value="上传">
    </form>
</body>
</html>
```

```
views
#upload
def upload(request):
    if request.method == "POST":
        file_name=request.FILES
        file_obj=file_name.get("file_name_1") #获取到封装了文件操作的对象
        f = open(file_obj.name,"wb")
        for line in file_obj.chunks(): #循环取数据
            f.write(line)   #写入
        f.close()
        return HttpResponse("ok")
    else:
        return render(request,"app01/uploadfile.html")
```

```
一、ORM操作进阶

ForeignKey关联

示例models

from django.db import models
# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=32)

class Host(models.Model):
    host_name = models.CharField(max_length=32)
    blong_to = models.ForeignKey("User")
```

```
ForeignKey创建数据
models.Host.objects.create(host_name="127.0.0.1",blong_to=models.User.objects.get(id=1))
```

```
1、搜索条件使用 __ 连接　　2、获取值时使用 . 连接
user_list=models.Host.objects.filter(blong_to__name="lisi")    #一对多过滤条件

for item in user_list:
    print(item.host_name,item.blong_to.name)  #取数据，在前端取数据也类似
```

```
ForeignKey修改数据
hosts=models.Host.objects.get(host_name="127.0.0.1")
users=models.User.objects.get(id=2)

hosts.blong_to=users
hosts.save()
```

```
反向关联查询
user_obj=models.User.objects.get(id=2)
print(user_obj.host_set.select_related())
```

```
ManyToManyField关联

示例models

class UserInfo(models.Model):
    name = models.CharField(max_length=32)
    email = models.CharField(max_length=32)
    address = models.CharField(max_length=128)


class UserGroup(models.Model):
    caption = models.CharField(max_length=64)
    user_info = models.ManyToManyField('UserInfo')
```

```
ManyToManyField操作（_set是多对多中的固定搭配）
user_info_obj = models.UserInfo.objects.get(name="zhangsan")
    user_info_objs = models.UserInfo.objects.all()

    group_obj = models.UserGroup.objects.get(caption='CEO')
    group_objs = models.UserGroup.objects.all()

    # 添加数据
    #group_obj.user_info.add(user_info_obj)
    #group_obj.user_info.add(*user_info_objs)
    #
    #user_info_obj.usergroup_set.add(group_obj)
    #user_info_obj.usergroup_set.add(*group_objs)

    # 删除数据
    #group_obj.user_info.remove(user_info_obj)
    #group_obj.user_info.remove(*user_info_objs)
    #
    #user_info_obj.usergroup_set.remove(group_obj)
    #user_info_obj.usergroup_set.remove(*group_objs)

    # 获取数据
    #print group_obj.user_info.all()
    #print group_obj.user_info.all().filter(id=1)
    #
    #print user_info_obj.usergroup_set.all()
    #print user_info_obj.usergroup_set.all().filter(caption='CEO')
```

```
F 对同一表内不同的字段进行对比查询
class Entry(models.Model):
    n_comments = models.IntegerField()
    n_pingbacks = models.IntegerField()
    rating = models.IntegerField()
```

```
from django.db.models import F
models.Entry.objects.filter(n_comments__gt=F('n_pingbacks'))
models.Entry.objects.filter(n_comments__gt=F('n_pingbacks') * 2)
models.Entry.objects.filter(rating__lt=F('n_comments') + F('n_pingbacks'))
```

```
批量自增
models.Entry.objects.all().update(n_pingbacks=F('n_pingbacks') + 1)
```

```
Q  构建搜索条件
from django.db.models import Q

models.UserInfo.objects.get(
    Q(name='zhangsan'),Q(email="12345678@qq.com"))  #两个都要满足
models.UserInfo.objects.get(
    Q(name='zhangsan') | Q(email="12345678@qq.com"))  #只需满足一个
```

```
models.UserInfo.objects.get(
    Q(name='zhangsan'),Q(email="12345678@qq.com") | Q(address="abcde"))
```

```
二、django 实现分页

实例

#!/usr/bin/env python
# -*- coding:utf-8 -*-
from django.shortcuts import render,HttpResponse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from app01 import models
# Create your views here.
def stu_login(request):
    return render(request,"app01/login.html")


def stu_home(request):
    customer_list=models.Customer.objects.all()
    paginator = Paginator(customer_list, 1) #每页显示条数

    page = request.GET.get('page')
    try:
        contacts = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        contacts = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        contacts = paginator.page(paginator.num_pages)

    return render(request, "app01/home.html", {"customer_list":contacts})

views
```

```
<div class="pagination">
        <nav>
            <ul class="pagination">
                {% if customer_list.has_previous %}
                    <li class=""><a href="?page={{ customer_list.previous_page_number }}" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>
                {% endif %}
                {% for page_num in customer_list.paginator.page_range %}
                    {% if page_num == customer_list.number %}<!--如果page_num是当前选中的页-->
                      <li class="active"><a href="?page={{ page_num }}">{{ page_num }} <span class="sr-only">(current)</span></a></li>
                    {% else %}
                      <li class=""><a href="?page={{ page_num }}">{{ page_num }} <span class="sr-only">(current)</span></a></li>
                    {% endif %}
                {% endfor %}
                {% if customer_list.has_next %}
                    <li class=""><a href="?page={{ customer_list.next_page_number }}" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>
                {% endif %}
            </ul>
        </nav>
    </div>

html
优化：固定页码个数

1、自定义template tags
```

　　![img](http://images2015.cnblogs.com/blog/866760/201606/866760-20160617112910338-1857700335.png)

```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
from django import template
from django.utils.safestring import mark_safe

register = template.Library()

@register.simple_tag
def custemer_paging(current_page,loop_num): #传入选中页和循环页
    num_left=current_page-2
    num_right=current_page+2
    if loop_num>num_left and loop_num<num_right:#只显示3页
        if current_page == loop_num:
            result='''<li class="active"><a href="?page=%s">%s <span class="sr-only">(current)</span></a></li>'''%(loop_num,loop_num)
        else:
            result='''<li class=""><a href="?page=%s">%s <span class="sr-only">(current)</span></a></li>'''%(loop_num,loop_num)
        return mark_safe(result)
    result=""
    return mark_safe(result)

custemer_tags.py
```



```
在html开头导入
{% load custemer_tags %}
```

```
使用自定义simple_tag
<div class="pagination">
        <nav>
            <ul class="pagination">
                {% if customer_list.has_previous %}
                    <li class=""><a href="?page={{ customer_list.previous_page_number }}" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>
                {% endif %}
                {% for page_num in customer_list.paginator.page_range %}
                    
                    {% custemer_paging customer_list.number page_num %}<!--使用custemer_tags-->

                {% endfor %}
                {% if customer_list.has_next %}
                    <li class=""><a href="?page={{ customer_list.next_page_number }}" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>
                {% endif %}
            </ul>
        </nav>
    </div>
    更多详情：https://docs.djangoproject.com/en/1.9/topics/pagination/ 
```

```
三、在自己写的脚本里调用django models
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'django_project.settings'
import django
django.setup()

from app01 import models

result = models.UserInfo.objects.get(id=1)
print(result)
```

![img](http://images2015.cnblogs.com/blog/866760/201606/866760-20160607011542261-1111262964.png)

```
四、用户认证
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User)
    name = models.CharField(max_length=32)
```

```
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required

@login_required
def acc_home(request):
    return render(request,"index.html")

def acc_login(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(username=username,password=password) #验证

        if user is not None:
            login(request,user) #登录
            return redirect("/app01/acc_home/")
    else:
        return render(request,"login.html")

def acc_logout(request):
    logout(request) #退出
```

```
在前端显示用户名或对应的名字
<div>
        {% if request.user.is_authenticated %} <!--如果已经登录-->
            <span>{{ request.user }}</span> <!--用户名-->
            <span>{{ request.user.userprofile.name }}</span> <!--用户名在UserProfile表对应的名字-->
        {% endif %}
    </div>
```

```
五、权限管理

django 自带有基本的权限管理 ，但粒度和限制权限的维度都只是针对具体的表

自己写的权限要易扩展、灵活，权限系统的设计对开发者、用户要实现透明，即他们不需要改变自己原有的使用系统或调用接口的方式，权限要能实现非常小的粒度的控制，甚至细致到一个按键某个用户是否能按。

想对一个功能实现权限控制，要做到只需在views方法上加一个装饰器就行了

例：

在表内创建一个class Meta，自己定义几个权限。

class UserProfile(models.Model):
    user = models.OneToOneField(User)
    name = models.CharField(verbose_name=u"姓名",max_length=32)
    def __unicode__(self):
        return self.name
    class Meta:
        permissions = (("view_customer_list",u"查看客户信息"),
                       ("view_customer_info",u"查看客户详细信息"),
                       ("view_customer_updata",u"修改详细信息"),
                       )
```

```
python manage.py makemigrations

python manage.py migrate
```

```
关联动作

这里创建一个permissions.py，创建check_permission装饰器

#!/usr/bin/env python
# -*- coding:utf-8 -*-
from django.core.urlresolvers import resolve
from django.shortcuts import render
perm_dic = {
    "view_customer_list":["customer_list","GET",[]],
    "view_customer_info":["customer_info","GET",[]],
    "view_customer_updata":["customer_info","POST",[]],
}


def perm_check(*args,**kwargs):
     request = args[0]
     url_resovle_obj = resolve(request.path_info)
     current_url_namespace = url_resovle_obj.url_name
     #app_name = url_resovle_obj.app_name #use this name later
     print("url namespace:",current_url_namespace)
     matched_flag = False # find matched perm item
     matched_perm_key = None
     if current_url_namespace is not None:#if didn't set the url namespace, permission doesn't work
         print("find perm...")
         for perm_key in perm_dic:
             perm_val = perm_dic[perm_key]
             if len(perm_val) == 3:#otherwise invalid perm data format
                 url_namespace,request_method,request_args = perm_val
                 print(url_namespace,current_url_namespace)
                 if url_namespace == current_url_namespace: #matched the url
                     if request.method == request_method:#matched request method
                         if not request_args:#if empty , pass
                             matched_flag = True
                             matched_perm_key = perm_key
                             print('mtched...')
                             break #no need looking for  other perms
                         else:
                             for request_arg in request_args: #might has many args
                                 request_method_func = getattr(request,request_method) #get or post mostly
                                 #print("----->>>",request_method_func.get(request_arg))
                                 if request_method_func.get(request_arg) is not None:
                                     matched_flag = True # the arg in set in perm item must be provided in request data
                                 else:
                                     matched_flag = False
                                     print("request arg [%s] not matched" % request_arg)
                                     break #no need go further
                             if matched_flag == True: # means passed permission check ,no need check others
                                 print("--passed permission check--")
                                 matched_perm_key = perm_key
                                 break

     else:#permission doesn't work
         return True

     if matched_flag == True:
         #pass permission check
         perm_str = "app01.%s" %(matched_perm_key)
         if request.user.has_perm(perm_str):
             print("\033[42;1m--------passed permission check----\033[0m")
             return True
         else:
             print("\033[41;1m ----- no permission ----\033[0m")
             print(request.user,perm_str)
             return False
     else:
         print("\033[41;1m ----- no matched permission  ----\033[0m")

def check_permission(func):
     def wrapper(*args,**kwargs):
         print("---start check perms",args[0])
         if not perm_check(*args,**kwargs):
             return render(args[0],'app01/403.html')
         return func(*args,**kwargs)
         #print("---done check perms")
     return wrapper

permissions.py
```

```
 url(r'^stu_home/$', views.stu_home,name="customer_list"),
    url(r'^stu_detail/(\d+)/$', views.stu_detail,name="customer_info"),
 在views导入自己写的装饰器并在相应方法上加一个装饰器
```

 



![img](http://images2015.cnblogs.com/blog/866760/201606/866760-20160621160515459-76627028.png)

可以用超级用户通过admin对普通用户进行权限控制

![img](http://images2015.cnblogs.com/blog/866760/201606/866760-20160621161752147-448652341.png)

 

![img](http://images2015.cnblogs.com/blog/866760/201606/866760-20160621161759584-1551884284.png)



```
六、CSRF（跨站域请求伪造）

CSRF（Cross Site Request Forgery, 跨站域请求伪造）是一种网络的攻击方式，它在 2007 年曾被列为互联网 20 大安全隐患之一

防御策略

　　在请求地址中添加 token 并验证

Django 中使用CSRF，在表单下使用{% csrf_token %}

<form action="" method="post">{% csrf_token %}
```

```
AJAX中CSRF

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});
```

