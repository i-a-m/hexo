---
title: 树莓派B+使用L298N驱动控制四驱车并实现一个简单的web控制端 
tags: [树莓派]
categories: 树莓派
---
L298N，它是H桥双路直流电机驱动，可以使双路直流电机实现正转或者反转，并且通过ENDA和ENDB输入PWM信号，还可以实现加减速。本文用2块L298N驱动板成功驱动了4个直流电机，实现了4轮同时向前、向后以及前向左转、前向右转甚至是后向左转和后向右转的功能，最后通过python的BaseHTTPServer模块（python3中是http.server模块）实现了一个控制小车的HTTP接口，另外用lighttpd启动一个网页，通过网页中的ajax调用控制小车的HTTP接口，最终实现通过web的方式来控制智能小车。

首先介绍一下L298N驱动的使用方法：

![img](http://img.my.csdn.net/uploads/201505/24/1432467875_6673.png)

![img](file:///C:/Users/pixel/AppData/Local/Temp/enhtmlclip/Image%288%29.png)

电源端（12V、GND、5V），输入5V直流电到L298N的5V接口时，直流电机几乎不能正常运转，当我们输入7-12V接到L298N的12V引脚时，该驱动板还可以在5V引脚输入电压供外部使用，所以输入驱动板的电压就接在12V引脚即可，经测试，5V输入到12V引脚可以正常工作，小车的直流电机也可以正常工作。

逻辑输入端（ENDA IN1 IN2 IN3 IN4 ENDB），分别连接树莓派的GPIO接口，控制逻辑如下图，在本人测试过程中，ENDB端是和IN1 IN2配合使用控制M1电机的，还请大家使用时先测试好：

![img](http://img.my.csdn.net/uploads/201505/24/1432467876_6994.png)

关于加减速的PWM，我们先忽略，在实现了前进、后退和功能后，这个只是锦上添花的功能，而且可有可无。

接下来，我们就可以连接线路了，如果想要小车移动方便，最好使用移动电源来给树莓派、小车供电（用4节1.5V电池也可以），本人使用的是重达1斤的2万毫安时双输出口移动电源，正好可以给树莓派和外接电路供电。如果暂时没有移动电源，可以只做好测试工作，把小车架空，不要让其随意乱走。

树莓派GPIO和L298N连接关系如下（BOARD编号模式下的GPIO引脚-L298N输入引脚，都是高电平使能，其它引脚低电平）：

前轮驱动：18-ENDB, 22-ENDA, 11-左前前, 13-左前后, 15-右前前, 29-右前后

后轮驱动：38-ENDB, 40-ENDA, 31-左后前, 33-左后后, 35-右后前, 37-右后后

电源输出：5V 1A- 树莓派，5V 2.1A-外部电路（面包板，2块L298N驱动）

L298N和电机：按照使用方法中的逻辑关系，每块的OUT1 OUT2接一个电机，OUT3 OUT4接另外一个。

最好在连接前，就已经测试好电机的正负极，L298N连接时都保持一定的先后次序，如IN1 IN2 ENDB 控制 OUT1 OUT2从而控制电机1，这样在写程序测试时会方便很多。

手绘电路图如下，其实比较简单，就是线多而已：

![img](http://img.my.csdn.net/uploads/201505/24/1432468067_2109.png)

L298N控制4驱直流电机的驱动如下（python2/python3）：

```
L298N_car2.py
#!/usr/bin/python2
#coding=utf-8
import RPi.GPIO as GPIO
import time

'''
使用2块L298N驱动控制4个直流电机
前轮驱动：18-ENDB, 22-ENDA, 11-左前前, 13-左前后, 15-右前前, 29-右前后
后轮驱动：38-ENDB, 40-ENDA, 31-左后前, 33-左后后, 35-右后前, 37-右后后
'''
# 初始化设置引脚输出
def init():
        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(18, GPIO.OUT)
        GPIO.setup(11, GPIO.OUT)
        GPIO.setup(13, GPIO.OUT)
        GPIO.setup(22, GPIO.OUT)
        GPIO.setup(15, GPIO.OUT)
        GPIO.setup(29, GPIO.OUT)


        GPIO.setup(38, GPIO.OUT)
        GPIO.setup(31, GPIO.OUT)
        GPIO.setup(33, GPIO.OUT)
        GPIO.setup(40, GPIO.OUT)
        GPIO.setup(35, GPIO.OUT)
        GPIO.setup(37, GPIO.OUT)
# 所有引脚置低电平，用于复位、停止运行的功能
def reset():
        GPIO.output(18, GPIO.LOW)
        GPIO.output(11, GPIO.LOW)
        GPIO.output(13, GPIO.LOW)
        GPIO.output(22, GPIO.LOW)
        GPIO.output(15, GPIO.LOW)
        GPIO.output(29, GPIO.LOW)
        GPIO.output(38, GPIO.LOW)
        GPIO.output(31, GPIO.LOW)
        GPIO.output(33, GPIO.LOW)
        GPIO.output(40, GPIO.LOW)
        GPIO.output(35, GPIO.LOW)
        GPIO.output(37, GPIO.LOW)
# 左前轮向前转
def front_left_forward():
        GPIO.output(18, GPIO.HIGH)
        GPIO.output(11, GPIO.HIGH)
        GPIO.output(13, GPIO.LOW)
# 右前轮向前转
def front_right_forward():
        GPIO.output(22, GPIO.HIGH)
        GPIO.output(15, GPIO.HIGH)
        GPIO.output(29, GPIO.LOW)
# 左后轮向前转
def rear_left_forward():
        GPIO.output(38, GPIO.HIGH)
        GPIO.output(31, GPIO.HIGH)
        GPIO.output(33, GPIO.LOW)
# 右后轮向前转
def rear_right_forward():
        GPIO.output(40, GPIO.HIGH)
        GPIO.output(35, GPIO.HIGH)
        GPIO.output(37, GPIO.LOW)

def front_left_back():
        GPIO.output(18, GPIO.HIGH)
        GPIO.output(11, GPIO.LOW)
        GPIO.output(13, GPIO.HIGH)

def front_right_back():
        GPIO.output(22, GPIO.HIGH)
        GPIO.output(15, GPIO.LOW)
        GPIO.output(29, GPIO.HIGH)

def rear_left_back():
        GPIO.output(38, GPIO.HIGH)
        GPIO.output(31, GPIO.LOW)
        GPIO.output(33, GPIO.HIGH)

def rear_right_back():
        GPIO.output(40, GPIO.HIGH)
        GPIO.output(35, GPIO.LOW)
        GPIO.output(37, GPIO.HIGH)
# 前进，4轮全部向前转
def forward():
        reset()
        front_left_forward()
        front_right_forward()
        rear_left_forward()
        rear_right_forward()
# 后退，4轮全部向后转
def back():
        reset()
        front_left_back()
        front_right_back()
        rear_left_back()
        rear_right_back()
# 前向左转，右边两个轮子向前转
def front_left_turn():
        reset()
        front_right_forward()
        rear_right_forward()
        time.sleep(0.3)
        reset()
# 前向右转
def front_right_turn():
        reset()
        front_left_forward()
        rear_left_forward()
        time.sleep(0.3)
        reset()
# 后向左转
def rear_left_turn():
        reset()
        rear_left_back()
        front_left_back()
        time.sleep(0.3)
        reset()
# 后向右转
def rear_right_turn():
        reset()
        rear_right_back()
        front_right_back()
        time.sleep(0.3)
        reset()
# 停止
def stop():
        reset()
# 测试各个功能点
if __name__ == "__main__":
        init()
        reset()
        #front_left_forward()
        #front_right_forward()
        #rear_left_forward()
        #rear_right_forward()
        forward()
        time.sleep(2)
        back()
        time.sleep(2)
        front_left_turn()
        time.sleep(1)
        front_right_turn()
        time.sleep(1)
        rear_left_turn()
        time.sleep(1)
        rear_right_turn()
        stop()
        GPIO.cleanup()

```

驱动程序测试完毕以后，我们就可以写一个HTTP server来提供通过HTTP的方式调用驱动接口。python实现HTTP Server不做详细介绍，我们直接使用最简单的方式即可，毕竟不会涉及多线程、并发。

参考程序如下：

```
rasphttp2.py
#!/usr/bin/python2
#coding=utf-8
from BaseHTTPServer import HTTPServer, BaseHTTPRequestHandler
import urllib
import L298N_car2 as car
from abc import ABCMeta, abstractmethod

class DispatcherHandler(BaseHTTPRequestHandler):
        def do_GET(self):
                print 'client:', self.client_address, 'reuest path:', self.path, \
                                'command:', self.command
                #query = urllib.splitquery(self.path)
                query= self.path.split('?', 1)
                action = query[0]
                params = {}
                if len(query) == 2:
                        for key_value in query[1].split('&'):
                                kv = key_value.split('=')
                                if len(kv) == 2:
                                        params[kv[0]] = urllib.unquote(kv[1]).decode("utf-8", "ignore")
                runCar = RunCar()
                buf = {}
                if self.path.startswith("/car?"):
                        buf["return"] = runCar.action(params)
                else:
                        buf["return"] = -1
                self.protocal_version = "HTTP/1.1"
                self.send_response(200)
                self.send_header("Content-type", "application/json; charset=UTF-8")
                #self.send_header("Content-type", "test/html; charset=UTF-8")
                self.send_header("Pragma", "no-cache")
                self.send_header("Cache-Control", "no-cache")
                self.end_headers()
                self.wfile.write(buf)

        def do_POST(self):
                self.send_error(404)

class Job():
        __metaclass__ = ABCMeta
        @abstractmethod
        def action(self, params):
                pass
class RunCar(Job):
        def __init__(self):
                car.init()
        #子类必须实现父类的抽象方法，否则实例化时会报错
        def action(self, params):
                print params
                act = int(params['a'])
                if act == 1:
                        car.forward()
                        return 1
                if act == 2:
                        car.back()
                        return 1
                if act == 3:
                        car.front_left_turn()
                        return 1
                if act == 4:
                        car.front_right_turn()
                        return 1
                if act == 5:
                        car.rear_left_turn()
                        return 1
                if act == 6:
                        car.rear_right_turn()
                        return 1
                if act == 0:
                        car.stop()
                        return 1
                else:
                        return -1

if __name__ == "__main__":
        PORT_NUM = 8899
        serverAddress = ("", PORT_NUM)
        server = HTTPServer(serverAddress, DispatcherHandler)
        print 'Started httpserver on port: ', PORT_NUM
        try:
                server.serve_forever()
        except KeyboardInterrupt, e:
                pass
        finally:
                server.socket.close()
                print 'Exit...'
```

运行rasphttp2.py程序（**python2 rasphttp2.py或者chmod a+x rasphttp2.py && ./rasphttp2.py**），成功启动一个HTTP server以后，就可以在浏览器中测试接口了，比如：http://raspberryIP:8899/car?a=1 表示测试小车向前进的接口。可以通过HTTP server的后台输出观察控制信息。

![img](file:///C:/Users/pixel/AppData/Local/Temp/enhtmlclip/Image%2810%29.png)

![img](http://img.my.csdn.net/uploads/201505/24/1432467876_6253.png)

最后，为了更加方便的操作小车，我们可以提供一个简单的网页，点击网页上的按钮就可以操作我们的小车了。

参考代码：

```
car.html
<html>
<head>
<meta http-equiv="content-type" content="test/html; charset=UTF-8" />
<title>智能小车控制端</title>
<script type="text/javascript" src="/jquery.js"></script>
<script type="text/javascript">
$(document).ready(function(){
        $("#forward").click(function(){
                $.ajax({
                        type: "GET",
                        url: "http://192.168.1.111:8899/car",
                        data: {"a": 1},
                        dataType: "json",
                        cache: "false",
                        success: function(data){},
                        error: function(data){}
                });
        });
        $("#stop").click(function(){
                $.ajax({
                        type: "GET",
                        url: "http://192.168.1.111:8899/car",
                        data: {"a": 0},
                        dataType: "json",
                        cache: "false",
                        success: function(data){},
                        error: function(data){}
                });
        });
        $("#back").click(function(){
                $.ajax({
                        type: "GET",
                        url: "http://192.168.1.111:8899/car",
                        data: {"a": 2},
                        dataType: "json",
                        cache: "false",
                        success: function(data){},
                        error: function(data){}
                });
        });
        $("#front_left_turn").click(function(){
                $.ajax({
                        type: "GET",
                        url: "http://192.168.1.111:8899/car",
                        data: {"a": 3},
                        dataType: "json",
                        cache: "false",
                        success: function(data){},
                        error: function(data){}
                });
        });
        $("#front_right_turn").click(function(){
                $.ajax({
                        type: "GET",
                        url: "http://192.168.1.111:8899/car",
                        data: {"a": 4},
                        dataType: "json",
                        cache: "false",
                        success: function(data){},
                        error: function(data){}
                });
        });
});
</script>
</head>
<body>
<button id="forward" name="forward">前进</button>
<button id="back" name="back">后退</button>
<button id="front_left_turn" name="front_left_turn">左前拐</button>
<button id="front_right_turn" name="front_right_turn">右前拐</button>
<button id="stop" name="stop">停止</button>
</body>
</html>

```

如果你的树莓派上安装了HTTP服务器，则配置一下服务器根目录，正确访问car.hrml即可。我的是lighttpd，参考我的系列文章第6篇，配置好lighttpd.conf文件以及car.html的权限（文件所属比如是www:www，放在服务器根目录等等），通过lighttpd -f /path/lighttpd.conf即可。

![img](http://img.my.csdn.net/uploads/201505/24/1432467877_2039.png)

![img](file:///C:/Users/pixel/AppData/Local/Temp/enhtmlclip/Image%2811%29.png)

另外，需要注意的是树莓派的防火墙中要允许使用的端口的网络连接；直接Ctrl+C 终止掉lighttpd在控制台的运行后，发现它的进程还在，可能是配置文件中没有相关的配置；树莓派每次启动后，在没有对GPIO进行设置前，如果接通L198N驱动的电源，小车有2个轮子会直接运行，可能和默认的GPIO输出有关系；我的PI现在还连的是网线，结合前面的建立无线AP的文章，现在可以用无线网卡发射AP，手机连上后访问控制页面来进行控制小车了，有点像遥控车，如果无线网卡不发射AP而连的是家里的路由器，则可以通过路由器转发，远程控制小车。

最后还是上一张实物图：

![img](http://img.my.csdn.net/uploads/201505/24/1432467899_9824.png)