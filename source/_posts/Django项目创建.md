---
title: Django项目创建
tags: [Django,Python,]
categories: Python
---

**创建Django项目**

　　首先下载安装Django

1、PyCharm创建

　　file>newproject>Django

![img](http://images2015.cnblogs.com/blog/866760/201605/866760-20160507011632701-1415940397.png)

![img](http://images2015.cnblogs.com/blog/866760/201605/866760-20160507011725888-893957472.png)

 

命令创建：

　　把django-admin.py添加到环境变量

　　python django-admin.py startproject [projectname]　　

 

 

2、创建app

　　python manage.py startapp app01

　　python manage.py startapp app02

 

在工程的根目录下创建static文件夹用来存放css,js,img等文件。

 

3、配置

　　在settings.py文件里配置app和static

![img](http://images2015.cnblogs.com/blog/866760/201605/866760-20160507013023013-541331493.png)  ![img](http://images2015.cnblogs.com/blog/866760/201605/866760-20160507013111685-572741405.png)

 

4、解耦和

　　对于比较复杂的大型工程，我们可以解耦增加正交性，通俗的讲就是减少模块间的互相干扰，让各个模块的修改变化尽可能小的影响其它模块，就是每个部分独立变化

刚刚我们创建了两个app，分别在他们的目录下都创建urls.py

　　在原始urls文件中配置映射

![img](http://images2015.cnblogs.com/blog/866760/201605/866760-20160512111404530-868816181.png)

　　app01的urls

![img](http://images2015.cnblogs.com/blog/866760/201605/866760-20160507015815669-1948193678.png)

　　app02的urls

![img](http://images2015.cnblogs.com/blog/866760/201605/866760-20160507015807638-70870538.png)

 

5、启动

　　python manage.py runserver 127.0.0.1:8888

 

其他常用命令

　　python manage.py syncdb
　　python manage.py makemigrations
　　python manage.py migrate

　　python manage.py createsuperuser