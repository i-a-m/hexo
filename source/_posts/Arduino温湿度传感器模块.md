---
title: 温湿度传感器模块
tags: [Arduino,控制器]
categories: Arduino
---

### 1)       说明：

DHT11数字温湿度传感器是一款含有已校准数字信号输出的温湿度复合传感器。

### 2)       硬件：

DTH11温湿度传感器电子积木模块，Arduinouno，杜邦线

### 3)       连接：

VCC接 Arduino 3.3V或5V
GND接 Arduino GND
OUT接 Digital 2

![img](http://img.blog.csdn.net/20170220134021152?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveGlleWFuMDgxMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

### 4)       代码

```

#include <dht11.h>

dht11 DHT11;
#define PIN_DHT11 2

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  DHT11.read(PIN_DHT11);
  Serial.print("Humidity (%): ");
  Serial.println((float)DHT11.humidity, 2);
  Serial.print("Temperature (oC): ");
  Serial.println((float)DHT11.temperature, 2);
  delay(500);
}


```

代码中用到了dht11库，需要下载Dht11.zip 包，解压后，放入/usr/share/arduino/libraries/目录下