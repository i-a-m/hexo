---
title: Python—I/O多路复用
tags: [Python]
categories: Python
---

**一、I/O多路复用概念：**

　　监听多个描述符的状态，如果描述符状态改变，则会被内核修改标志位，从而被进程获取进而进行读写操作

 

**二、select，poll，epoll**

select模块，提供了：select、poll、epoll三个方法，分别调用系统的 select，poll，epoll 从而实现IO多路复用。

`　　Windows Python：`提供： select

`　　Mac Python：`提供： select

`　　Linux Python：`提供： select、poll、epoll

 

**select **

　　在python中，select函数是一个对底层操作系统的直接访问的接口，它用来监控sockets、files和pipes，等待IO完成。当有可读、可写或是异常事件产生时，select可以很容易的监控到。

select目前几乎在所有的平台上支持，其良好跨平台支持也是它的一个优点，这也是它所剩不多的优点之一。

select的一个缺点在于单个进程能够监视的文件描述符的数量存在最大限制，在Linux上一般为1024，不过可以通过修改宏提升这一限制。

 

格式：rList,wList,eList = select.select(argv1,argv2,argv3,timeout)

参数：

　　argv1：监听序列中的句柄发生变化时，则获取发生变化的句柄添加到**rList**序列中

　　argv2：监听序列中含有句柄时，则将该序列中所有的句柄添加到**wList**序列中

　　argv3：监听序列中的句柄发生错误时，则将该发生错误的句柄添加到**eList**序列中

　　timeout：设置阻塞时间，如果不设置则默认一直阻塞

 

**select **实例：

　　用select实现处理多个socket客户端请求

 

服务端



```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import socket
import select
ip_port = ('127.0.0.1',9999)

sk = socket.socket(socket.AF_INET,socket.SOCK_STREAM) #创建socket对象
sk.bind(ip_port)    #绑定ip、端口
sk.listen(5)    #监听
sk.setblocking(False)   #不阻塞

inputs = [sk,]
outputs = []
while True:
    rlist,wlist,eList = select.select(inputs,outputs,[],0.5)
    print("inputs:",inputs) #查看inputs列表变化
    print("rlist:",rlist) #查看rlist列表变化
    for r in rlist:
        if r == sk: #如果r是服务端
            conn,address = r.accept()#
            inputs.append(conn)
            print (address)
        else:
            client_data = r.recv(1024)
            if client_data: #如果有数据，返回数据
                r.sendall(client_data)
            else:           #否则移除
                inputs.remove(r)
```

客户端：



```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import socket
ip_port = ('127.0.0.1',9999)

sk = socket.socket()    #创建socket对象
sk.connect(ip_port) #通过ip和端口连接server端
while True:
    inpu=input(">>:")
    sk.sendall(bytes(inpu,"utf8"))  #给server端发送信息

    server_reply = sk.recv(1024)    #接受消息
    print (str(server_reply,"utf8"))    #打印消息

sk.close()  #关闭连接
```



过程：

启动服务端，这时select会一直监听服务端句柄，直到有客户端请求过来发生变化。

当客户端有新的连接请求过来时，select捕捉到服务端句柄发生变化，把变化的句柄加入到rlist，所以这时r == sk，接收这个链接并把句柄加入到inputs列表，

现在，select监听的就是两个句柄了。同理，当有多个链接请求过来时，都会把它添加到inputs列表中。

当其中的一个客户端A发送信息过来时，select会在监听的句柄列表中捕捉到客户端A这个句柄发生了变化，并把发生变化的句柄加入到rlist，但这时r不等于sk，

执行另一步操作，接收返回数据。

 

上面讲到了argv1参数的概述,是监听argv1这个列表，当有发生变化时才会捕捉，并加入到rlist。

argv2参数：只要在这个列表里有值，每次都会加入到wList，不同于argv1

 

所以可以利用argv2参数实现读写分离

server端



```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import socket
import select
import queue
ip_port = ('127.0.0.1',9999)

sk = socket.socket(socket.AF_INET,socket.SOCK_STREAM) #创建socket对象
sk.bind(ip_port)    #绑定ip、端口
sk.listen(5)    #监听
sk.setblocking(False)   #不阻塞

inputs = [sk,]
outputs = []
message={}
while True:
    rlist,wlist,eList = select.select(inputs,outputs,[],0.5)
    #print("inputs:",inputs) #查看inputs列表变化
    #print("rlist:",rlist) #查看rlist列表变化
    #print(message)
    for r in rlist:
        if r == sk: #如果r是服务端
            conn,address = r.accept()#
            inputs.append(conn) #把连接的句柄加入inputs列表监听
            message[conn] = queue.Queue()   #每个新的句柄对应一个队列
            print (address)
        else:
            client_data = r.recv(1024)
            if client_data: #如果有数据，返回数据
                outputs.append(r)
                message[r].put(client_data)    #在指定队列中插入数据
            else:
                inputs.remove(r)    #否则移除
                del message[r]  #删除队列

    for w in wlist: #如果wlist列表有值
        try:
            data =message[w].get_nowait()#去指定队列取数据
            w.sendall(data)
        except queue.Empty:
            pass
        outputs.remove(w)#因为output列表只要有数据每次都会加入wlist列表，所以发送完数据都要移除
```

在argv3的监听列表中，如果在跟某个socket连接通信过程中出了错误，就会把错误的句柄加到eList ，所以在加个判断，当某个socket连接通信过程中出了错误，就把这个错误的连接对象在各个列表和字典中删除。

在循环里在加上一个判断

```
　　for e in eList:
        inputs.remove(e)#删除inputs监听的错误句柄
        if e in outputs:#如果outputs里有也删除
            outputs.remove(e)
        e.close()
        del message[e]  #删除队列
```

 

select的4个参数都介绍完后附上server端完整代码

```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import socket
import select
import queue
ip_port = ('127.0.0.1',9999)

sk = socket.socket(socket.AF_INET,socket.SOCK_STREAM) #创建socket对象
sk.bind(ip_port)    #绑定ip、端口
sk.listen(5)    #监听
sk.setblocking(False)   #不阻塞

inputs = [sk,]
outputs = []
message={}
while True:
    rlist,wlist,eList = select.select(inputs,outputs,inputs,0.5)
    #print("inputs:",inputs) #查看inputs列表变化
    #print("rlist:",rlist) #查看rlist列表变化
    #print(message)
    for r in rlist:
        if r == sk: #如果r是服务端
            conn,address = r.accept()#
            inputs.append(conn) #把连接的句柄加入inputs列表监听
            message[conn] = queue.Queue()   #每个新的句柄对应一个队列
            print (address)
        else:
            client_data = r.recv(1024)
            if client_data: #如果有数据，返回数据
                outputs.append(r)
                message[r].put(client_data)    #在指定队列中插入数据
            else:
                inputs.remove(r)    #否则移除
                del message[r]  #删除队列

    for w in wlist: #如果wlist列表有值
        try:
            data =message[w].get_nowait()#去指定队列取数据
            w.sendall(data)
        except queue.Empty:
            pass
        outputs.remove(w)#因为output列表只要有数据每次都会加入wlist列表，所以发送完数据都要移除

    for e in eList:
        inputs.remove(e)#删除inputs监听的错误句柄
        if e in outputs:#如果outputs里有也删除
            outputs.remove(e)
        e.close()
        del message[e]  #删除队列 
```

参考：http://www.cnblogs.com/wupeiqi/articles/5040823.html