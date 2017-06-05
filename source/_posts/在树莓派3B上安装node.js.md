---
title: 在树莓派3B上安装nodejs
tags: [树莓派,node]
categories: 树莓派
---
连接树莓派之后：
下载已经编译好的node.js for ARM 版本
```
1 $ wget https://nodejs.org/dist/latest-v6.x/node-v6.9.4-linux-armv7l.tar.gz
```
解压文件
```
1 $ tar -xvf node-v6.9.4-linux-armv7l.tar.gz

验证node是否正常

$ cd node-v6.9.4-linux-armv7l/bin/
$ ./node -v
v6.9.4
```
说明正常，PS:运行npm会出现如下错误信息:
```
$ ./npm -v
/usr/bin/env: node: No such file or directory
```
别着急，往下看。
依次输入以下命令:
```
$ cd ~/
$ mv node-v6.9.4-linux-armv7l /usr/local/node
$ echo PATH=$PATH:/usr/local/node/bin >> ~/.bashrc
$ source .bashrc
```