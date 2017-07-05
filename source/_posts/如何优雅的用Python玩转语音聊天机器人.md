---
title: 如何优雅的用Python玩转语音聊天机器人
tags: [python,树莓派,语音聊天]
categories: 树莓派
---

一名极客运维人员，走在脑洞大开的路上....

Python聊天机器人：可以感应人是否存在，识别语音，通过图灵API语音回答

-------------------------上图镇楼----------------------------

[![wKiom1c1r5rCTTQvAAcDqM-e2II445.jpg](http://www.codexiu.cn/static/blog/imagesw8/2016/05/14/full/ce750dfd3d93460b79880a94bad5c6cfc49300bd.jpg)](http://www.codexiu.cn/static/blog/imagesw8/2016/05/14/full/ce750dfd3d93460b79880a94bad5c6cfc49300bd.jpg)

【详细攻略】

所需硬件：

树莓派B+

人体红外线感应模块

内置麦克风摄像头([实测树莓派免驱淘宝链接](https://detail.tmall.com/item.htm?spm=a220m.1000858.1000725.1.8qcrjP&id=520015508311&skuId=3100093471277&areaId=110100&cat_id=2&rn=b7595e58803deeead63dc92b44e423b6&user_id=755252462&is_b=1)）

申请API：

百度语音api

图灵api

语音聊天机器人实现原理：当有人来到跟前时--》触发聊天功能，开始以每2s检测录制语音--》通过百度语音api合成文字--》传递给图灵api返回回答信息--》通过百度语音合成播放

【人体感应识别部分Python代码renti.py】

```
#/usr/bin/python
#coding:utf-8
import RPi.GPIO as GPIO
import time
import os
import signal
import atexit
GPIO.setmode(GPIO.BCM)

GPIO_PIR = 14
GPIO.setup(GPIO_PIR,GPIO.IN)      # Echo
jing = 0
dong = 0 
sum = 0
sum1 = 0
oldren = 0
sleep = 0
def ganying():
	i = 0
	ok  = 0
	error = 0
	while i < 10:
		if GPIO.input(GPIO_PIR) == 1 :
			ok = ok + 1
		if GPIO.input(GPIO_PIR) == 0 :
			error = error + 1
		time.sleep(0.01)
		i = i + 1
	ren = ok/(error+1)
	return ren
```

```
GPIO_PIR = 14
```

为 红外线检测模块与树莓派的针脚，脚本函数返回0表示无人，>0 为有人

【Python语音识别聊天部分robot.py】

```
#/usr/bin/python
# -*- coding:utf-8 -*-
import sys
reload(sys)
sys.setdefaultencoding( "utf-8" )
import urllib
import urllib2
import json
import uuid
import base64
import os
import time
from renti import *
#获取百度token
appid=7647466
apikey="百度API"
secretkey="百度API"
baidu_url="https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=" + apikey + "&client_secret=" + secretkey;
y_post=urllib2.urlopen(baidu_url)
y_read=y_post.read()
y_token=json.loads(y_read)['access_token']
#print y_read
#print y_token
#------------------function-------------
def luyin():
        os.system('arecord  -D plughw:1,0 -c 1 -d 2  1.wav -r 8000 -f S16_LE 2>/dev/null')
def fanyi():
        #http://vop.baidu.com/server_api?lan=zh&cuid=***&token=***
        #---------------语音识别部分
        mac_address="haogeoyes"
        with open("1.wav",'rb') as f:
            s_file = f.read()

        speech_base64=base64.b64encode(s_file).decode('utf-8')
        speech_length=len(s_file)
        data_dict = {'format':'wav', 'rate':8000, 'channel':1, 'cuid':mac_address, 'token':y_token, 'lan':'zh', 'speech':speech_base64, 'len':speech_length}
        json_data = json.dumps(data_dict).encode('utf-8')
        json_length = len(json_data)
        asr_server = 'http://vop.baidu.com/server_api'
        request = urllib2.Request(url=asr_server)
        request.add_header("Content-Type", "application/json")
        request.add_header("Content-Length", json_length)
        fs = urllib2.urlopen(url=request, data=json_data)
        result_str = fs.read().decode('utf-8')
        json_resp = json.loads(result_str)
        if json_resp.has_key('result'):
                out_txt=json_resp['result'][0]
        else:
                out_txt="Null"
        return out_txt
def tuling(b):
        f=urllib.urlopen("http://www.tuling123.com/openapi/api?key="此处为图灵API"&info=%s" % b)
        f=json.loads(f.read())['text']
        return f
def hecheng(text,y_token):
        #text="你好我是机器人牛牛很高兴能够认识你"
        geturl="http://tsn.baidu.com/text2audio?tex="+text+"&lan=zh&per=1&pit=9&spd=6&cuid=CCyo6UGf16ggKZGwGpQYL9Gx&ctp=1&tok="+y_token
        return os.system('omxplayer "%s" > /dev/null 2>&1 '%(geturl))
        #return os.system('omxplayer "%s" > /dev/null 2>&1 '%(geturl))
def nowtime():
        return time.strftime('%Y-%m-%d %H:%M:%S ')

#---------------main-----------------
num=0   #num用来判断是第一次说话，还是在对话过程中
first=1 #判断是不是第一说话  当1000次没有人动认为是第一次
while True:
        if ganying()!=0:
                run=open('run.log','a')
                if first==0:
                        hecheng("你好,我是牛牛机器人,你可以和我聊天,不过说话的时候你必须靠近话筒近一点,",y_token)
                        hecheng("说点什么吧,2秒钟内说完哦.",y_token)
                        first=1                 #为1一段时间就不执行
                        num=0                   #从新计数
                #print ganying()
                run.write(nowtime()+"说点神马吧..........."+'\n')
                print nowtime()+"说点神马吧.........."
                luyin()                         #开始录音
                out=fanyi().encode("utf-8")     #翻译文字
                run.write(nowtime()+"我说:"+out+'\n')
                print nowtime()+"我说:"+out
                if out == "Null":
                        text="没有听清楚你说什么"
                        os.system('omxplayer "shenme.wav" > /dev/null 2>&1 ')
                else:
                        text=tuling(out)
                        hecheng(text,y_token)
                print nowtime()+"牛牛:"+text
                run.write(nowtime()+"牛牛:"+text+'\n')
                run.close()
        else:
                #print ganying()        #调试查看是否为0有人没人
                #print num
                num=num+1               #num长时间增大说明没有人在旁边
                if num > 1000:
                        first=0         #0表示第一次说话
```

万事俱备 运行nohup python robot.py 哈哈就可以脱离屏幕开始愉快的语音聊天啦

原文地址：http://www.codexiu.cn/python/blog/15810/

