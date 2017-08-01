---
title: 树莓派Scratch入门教程——最简单的方式制作智能小车GPIO篇
tags: [树莓派]
categories: 树莓派
---

**硬件**

![树莓派Scratch入门教程——最简单的方式制作智能小车GPIO篇](http://p1.pstatp.com/large/2c24000440d68b8c0046)

树莓派3代B型主板

![树莓派Scratch入门教程——最简单的方式制作智能小车GPIO篇](http://p1.pstatp.com/large/2c2c0003d924c41454ab)

![树莓派Scratch入门教程——最简单的方式制作智能小车GPIO篇](http://p3.pstatp.com/large/2c24000443af944ce3a1)

Scratch编程小车红外追踪

![树莓派Scratch入门教程——最简单的方式制作智能小车GPIO篇](http://p3.pstatp.com/large/2c2700002124288b127b)

整体供电使用两节3.7V的18650锂电池。树莓派需要5V供电，所以需要使用一个转5V的降压模块Lm2596模块。组装跟之前C语言控制小车一样。

![树莓派Scratch入门教程——最简单的方式制作智能小车GPIO篇](http://p9.pstatp.com/large/2c220004d57f41a89cec)

现在我们来学习树莓派小车用Scratch编程。

首先打开所有程序—>编程------Scratch>

![树莓派Scratch入门教程——最简单的方式制作智能小车GPIO篇](http://p3.pstatp.com/large/2ebd000182973680df18)

打开软件可以讲语言设置为中文

![树莓派Scratch入门教程——最简单的方式制作智能小车GPIO篇](http://p1.pstatp.com/large/2ebf0005016dd8a4b40d)

我们通过Scratch软件去控制小车，这就意味着我们的主要工作是用此软件去控制树莓派GPIO，以及利用它去通过GPIO接收传感器发来的讯号并对信号进行处理。

打开软件的第一步：设置StartGPIOServer![树莓派Scratch入门教程——最简单的方式制作智能小车GPIO篇](http://p3.pstatp.com/large/2ebf000501be1d7c456d)

一切准备工作就绪，接下来。我们开始吧![树莓派Scratch入门教程——最简单的方式制作智能小车GPIO篇](http://p3.pstatp.com/large/2ec60000037f3c440143)

当旗标被点击时，gpioserveron即打开GPIOSERVER，然后设置引脚18 23 24 25（BCM编码方式，对应wpi编码方式的GPIO1、4、5、6）为out输出模式。设置引脚12 16（BCM编码方式，对应wpi编码方式的GPIO26 27）为in输入模式，输入模式下可以接收传感器发送过来的高低电平讯号。首先看一下怎么通过两个红外传感器或者光敏电阻传感器进行物体跟踪或者光源追踪。![树莓派Scratch入门教程——最简单的方式制作智能小车GPIO篇](http://p1.pstatp.com/large/2ec20004c66afe0a3722)

我们已经设置了12 16引脚为输入模式，设定左侧的传感器接12引脚，右侧的传感器接16引脚。那么我们添加判断语句，当两侧的红外传感器都有障碍物在前方时直行，左侧有障碍物时则左转，右侧有障碍物时则右转，无障碍时则保持静止。若12 16引脚接的是关敏电阻传感器则寻光走。同样的道理黑线循迹也可以实现。

接下来，如何使用按钮控制小车前进后退左右。![树莓派Scratch入门教程——最简单的方式制作智能小车GPIO篇](http://p3.pstatp.com/large/2ec6000004c1fc7b6762)

如果这样设置，那么当我按下W键时小车一直向前不会停止。这样未免有点不好操作。所以我把运行步骤改了一下：![树莓派Scratch入门教程——最简单的方式制作智能小车GPIO篇](http://p1.pstatp.com/large/2ec5000227c7c9b4f5bd)

向前0.001秒后停止，这样的话只要一直按住w则小车前进，松开后即停止。同理后退左右也是。大家可以根据自己的需要自己编写脚本。或者先运行我写好的一个小脚本。