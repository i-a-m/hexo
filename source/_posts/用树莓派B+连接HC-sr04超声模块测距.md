---
title: 用树莓派B+连接HC-sr04超声模块测距 
tags: [树莓派]
categories: 树莓派
---
截止到目前为止，我的B+板上已经连接了2个L298N驱动板，1个DS1302实时时钟模块，1个DHT11温湿度模块，总共使用的GPIO端口（除电源VCC和GND外）2*6 + 1 + 3 = 16个，再除去12个电源接口，还剩12个GPIO可用。如下图：

![img](http://img.my.csdn.net/uploads/201505/30/1432964318_3592.png)

现在，我们再使用2个GPIO接口来连接一个超声测距模块，这样，我们的树莓派到现在已经可以控制四驱车、采集温度湿度、重启后还能校准时间、USB摄像头采集图像的功能，加上超声测距，已经具有了比较完成的功能。

超声测距模块为HC-sr04，4个引脚分别为：VCC-5V输入，Trig控制输入端，Echo信号输出端，GND，探测距离2cm~450cm，最高精度达0.3cm。

模块的工作原理：

1）采用I/O出发测距，给Trig至少10us的高电平信号；

2）模块自动发送8个40KHz的方波来检测是否有信号返回；

3）如果有信号返回，通过Echo输出一个高电平，高电平持续时间就是超声波从发射到返回的时间，测试距离=(高电平时间*声速340m/s) / 2

模块引脚和原理明白以后，我们就可以连接电路图了，参考如下：

我使用了第32引脚来接HC模块的Echo引脚，第36引脚来接HC模块的Trig引脚。

![img](http://img.my.csdn.net/uploads/201505/30/1432964318_3113.png)

超声测距模块也是需要通过时序信号来计算时间，但是因为其逻辑比较简单，只用测试高电平持续时间即可，所以我们依然采用RPi.GPIO库就可以实现测距功能。

```
#!/usr/bin/python2

#coding=utf-8

import RPi.GPIO as GPIO

import time

def init():

        GPIO.setmode(GPIO.BOARD)

        GPIO.setup(32, GPIO.IN)

        GPIO.setup(36, GPIO.OUT, initial=GPIO.LOW)

def getdistance():

        GPIO.output(36, GPIO.HIGH)

        # 等待10us以上

        i = 0

        i += 1

        GPIO.output(36, GPIO.LOW)

        while GPIO.input(32) == GPIO.LOW:

                pass

        # 从高电平开始计时

        start = time.time()

        while GPIO.input(32):

                pass

        end = time.time()

        print 'time:', end-start

        return (end - start) * 340 / 2

if name == "main":

        try:

                init()

                print getdistance()

        except KeyboardInterrupt, e:

                pass

        finally:

                GPIO.cleanup()

```



实测：

分别用直尺测量距离超声模块5cm、10cm、15cm、30cm、50cm，然后用程序测得的距离大约是4.2cm、9cm、14cm、48cm，误差在2cm以内。

![img](http://img.my.csdn.net/uploads/201505/30/1432964319_4695.png)

实物图如下：

![img](http://img.my.csdn.net/uploads/201505/30/1432964709_9184.png)

