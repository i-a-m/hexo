---
title: Arduino和HC-SR04超声波传感器测距
tags: [Arduino,控制器]
categories: Arduino
---

## HC-SR04  [立即购买](https://item.taobao.com/item.htm?spm=686.1000925.0.0.INX6Op&id=552135503975)

一款利用超声波测距离的传感器，多应用于 [机器人](http://lib.csdn.net/base/robot)避开障碍物，距离测量。

其模块，用Trig触发测距

会发出8 个 40khz的方波，自动检测是否有信号返回

有信号返回，通过echo输出高电平，高电平持续的时间就是距离的2倍

测量距离 = （高电平时间*声速）/ 2 

![img](http://img.blog.csdn.net/20160514191012711)

## 主要技术参数

1：使用电压：DC---5V  

2：静态电流：小于2mA      

3：电平输出：高5V    

4：电平输出：底0V        

5：感应角度：不大于15度   

6：探测距离：2cm-450cm

7:   高精度 可达0.2cm   

## Bom表

Arduino Uno                   *1

HC-SR04超声波传感器  *1

面包板                            *1

跳线                               若干

尺子                                *1

障碍物                            *1

## 引脚说明

VCC    -- 供5V电源

TRIG   -- 触发控制信号输入

ECHO -- 回响信号输出等四个接口端

GND   -- 为地线

## 接线方式

![img](http://img.blog.csdn.net/20160514202140483)、

![img](http://img.blog.csdn.net/20160514203523923)

## 程序实现

```

//LingShun LAB

#define Trig 2 //引脚Tring 连接 IO D2
#define Echo 3 //引脚Echo 连接 IO D3 

float cm; //距离变量
float temp; // 

void setup() {
  Serial.begin(9600);
  pinMode(Trig, OUTPUT);
  pinMode(Echo, INPUT);
}

void loop() {
  //给Trig发送一个低高低的短时间脉冲,触发测距
  digitalWrite(Trig, LOW); //给Trig发送一个低电平
  delayMicroseconds(2);    //等待 2微妙
  digitalWrite(Trig,HIGH); //给Trig发送一个高电平
  delayMicroseconds(10);    //等待 10微妙
  digitalWrite(Trig, LOW); //给Trig发送一个低电平
  
  temp = float(pulseIn(Echo, HIGH)); //存储回波等待时间,
  //pulseIn函数会等待引脚变为HIGH,开始计算时间,再等待变为LOW并停止计时
  //返回脉冲的长度
  
  //声速是:340m/1s 换算成 34000cm / 1000000μs => 34 / 1000
  //因为发送到接收,实际是相同距离走了2回,所以要除以2
  //距离(厘米)  =  (回波时间 * (34 / 1000)) / 2
  //简化后的计算公式为 (回波时间 * 17)/ 1000
  
  cm = (temp * 17 )/1000; //把回波时间换算成cm

  Serial.print("Echo =");
  Serial.print(temp);//串口输出等待时间的原始数据
  Serial.print(" | | Distance = ");
  Serial.print(cm);//串口输出距离换算成cm的结果
  Serial.println("cm");
  delay(100);
}
```

## 实例效果

![img](http://img.blog.csdn.net/20160514214507327)

按下串口监视器，可以看到测量出来的距离是9.8cm-10.1cm 误差大概在0.2cm左右

![img](http://img.blog.csdn.net/20160514214447733)