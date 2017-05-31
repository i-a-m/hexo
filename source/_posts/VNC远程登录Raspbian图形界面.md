---
title: VNC远程登录树莓派
tags: [树莓派,物联网,linux,远程登录]
categories: raspberry pi
---
# VNC远程登录树莓派的图形界面

安装VNC需要使用命令行。如果需要远程操作安装VNC，就必须通过SSH登录到命令行界面。

**安装**

树莓派命令行：

```
sudo apt-get install tightvncserver
```

安装好之后请一定先使用此命令设置一个VNC密码：

```
vncpasswd
```

（先输入操作密码两次，然后会询问是否设置一个查看(view-only)密码，按自己喜欢，一般没必要。）



**开机自动启动**

设置开机启动，需要在/etc/init.d/中创建一个文件。例如tightvncserver：

（注：启动脚本的名称，有和程序名一致的习惯）

```
sudo nano /etc/init.d/tightvncserver
```

内容如下：（putty窗口中按右键=粘贴）#!/bin/sh

```
### BEGIN INIT INFO
# Provides:          tightvncserver
# Required-Start:    $local_fs
# Required-Stop:     $local_fs
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Start/stop tightvncserver
### END INIT INFO

# More details see:
# http://www.penguintutor.com/linux/tightvnc

### Customize this entry
# Set the USER variable to the name of the user to start tightvncserver under
export USER='pi'
### End customization required

eval cd ~$USER

case "$1" in
  start)
    # 启动命令行。此处自定义分辨率、控制台号码或其它参数。
    su $USER -c '/usr/bin/tightvncserver -depth 16 -geometry 800x600 :1'
    echo "Starting TightVNC server for $USER "
    ;;
  stop)
    # 终止命令行。此处控制台号码与启动一致。
    su $USER -c '/usr/bin/tightvncserver -kill :1'
    echo "Tightvncserver stopped"
    ;;
  *)
    echo "Usage: /etc/init.d/tightvncserver {start|stop}"
    exit 1
    ;;
esac
exit 0
```

注：少数玩家默认用户不是pi的请自行更改USER变量

按Ctrl+X，回答Y（存盘）退出nano编辑器。

然后给tightvncserver文件加执行权限，并更新开机启动列表。

```
sudo chmod 755 /etc/init.d/tightvncserver
sudo update-rc.d tightvncserver defaults
```

**附：手工启动与参数**（以下用处不大，没兴趣请略过）

使用此命令手工启动VNC服务器程序：

```
tightvncserver -geometry 800x600 :1
```

如果首次启动，并且未曾使用vncpasswd命令设置密码，程序会要求设置一个。
开机启动很方便。如果没理由，真的不推荐手工启动。

**命令行参数说明：**
一、:1，指定控制台的号码。
启动多个控制台，可以提供互不影响的多个桌面环境。（大多数人不用多用户操作所以没意义）
可以不加此参数，tightvncserver会自动寻找从1开始的下一个空闲控制台。
加上此参数，会强制使用指定的控制台，如果此控制台已经启动则报错。加此参数可有效防止无意多次启动程序（会启动多个控制台）白白浪费系统资源。

**特殊的0号控制台**
0号控制台就是连接真实显示器真正输出图像的那个桌面。
对于VNC客户端，不输入端口号登录，默认就登录到0号控制台，方便。
但是因为0号是真正的桌面，所以和开机启动桌面环境，或者自己用startx命令，都存在啰嗦的冲突。
到头来是个麻烦。因此自动启动的配置教程中，一律使用1号控制台。

二、-geometry 800×600，分辨率。可以不加。
终止VNC控制台：
tightvncserver -kill :1
查看正在运行的控制台列表：

```
ps ax | grep Xtightvnc | grep -v grep
```
