---
title: Python—RabbitMQ
tags: [Python]
categories: Python
---
**RabbitMQ**

　　RabbitMQ是一个在AMQP基础上完整的，可复用的企业消息系统

安装

　　因为RabbitMQ由erlang实现，先安装erlang

```
#安装配置epel源
    rpm -ivh http://dl.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
 
#安装erlang
    yum -y install erlang
```

```
#安装RabbitMQ
    yum -y install rabbitmq-server
```

```
#启动/关闭
service rabbitmq-server start/stop
```

python使用rabbitmq服务，可以使用现成的类库pika

```
#安装pika
pip install pika    #pip是python的软件管理包,如果没有安装,可以通过apt-get安装
```

`pika源码地址https:``/``/``pypi.python.org``/``pypi``/``pika`

**操作RabbitMQ**

　　对于RabbitMQ来说，生产和消费不再针对内存里的一个Queue对象，而是某台服务器上的RabbitMQ Server实现的消息队列。

生产者

```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import pika
#生产者（发）

connection = pika.BlockingConnection(pika.ConnectionParameters(host='172.16.8.47')) #连接rabbitmq服务器
channel = connection.channel()  #生成管道
#声明queue，消息将在这个队列中进行传递。如果将消息发送到不存在的队列，rabbitmq将会自动清除这些消息
channel.queue_declare(queue='hello')#如果加上durable=True，服务器异常时，消息不丢失，持久化

#发送消息到上面声明的hello队列
#exchange表示交换器，能精确指定消息应该发送到哪个队列，routing_key: 设置为队列的名称，body: 发送的内容
channel.basic_publish(exchange='',
                      routing_key='hello',
                      body='Hello World!')
print("Sent 'Hello World!'")
connection.close()  #关闭连接
```

消费者

```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import pika
#消费者（取）
connection = pika.BlockingConnection(pika.ConnectionParameters(host='172.16.8.47'))
channel = connection.channel()   #生成管道
channel.queue_declare(queue='hello')

#回调函数
def callback(ch, method, properties, body):
    print("Received %r" % body)

channel.basic_consume(callback,
                      queue='hello',
                      no_ack=True)  #无应答 如果是False，在处理完后应答，如果没应答，说明这次指令没执行完，下次继续发布
                                    #可以防止消息丢失
print('Waiting..............')

#开始接收信息，并进入阻塞状态，队列里有信息才会调用callback进行处理
channel.start_consuming()
```

1、消息确认

　　no-ack ＝ False

去除no_ack=True参数或者设置为False，当工作者完成任务后，会反馈给rabbitmq（消息确认）

即使其中一个工作者退出了，正在执行的任务也不会丢失，RabbitMQ会重新将该任务添加到队列中，分配给其他工作者。

2、消息持久化

　　虽然有了消息确认，但是如果rabbitmq自身挂掉的话，那么任务还是会丢失，所以需要将任务持久化存储起来。

用delivery_mode=2来标记任务为持久化存储

```
#声明持久化存储
channel.queue_declare(queue='hello', durable=True)#队列持久化

channel.basic_publish(exchange='',
                      routing_key='hello',
                      body='Hello World!',
                      #消息持久化
                      properties=pika.BasicProperties(
                          delivery_mode=2, #用delivery_mode=2来标记任务为持久化存储
                      ))
```

3、消息获取顺序（公平调度）

使用basic_qos设置prefetch_count=1，使得rabbitmq不会在同一时间给工作者分配多个任务，只有工作者完成任务之后，才会再次接收到任务

```
#声明持久化存储
channel.queue_declare(queue='hello', durable=True)##队列持久化

#回调函数
def callback(ch, method, properties, body):
    print("Received %r" % body)
    time.sleep(10)
    print('ok')
    ch.basic_ack(delivery_tag = method.delivery_tag)

channel.basic_qos(prefetch_count=1)#任务公平调度
```

4、发布订阅

发布订阅和简单的消息队列区别在于，发布订阅会将消息发送给所有的订阅者，而消息队列中的数据被消费一次便消失。所以，RabbitMQ实现发布和订阅时，会为每一个订阅者创建一个队列，而发布者发布消息时，会将消息放置在所有相关队列中。

发布者

```
#!/usr/bin/env python
import pika
#发布者

connection = pika.BlockingConnection(pika.ConnectionParameters(host='172.16.8.47'))
channel = connection.channel() #生成管道

channel.exchange_declare(exchange='change_name',type='fanout')#type='fanout'表示可以给多个队列发数据

message = "Hello World!"

channel.basic_publish(exchange='change_name',#指定exchange，消息发给exchange，exchange发送给绑定了它的队列
                      routing_key='',
                      body=message)
print("Sent %r" % message)
connection.close()
```

订阅者

```
#!/usr/bin/env python
import pika
#订阅者
connection = pika.BlockingConnection(pika.ConnectionParameters(host='172.16.8.47'))

channel = connection.channel() #生成管道
channel.exchange_declare(exchange='change_name',type='fanout')

#生成随机queue_name
result = channel.queue_declare(exclusive=True)
queue_name = result.method.queue

channel.queue_bind(exchange='change_name',  #绑定exchange
                   queue=queue_name)
print('Waiting........')

def callback(ch, method, properties, body):
    print("%r" % body)

channel.basic_consume(callback,
                      queue=queue_name,
                      no_ack=True)

channel.start_consuming()
```

5、关键字发送

　　队列绑定关键字，发送者将数据根据关键字发送到消息exchange，exchange根据 关键字 判定应该将数据发送至指定队列。

发布者

```
#!/usr/bin/env python
import pika
#发布者

connection = pika.BlockingConnection(pika.ConnectionParameters(host='172.16.8.47'))
channel = connection.channel() #生成管道

channel.exchange_declare(exchange='direct_name',type='direct')#type='direct'指定关键字发送

message = "Hello World!"

channel.basic_publish(exchange='direct_name',#指定exchange，消息发给exchange，exchange发送给绑定了它的队列
                      routing_key='lisi',#指定关键字
                      body=message)
print("Sent %r" % message)
connection.close()
```

订阅者

```
#!/usr/bin/env python
import pika
#订阅者
connection = pika.BlockingConnection(pika.ConnectionParameters(host='172.16.8.47'))
channel = connection.channel() #生成管道
channel.exchange_declare(exchange='direct_name',type='direct')#type='direct'指定关键字发送

#生成随机queue_name
result = channel.queue_declare(exclusive=True)
queue_name = result.method.queue

channel.queue_bind(exchange='direct_name',  #绑定exchange
                   queue=queue_name,
                   routing_key="zhangsan")
channel.queue_bind(exchange='direct_name',  #绑定exchange
                   queue=queue_name,
                   routing_key="lisi")
print('Waiting..........')

def callback(ch, method, properties, body):
    print("%r" % body)

channel.basic_consume(callback,
                      queue=queue_name,
                      no_ack=True)
channel.start_consuming()
```

 

更多内容参照：http://www.cnblogs.com/wupeiqi/articles/5132791.html



 