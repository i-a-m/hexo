---
title: Flask获取表单提交数据与json
tags: [Flask,Python,]
categories: Python
---

前台代码

```
{% extends "layout.html" %}

{% block title %}
    <title>
    用户登录
    </title>
{% endblock %}
{% block header %}
{% endblock %}

{% block body %}
<form action="http://localhost:5200/login2" method="post">
    <input type="text" name="username">
    <input type="password" name="password">
    <input type="submit" name="提交">
</form>

<input type="text" name="usernam" id="username">
<input type="password" name="password" id="password">
<button id="btn">点击</button>
<script>
    $(function(){
        $("#btn").click(function(){
            var username=$('#username').val();
            var password=$('#password').val();
            var data= {
                data: JSON.stringify({
                    'username': username,
                    'password': password
                }),
            }
                $.ajax({
                url:'http://localhost:5200/checkLogin',
                type:'POST',
                data:data,
                dataType: 'json',
                success:function(res){
                    console.log(res)
                    console.log(0)

                },
                error:function (res) {
                    console.log(res);
                    console.log(1)
                }

            })
        })
    })
</script>

{% endblock %}

{% block footer %}
{% endblock %}
```

处理代码

```
# -*- coding: utf-8 -*-

from flask import Blueprint, url_for, render_template, request, flash, redirect, make_response, session
import json

login_bp = Blueprint(
    'login', 
    __name__,
    template_folder='../templates',
)

@login_bp.route('/login')
def index():
    return render_template("/login/index.html")
   


@login_bp.route('/login2', methods=['POST'])
def login2():
    print "12"
    username = request.form.get('username')
    password = request.form.get('password')
    print username,password
    return (username,password)


@login_bp.route('/checkLogin', methods=['POST'])
def checkLogin():
    # password = request.form.get('password')
    # username = request.args.get('username')
 
    data = json.loads(request.form.get('data'))
    username = data['username']
    password = data['username']
    print (username)
    print (password)
    return "46575"

```

