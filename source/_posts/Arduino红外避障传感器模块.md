---
title: Arduino红外避障传感器模块
tags: [Arduino,控制器]
categories: Arduino
---

### 1)       说明：

红外避障传感器具有一对红外线发射与接收管，发射管发射出一定频率的红外线，当检测方向遇到障碍物（反射面）时，红外线反射回来被接收管接收。它常用于安装在小车上，判断前方是否有障碍物。可通过电位器设置阀值。正前方有障碍时绿灯亮起，OUT引脚为低电平，反之为高电平。
由于日光是也含红外线，所以大多数便宜红外模块在户外使用就会遇到问题。

### 2)       硬件：

红外避障模块，arduinouno，杜邦线

### 3)       连接:：

VCC连接: Arduino 5V(说明书上写3.3V-5V，我的硬件只在5V下正常工作)
GND连接: Arduino GND
OUT连接: Digital 13
![img](http://img.blog.csdn.net/20170220131517981?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveGlleWFuMDgxMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

### 4)       代码:

```

int PIN_SENSOR = 13;

void setup() {
  pinMode(PIN_SENSOR, INPUT);
  Serial.begin(9600);
}

void loop() {
  int x = digitalRead(PIN_SENSOR);
  Serial.println(x);
}


```

