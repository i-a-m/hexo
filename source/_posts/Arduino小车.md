---
title: Arduino小车
tags: [Arduino,控制器]
categories: Arduino
---

### 1)       说明：

#### a)        L298N/直流电机驱动模块(控制两项步进电机)

IN1-IN4 控制转动的方向，IN1为低电平, IN2为高电平, 电机反转；IN1为高电平,IN2 为低电平,电机正转；IN3和IN4控制另一轮。
为了方便，把EN使动端与跳线连接（高电平），然后使用IN的状态控制走停

| ENA  | IN1  | IN2  | 运行状态 |
| ---- | ---- | ---- | ---- |
| 0    | 任意   | 任意   | 停止   |
| 1    | 0    | 1    | 正转   |
| 1    | 1    | 0    | 反转   |
| 1    | 1    | 1    | 刹停   |
| 1    | 0    | 0    | 停止   |

#### b)       供电

使用了航模专用的锂电池，主要考虑到它可以充电，标示为7.2V，充电后测量为8.4V，电池接电机控制模块的VCC，然后用电机控制模块输出的5V给Arduino板供电。输入电压在6V以下时，它就不能给Arduino板供电了。

### 2)       硬件：

直流电机驱动模块，Arduino uno，杜邦线，电池，[智能](http://lib.csdn.net/base/aiplanning)小车套装（含车架，车轮，电动机等）

### 3)       连接：

电机驱动模块IN1-IN4 接单片机: IN1-D6 IN2-D7 IN3-D4 IN4-D5
电机驱动模块GND 接电源GND 和 单片机GND
电机驱动模块VCC 接电源VCC
电机驱动模块+5 接单片机 VIN
电机驱动模块OUT1-OUT2接步进电机1,OUT3-OUT4 接步进电机2

![img](http://img.blog.csdn.net/20170220140159911?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveGlleWFuMDgxMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

### 4)       代码：

```

#define PIN_CAR_IN1 5
#define PIN_CAR_IN2 6
#define PIN_CAR_IN3 9
#define PIN_CAR_IN4 10

void doForward() {
  digitalWrite(PIN_CAR_IN3,LOW);
  digitalWrite(PIN_CAR_IN4,HIGH);
  digitalWrite(PIN_CAR_IN1,LOW);
  digitalWrite(PIN_CAR_IN2,HIGH);
}

void doBackward() {
  digitalWrite(PIN_CAR_IN3,HIGH);
  digitalWrite(PIN_CAR_IN4,LOW);
  digitalWrite(PIN_CAR_IN1,HIGH);
  digitalWrite(PIN_CAR_IN2,LOW);
}

void doStop() {
  digitalWrite(PIN_CAR_IN3,LOW);
  digitalWrite(PIN_CAR_IN4,LOW);
  digitalWrite(PIN_CAR_IN1,LOW);
  digitalWrite(PIN_CAR_IN2,LOW);

  digitalWrite(PIN_CAR_IN3,HIGH);
  digitalWrite(PIN_CAR_IN4,HIGH);
  digitalWrite(PIN_CAR_IN1,HIGH);
  digitalWrite(PIN_CAR_IN2,HIGH);
}

void doLeft() {
  digitalWrite(PIN_CAR_IN3,HIGH);
  digitalWrite(PIN_CAR_IN4,LOW);
  digitalWrite(PIN_CAR_IN1,LOW);
  digitalWrite(PIN_CAR_IN2,HIGH);   
}

void doRight() {
  digitalWrite(PIN_CAR_IN3,LOW);
  digitalWrite(PIN_CAR_IN4,HIGH);
  digitalWrite(PIN_CAR_IN1,HIGH);
  digitalWrite(PIN_CAR_IN2,LOW);
}

void setup()
{
  pinMode(PIN_CAR_IN1,OUTPUT);
  pinMode(PIN_CAR_IN2,OUTPUT);
  pinMode(PIN_CAR_IN3,OUTPUT);
  pinMode(PIN_CAR_IN4,OUTPUT);

  digitalWrite(PIN_CAR_IN1, OUTPUT);
  digitalWrite(PIN_CAR_IN2, OUTPUT);
  digitalWrite(PIN_CAR_IN3, OUTPUT);
  digitalWrite(PIN_CAR_IN4, OUTPUT);

  Serial.begin(9600);
}

void loop()
{
  doForward();
  delay(1000);  
  doStop();
  delay(1000);
  doBackward();
  delay(1000);
  doStop();
  delay(1000);  
  doLeft();
  delay(1000);  
  doStop();
  delay(1000);
  doRight();
  delay(1000);
  doStop();
  delay(1000); 
}


```

