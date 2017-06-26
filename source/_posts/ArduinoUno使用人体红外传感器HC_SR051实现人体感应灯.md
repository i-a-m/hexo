---
title: ArduinoUno使用人体红外传感器HC_SR051实现人体感应灯
tags: [Arduino,控制器]
categories: Arduino
---

> “登”，亮了.，

> 每当我游走在图书馆书架之间就会有这样的一个情景。

> 这次实验使用的模块是人体红外传感器（HC_SR051），配上Arduino Uno 实现人体感应灯的实现。
>
> 先看看这模块（点击查看大图）

[![img](http://img.blog.csdn.net/20161220165424066)](http://img.blog.csdn.net/20161220165424066)[![img](http://img.blog.csdn.net/20161220165443999)](http://img.blog.csdn.net/20161220165443999)

## 实验效果

开始灯还没有亮，手伸过去LED灯就亮了。

模块自带延时，在人离开后，会有5秒的延时。

即使感应到有人，也要活动才能保持一直亮着，只要一停止不动5秒LED一样会关掉。

（不知道为什么我调节到最低还是有5秒，求大神指导）

（点击查看大图）

[![img](http://img.blog.csdn.net/20161220165629970)](http://img.blog.csdn.net/20161220165629970)[![img](http://img.blog.csdn.net/20161220165641517)](http://img.blog.csdn.net/20161220165641517)

打开串口可以看到以下数据:

![img](http://img.blog.csdn.net/20161220170215898)

## BOM表

Arduino Uno                                        *1

人体红外传感器（HC_SR051）      *1

跳线（公对母）若干

## 接线方式

> Arduino Uno                   HC_SR051
>
> 5V                    <--->              VCC
>
> A5                    <--->              OUT
>
> GND                <--->              GND

> PS：模块跳线使用可重复触发方式
>
> ​         延时调节，距离调节分别 以逆时针调到最小

## 开源程序

```

int PIR_sensor = A5;    //指定PIR模拟端口 A5
int LED = 13;           //指定LED端口 13
int val = 0;            //存储获取到的PIR数值

void setup()
{
  pinMode(PIR_sensor, INPUT);   //设置PIR模拟端口为输入模式
  pinMode(LED, OUTPUT);         //设置端口2为输出模式
  Serial.begin(9600);          //设置串口波特率为9600
}

void loop()
{
  val = analogRead(PIR_sensor);    //读取A0口的电压值并赋值到val
  Serial.println(val);            //串口发送val值
  
  if (val > 150)//判断PIR数值是否大于150，
  {
    digitalWrite(LED,HIGH);  //大于表示感应到有人
  }
  else
  {
    digitalWrite(LED,LOW);   //小于表示无感应到有人
  }
}
```

