---
title: Django基础
tags: [Django,Python,]
categories: Python
---

**一、路由系统**

1、静态路由

```
from app01 import views
urlpatterns = [
    #url(r'^admin/', admin.site.urls),
    url(r'^home/', views.home),
]
```

 

2、动态路由

```
from app01 import views
urlpatterns = [
    url(r'^index/(\d+)', views.index),

    url(r'^page/(\d+)/(\d+)', views.page),
]
```

　　(1)按照顺序

　　将匹配的参数按顺序传给n2，n1

```
url(r'^page/(\d+)/(\d+)', views.page),
```

```
def page(request,n2,n1):
    return HttpResponse(n2+n1)
```

　　(2)模版方式

　　将匹配的参数传给指定的形式参数，视图参数的名字必须与指定的名字相同

```
url(r'^page/(?P<n1>\d+)/(?P<n2>\d+)', views.page),
```

 

3、二级路由

　　根据匹配的参数去找对应app下的urls进行处理

```
url(r'^admin/', include('app01.urls')),
url(r'^login/', include('app02.urls')),
```

 4、往视图方法传额外参数

```
url(r'^page/(\d+)/(\d+)', views.page, {'name': 'zhangsan'}),
```

 

**二、views**

简单返回一个字符串

```
from django.shortcuts import HttpResponse
from django.shortcuts import render

def home(request):
    return HttpResponse("home")
```

返回一个html

```
from django.shortcuts import HttpResponse
from django.shortcuts import render

def home(request):
    return render(request,'index.html')
```

 

**三、数据库增删改查**

在models.py中创建类

```
from django.db import models

# Create your models here.
class UserInfo(models.Model):
    name = models.CharField(max_length=32)
    age = models.IntegerField()
```

执行 

```
python  manage.py makemigrations
```

```
python  manage.py migrate
```

　　表创建成功

增、删、改、查

```
# -*- coding: UTF-8 -*-
from django.shortcuts import HttpResponse
from app01 import models
# Create your views here.
def db_handle(request):
    #增
    #1
    models.UserInfo.objects.create(name='zhangsan',age=18)
    #2
    dic={"name":"lisi","age":20}
    models.UserInfo.objects.create(**dic)
    #3
    obj=models.UserInfo(name='zhangsan',age=18)
    obj.save()

    #删
    models.UserInfo.objects.filter(name="zhangsan").delete()

    #改
    #1
    models.UserInfo.objects.filter(name="zhangsan").update(age=26) #把所有名字是zhangsan的年龄改为26
    #2
    obj = models.UserInfo.objects.get(name="zhangsan")
    obj.name="wangwu"
    obj.save()

    #查

    aa=models.UserInfo.objects.all()
    for i in aa:
        print(i.name)

    models.UserInfo.objects.all()[:10] #切片操作，获取10个人
    models.UserInfo.objects.get(name="zhangsan")    #get是用来获取一个对象
    #大于小于
    models.UserInfo.objects.filter(id__gt=1)              # 获取id大于1的值
    models.UserInfo.objects.filter(id__lt=10)     # 获取id小于10的值
    models.UserInfo.objects.filter(id__lt=10, id__gt=1)       # 获取id大于1 且 小于10的值

    # in
    models.UserInfo.objects.filter(id__in=[1,2,3])   # 获取id等于1、2、3的数据
    #not in
    models.UserInfo.objects.exclude(id__in=[1,2,3])

    models.UserInfo.objects.filter(name="zhangsan")
    models.UserInfo.objects.filter(name__iexact="zhangsan") #不区分大小写
    models.UserInfo.objects.filter(name="zhangsan").first() #获取第一个

    models.UserInfo.objects.filter(name__contains="zhang") # 名称中包含 "zhang"的人，name__icontains="abc"：不区分大小写

    models.UserInfo.objects.filter(name__regex="^zhang") #正则表达式查询，name__iregex="^abc"：不区分大小写

    return HttpResponse("ok")
```

聚合查询　　https://docs.djangoproject.com/en/1.9/topics/db/aggregation/

 

其他字段

```
1、models.AutoField　　#自增列 = int(11)，如果没有的话，默认会生成一个名称为 id 的列，如果要显示的自定义一个自增列，必须将给列设置为主键 primary_key=True。
2、models.CharField　　#字符串字段，必须 max_length 参数
3、models.BooleanField　　#布尔类型=tinyint(1)，不能为空，Blank=True
4、models.ComaSeparatedIntegerField　　#用逗号分割的数字=varchar，继承CharField，所以必须 max_lenght 参数
5、models.DateField　　#日期类型 date对于参数，auto_now = True 则每次更新都会更新这个时间；auto_now_add 则只是第一次创建添加，之后的更新不再改变。
6、models.DateTimeField　　#日期类型 datetime同DateField的参数
7、models.Decimal　　#十进制小数类型 = decimal必须指定整数位max_digits和小数位decimal_places
8、models.EmailField　　#字符串类型（正则表达式邮箱） =varchar对字符串进行正则表达式
9、models.FloatField　　#浮点类型 = double
10、models.IntegerField　　#整形
11、models.BigIntegerField　　#长整形
　　integer_field_ranges = {
　　　　'SmallIntegerField': (-32768, 32767),
　　　　'IntegerField': (-2147483648, 2147483647),
　　　　'BigIntegerField': (-9223372036854775808, 9223372036854775807),
　　　　'PositiveSmallIntegerField': (0, 32767),
　　　　'PositiveIntegerField': (0, 2147483647),
　　}
12、models.IPAddressField　　#字符串类型（ip4正则表达式）
13、models.GenericIPAddressField　　#字符串类型（ip4和ip6是可选的）参数protocol可以是：both、ipv4、ipv6 验证时，会根据设置报错
14、models.NullBooleanField　　#允许为空的布尔类型
15、models.PositiveIntegerFiel　　#正Integer
16、models.PositiveSmallIntegerField　　#正smallInteger
17、models.SlugField　　#减号、下划线、字母、数字
18、models.SmallIntegerField　　#数字数据库中的字段有：tinyint、smallint、int、bigint
19、models.TextField　　#字符串=longtext
20、models.TimeField　　#时间 HH:MM[:ss[.uuuuuu]]
21、models.URLField　　#字符串，地址正则表达式
22、models.BinaryField    #二进制
23、models.ImageField    #图片
24、models.FilePathField    #文件
```

其他参数

```
1、null=True    #数据库中字段是否可以为空
2、blank=True    #django的 Admin 中添加数据时是否可允许空值
3、primary_key = False    #主键，对AutoField设置主键后，就会代替原来的自增 id 列
4、auto_now    #自动创建---无论添加或修改，都是当前操作的时间
　  auto_now_add    #自动创建---永远是创建时的时间
5、choices
GENDER_CHOICE = (
        (u'M', u'Male'),
        (u'F', u'Female'),
    )
gender = models.CharField(max_length=2,choices = GENDER_CHOICE)    #可以让用户选择
6、max_length    #长度
7、default　　#默认值
8、verbose_name　　#Admin中字段的显示名称
9、name|db_column　　#数据库中的字段名称
10、unique=True　　#不允许重复
11、db_index = True　　#数据库索引
12、editable=True　　#在Admin里是否可编辑
13、error_messages=None　　#错误提示
14、auto_created=False　　#自动创建
15、help_text　　#在Admin中提示帮助信息
16、validators=[]    #自己加验证规则
17、upload-to    #文件上传时保存的文件夹路径
```

连表关系：

　　一对多，models.ForeignKey()

　　一对一，models.OneToOneField()

　　多对多，authors = models.ManyToManyField()

 

 

 

**四、模版**

　　模板中也有自己的语言，该语言可以实现数据展示，上面一直是用HttpResponse来简单的把内容显示到网页

模版渲染

　　1、在templates下创建一个home.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <h1>HOME</h1>
    <h2>{{ name }}</h2>
    <h2>{{ age }}</h2>
</body>
</html>
```

　2、在views.py中写好函数admin

```
from django.shortcuts import render

def admin(request):
    dic = {"name":"zhangsan","age":18}
    return render(request,'home.html',dic)
```

　　3、urls.py将视图函数对应到网址

```
from app01 import views
urlpatterns = [
    url(r'^admin/', views.admin),
]
```

　　运行后就能在页面显示相应的内容

模板语言

　　for和if

```
{% for item in item_list %}  
　　<a>{{ item }}</a>  
{% endfor %}

{% if ordered_warranty %}  
{% else %} 
{% endif %}
```

实例：

views.py

```
def admin(request):
    user_obj=[
        {"username":"zhangsan","age":18},
        {"username":"lisi","age":20}
    ]

    return render(request,'home.html',{"user_obj":user_obj})
```

在模版中使用它

```
<ul>
    {% for item in user_obj %}
        {% if item.username == "zhangsan" %}
            <li style="background-color: brown">username:{{ item.username }},age:{{ item.age }}</li>
        {% else %}
            <li>username:{{ item.username }},age:{{ item.age }}</li>
        {% endif %}
    {% endfor %}
</ul>
```

for循环中的其他功能

```
forloop.counter    索引从 1 开始算
forloop.counter0    索引从 0 开始算
forloop.revcounter    索引从最大长度到 1
forloop.revcounter0    索引从最大长度到 0
forloop.first    当遍历的元素为第一项时为真
forloop.last    当遍历的元素为最后一项时为真
forloop.parentloop    用在嵌套的 for 循环中，获取上一层 for 循环的 forloop
```

divisibleby

```
{{ value|divisibleby:"2" }}//表示如果value能被2整除，为true
```

```
{% for item in user_obj %}
        {% if forloop.counter|divisibleby:"2" %}
            <li style="background-color: brown">username:{{ item.username }},age:{{ item.age }}</li>
        {% else %}
            <li>username:{{ item.username }},age:{{ item.age }}</li>
        {% endif %}
{% endfor %}
```

还可以遍历字典

views.py

```
def admin(request):
    dic = {"name":"zhangsan","age":18}
    return render(request,'home.html',{"info_dic":dic})
```

home.html

```
   {% for key,value in info_dic.items %}
        {{ key }}:{{ value }}
   {% endfor%}
```

 

母板

　　网站模板的设计，一般网站都有一些通用的部分，比如 **导航，底部，访问统计代码**

可以写一个 base.html 来包含这些通用文件作为母板

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{% block title %}标题{% endblock %}</title>
</head>
<body>
    {% block content %}
    <div>所有继承自这个模板的，都会显示这里的默认内容。</div>
    {% endblock %}
</body>
</html>
```

子板引用母板

```
{% extends "base.html" %}    #读取base.html作为模板

{% block title %}{% endblock %}    #填入模板里title的内容

{% block content%}{% endblock %}    #填入模板里content的内容
```

 

如果包含很多共用部分想拿出来，可以使用**include，**就是把一些网页共用的部分拿出来，重复利用，在用到的地方include进去。其它的页面继承母板 **base.html** 就好了，继承后的模板也可以在 block 块中 include 其它的模板文件。

在templates下创建一个文件夹include，并在include下创建demo.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{% block title %}标题{% endblock %}</title>
</head>
<body>
    {% block content %}
    <div>所有继承自这个模板的，都会显示这里的默认内容。</div>
    {% endblock %}

    {% include '/include/demo.html' %}<!-会直接把demo.html的内容写入这里->
</body>
</html>
```

自定义template tags

（1）、在app中创建templatetags模块（必须为templatetags）

（2）、创建任意 xx.py 文件，如：test.py

把下面内容写入test.py

```
#!/usr/bin/env python
#coding:utf-8
from django import template
from django.utils.safestring import mark_safe
 
register = template.Library()
 
@register.simple_tag
def my_simple_time(v1,v2,v3):    #自己定义的方法
    return  v1 + v2 + v3
 
@register.simple_tag
def my_input(id,arg):    #自己定义的方法
    result = "<input type='text' id='%s' class='%s' />" %(id,arg,)
    return mark_safe(result)
```

（3）、在使用自定义simple_tag的html文件之前导入创建的 test.py 文件名

（4）、使用simple_tag

（5）、在settings中配置当前app，不然django无法找到自定义的simple_tag

```
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'app01',
]
```

详细：https://docs.djangoproject.com/es/1.9/howto/custom-template-tags/ 

 

**五、admin**

　　django amdin是django提供的一个后台管理页面，该管理页面提供完善的html和css，使得你在通过Model创建完数据库表之后，就可以对数据进行增删改查

使用django admin 所需步骤：

1、创建后台管理员

2、配置后台管理url

3、在admin中配置

```
from django.contrib import admin
from app01 import  models
  
admin.site.register(models.UserInfo) 
admin.site.register(models.Book)
```

 

 4、写一个__unicode__ 函数(或 __str__函数)用来在后台显示定义的名字

```
class UserInfo(models.Model):
    name = models.CharField(max_length=32)
    age = models.IntegerField()

    def __unicode__(self):
        return self.name
```

 

5、list_display 就用来配置要显示的字段

```
from django.contrib import admin
# Register your models here.
from app01 import  models
class userinfo_admin(admin.ModelAdmin):
    list_display = ("name","age",)

admin.site.register(models.UserInfo,userinfo_admin)
```

![img](http://images2015.cnblogs.com/blog/866760/201605/866760-20160514012333609-1587646693.png)

6、search_fields 添加搜索功能

```
#搜索
search_fields = ('name', 'age',)  #这样就可以按照name或age进行搜索了
```

```
from django.contrib import admin
# Register your models here.
from app01 import  models
class userinfo_admin(admin.ModelAdmin):
    list_display = ("name","age",)
    search_fields = ('name', 'age',)

admin.site.register(models.UserInfo,userinfo_admin)
```

![img](http://images2015.cnblogs.com/blog/866760/201605/866760-20160514012052015-1235494032.png)

 

7、list_filter  筛选功能

```
from django.contrib import admin
# Register your models here.
from app01 import  models
class userinfo_admin(admin.ModelAdmin):
    list_display = ("name","age",)
    search_fields = ('name', 'age',)    #搜索
    list_filter = ('name', 'age',)  #筛选

admin.site.register(models.UserInfo,userinfo_admin)
```

![img](http://images2015.cnblogs.com/blog/866760/201606/866760-20160606230747605-1217054598.png)

 8、修改

```
 list_editable = ('name', 'age',)#当前页面可以直接修改的字段
```

 9、其他定制

models

```
# -*- coding: UTF-8 -*-
from django.db import models
from django.utils.html import format_html   #format_html用于把字符串转换为html显示
# Create your models here.
class UserInfo(models.Model):
    name = models.CharField(max_length=32)
    age = models.IntegerField()

    grade_choices= (("pass","及格"),
                    ("fail","不及格"),
                    ("no_result","无成绩"),)
    grade = models.CharField(choices=grade_choices,max_length=32,default="no_result")

    def __unicode__(self):
        return self.name

    def colored_status(self):
        if self.grade == "pass":
            format_td = format_html('<span style="padding:2px;background-color:green;color:white">及格</span>')
        elif self.grade == "fail":
            format_td = format_html('<span style="padding:2px;background-color:red;color:white">不及格</span>')
        elif self.grade == "no_result":
            format_td = format_html('<span style="padding:2px;background-color:yellow;color:white">无成绩</span>')

        return format_td

    colored_status.short_description = "成绩" #修改该列的名字
```

admin

```
# -*- coding: UTF-8 -*-
from django.contrib import admin
# Register your models here.
from app01 import  models
class userinfo_admin(admin.ModelAdmin):
    list_display = ("name","age","colored_status")#把models里定义的函数名colored_status加入这里
    #search_fields = ('name', 'age',)    #搜索
    #list_filter = ('name', 'age',)  #筛选
    #list_editable = ('name', 'age',) #修改

admin.site.register(models.UserInfo,userinfo_admin)
```

 ![img](http://images2015.cnblogs.com/blog/866760/201606/866760-20160607002719558-1684045957.png)