---
title: Python—进程、线程、协程
tags: [Python]
categories: Python
---

**一、线程**

　　线程是操作系统能够进行运算调度的最小单位。它被包含在进程之中，是进程中的实际运作单位。一条线程指的是进程中一个单一顺序的控制流，一个进程中可以并发多个线程，每条线程并行执行不同的任务

方法：

　　start            线程准备就绪，等待CPU调度

　　setName      设置线程名称

　　getName      获取线程名称

　　setDaemon   把一个主进程设置为Daemon线程后，主线程执行过程中，后台线程也在进行，主线程执行完毕后，后台线程不论有没执行完成，都会停止

　　join              逐个执行每个线程，执行完毕后继续往下执行，该方法使得多线程变得无意义　　

　　run              线程被cpu调度后自动执行线程对象的run方法

 

**threading模块**

　　线程的两种调用方式：

1.直接调用（常用）

```
import threading
import time

'''直接调用'''

def hello(name):
    print("Hello %s"%name)
    time.sleep(3)

if __name__ == "__main__":
    t1=threading.Thread(target=hello,args=("zhangsan",)) #生成线程实例
    t2=threading.Thread(target=hello,args=("lisi",))

    t1.setName("aaa")   #设置线程名
    t1.start()  #启动线程
    t2.start()
    t2.join()   #join  等待t2先执行完
    print("Hello")
    print(t1.getName()) #获取线程名
```

2.继承式调用

```
'''继承式调用'''
import threading
import time
class MyThread(threading.Thread):
    def __init__(self,name):
        threading.Thread.__init__(self)
        self.name = name
    def run(self):
        print("Hello %s"%self.name)
        time.sleep(3)

if __name__ == "__main__":
    t1=MyThread("zhangsan")
    t2=MyThread("lisi")
    t1.start()
    t2.start()
```

**setDaemon线程**



```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import time
import threading
def run(n):
    print('Hello..[%s]\n' % n)
    time.sleep(2)

def main():
    for i in range(5):
        t = threading.Thread(target=run,args=[i,])
        t.start()
        t.join(1)

m = threading.Thread(target=main,args=[])
m.setDaemon(True) #将主线程设置Daemon设置为True后,主线程执行完成时,其它子线程会同时退出,不管是否执行完任务
m.start()
print("--- done----")
```

**线程锁Lock**

　　一个进程下可以启动多个线程，多个线程共享父进程的内存空间，每个线程可以访问同一份数据，所以当多个线程同时要修改同一份数据时，就会出现错误

　　例如：



```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import threading
import time

num = 100 #设置一个共享变量
def show():
    global num  #在函数内操作函数外变量，需设置为全局变量
    time.sleep(1)
    num -= 1
list=[]
for i in range(100):
    t = threading.Thread(target=show)
    t.start()
    list.append(t)

for t in list:
    t.join()
print(num)
```

　上面的例子在正常执行完成后的num的结果应该是0，但实际上每次的执行结果都不太一样，因为当多个线程同时要修改同一份数据时，就会出现一些错误（只有

在python2.x运行才会出现错误，python3.x中不会），所以每个线程在要修改公共数据时，为了避免自己在还没改完的时候别人也来修改此数据，可以加上线程锁

来确保每次修改数据时只有一个线程在操作。

　　加锁代码

```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import threading
import time

num = 100 #设置一个共享变量
lock=threading.Lock()  #生成全局锁
def show():
    global num  #在函数内操作函数外变量，需设置为全局变量
    time.sleep(1)
    lock.acquire()  #修改前加锁
    num -= 1
    lock.release()  #修改后解锁
list=[]
for i in range(100):
    t = threading.Thread(target=show)
    t.start()
    list.append(t)

for t in list:
    t.join()

print(num)
```

**递归锁RLock**

　　就是在一个大锁中再包含子锁

```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import threading
#递归锁
def run1():
    lock.acquire()  #小锁
    global num
    num +=1
    lock.release()
    return num
def run2():
    lock.acquire()  #小锁
    global  num2
    num2+=1
    lock.release()
    return num2
def run3():
    lock.acquire()  #大锁
    res = run1()
    res2 = run2()
    lock.release()
    print(res,res2)

if __name__ == '__main__':
    num,num2 = 0,0
    lock = threading.RLock()    #生成Rlock
    for i in range(10):
        t = threading.Thread(target=run3)
        t.start()

while threading.active_count() != 1:#如果不等于1，说明子线程还没执行完毕
    pass #打印进程数
else:
    print(num,num2)
```

**Semaphore**

**　　**同时允许一定数量的线程更改数据

```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import threading
import time
def run(n):
    semaphore.acquire()
    time.sleep(1)
    print("run the thread: %s" %n)
    semaphore.release()

if __name__ == '__main__':
    semaphore  = threading.BoundedSemaphore(3) #设置最多允许3个线程同时运行
    for i in range(20):
        t = threading.Thread(target=run,args=(i,))
        t.start()
while threading.active_count() != 1:
    pass
else:
    print('----done---')
```

**event**

　　实现两个或多个线程间的交互，提供了三个方法 set、wait、clear，默认碰到event.wait 方法时就会阻塞。

　　event.set()，设定后遇到wait不阻塞

　　event.clear()，设定后遇到wait后阻塞

　　event.isSet()，判断有没有被设定

```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import threading
def start():
    print("---start---1")
    event.wait()    #阻塞
    print("---start---2")

if __name__ == "__main__":
    event = threading.Event()
    t = threading.Thread(target=start)
    t.start()

    result=input(">>:")
    if result == "set":
        event.set() #设定set，wait不阻塞
```

**二、进程**

multiprocessing模块

进程调用



```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
from multiprocessing import Process
import time
def start(name):
    time.sleep(1)
    print('hello', name)

if __name__ == '__main__':
    p = Process(target=start, args=('zhangsan',))
    p1 = Process(target=start, args=('lisi',))
    p.start()
    p1.start()
    p.join()
```

进程间通讯

　　每个进程都拥有自己的内存空间，因此不同进程间内存是不共享的，要想实现两个进程间的数据交换，有几种方法

Queue（队列）

```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
from multiprocessing import Process, Queue
def start(q):
    q.put( 'hello')

if __name__ == '__main__':
    q = Queue()
    p = Process(target=start, args=(q,))
    p.start()
    print(q.get())
    p.join()
```

Pipe（管道，不常用）

　　把管道的两头分别赋给两个进程，实现两个进程的互相通信

```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
from multiprocessing import Process, Pipe

def start(conn):
    conn.send('hello')#发送
    print(conn.recv())#接收
    conn.close()

if __name__ == '__main__':
    parent_conn, child_conn = Pipe()    #生成一个管道
    p = Process(target=start, args=(child_conn,))
    p.start()
    print(parent_conn.recv())#接收
    parent_conn.send("11111")#发送
    p.join()
```

Manager（实现了进程间真正的数据共享）

```
#!/usr/bin/env python
from multiprocessing import Process, Manager
def f(dic, list,i):
    dic['1'] = 1
    dic['2'] = 2
    dic['3'] = 3
    list.append(i)

if __name__ == '__main__':
    manager = Manager()
    dic = manager.dict()#通过manager生成一个字典
    list = manager.list(range(5))#通过manager生成一个列表
    p_list = []
    for i in range(10):
        p = Process(target=f, args=(dic, list,i))
        p.start()
        p_list.append(p)
    for res in p_list:
        res.join()

    print(dic)
    print(list)
#执行结果
'''
{'2': 2, '3': 3, '1': 1}
[0, 1, 2, 3, 4, 1, 9, 2, 5, 3, 7, 6, 0, 8, 4]
'''
```

进程池

　　进程池内部维护一个进程序列，当使用时，则去进程池中获取一个进程，如果进程池序列中没有可供使用的进程，那么程序就会等待，直到进程池中有可用进程为止。

进程池中有两个方法：

1、apply（同步）

2、apply_async（异步）

```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
from  multiprocessing import Process,Pool
import time

def Foo(i):
    time.sleep(1)
    return i+100

def Bar(arg):
    print('number::',arg)

if __name__ == "__main__":
    pool = Pool(3)#定义一个进程池，里面有3个进程
    for i in range(10):
        pool.apply_async(func=Foo, args=(i,),callback=Bar)
        #pool.apply(func=Foo, args=(i,))

    pool.close()#关闭进程池
    pool.join()#进程池中进程执行完毕后再关闭,(必须先close在join)
```

callback是回调函数，就是在执行完Foo方法后会自动执行Bar函数，并且自动把Foo函数的返回值作为参数传入Bar函数

 

**三、协程**

　　协程，又称微线程，是一种用户态的轻量级线程。协程能保留上一次调用时的状态，每次过程重入时，就相当于进入上一次调用的状态，换种说法：进入上一次离开时所处逻辑流的位置，当程序中存在大量不需要CPU的操作时（IO），适用于协程。

协程有极高的执行效率，因为子程序切换不是线程切换，而是由程序自身控制，因此，没有线程切换的开销。

不需要多线程的锁机制，因为只有一个线程，也不存在同时写变量冲突，在协程中控制共享资源不加锁，只需要判断状态就好了，所以执行效率比多线程高很多。

因为协程是一个线程执行，所以想要利用多核CPU，最简单的方法是多进程+协程，这样既充分利用多核，又充分发挥协程的高效率。

那符合什么条件就能称之为协程：1、必须在只有一个单线程里实现并发 2、修改共享数据不需加锁 3、用户程序里自己保存多个控制流的上下文栈 4、一个协程遇到IO操作自动切换到其它协程

python中对于协程有两个模块，greenlet和gevent。

 

Greenlet（greenlet的执行顺序需要我们手动控制）

```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
from greenlet import greenlet
def test1():
    print (11)
    gr2.switch()    #手动切换
    print (22)
    gr2.switch()

def test2():
    print (33)
    gr1.switch()
    print (44)

gr1 = greenlet(test1)
gr2 = greenlet(test2)
gr1.switch()
```

gevent（自动切换，由于切换是在IO操作时自动完成，所以gevent需要修改Python自带的一些标准库，这一过程在启动时通过monkey patch完成）

```
from gevent import monkey; monkey.patch_all()
import gevent
import time


def foo():
    print('11')
    time.sleep(3)
    print('22')

def bar():
    print('33')
    print('44')

gevent.joinall([
    gevent.spawn(foo),
    gevent.spawn(bar),
])
```

运行结果：（从结果可以看出，它们是并发执行的）

```
11
33
44
22
```

 

参考：

http://www.cnblogs.com/wupeiqi/articles/5040827.html

http://www.cnblogs.com/alex3714/articles/5230609.html