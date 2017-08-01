---
title: 树莓派使用Nokia5110显示屏显示系统信息
tags: [树莓派,显示器,]
categories: 树莓派
---



![rpi-pins-40-0](C:\Users\Administrator.F77\workspace\hexo\source\images\IMG_20160713_124645-750x410.jpg)Nokia5110显示屏价格低廉，仅需要￥11就可以买到，比LCD1602和LCD12864更加便宜，最重要的是Nokia5110可以显示更多的字符。本文在树莓派上使用Nokia5110显示屏来显示树莓派的启动时间、CPU占用、已经使用的内存量、内存占用百分比、当前的时间、IP地址等信息，包括树莓派与Nokia5110显示屏的硬件连接、显示程序。

## 一、为什么要加显示屏

树莓派可以看作一台计算机，具有HDMI接口，可以连接到显示器上，但是如果我们不用树莓派的图形界面，经常使用SSH远程登录来管理树莓派，那么就没有必要来使用显示器。在SSH远程登录时，如果树莓派使用的动态ip地址，那么每次登录都需要去路由器上查看树莓派的ip地址，非常的不方便，在前面的文章中，我们可以听到树莓派的ip地址，教程在这儿： 。如果我们希望通过更加直观的方式来查看树莓派的ip地址，那么我们可以为树莓派添加一个显示屏，来显示当前的ip地址，同时也可以显示树莓派的时间、内存占用、系统负载等信息。

关于树莓派显示屏的选用，可以选择的有LCD1602、LCD12864、Nokia5110等，由于LCD1602、LCD12864占用的IO口较多，并且LCD1602显示字符较少，而Nokia5110占用的IO口只有4个，同时能够显示足够多的字符，所以选择Nokia5110作为树莓派信息显示的显示屏。

## 二、Nokia5110显示屏介绍

 Nokia5110显示屏价格较为低廉，在网上可以轻松的买到，在购买时推荐购买显示屏模块。方便在树莓派上使用。模块的图片如下图。

[![TB1NpyqFVXXXXXjXVXXXXXXXXXX_!!0-item_pic](http://blog-qiniu.lxx1.com/wp-content/uploads/2016/07/TB1NpyqFVXXXXXjXVXXXXXXXXXX_0-item_pic.jpg)](http://blog.lxx1.com/wp-content/uploads/2016/07/TB1NpyqFVXXXXXjXVXXXXXXXXXX_0-item_pic.jpg)

Nokia5110显示屏有8个引脚，引脚介绍如下：

**RST**:外部复位引脚

**CE**：显示屏使能引脚

**DC**：数据/命令引脚

**Din**：串行数据输入端

**CLK**：串行时钟输入端

**Vcc**：电源引脚

**BL**： 亮度调节

**Gnd**：地

## 三、Nokia5110与树莓派连接方式

Nokia5110显示屏与树莓派连接，以下gpio编号使用wiringPi编号。

**RST**、——21

**CE**——22

**DC**——23

**Din**——24

**CLK**——25

**Vcc**——28

**BL**——29

**Gnd**——0V

连接电路如下图：

[![Nokia与树莓派连接方式](http://blog-qiniu.lxx1.com/wp-content/uploads/2016/07/Nokia%E4%B8%8E%E6%A0%91%E8%8E%93%E6%B4%BE%E8%BF%9E%E6%8E%A5%E6%96%B9%E5%BC%8F.jpg)](http://blog.lxx1.com/wp-content/uploads/2016/07/Nokia%E4%B8%8E%E6%A0%91%E8%8E%93%E6%B4%BE%E8%BF%9E%E6%8E%A5%E6%96%B9%E5%BC%8F.jpg)Nokia与树莓派连接方式

实物连接图：

[![IMG_20160713_124529](http://blog-qiniu.lxx1.com/wp-content/uploads/2016/07/IMG_20160713_124529.jpg)](http://blog.lxx1.com/wp-content/uploads/2016/07/IMG_20160713_124529.jpg)

## 四、Nokia显示程序

登陆树莓派，点此下载nokia5110显示程序:[nokia510](http://blog.lxx1.com/2001/nokia510),然后解压文件，进入cpu_show目录。

[下载nokia510.zip](./nokia510.zip)

```
wget http://blog.lxx1.com/wp-content/uploads/2016/07/nokia510.zip

unzip nokia510.zip

cd nokia510
```

我们看到有三个文件：PCD8544.c PCD8544.h pcd8544_rpi.c

其中PCD8544.c为Nokia5110显示屏的驱动文件，PCD8544.h为驱动文件的头文件，我们主要看下显示程序pcd8544_rpi.c，主要程序和注释如下。

 

```
/*
=================================================================================
 Name        : pcd8544_rpi.c
 Version     : 0.1

 Copyright (C) 2012 by Andre Wussow, 2012, desk@binerry.de

 Description :
     A simple PCD8544 LCD (Nokia3310/5110) for Raspberry Pi for displaying some system informations.
         Makes use of WiringPI-library of Gordon Henderson (https://projects.drogon.net/raspberry-pi/wiringpi/)
 */
#include <wiringPi.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <sys/sysinfo.h>
#include "PCD8544.h"

//devin modify
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <sys/ioctl.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <netinet/in.h>
#include <net/if.h>

#define TEMP_PATH "/sys/class/thermal/thermal_zone0/temp"
#define MAX_SIZE 32
#define NETWORK_FILE "/etc/network/interfaces"

// 引脚连接
int _din = 24;
int _sclk = 25;
int _dc = 23;
int _rst = 21;
int _cs = 22;

int _vcc = 28;
int _bl = 29;

// 对比度调节，根据屏幕亮度选择
//may be need modify to fit your screen!  normal: 30- 90 ,default is:45 !!!maybe modify this value!
int contrast = 30;

time_t timep;
struct tm *p;
char *wday[] = {"Sun","Mon","Tue","Wed","Thu","Fri","Sat"};

char get_temp(void);
char* getip(char* ip_buf);
char* get_temp2(void);
int min,hour,sec,mday;
char week;
struct tm *localtime(const time_t *timep);
int main(void)
{

 // 打印程序运行信息
  printf("Raspberry Pi Nokia5110 sysinfo display\n");
  printf("========================================\n");

  // 检查wiringPi是否启动
  if (wiringPiSetup() == -1)
  {
        printf("wiringPi-Error\n");
    exit(1);
  }

  // 初始化Nokia并且清楚显示
  LCDInit(_sclk, _din, _dc, _cs, _rst, _vcc, _bl, contrast);
  LCDclear();

  // 显示树莓派Logo
  LCDshowLogo();

  delay(2000);

  for (;;)
  {
          // 清楚屏幕显示
          LCDclear();

          //获得当前时间
          char timeInfo[16];
          time(&timep);
          p=localtime(&timep);
          mday=p->tm_mday;
          min=p->tm_min;
          week=p->tm_wday;
          hour=p->tm_hour;
          sec=p->tm_sec;
          sprintf(timeInfo, "%d %d:%d:%d",mday,hour,min,sec);

          // 获得 system usage / info
          struct sysinfo sys_info;
          if(sysinfo(&sys_info) != 0)
          {
                printf("sysinfo-Error\n");
          }

          // 启动时间
          char uptimeInfo[15];
          unsigned long uptime = sys_info.uptime / 60;
          sprintf(uptimeInfo, "Up %ld min", uptime);

          // CPU占用
          char cpuInfo[10];
          unsigned long avgCpuLoad = sys_info.loads[0] / 1000;
          sprintf(cpuInfo, "CPU %ld%%\r", avgCpuLoad);

          // 内存使用量及占用
          char ramInfo[10];
          unsigned long totalRam = sys_info.totalram / 1024 / 1024;
          unsigned long freeRam = sys_info.freeram /1024 /1024;
          unsigned long usedRam = totalRam - freeRam;
          unsigned long ram_load = (usedRam * 100) / totalRam;
          sprintf(ramInfo, "RAM %.3dM %.2d", usedRam,ram_load);

          // 树莓派温度
          char tempInfo[10];
          sprintf(tempInfo, "TEM %.2dC %s", get_temp(),wday[week]);

          //IP 信息
          char ipInfo[16];
          getip(ipInfo);

          //开始显示
          LCDdrawstring(0, 0, uptimeInfo);
          LCDdrawstring(0, 8, cpuInfo);
          LCDdrawstring(0, 16, ramInfo);
          LCDdrawstring(0, 24, tempInfo);
          LCDdrawstring(0, 32, timeInfo);
          LCDdrawstring(0, 40, ipInfo);
          LCDdisplay();

          delay(1000);
  }
  return 0;
}

//decin modify

char get_temp(void)
{
    int fd;
    double temp = 0;
    char buf[MAX_SIZE];

    // 打开/sys/class/thermal/thermal_zone0/temp
    fd = open(TEMP_PATH, O_RDONLY);
    if (fd < 0) {
        fprintf(stderr, "failed to open thermal_zone0/temp\n");
                // 关闭文件
                close(fd);
        return -1;
    }

    // 读取内容
    if (read(fd, buf, MAX_SIZE) < 0) {
        fprintf(stderr, "failed to read temp\n");
                // 关闭文件
                close(fd);
        return -1;
    }

    // 转换为浮点数打印
    temp = atoi(buf) / 1000.0;
        // 关闭文件
        close(fd);
        return temp;
}

// 获取eth0端口的IP地址，可根据需要设置为WAN0
char* getip(char* ip_buf)
{
    struct ifreq temp;
    struct sockaddr_in *myaddr;
    int fd = 0;
    int ret = -1;
    strcpy(temp.ifr_name, "eth0");
    if((fd=socket(AF_INET, SOCK_STREAM, 0))<0)
    {
        return NULL;
    }
    ret = ioctl(fd, SIOCGIFADDR, &temp);
    close(fd);
    if(ret < 0) return NULL; myaddr = (struct sockaddr_in *)&(temp.ifr_addr); strcpy(ip_buf, inet_ntoa(myaddr->sin_addr));
        //printf("IP: %s", ip_buf);
    return ip_buf;
}

```

## 五、编译运行

接下来需要编译显示程序,在cpu_show目录下编译生成cpushow。

```
cc -o cpushow pcd8544_rpi.c PCD8544.c  -L/usr/local/lib -lwiringPi
```

编译完成后，会在当前目录下生成可执行文件 cpushow ，然后将nokia5110显示屏按照第三部分的介绍连接，连接完成后执行这个文件。

```
sudo ./cpushow
```

可以看到nokia5110显示屏上首先显示一个树莓派的logo，然后显示树莓派的启动时间、CPU占用、已经使用的内存量、内存占用百分比、当前的时间、IP地址等信息。如下图所示。

[![IMG_20160713_122727](http://blog-qiniu.lxx1.com/wp-content/uploads/2016/07/IMG_20160713_122727.jpg)](http://blog.lxx1.com/wp-content/uploads/2016/07/IMG_20160713_122727.jpg)[![IMG_20160713_123145](http://blog-qiniu.lxx1.com/wp-content/uploads/2016/07/IMG_20160713_123145.jpg)](http://blog.lxx1.com/wp-content/uploads/2016/07/IMG_20160713_123145.jpg)[![IMG_20160713_124645](http://blog-qiniu.lxx1.com/wp-content/uploads/2016/07/IMG_20160713_124645.jpg)](http://blog.lxx1.com/wp-content/uploads/2016/07/IMG_20160713_124645.jpg)