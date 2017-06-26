---
title: Arduino人体传感器
tags: [Arduino,控制器]
categories: Arduino
---

### 1)       说明

人体红外感应模块是基于红外线技术的自动控制产品。附近有人时，对应引脚高电平，反之为低平台。
5米内有效。可用螺丝（下图中橙色部分）调节灵敏度和延时。

### 2)       硬件

HC-SR501 人体红外感应模块，Arduinouno，杜邦线

### 3)       连接

VCC接 Arduino 3.3V
GND接 Arduino GND
OUT接 Digital 2

![img](http://img.blog.csdn.net/20170220124753890?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveGlleWFuMDgxMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

#### 4)       代码

```

#define PIN_NUM 2

void setup()  {
  Serial.begin(9600);
  pinMode(PIN_NUM,INPUT);
}

void loop()  {
  if(digitalRead(PIN_NUM)==HIGH){
    Serial.println("Someone here!");
  }   
  else {
    Serial.println("Nobody");
  }
  delay(1000);
}


```

