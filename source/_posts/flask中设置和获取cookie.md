---
title: flask中设置和获取cookie
tags: [Flask,Python,]
categories: Python
---

## 一 什么是cookie

​        什么是cookie?如果单单从[数据结构](http://lib.csdn.net/base/datastructure)的角度来说,它可以被理解成用来保存数据的一个dictionary,由一组组键值对组成.如果从作用上来说,我们知道Http协议是一种无状态的协议.什么叫无状态呢,就是本次的客户端请求不会保留上一次客户端请求的状态,简单点说就是这样会要求我们每次在浏览器中点开一个网站的链接都会输一次账户和密码.cookie就是用来解决这个问题的.

​        为了解决上述问题,我们第一次登录web服务器,服务端就会在它的响应中的Set-Cookie字段中发送一些键值对,这就包括一个Session ID以及其他一些信息(也包括我们自定义的cookie中的键值对),并告诉客户端在本地缓存这个cookie.然后客户端以后进行链接时每次都会发送这个Session ID,服务器一看是哪个Session ID就知道是哪个客户端发起的链接了,就不会要求我们再次输账户和密码验证了.

​        我们在flask中自定义cookie,实际上就是在响应Response的Set-Cookie字段中增加我们自定义的键值对.而获取cookie,就是通过请求Request中通过键获取其对应的值.

## 二 设置cookie

​      通过响应对象的set_cookie方法我们可以设置自定义cookie:

```
@app.route('/set_cookie')  
def set_cookie():  
    response=make_response('Hello World');  
    response.set_cookie('Name','Hyman')  
    return response  
```

我们还可以指定cookie的有效时长,下面的代码把有效时长设置成了30天.通常情况下,我们还可以在浏览器上设置cookie的有效时长,而且浏览器上配置的有效时长优先级要高于我们在代码中设置的.

```
outdate=datetime.datetime.today() + datetime.timedelta(days=30)  
response.set_cookie('Name','Hyman',expires=outdate)  
```

## 三 获取cookie

​        我们可以使用Request对象cookies字段的get方法来获取我们所需要的cookie,下面的代码我们直接获取cookie并返回给视图函数:

```
@app.route('/get_cookie')  
def get_cookie():  
    name=request.cookies.get('Name')  
    return name  
```

我们还可以在模板中获取cookie,然后渲染模板.

test.html:

```
<h1>My name is {{request.cookies.get('Name')}}</h1>  
```

渲染模板:

```
@app.route('/get_template')  
def get_template():  
    return render_template('test.html')  
```

## 四 删除cookie

​        共有三种方法可以删除一个cookie:

(1) 可以通过在浏览器中设置来清除cookie.

(2) 使用Response的set_cookie进行清除

```
@app.route('/del_cookie')  
def del_cookie():  
    response=make_response('delete cookie')  
    response.set_cookie('Name','',expires=0)  
    return response  
```

(3)使用Response的 delete_cookie方法.

```
@app.route('/del_cookie2')  
def del_cookie2():  
    response=make_response('delete cookie2')  
    response.delete_cookie('Name')  
    return response  
```

