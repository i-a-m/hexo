---
title: Arduino土壤湿度传感器
tags: [Arduino,控制器]
categories: Arduino
---



### 1)       说明：

用于土壤的湿度检测。
可通过电位器调节土壤湿度的阀值，顺时针调节，控制的湿度会越大，逆时针越小；湿度低于设定值时，DO输出高电平，模块提示灯亮；湿度高于设定值时，DO输出低电平，模块提示灯灭。
工作电压3.3V-5V。3V时，在空气中AO读取的值最大为695 ， 浸泡在水里的 最小值245；5V时，在空气中AO读取的值最大为1023 ，浸泡在水里的最小值 245。

### 2)       硬件：

土壤湿度传感器，Arduinouno，杜邦线

### 3)       连接：

VCC接 Arduino 3.3V或5V
GND接 Arduino GND
AO 接 ArduinoAnalog
DO接 Arduino Digital 4

![img](http://img.blog.csdn.net/20170220130149517?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveGlleWFuMDgxMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

### 4)       代码：

```

#define PIN_AO 2
#define PIN_DO 4

void setup() {  
  pinMode(PIN_AO, INPUT);
  pinMode(PIN_DO, INPUT);  
  Serial.begin(9600);  
}  

void loop() {
  Serial.print("AO=");  
  Serial.print(analogRead(PIN_AO));
  Serial.print(", DO=");  
  Serial.println(digitalRead(PIN_DO));
  delay(500);  
} 


```

