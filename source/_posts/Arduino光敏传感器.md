---
title: Arduino光敏传感器
tags: [Arduino,控制器]
categories: Arduino
---

### 1)       说明：

光敏传感器是把光信号变成电信号的一种传感器，它利用半导体的光电效应制成的一种电阻值随入射光的强弱而改变的电阻器;入射光强,电阻减小,入射光弱,电阻增大。
可用电位器（螺丝）调节亮度阀值，亮度大于设定值时DO输出低电平，反之输出高电平。AO输出具体的亮度值。建议购买四脚的（三脚的没有AO）

### 2)       硬件：

光敏传感器模块，Arduinouno，杜邦线

### 3)       连接：

VCC接 arduino 的3.3或5V
GND接 arduino的GND
DO 接 arduino的Digital 2
AO 接 arduino的Analog 0

![img](http://img.blog.csdn.net/20170220125150050?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveGlleWFuMDgxMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

### 4)       代码

```

#define PIN_A 0
#define PIN_D 2

void setup() 
{
  Serial.begin(9600);
}

void loop() 
{
  int val;
  val=analogRead(PIN_A);
  Serial.print("a:");
  Serial.print(val);
  Serial.print(", d:");
  val=digitalRead(PIN_D);
  Serial.println(val);
  delay(500);
}
```



