---
title: Python—Socket
tags: [Python]
categories: Python
---

Socket模块

socket通常也称作"套接字"，用于描述IP地址和端口，是特定网络协议如TCP/IP、UDP/IP套件对网络应用程序提供者提供的当前可移植标准的对象，

用来连接后进行数据的发送和接收

**一、套接字格式**

socket=socket.socket(familly,type，proto)

**familly参数：地址簇**

| socket.AF_INET  | IPv4（默认）            |
| --------------- | ------------------- |
| socket.AF_UNIX  | 只能够用于单一的Unix系统进程间通信 |
| socket.AF_INET6 | IPv6                |

 

**type参数：类型**

| socket.SOCK_STREAM    | 流式socket , for TCP（默认）                   |
| --------------------- | ---------------------------------------- |
| socket.SOCK_DGRAM     | 数据报式socket , for UDP                     |
| socket.SOCK_RAW       | 原始套接字，普通的套接字无法处理ICMP、IGMP等网络报文，而SOCK_RAW可以；其次，SOCK_RAW也可以处理特殊的IPv4报文；此外，利用原始套接字，可以通过IP_HDRINCL套接字选项由用户构造IP头。 |
| socket.SOCK_RDM       | 是一种可靠的UDP形式，即保证交付数据报但不保证顺序。SOCK_RAM用来提供对原始协议的低级访问，在需要执行某些特殊操作时使用，如发送ICMP报文。SOCK_RAM通常仅限于高级用户或管理员运行的程序使用。 |
| socket.SOCK_SEQPACKET | 可靠的连续数据包服务                               |

**proto参数：协议**

　　0　　（默认）与特定的地址家族相关的协议,如果是 0 ，则系统就会根据地址格式和套接类别,自动选择一个合适的协议

**二、常用功能**



```
sk.bind(address)
　　#s.bind(address) 将套接字绑定到地址。address地址的格式取决于地址族。在AF_INET下，以元组（host,port）的形式表示地址。

sk.listen(backlog)
　　#开始监听传入连接。backlog指定在拒绝连接之前，可以挂起的最大连接数量。backlog等于5，表示内核已经接到了连接请求，
    # 但服务器还没有调用accept进行处理的连接个数最大为5这个值不能无限大，因为要在内核中维护连接队列

sk.setblocking(bool)
　　#是否阻塞（默认True），如果设置False，那么accept和recv时一旦无数据，则报错。

sk.accept()
　　#接受连接并返回（conn,address）,其中conn是新的套接字对象，可以用来接收和发送数据。address是连接客户端的地址。
　　#接收TCP 客户的连接（阻塞式）等待连接的到来

sk.connect(address)
　　#连接到address处的套接字。一般，address的格式为元组（hostname,port）,如果连接出错，返回socket.error错误。

sk.connect_ex(address)
　　#同上，只不过会有返回值，连接成功时返回 0 ，连接失败时候返回编码，例如：10061

sk.close()
　　#关闭套接字

sk.recv(bufsize[,flag])
　　#接受套接字的数据。数据以字符串形式返回，bufsize指定最多可以接收的数量。flag提供有关消息的其他信息，通常可以忽略。

sk.recvfrom(bufsize[.flag])
　　#与recv()类似，但返回值是（data,address）。其中data是包含接收数据的字符串，address是发送数据的套接字地址。

sk.send(string[,flag])
　　#将string中的数据发送到连接的套接字。返回值是要发送的字节数量，该数量可能小于string的字节大小。即：可能未将指定内容全部发送。

sk.sendall(string[,flag])
　　#将string中的数据发送到连接的套接字，但在返回之前会尝试发送所有数据。成功返回None，失败则抛出异常。
    #内部通过递归调用send，将所有内容发送出去。

sk.sendto(string[,flag],address)
　　#将数据发送到套接字，address是形式为（ipaddr，port）的元组，指定远程地址。返回值是发送的字节数。该函数主要用于UDP协议。

sk.settimeout(timeout)
　　#设置套接字操作的超时期，timeout是一个浮点数，单位是秒。值为None表示没有超时期。一般，超时期应该在刚创建套接字时设置，因为它们可能用于连接的操作（如 client 连接最多等待5s ）

sk.getpeername()
　　#返回连接套接字的远程地址。返回值通常是元组（ipaddr,port）。

sk.getsockname()
　　#返回套接字自己的地址。通常是一个元组(ipaddr,port)

sk.fileno()
　　#套接字的文件描述符
```

**三、socket代码**

服务端代码



```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import socket
ip_port = ('127.0.0.1',9999)

sk = socket.socket() #创建socket对象
sk.bind(ip_port)    #绑定ip、端口
sk.listen(5)    #监听

while True:
    print ('server waiting...')
    conn,addr = sk.accept() #accept阻塞，直到有连接过来
    client_data = conn.recv(1024)   #recv阻塞，直到接收到客户端传递过来的信息
    print (str(client_data,'utf8')) #打印
    conn.sendall(bytes('Hello',"utf8"))    #回发信息

    conn.close()    #关闭连接
```

客户端代码



```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import socket
ip_port = ('127.0.0.1',9999)

sk = socket.socket()    #创建socket对象
sk.connect(ip_port) #通过ip和端口连接server端

sk.sendall(bytes('你好',"utf8"))  #给server端发送信息

server_reply = sk.recv(1024)    #接受消息
print (str(server_reply,"utf8"))    #打印消息

sk.close()  #关闭连接
```

**UDP协议**

TCP发送数据时，已建立好TCP连接，所以不需要指定地址。UDP是面向无连接的，每次都要指定发送的地址。

服务端代码



```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import socket
ip_port = ('127.0.0.1',9999)
sk = socket.socket(socket.AF_INET,socket.SOCK_DGRAM,0)
sk.bind(ip_port)    #绑定ip、端口

while True:
    data = sk.recv(1024)    #recv阻塞，直到接收到客户端传递过来的信息
    print (str(data,"utf8"))
```

客户端代码



```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import socket
ip_port = ('127.0.0.1',9999)

sk = socket.socket(socket.AF_INET,socket.SOCK_DGRAM,0)
while True:
    inp =input('输出：').strip()
    if inp == 'exit':
        break
    sk.sendto(bytes(inp,"utf8"),ip_port)    #UDP每次发送都要指定发送的目标

sk.close()
```

**四、SocketServer**

SocketServer内部使用 IO多路复用 以及 “多线程” 和 “多进程” ，从而实现并发处理多个客户端请求的Socket服务端。即：每个客户端请求连接到服务器时，Socket服务端都会在服务器是创建一个“线程”或者“进程” 专门负责处理当前客户端的所有请求。

 

**ThreadingTCPServer**

　　ThreadingTCPServer:实现Soket服务器内部为每个client创建一个 “**线程**”，该线程用来和客户端进行交互。

使用ThreadingTCPServer:

　　1、创建一个继承自 SocketServer.BaseRequestHandler 的类

　　2、类中必须定义一个名称为 handle 的方法

　　3、启动ThreadingTCPServer

 

服务端代码



```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import socketserver

class Myserver(socketserver.BaseRequestHandler):

    def handle(self):
        print(self.client_address)  #输出连接的是谁
        conn = self.request
        conn.sendall(bytes('Hello',"utf-8"))
        while True:
            data = conn.recv(1024)
            conn.sendall(data)

if __name__ == "__main__":
    server=socketserver.ThreadingTCPServer(('127.0.0.1',9999),Myserver)
    server.serve_forever()
```

客户端代码



```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import socket
ip_port = ('127.0.0.1',9999)

sk = socket.socket()    #创建socket对象
sk.connect(ip_port) #通过ip和端口连接server端
sk.settimeout(5)

while True:
    data = sk.recv(1024)
    print(str(data,"utf-8"))
    inp = input('input:')
    sk.sendall(bytes(inp,"utf-8"))
    if inp == 'exit':
        break
sk.close()  #关闭连接
```

SocketServer的ThreadingTCPServer之所以可以同时处理请求得益于 **select** 和 **Threading** 两个东西，其实本质上就是在服务器端为每一个客户端创建一个线程，当前线程用来处理对应客户端的请求，所以，可以支持同时n个客户端链接（长连接）。

 

**ForkingTCPServer**

ForkingTCPServer和ThreadingTCPServer的使用和执行流程基本一致，只不过在内部分别为请求者建立 “线程”  和 “进程”。

只需把

server=socketserver.ThreadingTCPServer(('127.0.0.1',9999),Myserver)改为

server=socketserver.ForkingTCPServer(('127.0.0.1',9999),Myserver)

参考：http://www.cnblogs.com/wupeiqi/articles/5040823.html