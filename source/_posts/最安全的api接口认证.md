---
title: 最安全的api接口认证
tags: [Django,Python]
categories: Python
---
####最安全的api接口认证
实现步骤：

1、客户端与服务器都存放着用于验证的Token字段，客户端在本地把自己的 用户名+时间戳+Token 组合进行MD5加密后生成一段新的md5-token。

2、客户端访问的时候携带：用户名、时间戳、md5-token。

3、服务端收到请求后，先判断用户名、时间戳是否合法、假设先判断发送过来的时间戳和现在的时间戳不能大于2分钟。

4、如果是在2分钟之内，到redis里查看有没有该用户为key对应的md5-token，并判断它和发送过来的md5-token是否相同，如果有相同，说明该md5-token已经请求过，不能在操作，如果没找到相同的md5-token，说明是第一次请求，把用户名为key，md5-token为vallue存入redis，存在时间设为2分钟。

5、如果以上都通过了，在去数据库取出用户名和Token字段像客户端一样的方式进行加密。对比两个加密字段，相同则通过验证。

 

1、例如我们在请求的url后带上 用户名+时间戳+加密的Token

客户端

```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import os
BaseDir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

Params = {
    "server": "127.0.0.1",
    "port":8000,
    'request_timeout':30,
    "urls":{
          "asset_report_no_id":"/asset/asset_report_no_id/",
          "asset_report":"/asset/asset_report/",
        },
    'asset_id_path':'%s/var/.asset_id' % BaseDir,
    'log_file': '%s/logs/run_log' % BaseDir,
    'auth':{
        'user':'123456789@qq.com',
        'token': 'abc'
        },
}
```

```
url=http://127.0.0.1:8000/asset/
```

```
import hashlib,time
def get_token(username,token_id):
    timestamp = int(time.time())
    md5_format_str = "%s\n%s\n%s" %(username,timestamp,token_id)
    obj = hashlib.md5()
    obj.update(md5_format_str)
    print "token format:[%s]" % md5_format_str
    print "token :[%s]" % obj.hexdigest()
    return obj.hexdigest()[10:17], timestamp
```



```
def attach_token(url_str):
    '''生成一个加密验证在url后'''
    user = settings.Params['auth']['user']
    token_id = settings.Params['auth']['token']

    md5_token,timestamp = get_token(user,token_id)
    url_arg_str = "user=%s&timestamp=%s&token=%s" %(user,timestamp,md5_token)
    if "?" in url_str:
        new_url = url_str + "&" + url_arg_str
    else:
        new_url = url_str + "?" + url_arg_str
    return  new_url

#生成一个带着加密token的url
url = attach_token(url) 
```

发送请求

```
data_encode = urllib.urlencode(asset_data)#asset_data为要发送的数据
req = urllib2.Request(url=url,data=data_encode)
res_data = urllib2.urlopen(req,timeout=settings.Params['request_timeout'])
callback = res_data.read()
callback = json.loads(callback)
print (callback)
```

 

服务端

2、我们给服务端写一个装饰器token_required，用来验证



```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import time,hashlib,json
from asset import models
from django.shortcuts import render,HttpResponse
from cmdb import settings
from django.core.exceptions import ObjectDoesNotExist

def gen_token(username,timestamp,token):
    token_format = "%s\n%s\n%s" %(username,timestamp,token)
    obj = hashlib.md5()
    obj.update(token_format)
    return obj.hexdigest()[10:17]


def token_required(func):
    def wrapper(*args,**kwargs):
        response = {"errors":[]}
        get_args = args[0].GET
        username = get_args.get("user")
        token_md5_from_client = get_args.get("token")
        timestamp = get_args.get("timestamp")

        if not username or not timestamp or not token_md5_from_client:
            response['errors'].append({"auth_failed":"This api requires token authentication!"})
            return HttpResponse(json.dumps(response))
        try:
            if abs(time.time() - int(timestamp)) > settings.TOKEN_TIMEOUT:#验证时间有没有超过2分钟
                response['errors'].append({"auth_failed":"The token is expired!"})
            else:
                '''如果没超过两分钟，检查redis里有没有这个加密token'''
                red_result = __redies_token(username,token_md5_from_client)
                if red_result:  #等于True说明是第一次请求，进入下一步验证
                    user_obj = models.MyUser.objects.get(email=username)
                    token_md5_from_server = gen_token(username,timestamp,user_obj.token)
                    if token_md5_from_client != token_md5_from_server:
                        response['errors'].append({"auth_failed":"Invalid username or token_id"})
                    else:

                        print("通过验证")
                else:
                    response['errors'].append({"auth_failed":"The token is expired!"})

                print("\033[41;1m;%s ---client:%s\033[0m" %(time.time(),timestamp), time.time() - int(timestamp))
        except ObjectDoesNotExist as e:
            response['errors'].append({"auth_failed":"Invalid username or token_id"})
        if response['errors']:
            return HttpResponse(json.dumps(response))
        else:
            return  func(*args,**kwargs)
    return wrapper

def __redies_token(username,token_md5_from_client):
    import redis
    r = redis.Redis(host='192.168.0.109', port=6379)
    val =  r.get(username)
    if val == token_md5_from_client:
        print("是以请求过的token")
        return False
    else:#不存在，则以用户名为key，加密的token为value存入缓存，存在时间2分钟
        r.set(username, token_md5_from_client,ex=120)
        return True
```



 