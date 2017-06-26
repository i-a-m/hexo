---
title: Arduino超声测距离传感器
tags: [Arduino,控制器]
categories: Arduino
---

### 1)       说明：

超声波测距离传感器常用于小车的障碍物检测。它采用超声波回波测距原理，运用精确的时差测量技术，检测传感器与目标物之间的距离。
Trig 触发控制信号输入，Echo回响信号输出。写程序给Trig发送一个低高低的短时间脉冲,触发测距；pulseIn函数会等待引脚变为HIGH,开始计算时间,再等待变为LOW并停止计时。
声速是:340m/1s 换算成 34000cm/ 1000000μs => 34 /1000。因为发送到接收,实际是相同距离走了2回,所以要除以2。
距离(厘米)  =  (回波时间 * (34 / 1000)) / 2， 简化后的计算公式为 (回波时间 * 17)/ 1000

### 2)       硬件：

超声距离传感器HC-SR04，Arduino uno板，杜邦线

### 3)       连接：

VCC接 Arduino 5V
GND接 Arduino GND
TRIG接 ArduinoDigital 12
ECHO接 Arduino Digital 11
![img](http://img.blog.csdn.net/20170220132302703?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveGlleWFuMDgxMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

### 4)       代码：

```

#define PIN_TRIG 12
#define PIN_ECHO 11
  
float cm;
float temp;
  
void setup() {  
  Serial.begin(9600);  
  pinMode(PIN_TRIG, OUTPUT);  
  pinMode(PIN_ECHO, INPUT);  
}  
  
void loop() {
  digitalWrite(PIN_TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(PIN_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);
    
  temp = float(pulseIn(PIN_ECHO, HIGH));
  cm = (temp * 17 )/1000;
  
  Serial.print("Echo = ");  
  Serial.print(temp);
  Serial.print(",  Distance = ");  
  Serial.print(cm);
  Serial.println("cm");  
  delay(300);  
} 


```

