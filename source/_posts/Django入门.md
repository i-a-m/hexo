---
title: Django入门
tags: [Django,Python,]
categories: Python
---

```
安装

    pip install Django

创建项目

    django-admin.py startproject HelloWorld

视图和 URL 配置

    HelloWorld/HelloWorld/view.py 文件代码：
    from django.http import HttpResponse
     
    def hello(request):
        return HttpResponse("Hello world ! ")
        
    HelloWorld/HelloWorld/urls.py 文件代码：
    from django.conf.urls import url
     
    from . import view
     
    urlpatterns = [
        url(r'^$', view.hello),
    ]
    
    我们也可以修改以下规则：
    HelloWorld/HelloWorld/urls.py 文件代码：
    from django.conf.urls import url
     
    from . import view
     
    urlpatterns = [
        url(r'^hello$', view.hello),
    ]
    通过浏览器打开 http://127.0.0.1:8000/hello

启动Django服务

    python.exe .\manage.py runserver 0.0.0.0:5000

模板

在 HelloWorld 目录底下创建 templates 目录并建立 hello.html文件

    hello.html 文件代码如下：
    HelloWorld/templates/hello.html 文件代码：
    <h1>{{ hello }}</h1>

从模板中我们知道变量使用了双括号。

接下来我们需要向Django说明模板文件的路径，修改HelloWorld/settings.py，修改 TEMPLATES 中的 DIRS 为 [BASE_DIR+"/templates",]，如下所示:

    HelloWorld/HelloWorld/settings.py 文件代码：
    ...TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [BASE_DIR+"/templates",],       # 修改位置
            'APP_DIRS': True,
            'OPTIONS': {
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.contrib.messages.context_processors.messages',
                ],
            },
        },
    ]
    ...

我们现在修改 view.py，增加一个新的对象，用于向模板提交数据：

    HelloWorld/HelloWorld/view.py 文件代码：
    # -*- coding: utf-8 -*-
     
    #from django.http import HttpResponse
    from django.shortcuts import render
     
    def hello(request):
        context          = {}
        context['hello'] = 'Hello World!'
        return render(request, 'hello.html', context)

Django 模板标签

if/else 标签

基本语法格式如下：

    {% if condition %}
         ... display
    {% endif %}

或者：

    {% if condition1 %}
       ... display 1
    {% elif condition2 %}
       ... display 2
    {% else %}
       ... display 3
    {% endif %}

根据条件判断是否输出。if/else 支持嵌套。

{% if %} 标签接受 and ， or 或者 not 关键字来对多个变量做判断 ，或者对变量取反（ not )，例如：

    {% if athlete_list and coach_list %}
         athletes 和 coaches 变量都是可用的。
    {% endif %}

for 标签

{% for %} 允许我们在一个序列上迭代。

与Python的 for 语句的情形类似，循环语法是 for X in Y ，Y是要迭代的序列而X是在每一个特定的循环中使用的变量名称。

每一次循环中，模板系统会渲染在 {% for %} 和 {% endfor %} 之间的所有内容。

例如，给定一个运动员列表 athlete_list 变量，我们可以使用下面的代码来显示这个列表：

    <ul>
    {% for athlete in athlete_list %}
        <li>{{ athlete.name }}</li>
    {% endfor %}
    </ul>

给标签增加一个 reversed 使得该列表被反向迭代：

    {% for athlete in athlete_list reversed %}
    ...
    {% endfor %}

可以嵌套使用 {% for %} 标签：

    {% for athlete in athlete_list %}
        <h1>{{ athlete.name }}</h1>
        <ul>
        {% for sport in athlete.sports_played %}
            <li>{{ sport }}</li>
        {% endfor %}
        </ul>
    {% endfor %}

ifequal/ifnotequal 标签

{% ifequal %} 标签比较两个值，当他们相等时，显示在 {% ifequal %} 和 {% endifequal %} 之中所有的值。

下面的例子比较两个模板变量 user 和 currentuser :

    {% ifequal user currentuser %}
        <h1>Welcome!</h1>
    {% endifequal %}

和 {% if %} 类似， {% ifequal %} 支持可选的 {% else%} 标签：8

    {% ifequal section 'sitenews' %}
        <h1>Site News</h1>
    {% else %}
        <h1>No News Here</h1>
    {% endifequal %}

注释标签

Django 注释使用 {# #}。

    {# 这是一个注释 #}

过滤器

模板过滤器可以在变量被显示前修改它，过滤器使用管道字符，如下所示：

    {{ name|lower }}

{{ name }} 变量被过滤器 lower 处理后，文档大写转换文本为小写。

过滤管道可以被* 套接* ，既是说，一个过滤器管道的输出又可以作为下一个管道的输入：

    {{ my_list|first|upper }}

以上实例将第一个元素并将其转化为大写。

有些过滤器有参数。 过滤器的参数跟随冒号之后并且总是以双引号包含。 例如：

    {{ bio|truncatewords:"30" }}

这个将显示变量 bio 的前30个词。

其他过滤器：

- addslashes : 添加反斜杠到任何反斜杠、单引号或者双引号前面。
- date : 按指定的格式字符串参数格式化 date 或者 datetime 对象，实例：
      {{ pub_date|date:"F j, Y" }}
- length : 返回变量的长度。

include 标签

{% include %} 标签允许在模板中包含其它的模板的内容。

下面这个例子都包含了 nav.html 模板：

    {% include "nav.html" %}

模板继承

模板可以用继承的方式来实现复用。

接下来我们先创建之前项目的 templates 目录中添加 base.html 文件，代码如下：

    HelloWorld/templates/base.html 文件代码：
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <title>菜鸟教程(runoob.com)</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        <p>菜鸟教程 Django 测试。</p>
        {% block mainbody %}
           <p>original</p>
        {% endblock %}
    </body>
    </html>

以上代码中，名为 mainbody 的 block 标签是可以被继承者们替换掉的部分。

所有的 {% block %} 标签告诉模板引擎，子模板可以重载这些部分。

hello.html 中继承 base.html，并替换特定 block，hello.html 修改后的代码如下：

    HelloWorld/templates/hello.html 文件代码：
    {% extends "base.html" %}
     
    {% block mainbody %}<p>继承了 base.html 文件</p>
    {% endblock %}

Django操作NOSQL(MongoDB)数据库

    pip install -U mongoengine 
    pip install pymongo

新建一个应用，其中新建一个 docs.py文件，代码如下：

    from mongoengine import *
    connect('test')
     
    class User(Document):
        username = StringField(required=True)
        website = URLField()
        tags = ListField(StringField(max_length=16))

然后编辑views.py文件：

    from django.http import HttpResponse
    from . import docs
     
    def index(request):
        user1 = docs.User(
            username='Perchouli',
            website='http://dmyz.org', 
            tags = ['Web','Django','JS']
        )
        user1.save()
        Oid = user1.id
        return HttpResponse(Oid)

以上的类名代表了数据库表名，且继承了models.Model，类里面的字段代表数据表中的字段(name)，数据类型则由CharField（相当于varchar）、DateField（相当于datetime）， max_length 参数限定长度。

接下来在settings.py中找到INSTALLED_APPS这一项，如下

    INSTALLED_APPS = (
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'TestModel',               # 添加此项
    )



最后，把视图加到URL中，访问这个视图可以看到返回的ObjectID，我们已经实现了对NOSQL数据库的写入和查找了

测试：修改HellWord/HellWord/urls.py

    from django.conf.urls import url
     
    from . import view
    
    form TestModel import views #添加字段
     
    urlpatterns = [
        url(r'^$', view.hello),
        url(r'^testMongodb', views.index), #添加字段
    ]

注：Mongodb启动方法

在mongodb安装目录bin下命令行输入

    mongod --dbpath D:/Mongodb/data    #数据库存放地址 第一次启动同样如此

Philosophy

回头说说代码。docs.py中的语法很类似models.py，但两者的用途完全不同。mongoengine是定义一个scheme，这些定义不会写入到数据库中。

在User中使用了三种Field，MongoDB是使用JSON格式存储数据，所以写入的值也可以是对象/数组/字典，mongoengine会 自动将Python数据格式转换成JS数据格式，但必须按照之前的定义的Field类型来传值。比如上例中的tags被定义为数组 (ListField)，数组中的每个元素是字符(StringField)，mongoengine只接受同样类型的数据格式。

EmbeddedField

RDB对数据的组织是建立在“关系”之上的，比如我们要存储某个用户的Profile，它与用户ID是多对一的关系，在RDB中，通常要新建一张名 为Profile的表，其中包含UserID和Profile，每一条数据对应一个Profile的记录，这种方式多少显得有些笨拙。NOSQL的出现解 决了这类问题，在NOSQL数据库中使用内联的方式，直接把Profile存在User下，调用User时就可以获得Profile的数据了。

修改上例中的docs.py，增加Profile：

    from mongoengine import *
    connect('test')
    #先定义名为Profile的EmbeddedDocument
    class Profile(EmbeddedDocument):
        gender = StringField()
        location = StringField()
     
    class User(Document):
        username = StringField(required=True)
        website = URLField()
        tags = ListField(StringField(max_length=16))
        #添加到User
        profile = EmbeddedDocumentField(Profile)

再修改views.py，为了显示区别这里输出一个JSON格式的字符串：

    from django.http import HttpResponse
    from . import docs
     
    def index(request):
        profile1 = docs.Profile(gender='male', location='Beijing')
        user1 = docs.User(
            username='Perchouli',
            website='http://dmyz.org', 
            tags = ['Web','Django','JS'],
            profile = profile1
        )
        user1.save()
        user1_json = str(user1.to_mongo())
        return HttpResponse(user1_json)

怎么读取profile中的gender和location？我不说你可能也想到了： user1.profile.gender。其他的操作也一样，都是用for来遍历数据，查找、删除也是类似的语法。

Afterword

mongoengine这种类似ORM的写法提供了一个很好的过渡方式，但NOSQL数据库毕竟不是构建于”关系”之上的，很多ORM的经验并不适 用。其实操作NOSQL数据库，对它进行增删改查并不复杂，真正头疼的是数据的建模，具体的业务逻辑，怎样设计才能最大限度的发挥NOSQL数据库的用途 等等一些列问题。mongoengine降低了Django工程师使用NOSQL数据库的门槛，相信只要有更多的人参与其中，这类经验会逐步丰富和完善 的。

Django操作数据库

    sudo pip install mysqlclient

数据库配置

我们在项目的 settings.py 文件中找到 DATABASES 配置项，将其信息修改为

    HelloWorld/HelloWorld/settings.py: 文件代码：
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',  # 或者使用 mysql.connector.django
            'NAME': 'test',
            'USER': 'test',
            'PASSWORD': 'test123',
            'HOST':'localhost',
            'PORT':'3306',
        }
    }

这里添加了中文注释，所以你需要在 HelloWorld/settings.py 文件头部添加 # -*- coding: UTF-8 -*-。

上面包含数据库名称和用户的信息，它们与 MySQL 中对应数据库和用户的设置相同。Django 根据这一设置，与 MySQL 中相应的数据库和用户连接起来。

定义模型

创建 APP

Django规定，如果要使用模型，必须要创建一个app。我们使用以下命令创建一个 TestModel 的 app:

    django-admin.py startapp TestModel

目录结构如下：

    HelloWorld
    |-- TestModel
    |   |-- __init__.py
    |   |-- admin.py
    |   |-- models.py
    |   |-- tests.py
    |   `-- views.py

我们修改 TestModel/models.py 文件，代码如下：

    HelloWorld/TestModel/models.py: 文件代码：
    # models.py
    from django.db import models
     
    class Test(models.Model):
        name = models.CharField(max_length=20)

以上的类名代表了数据库表名，且继承了models.Model，类里面的字段代表数据表中的字段(name)，数据类型则由CharField（相当于varchar）、DateField（相当于datetime）， max_length 参数限定长度。

接下来在settings.py中找到INSTALLED_APPS这一项，如下：

    INSTALLED_APPS = (
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'TestModel',               # 添加此项
    )

在命令行中运行：

    $ python manage.py migrate   # 创建表结构
    
    $ python manage.py makemigrations TestModel  # 让 Django 知道我们在我们的模型有一些变更
    $ python manage.py migrate TestModel   # 创建表结构

看到几行 "Creating table…" 的字样，你的数据表就创建好了。

    Creating tables ...
    ……
    Creating table TestModel_test  #我们自定义的表
    ……

表名组成结构为：应用名_类名（如：TestModel_test）。

注意：尽管我们没有在models给表设置主键，但是Django会自动添加一个id作为主键。

数据库操作

接下来我们在 HelloWorld 目录中添加 testdb.py 文件（下面介绍），并修改 urls.py：

    HelloWorld/HelloWorld/urls.py: 文件代码：
    from django.conf.urls import *
    from . import view,testdb
     
    urlpatterns = [
        url(r'^hello$', view.hello),
        url(r'^testdb$', 

添加数据

添加数据需要先创建对象，然后再执行 save 函数，相当于SQL中的INSERT：

    HelloWorld/HelloWorld/testdb.py: 文件代码：
    # -*- coding: utf-8 -*-
     
    from django.http import HttpResponse
     
    from TestModel.models import Test
     
    # 数据库操作
    def testdb(request):
        test1 = Test(name='runoob')
        test1.save()
        return HttpResponse("<p>数据添加成功！</p>")
    访问 http://127.0.0.1:8000/testdb 就可以看到数据添加成功的提示。
    输出结果如下：

获取数据

Django提供了多种方式来获取数据库的内容，如下代码所示：

HelloWorld/HelloWorld/testdb.py: 文件代码：

    HelloWorld/HelloWorld/testdb.py: 文件代码：
    # -*- coding: utf-8 -*-
     
    from django.http import HttpResponse
     
    from TestModel.models import Test
     
    # 数据库操作
    def testdb(request):
        # 初始化
        response = ""
        response1 = ""
        
        
        # 通过objects这个模型管理器的all()获得所有数据行，相当于SQL中的SELECT * FROM
        list = Test.objects.all()
            
        # filter相当于SQL中的WHERE，可设置条件过滤结果
        response2 = Test.objects.filter(id=1) 
        
        # 获取单个对象
        response3 = Test.objects.get(id=1) 
        
        # 限制返回的数据 相当于 SQL 中的 OFFSET 0 LIMIT 2;
        Test.objects.order_by('name')[0:2]
        
        #数据排序
        Test.objects.order_by("id")
        
        # 上面的方法可以连锁使用
        Test.objects.filter(name="runoob").order_by("id")
        
        # 输出所有数据
        for var in list:
            response1 += var.name + " "
        response = response1
        return HttpResponse("<p>" + response + "</p>")

更新数据

修改数据可以使用 save() 或 update():

    HelloWorld/HelloWorld/testdb.py: 文件代码：
    # -*- coding: utf-8 -*-
     
    from django.http import HttpResponse
     
    from TestModel.models import Test
     
    # 数据库操作
    def testdb(request):
        # 修改其中一个id=1的name字段，再save，相当于SQL中的UPDATE
        test1 = Test.objects.get(id=1)
        test1.name = 'Google'
        test1.save()
        
        # 另外一种方式
        #Test.objects.filter(id=1).update(name='Google')
        
        # 修改所有的列
        # Test.objects.all().update(name='Google')
        
        return HttpResponse("<p>修改成功</p>")

删除数据

删除数据库中的对象只需调用该对象的delete()方法即可：

    HelloWorld/HelloWorld/testdb.py: 文件代码：
    # -*- coding: utf-8 -*-
     
    from django.http import HttpResponse
     
    from TestModel.models import Test
     
    # 数据库操作
    def testdb(request):
        # 删除id=1的数据
        test1 = Test.objects.get(id=1)
        test1.delete()
        
        # 另外一种方式
        # Test.objects.filter(id=1).delete()
        
        # 删除所有数据
        # Test.objects.all().delete()
        
        return HttpResponse("<p>删除成功</p>")

Django 表单

HTTP 请求

HTTP协议以"请求－回复"的方式工作。客户发送请求时，可以在请求中附加数据。服务器通过解析请求，就可以获得客户传来的数据，并根据URL来提供特定的服务。

GET 方法

我们在之前的项目中创建一个 search.py 文件，用于接收用户的请求：

    /HelloWorld/HelloWorld/search.py 文件代码：
    # -*- coding: utf-8 -*-
     
    from django.http import HttpResponse
    from django.shortcuts import render_to_response
     
    # 表单
    def search_form(request):
        return render_to_response('search_form.html')
     
    # 接收请求数据
    def search(request):  
        request.encoding='utf-8'
        if 'q' in request.GET:
            message = '你搜索的内容为: ' + request.GET['q']
        else:
            message = '你提交了空表单'
        return HttpResponse(message)

在模板目录 templates 中添加 search_form.html 表单：

    /HelloWorld/templates/search_form.html 文件代码：
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <title>菜鸟教程(runoob.com)</title>
    </head>
    <body>
        <form action="/search" method="get">
            <input type="text" name="q">
            <input type="submit" value="搜索">
        </form>
    </body>
    </html>

urls.py 规则修改为如下形式：

    /HelloWorld/HelloWorld/urls.py 文件代码：
    from django.conf.urls import url
    from . import view,testdb,search
     
    urlpatterns = [
        url(r'^hello$', view.hello),
        url(r'^testdb$', testdb.testdb),
        url(r'^search-form$', search.search_form),
        url(r'^search$', search.search),
    ]

访问地址 http://127.0.0.1:8000/search-form 并搜索，结果如下所示:

POST 方法

上面我们使用了GET方法。视图显示和请求处理分成两个函数处理。

提交数据时更常用POST方法。我们下面使用该方法，并用一个URL和处理函数，同时显示视图和处理请求。

我们在tmplate 创建 post.html：

    /HelloWorld/tmplates/post.html 文件代码：
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <title>菜鸟教程(runoob.com)</title>
    </head>
    <body>
        <form action="/search-post" method="post">
            {% csrf_token %}
            <input type="text" name="q">
            <input type="submit" value="Submit">
        </form>
     
        <p>{{ rlt }}</p>
    </body>
    </html>

在模板的末尾，我们增加一个 rlt 记号，为表格处理结果预留位置。

表格后面还有一个{% csrf_token %}的标签。csrf 全称是 Cross Site Request Forgery。这是Django提供的防止伪装提交请求的功能。POST 方法提交的表格，必须有此标签。

在HelloWorld目录下新建 search2.py 文件并使用 search_post 函数来处理 POST 请求：

    /HelloWorld/HelloWorld/search2.py 文件代码：
    # -*- coding: utf-8 -*-
     
    from django.shortcuts import render
    from django.views.decorators import csrf
     
    # 接收POST请求数据
    def search_post(request):
        ctx ={}
        if request.POST:
            ctx['rlt'] = request.POST['q']
        return render(request, "post.html", ctx)

urls.py 规则修改为如下形式：

    /HelloWorld/HelloWorld/urls.py 文件代码：
    from django.conf.urls import url
    from . import view,testdb,search,search2
     
    urlpatterns = [
        url(r'^hello$', view.hello),
        url(r'^testdb$', testdb.testdb),
        url(r'^search-form$', search.search_form),
        url(r'^search$', search.search),
        url(r'^search-post$', search2.search_post),
    ]

访问 http://127.0.0.1:8000/search-post

Django Admin 管理工具

Django 提供了基于 web 的管理工具。

Django 自动管理工具是 django.contrib 的一部分。你可以在项目的 settings.py 中的 INSTALLED_APPS 看到它：

    /HelloWorld/HelloWorld/settings.py 文件代码：
    INSTALLED_APPS = (
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
    )

django.contrib是一套庞大的功能集，它是Django基本代码的组成部分。

激活管理工具

通常我们在生成项目时会在 urls.py 中自动设置好，我们只需去掉注释即可。

配置项如下所示：

    /HelloWorld/HelloWorld/urls.py 文件代码：
    # urls.py
    from django.conf.urls import url
    from django.contrib import admin
     
    urlpatterns = [
        url(r'^admin/', admin.site.urls),
    ]

当这一切都配置好后，Django 管理工具就可以运行了。

使用管理工具

启动开发服务器，然后在浏览器中访问 http://127.0.0.1:8000/admin/，得到如下界面：

你可以通过命令 python manage.py createsuperuser 来创建超级用户，如下所示：

    # python manage.py createsuperuser
    Username (leave blank to use 'root'): admin
    Email address: admin@runoob.com
    Password:
    Password (again):
    Superuser created successfully.
    [root@solar HelloWorld]#

为了让 admin 界面管理某个数据模型，我们需要先注册该数据模型到 admin。比如，我们之前在 TestModel 中已经创建了模型 Test 。修改 TestModel/admin.py:

    HelloWorld/TestModel/admin.py: 文件代码：
    from django.contrib import admin
    from TestModel.models import Test
     
    # Register your models here.
    admin.site.register(Test)

刷新后即可看到 Testmodel 数据表:

复杂模型

管理页面的功能强大，完全有能力处理更加复杂的数据模型。

先在 TestModel/models.py 中增加一个更复杂的数据模型：

    HelloWorld/TestModel/models.py: 文件代码：
    from django.db import models
     
    # Create your models here.
    class Test(models.Model):
        name = models.CharField(max_length=20)
     
    class Contact(models.Model):
        name   = models.CharField(max_length=200)
        age    = models.IntegerField(default=0)
        email  = models.EmailField()
        def __unicode__(self):
            return self.name
     
    class Tag(models.Model):
        contact = models.ForeignKey(Contact)
        name    = models.CharField(max_length=50)
        def __unicode__(self):
            return self.name

这里有两个表。Tag 以 Contact 为外部键。一个 Contact 可以对应多个 Tag。

我们还可以看到许多在之前没有见过的属性类型，比如 IntegerField 用于存储整数。

在 TestModel/admin.py 注册多个模型并显示：

    HelloWorld/TestModel/admin.py: 文件代码：
    from django.contrib import admin
    from TestModel.models import Test,Contact,Tag
     
    # Register your models here.
    admin.site.register([Test, Contact, Tag])

在以上管理工具我们就能进行复杂模型操作。

如果你之前还未创建表结构，可使用以下命令创建：

    $ python manage.py makemigrations TestModel  # 让 Django 知道我们在我们的模型有一些变更
    $ python manage.py migrate TestModel   # 创建表结构

自定义表单

我们可以自定义管理页面，来取代默认的页面。比如上面的 "add" 页面。我们想只显示 name 和 email 部分。修改 TestModel/admin.py:

    HelloWorld/TestModel/admin.py: 文件代码：
    from django.contrib import admin
    from TestModel.models import Test,Contact,Tag
     
    # Register your models here.
    class ContactAdmin(admin.ModelAdmin):
        fields = ('name', 'email')
     
    admin.site.register(Contact, ContactAdmin)
    admin.site.register([Test, Tag])

以上代码定义了一个 ContactAdmin 类，用以说明管理页面的显示格式。

里面的 fields 属性定义了要显示的字段。

由于该类对应的是 Contact 数据模型，我们在注册的时候，需要将它们一起注册。显示效果如下：

我们还可以将输入栏分块，每个栏也可以定义自己的格式。修改 TestModel/admin.py为：

    HelloWorld/TestModel/admin.py: 文件代码：
    from django.contrib import admin
    from TestModel.models import Test,Contact,Tag
     
    # Register your models here.
    class ContactAdmin(admin.ModelAdmin):
        fieldsets = (
            ['Main',{
                'fields':('name','email'),
            }],
            ['Advance',{
                'classes': ('collapse',), # CSS
                'fields': ('age',),
            }]
        )
     
    admin.site.register(Contact, ContactAdmin)
    admin.site.register([Test, Tag])

内联(Inline)显示

上面的 Contact 是 Tag 的外部键，所以有外部参考的关系。

而在默认的页面显示中，将两者分离开来，无法体现出两者的从属关系。我们可以使用内联显示，让 Tag 附加在 Contact 的编辑页面上显示。

修改TestModel/admin.py：

    HelloWorld/TestModel/admin.py: 文件代码：
    from django.contrib import admin
    from TestModel.models import Test,Contact,Tag
     
    # Register your models here.
    class TagInline(admin.TabularInline):
        model = Tag
     
    class ContactAdmin(admin.ModelAdmin):
        inlines = [TagInline]  # Inline
        fieldsets = (
            ['Main',{
                'fields':('name','email'),
            }],
            ['Advance',{
                'classes': ('collapse',),
                'fields': ('age',),
            }]
     
        )
     
    admin.site.register(Contact, ContactAdmin)
    admin.site.register([Test])

我们也可以自定义该页面的显示，比如在列表中显示更多的栏目，只需要在 ContactAdmin 中增加 list_display 属性:

    HelloWorld/TestModel/admin.py: 文件代码：
    from django.contrib import admin
    from TestModel.models import Test,Contact,Tag
     
    # Register your models here.
    class TagInline(admin.TabularInline):
        model = Tag
     
    class ContactAdmin(admin.ModelAdmin):
        list_display = ('name','age', 'email') # list
        inlines = [TagInline]  # Inline
        fieldsets = (
            ['Main',{
                'fields':('name','email'),
            }],
            ['Advance',{
                'classes': ('collapse',),
                'fields': ('age',),
            }]
     
        )
     
    admin.site.register(Contact, ContactAdmin)
    admin.site.register([Test])

搜索功能在管理大量记录时非常有，我们可以使用 search_fields 为该列表页增加搜索栏：

    HelloWorld/TestModel/admin.py: 文件代码：
    from django.contrib import admin
    from TestModel.models import Test,Contact,Tag
     
    # Register your models here.
    class TagInline(admin.TabularInline):
        model = Tag
     
    class ContactAdmin(admin.ModelAdmin):
        list_display = ('name','age', 'email') # list
        search_fields = ('name',)
        inlines = [TagInline]  # Inline
        fieldsets = (
            ['Main',{
                'fields':('name','email'),
            }],
            ['Advance',{
                'classes': ('collapse',),
                'fields': ('age',),
            }]
     
        )
     
    admin.site.register(Contact, ContactAdmin)
    admin.site.register([Test])

Django Nginx+uwsgi 安装配置

在前面的章节中我们使用 python manage.py runserver 来运行服务器。这只适用测试环境中使用。

正式发布的服务，我们需要一个可以稳定而持续的服务器，比如apache, Nginx, lighttpd等，本文将以 Nginx 为例。

安装基础开发包

Centos 下安装步骤如下：

    yum groupinstall "Development tools"
    yum install zlib-devel bzip2-devel pcre-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel

CentOS 自带 Python 2.4.3，但我们可以再安装Python2.7.5：

    cd ~
    wget http://python.org/ftp/python/2.7.5/Python-2.7.5.tar.bz2
    tar xvf Python-2.7.5.tar.bz2
    cd Python-2.7.5
    ./configure --prefix=/usr/local
    make && make altinstall

安装Python包管理

easy_install 包 https://pypi.python.org/pypi/distribute

安装步骤:

    cd ~
    wget https://pypi.python.org/packages/source/d/distribute/distribute-0.6.49.tar.gz
    tar xf distribute-0.6.49.tar.gz
    cd distribute-0.6.49
    python2.7 setup.py install
    easy_install --version

pip 包: https://pypi.python.org/pypi/pip

安装 pip 的好处是可以用 pip list、pip uninstall 管理 Python 包， easy_install 没有这个功能，只有 uninstall。

安装 uwsgi

uwsgi:https://pypi.python.org/pypi/uWSGI

uwsgi 参数详解：http://uwsgi-docs.readthedocs.org/en/latest/Options.html

    pip install uwsgi
    uwsgi --version    # 查看 uwsgi 版本

测试 uwsgi 是否正常：

新建 test.py 文件，内容如下：

    def application(env, start_response):
    	start_response('200 OK', [('Content-Type','text/html')])
    	return "Hello World"

然后在终端运行：

    uwsgi --http :8001 --wsgi-file test.py

在浏览器内输入：http://127.0.0.1:8001，查看是否有"Hello World"输出，若没有输出，请检查你的安装过程。

安装 Django

    pip install django

测试 django 是否正常，运行：

    django-admin.py startproject demosite
    cd demosite
    python2.7 manage.py runserver 0.0.0.0:8002

在浏览器内输入：http://127.0.0.1:8002，检查django是否运行正常。

安装 Nginx

安装命令如下：

    cd ~
    wget http://nginx.org/download/nginx-1.5.6.tar.gz
    tar xf nginx-1.5.6.tar.gz
    cd nginx-1.5.6
    ./configure --prefix=/usr/local/nginx-1.5.6 \
    --with-http_stub_status_module \
    --with-http_gzip_static_module
    make && make install

你可以阅读 Nginx 安装配置 了解更多内容。

uwsgi 配置

uwsgi支持ini、xml等多种配置方式，本文以 ini 为例， 在/ect/目录下新建uwsgi9090.ini，添加如下配置：

    [uwsgi]
    socket = 127.0.0.1:9090
    master = true         //主进程
    vhost = true          //多站模式
    no-site = true        //多站模式时不设置入口模块和文件
    workers = 2           //子进程数
    reload-mercy = 10     
    vacuum = true         //退出、重启时清理文件
    max-requests = 1000   
    limit-as = 512
    buffer-size = 30000
    pidfile = /var/run/uwsgi9090.pid    //pid文件，用于下面的脚本启动、停止该进程
    daemonize = /website/uwsgi9090.log

Nginx 配置

找到nginx的安装目录（如：/usr/local/nginx/），打开conf/nginx.conf文件，修改server配置：

    server {
            listen       80;
            server_name  localhost;
            
            location / {            
                include  uwsgi_params;
                uwsgi_pass  127.0.0.1:9090;              //必须和uwsgi中的设置一致
                uwsgi_param UWSGI_SCRIPT demosite.wsgi;  //入口文件，即wsgi.py相对于项目根目录的位置，“.”相当于一层目录
                uwsgi_param UWSGI_CHDIR /demosite;       //项目根目录
                index  index.html index.htm;
                client_max_body_size 35m;
            }
        }

你可以阅读 Nginx 安装配置 了解更多内容。

设置完成后，在终端运行：

    uwsgi --ini /etc/uwsgi9090.ini &
    /usr/local/nginx/sbin/nginx

在浏览器输入：http://127.0.0.1，你就可以看到 django 的 "It work" 了。
```

