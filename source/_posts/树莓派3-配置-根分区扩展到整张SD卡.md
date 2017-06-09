---
title: 树莓派扩展SD卡
tags: [树莓派,物联网,linux]
categories: raspberry pi
---
# [树莓派3-配置-根分区扩展到整张SD卡](http://www.ncnynl.com/archives/201612/1154.html)

**树莓派3-配置-根分区扩展到整张SD卡**

**说明**

- 介绍如何实现根分区扩展到整张SD卡

**步骤**

- 安装raspi-config(已安装忽略)

```
$ sudo apt-get install  raspi-config

```

- 运行raspi-config

```
$ sudo raspi-config

```

- 界面选择，Expand Filesystem （也有版本为expand_rootfs）， 选择并确定后
  ![raspberry-ros-config](C:\Users\Administrator.F77\Desktop\新建文件夹\raspberry-ros-config.png)


- 查看空间

```
$ df -h

```

- 效果，/dev/root之前为7G，现在增加到15G

```
pi@pi-desktop:/var$ df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/root        15G  7.2G  7.4G  50% /
devtmpfs        459M     0  459M   0% /dev
tmpfs           463M  316K  463M   1% /dev/shm
tmpfs           463M   13M  451M   3% /run
tmpfs           5.0M  4.0K  5.0M   1% /run/lock
tmpfs           463M     0  463M   0% /sys/fs/cgroup
/dev/mmcblk0p1   64M   20M   45M  32% /boot
tmpfs            93M   24K   93M   1% /run/user/1000
```
