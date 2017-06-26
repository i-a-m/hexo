---
title: 使用Arduino与L298N(红板) 驱动直流电机
tags: [Arduino,直流电机,控制器]
categories: Arduino
---

## L298N 简介

L298N驱动模块，可以驱动2个直流电机，可分别实现正转，反转功能．

![img](http://img.blog.csdn.net/20160509173331347)

## Bom表

Arduino Uno       * 1
L298N驱动模块  * 1
直流电机             * 2
9v 电池               * 1
跳线                    若干

## Arduino uno + L298N 驱动模块接线

![img](http://img.blog.csdn.net/20160509195006230)

![img](http://img.blog.csdn.net/20160509202155226)

注意:如果电压不够,电机有可能不会转哦,所以要外置7V-12V电源.

## 程序源码

把程序上传到主板上,接上外部电源,电机就转起来了.

这里选用IO口为5,6,9,10,这四个均支持PWM,可以通过占空比代码实现控制转动速度的快慢.

```
//LingShun Lab

int input1 = 5; // 定义uno的pin 5 向 input1 输出 
int input2 = 6; // 定义uno的pin 6 向 input2 输出
int input3 = 9; // 定义uno的pin 9 向 input3 输出
int input4 = 10; // 定义uno的pin 10 向 input4 输出



void setup() {
//  Serial.begin (9600);
//初始化各IO,模式为OUTPUT 输出模式
pinMode(input1,OUTPUT);
pinMode(input2,OUTPUT);
pinMode(input3,OUTPUT);
pinMode(input4,OUTPUT);

}

void loop() {
  //forward 向前转
  digitalWrite(input1,HIGH); //给高电平
  digitalWrite(input2,LOW);  //给低电平
  digitalWrite(input3,HIGH); //给高电平
  digitalWrite(input4,LOW);  //给低电平
  delay(1000);   //延时1秒

 //stop 停止
 digitalWrite(input1,LOW);
 digitalWrite(input2,LOW);  
 digitalWrite(input3,LOW);
 digitalWrite(input4,LOW);  
 delay(500);  //延时0.5秒

  
  //back 向后转
  digitalWrite(input1,LOW);
  digitalWrite(input2,HIGH);  
  digitalWrite(input3,LOW);
  digitalWrite(input4,HIGH);  
  delay(1000);    

}
```

