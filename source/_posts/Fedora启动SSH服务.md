---
title: fedora启动SSH
tags: [fedora,SSH,linux]
categories: fedora
---
一、Fedora 启动sshd服务：

1、先确认是否已安装ssh服务：

```
[root@localhost ~]# rpm -qa | grep openssh-server

　openssh-server-5.3p1-19.fc12.i686 （这行表示已安装）
```

  若未安装ssh服务，可输入：

```
yum install openssh-server
```

  进行安装

2、修改配置文件

```
#vi /etc/ssh/sshd_config

  　#Port 22  监听的端口号，默认是22，可以自定义。

　　#Protocol 2  支持的协议，默认就好，不用修改

　　#PermitRootLogin yes 是否允许root直接登录，最好设置为no

    #MMaxAuthTries 6 最大登录数，默认是6，建议设置为3，防止别人密码穷举。

   修改完配置后，重启SSH服务：

 　[root@localhost ~]# /etc/rc.d/init.d/sshd restart

　  Stopping sshd: [ OK ]

Starting sshd: [ OK ]:

```

3、查看sshd状态：

```
#service sshd status
```

4、将端口22（或者自定义的其他端口）加到防火墙的设置中，标记为Accept

```
#iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```

（这句很重要，不然外部连接不了。）

   也可以将上述参数加入防火墙配置中：

```
 #vi /etc/sysconfig/iptables

  加入：-A INPUT -m state --state NEW -m tcp -p tcp --dport 22 -j ACCEPT
```

保存后重启iptables即可

详情可以查阅 [iptables的用法](http://blog.163.com/jackswu@yeah/blog/static/1406291232012511104940/)

二、Fedora15/16/17 启动sshd服务：

由于Fedora 15/16使用systemd服务，

1、启动SSH服务与上面有些不同

```
# systemctl start sshd.service

或者 #service sshd start

也可以用 restart 和 stop控制sshd服务
```

2、设置系统启动时开启服务

```
# systemctl enable sshd.service
```

3、同样也需开启防火墙22端口

```
#iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```

也可以将上述参数加入防火墙配置中：

```
 #vi /etc/sysconfig/iptables

   加入：-A INPUT -m state --state NEW -m tcp -p tcp --dport 22 -j ACCEPT
```

保存后重启iptables即可

详情可以查阅 [iptables的用法](http://blog.163.com/jackswu@yeah/blog/static/1406291232012511104940/)
