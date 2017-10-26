---
title: web压力测试-Web Bench
---

1.web bench下载，地址：http://home.tiscali.cz/~cz210552/webbench.html

**2.wen bench安装：**

[root@web111 tmp]#tar -zxvf webbench-1.5.tar.gz

[root@web111 tmp]# cd webbench-1.5

[root@vstar111 webbench-1.5]# ll

> > total 28
>
> > lrwxrwxrwx 1 1001 root    16 Nov 15 10:45 ChangeLog -> debian/changelog
>
> > lrwxrwxrwx 1 1001 root    16 Nov 15 10:45 COPYRIGHT -> debian/copyright
>
> > drwxr-xr-x 2 1001 root  4096 Jun 25  2004 debian
>
> > -rw-r--r-- 1 1001 1001  1063 Jun 25  2004 Makefile
>
> > -rw-r--r-- 1 1001 1001  1491 Jan 12  2004 socket.c
>
> > -rw-r--r-- 1 1001 1001  2411 Jan 14  2004 webbench.1
>
> > -rw-r--r-- 1 1001 1001 10978 Jun 25  2004 webbench.c

[root@web111 webbench-1.5]# make
cc -Wall -ggdb -W -O   -c -o webbench.o webbench.c
webbench.c: In function ‘alarm_handler’:
webbench.c:77: warning: unused parameter ‘signal’
cc -Wall -ggdb -W -O  -o webbench webbench.o  
ctags *.c
[root@web111 webbench-1.5]# make install

> > install -s webbench /usr/local/bin
>
> > install -m 644 webbench.1 /usr/local/man/man1
>
> > install -d /usr/local/share/doc/webbench
>
> > install -m 644 debian/copyright /usr/local/share/doc/webbench
>
> > install -m 644 debian/changelog /usr/local/share/doc/webbench

至此，安装完成

**3.使用方法**

[root@web111 webbench-1.5]# man webbench

里面有具体的语法，参数等详细信息

**测试1：1024次**

[root@web111 webbench-1.5]# webbench -c 1024 http://10.244.170.110/
Webbench - Simple Web Benchmark 1.5
Copyright (c) Radim Kolar 1997-2004, GPL Open Source Software.
Benchmarking: GET http://10.244.170.110/
1024 clients, running 30 sec.
Speed=103590 pages/min, 537553 bytes/sec.
Requests: 51795 susceed, 0 failed.

**测试2：10240次**

[root@web111 webbench-1.5]# webbench -c 10240 http://10.244.170.110/
Webbench - Simple Web Benchmark 1.5
Copyright (c) Radim Kolar 1997-2004, GPL Open Source Software.

Benchmarking: GET http://10.244.170.110/
1024 clients, running 30 sec.

Speed=93646 pages/min, 482920 bytes/sec.
Requests: 46559 susceed, 264 failed.

**对比2次测试结果，发现，第二次，速度慢，且失败次数大大增加；**

**查看zabbix监控，比对CPU，测试的时候cpu使用率很高！多次测试后，发现大量的测试占用内存较高，导致服务器直接重启了![尴尬](http://static.blog.csdn.net/xheditor/xheditor_emot/default/awkward.gif)**

**copy别人的测试基准：**

****

1、压力测试工作应该放到产品上线之前，而不是上线以后 ；

2、测试的时候，最好把测试机的监控都打开；

3、测试时尽量跨公网进行，而不是内网；

4、测试时并发应当由小逐渐加大，比如并发100时观察一下网站负载是多少、打开是否流畅，并发200时又是多少、网站打开缓慢时并发是多少、网站打不开时并发又是多少 

5、 应尽量进行单元测试，如B2C网站可以着重测试购物车、推广页面等，因为这些页面占整个网站访问量比重较大