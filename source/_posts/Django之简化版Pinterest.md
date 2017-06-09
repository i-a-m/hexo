---
title: Django之简化版Pinterest
tags: [Python,服务器]
categories: Python
---
Django是最流行开放源代码的Web应用框架之一，由Python写成，采用了MVC的框架模式。使用 Django，在短时间内就可以创建高品质、易维护的网站。

### 组件和架构

Django框架的核心包括：一个映射器，用作数据模型（以Python类的形式定义）和数据库间的媒介；一个基于正则表达式的URL分发器；一个视图系统，用于处理请求；以及一个模板系统。 核心框架中还包括：

- 一个轻量级的、独立的Web服务器，用于开发和测试。
- 一个表单序列化及验证系统，用于HTML表单和适于数据库存储的数据之间的转换。
- 一个缓存框架，并有几种缓存方式可供选择。
- 中间件支持，允许对请求处理的各个阶段进行干涉。
- 内置的分发系统允许应用程序中的组件采用预定义的信号进行相互间的通信。
- 一个序列化系统，能够生成或读取采用XML或JSON表示的Django模型实例。
- 一个用于扩展模板引擎的能力的系统。

**其架构如下：**

![Clipboard Image.png](https://ask.hellobi.com/uploads/article/20170519/419f42b654768de7612026eb4908838f.png)

**Django的请求处理流程**

1. 用户在浏览器中输入一个网站的URL；
2. 请求经Django处理后通过url映射关系(URLConf)找到对应的视图(View)；
3. 视图(View)中负责具体业务的处理；
4. 在处理过程中，通过模型(Model)这种对象关系映射(Object Relational Mapping，简称ORM)对数据数据进行读写；
5. 模型(Model)处理底层处理数据后返回给视图(View);
6. 视图(View)将数据渲染到对应的模板（Templates)生成网页返回给浏览器;
7. Django还内置了一个缓存框架，当相同的请求过来时会优先从缓存中读取结果直接返回。

上述流程只是简单的描述了大概过程，实际上还有很多中间件(Middleware)会对请求进行处理。下面开始实现Django的实例。

Pinterest是最近流行的一个图片分享网站，它使用Django进行开发。这里用Django实现一个简化版的Pinterest网站。效果如下：

![img](http://101python.cn/static/images/mini_pinterest_prettify.gif)

### 创建网站

**1.安装Django**

先新建一个django_tutorial的文件夹，并切换至该目录

```
$ mkdir django_tutorial
$ cd django_tutorial

```

安装Django

```
$ pip install django

```

**2.初始化mini_pinterest项目**

建立mini_pinterest项目

```
django-admin.py startproject mini_pinterest
```

创建后目录结构和说明如下：

```
mini_pinterest
    ├── manage.py       - 用于管理Django站点
    └── mini_pinterest
        ├── __init__.py - Python模块标识
        ├── settings.py - 项目配置文件
        ├── urls.py     - URL配置文件
        └── wsgi.py     - 内置runserver命令的WSGI应用配置
```

**3.创建Pinterest应用**

```
$ python manage.py startapp pinterest
```

执行完成后会自动生成一个同名的文件夹，目录结果如下：

```
mini_pinterest
├── manage.py
├── mini_pinterest
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── pinterest
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── migrations
    │   └── __init__.py
    ├── models.py
    ├── tests.py
    └── views.py
```

此时Django还不能调用此应用，要想使用这个应用，需要把它加到Django的配置文件中。即把应用的名字pinterest加到Django的settings.py文件中的INSTALLED_APPS变量中，如下：

```
# mini_pinterest/settings.py

...

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # 添加pinterest应用
    'pinterest',
]

...

```

先初始化数据库，执行以下命令：

```
$ python manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying admin.0001_initial... OK
  Applying admin.0002_logentry_remove_auto_add... OK
  Applying contenttypes.0002_remove_content_type_name... OK
  Applying auth.0002_alter_permission_name_max_length... OK
  Applying auth.0003_alter_user_email_max_length... OK
  Applying auth.0004_alter_user_username_opts... OK
  Applying auth.0005_alter_user_last_login_null... OK
  Applying auth.0006_require_contenttypes_0002... OK
  Applying auth.0007_alter_validators_add_error_messages... OK
  Applying auth.0008_alter_user_username_max_length... OK
  Applying sessions.0001_initial... OK

```

**4.创建数据模型结构**

Django默认使用Sqlite数据库。SQLite，是一款轻型的数据库，以单个文件的形式存在，简单方便无需安装。这里不用做修改。它在Django的配置如下：

```
# mini_pinterest/settings.py

...
# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',        - 使用的数据库引擎
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),  - 数据库名字
    }
}
...

```

**创建模型**

在pinterest/models.py文件中建立一个Image模型，内容如下：

```
# pinterest/models.py

from django.db import models


class Image(models.Model):
    img = models.ImageField(upload_to='upload')    # 图片文件,上传至img文件夹
    description = models.TextField()            # 图片描述, 长文本类型
    created = models.DateTimeField(auto_now_add=True)  # 创建时间,自动添加当前时间

```

**建立数据表**

为了创建模型对应的数据表，需要先生成对应的数据迁移脚步(migrations)，执行命令如下：

```
$ python manage.py makemigrations
Migrations for 'pinterest':
  pinterest/migrations/0001_initial.py
    - Create model Image

```

数据迁移脚步生成后，就可以开始建立数据表，执行命令如下：

```
$ python manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, pinterest, sessions
Running migrations:
  Applying pinterest.0001_initial... OK

```

**5.创建管理后台**

Django默认已经内置了一个管理后台，要使用它需要先创建一个超级用户(superuser)。执行如下命令：

```
$ python manage.py createsuperuser
Username (leave blank to use 'guoyuxia'): demo
Email address:
Password:
Password (again):
Superuser created successfully.

```

这样一个超级用户就创建成功了。

**注册模型**

为了将模型添加到管理后台，需要将模型注册到管理后台，在admin.py文件中添加相应的模型。

```
# pinterest/models.py

from django.contrib import admin
from .models import Image

admin.site.register(Image)

```

至此，就可以使用管理后台来管理模型了。进入项目目录，在终端中执行以下命令启动网站：

```
$ python manage.py runserver
Performing system checks...

System check identified no issues (0 silenced).
May 08, 2017 - 15:29:11
Django version 1.11.1, using settings 'mini_pinterest.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.

```

在浏览器中输入[http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin) 进行访问，效果如下：

![img](http://101python.cn/static/images/django_admin.gif)

**6.实现展示页面**

完成上述代码后已经可以进行图片的增删改查功能，接下来就是实现最后的展示页面。这里需要做的是在Django中建立一个视图(view)和模板(template)。

**建立视图**

视图其实就是一个特殊的函数，用来处理网络请求并返回结果。它以请求对象(request)为参数，返回一个HttpResponse对象。在pinterest下的views.py创建一个名为index的函数。index函数中获取所有的图片对象，然后将这些图片数据渲染到一个模板中。函数代码如下：

```
# pinterest/views.py

from django.shortcuts import render
# 导入图片模型
from .models import Image


def index(request):
    # 获取图片列表
    image_list = Image.objects.all()
    # 将image_list传入模板进行数据渲染, 然后返回给浏览器
    return render(request, 'index.html', {'image_list': image_list})

```

**配置URL**

视图函数创建完成后还需要进行URL配置，这样Django才能知道一个请求地址过来该执行哪个视图函数。配置是通过urls.py文件中urlpatterns加入一个url函数，该函数接受两个参数(一个URL正则表达式和一个视图函数）。代码如下：

```
# mini_pinterest

from django.conf.urls import url
from django.contrib import admin
# 导入视图
from pinterest import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    # 添加URL, 这里^$表示首页的请求交给views下的index函数处理
    url(r'^$', views.index),
]

```

**创建模板**

现在URL已经配置OK，对应的视图函数也已完成，最后就剩下渲染需要的模板。所有的模板一个会放在一个名叫templates的文件夹下以方便管理。在mini_pinterest文件夹下创建一个名叫tempates的文件夹。

```
$ mkdir templates
$ ls
db.sqlite3     manage.py      pinterest
img            mini_pinterest templates

```

文件夹创建成功后，需要在Django配置文件(settings.py)中TEMPLATES变量中加一个模板文件夹的路径告诉Django模板文件去哪里查找。

```
...
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # 这里添加templates文件夹的路径
        # BASE_DIR表示mini_pinterest文件夹的全路径
        # os.path.join(BASE_DIR, 'templates')表示mini_pinterest文件夹下的templates文件夹
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
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

```

这样Django在视图函数中渲染模板的时候就会自动从该templates文件夹下自动查找对应名字的模板文件。接下是来需要做的就在templates目录下新建一个名为index.html的文件。

这个模板本质上可以说是一个html文件，在其中加入了一下Django的变量和标签。其中变量就是视图中传入模板的数据，可以动态的生成不同的内容。标签类似于Python的语法，Django有许多内置的标签，可以让模板中支持逻辑判断、循环、格式化等功能。这里在index.html文件中循环显示管理后台的所有图片，内容如下：

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mini Pinterest</title>
</head>
<body>
<!--循环图片列表-->

</body>
</html>

```

**查看效果**

模板完成后让我们来看下效果，在浏览器中输入[http://127.0.0.1:5000/](http://127.0.0.1:5000/) 进行访问，发现显示结果如下：

![img](http://101python.cn/static/images/django_error.png)

Oops,咋回事？描述显示出来了，但是图片却都没有显示。检查下终端中的访问记录：

![img](http://101python.cn/static/images/django_log.png)

可以发现，访问日志中都返回了404(资源未找到)。难道是图片上传失败了？！！ 进入项目文件夹，用命令看下当前文件夹中内容：

```
...
│   └── index.html
└── upload
    ├── 0e272102376f4e2d4b5a8a4e763ddf74.jpg
    ├── 3f1d601a47c081f358f3f51fc11d2a37.jpg
    ├── 64d9c7134f3540862726bacd87a0c477.jpg
    ├── 9cdd6f1ecd73e909a6a719cd0ad65272.jpg
    ├── apic14052.jpg
    ├── e2f36311b9eed0badea5f94b87d8bf70.jpg
    ├── e77338edefa4d47aacf8da4a4c401239.jpg
    ├── f7313b3bd990888565d7ffa56f81eb6e.jpg
    ├── frog-2240764_1920.jpg
    ├── wallpaper.png
    └── xpic6813.jpg
```

可以看到图片都已经上传到指定的upload文件夹中了。分析到这里，基本可以确定是Django中没有配置正确的URL解析路径导致无法定位upload文件夹的图片。解决方法是在urls.py中配置一个url地址。首先在settings.py最后配置图片的本地路径和请求地址路径：

```
# mini_pinterest/settings.py
...
# 加入图片本地路径和范围路径
MEDIA_ROOT = BASE_DIR # BASE_DIR 表示当前文件夹
MEDIA_URL = '/upload/'

```

然后在urls.py文件中加入相应的url解析路径。

```
# mini_pinterest/urls.py

...
from django.conf import settings
# 导入static函数
from django.conf.urls.static import static
...

# 加入图片url
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

```

在浏览器中重新访问[http://127.0.0.1:5000/发现可以正常显示了，效果如下](http://127.0.0.1:5000/%E5%8F%91%E7%8E%B0%E5%8F%AF%E4%BB%A5%E6%AD%A3%E5%B8%B8%E6%98%BE%E7%A4%BA%E4%BA%86%EF%BC%8C%E6%95%88%E6%9E%9C%E5%A6%82%E4%B8%8B):

![img](http://101python.cn/static/images/mini_pinterest.gif)

图片是正常显示了，但界面未免太简陋了。作为一个有追求的码农，必须要优化下展示效果。However，我不太擅长前端页面展示T_T.

![img](http://101python.cn/static/images/cry.jpg)

不慌，在免费开源漫天飞的互联网时代，想找个好看的模板想必也不是件难事。具体细节就不唠叨了，经过几分钟的Google，找到了一个比较满意的模板。将模板中的css和js文件加入到mini_pinterest文件中,最后的展示效果如下：

![img](http://101python.cn/static/images/mini_pinterest_prettify.gif)

OK, 收工！