---
title: Django用户认证系统的扩展和使用
tags: [Django,Python,]
categories: Python
---

**一、Django用户认证系统的扩展和使用**

 

user对象

　　user表包含的字段

**username　　　**用户名（必须字段，30个字符或更少，可以包含 _, @, +, . 和 - 字符）

**password**　　　 密码（必须字段，存储的是哈希值）

**first_name　**　  可选****

**last_name　　  **可选

**email　　　　　 **可选

**is_staff　　　   **（Boolean　　决定用户是否可以访问admin管理界面。默认False）

**is_active　**　　 （Boolean。 用户是否活跃,默认True。一般不删除用户，而是将用户的is_active设为False）

**is_superuser　**（Boolean。默认False。当设为True时，用户获得全部权限）

**date_joined　　**用户创建的时间

**last_login　　   **上一次的登录时间，为datetime对象

 

　　方法

**is_anonymous()　　　　**是否是匿名用户。

**is_authenticated()　　   **用户是否通过验证，登陆。

**get_full_name()　　       **返回first_name plus the last_name, with a space in between.

**get_short_name()　　   **返回first_name.

**set_password(raw_password)　　**设置密码。

**check_password(raw_password)　　**验证密码。

**get_group_permissions(obj=None)　　**返回用户组权限的集合。

**get_all_permissions(obj=None)　　**返回用户所有的权限集合。

**has_perm(perm, obj=None)　　**用户是否具有某个权限。

**has_perms(perm_list, obj=None)　　**用户是否具有权限列表中的每个权限。

 

当我们想要扩展一些字段时，我们可以另外写一个model，然后OneToOneField到user表

```
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User)
    name = models.CharField(max_length=32)
```

这样我们就可以通过request.user 和request.user.userprofile.name分别获取到user表的username和userprofile表的name

 

用户验证、登录、退出　authenticate()、login(request,user) 、logout(request) 

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

验证是否登录 **is_authenticated()**

```
if request.user.is_authenticated():
        print("已登录")
```

 

创建用户

　　可以使用python manage.py createsuperuser创建超级用户，然后在admin进行添加，如果是需要自己写一个注册创建用户，有些地方需要注意

User对象的密码不是明文存储的，所以创建User对象时与通常的Model create不同，需用内置的create_user()方法。在创建好后还要和你扩展的表进行关联

```
accounts_dic={"username":username,"password":password}
uu = models.User.objects.create_user(**accounts_dic)    #创建用户             
models.UserProfile.objects.create(name="张三",user_id=uu.id)#关联UserProfile表
```

 

修改密码　set_password()

```
amend_obj = models.User.objects.get(username='zhangsan')
amend_obj .set_password('new password')
amend_obj .save()
```