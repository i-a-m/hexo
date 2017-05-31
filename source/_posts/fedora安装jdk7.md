---
title: fedora安装jdk7
tags: [linux,fedora]
categories: fedora
---
Fedora 20自带OpenJDK，所以如果安装官方的JDK的话要先删除OpenJDK，步骤如下：

1：rpm -qa|grep jdk 查看当前的jdk情况。

2：yum -y remove java java-1.7.0-openjdk* 卸载openjdk，这个过程中因为依赖原因可能会卸载一些额外的软件。

3：去Oracle官网下载官方jdk，我下载的是tar.gz格式的。

4 ：解压jdk安装包tar -zxvf jdk-7u51-linux-x64.tar.gz  复制到自己的软件文件夹，我的软件一般放到opt下，所以 mv jdk1.7.0_51/  /opt/

5：配置环境变量vi /etc/profile 后在倒数第三行处输入下面的内容

export JAVA_HOME=/opt/jdk1.7.0_51

export CLASSPATH=$CLASSPATH:$JAVA_HOME/lib:$JAVA_HOME/jre/lib

export PATH=$JAVA_HOME/bin:$JAVA_HOME/jre/bin:$PATH:$HOME/bin

6：让环境变量生效 source  /etc/profile

7：输入java或者java -version看一下吧
