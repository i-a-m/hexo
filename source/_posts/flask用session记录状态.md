---
title: Flask获取表单提交数据与json
tags: [Flask,Python,]
categories: Python
---

前台代码

```
<form action="/login" method="POST">
    <input type="text" name="username">
    <input type="password" name="password">
    <input type="submit" value="提交">
</form>
```

处理代码

```
# -*- coding:utf-8 -*-



from flask import Flask,session,redirect,url_for,request,render_template
app = Flask(__name__)
app.secret_key='123'    #配置secret_key,否则不能实现session对话
@app.route('/')
def index():
    if session.get('username') == 'wanghao' and session.get('password') == '123':
        return "你已经登陆"
    msg="没有登陆"
    return render_template('from_login.html')

@app.route("/login",methods=["POST","GET"])
def login():
    if request.method=='POST':
        session['username']=request.form['username']
        session['password']=request.form['password']
        return redirect(url_for('index'))
    return '123'

if __name__ == '__main__':
    app.debug=True
    app.run(port=7998)
```

>>> import os
>>> os.urandom(24)
>>> '\xca\x0c\x86\x04\x98@\x02b\x1b7\x8c\x88]\x1b\xd7"+\xe6px@\xc3#\\'   ＃生成随机的 secret_key