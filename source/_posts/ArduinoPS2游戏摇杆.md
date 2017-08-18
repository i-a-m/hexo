---
title: Arduino简单实例之四_PS2游戏摇杆 
tags: [Arduino,控制器,]
categories: Arduino
---

### 1)       说明：

PS2 游戏双轴摇杆传感器模块由采用金属 PS2 摇杆电位器制作，具有(X,Y)2 轴模拟输出，(Z) 1路按钮数字输出。可制作遥控器等互动作品。
SW引脚按下去时输出低电平，反之输出高电平

### 2)       硬件：

PS2游戏摇杆joystick，Arduino uno，杜邦线 

### 3)       连接：

5V接 Arduino 5V 
GND接 Arduino GND
URx接 Analog 0
URy接 Analog 1
SW 接 Digital 2

![img](http://img.blog.csdn.net/20170220130702165?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveGlleWFuMDgxMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

### 4)       代码 

```
    #define PIN_X 0    
    #define PIN_Y 1    
    #define PIN_Z 2    
      
    void setup() {    
      pinMode(PIN_X, INPUT);  
      pinMode(PIN_Y, INPUT);  
      pinMode(PIN_Z, INPUT);  
      Serial.begin(9600);  
    }    
      
    void loop() {    
      int x,y,z;    
      
      x=analogRead(PIN_X);    
      y=analogRead(PIN_Y);    
      z=analogRead(PIN_Z);    
      
      Serial.print("X=");    
      Serial.print(x);     
      Serial.print("\tY=");       
      Serial.print(y);    
      Serial.print("\tZ=");       
      Serial.println(z);    
      
      delay(1000);    
    }  
```

