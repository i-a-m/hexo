---
title: Arduino舵机
tags: [Arduino,控制器]
categories: Arduino
---

### 1)       说明：。

舵机的旋转不像普通电机那样只是转圈圈，它可以根据你的指令旋转到0至180度之间的任意角度然后精准的停下来，常用于控制[机器人](http://lib.csdn.net/base/robot)。
舵机的转动的角度是通过调节PWM（脉冲宽度调制）信号的占空比来实现的。需要使用Arduino上的PWM口控制（数字前带~的），Arduino 的驱动能力有限，所以当需要控制1 个以上的舵机时需要外接电源。一个机器人经常需要很多个舵机同时工作，此时需要加一个舵机控制板，舵机控制板本身是一个单片机，它不但能接16/24/32个舵机，同时也简化了舵机操作命令。
下例中使用的是9g的小舵机，用arduino板上的5V供电，大的舵机有的需要外部供电才能驱动，外接电源时需要将降到舵机指定的电压，否则会烧坏舵机。

### 2)       硬件：

舵机SG90，Arduino uno，杜邦线

### 3)       接线：

GND(棕色)接 Arduino GND
PWM(橙色)接 Arduino Digital 10
VCC(红色)接 Arduino 5V

![img](http://img.blog.csdn.net/20170220134325714?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveGlleWFuMDgxMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

### 4)       代码：

```

#include <Servo.h>

#define PIN_SERVO 10
Servo myservo;

void setup()
{
  myservo.attach(PIN_SERVO);
}

void loop()
{
  myservo.write(0);
  delay(1000);
  myservo.write(80);
  delay(1000);
  myservo.write(160);
  delay(1000);
  myservo.write(80);
  delay(1000);
  myservo.write(0);
  delay(1000);
}


```

代码中用到了Servo库，它是Arduino自带的库，不需要另外下载安装。