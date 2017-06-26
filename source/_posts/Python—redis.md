---
title: Python—redis
tags: [Python]
categories: Python
---
**一、redis**

　　redis是一个key-value存储系统。和Memcached类似，它支持存储的value类型相对更多，包括string(字符串)、list(链表)、set(集合)、zset(sorted set --有序集合)和hash（哈希类型）。这些数据类型都支持push/pop、add/remove及取交集并集和差集及更丰富的操作，而且这些操作都是原子性的。在此基础上，redis支持各种不同方式的排序。与memcached一样，为了保证效率，数据都是缓存在内存中。区别的是redis会周期性的把更新的数据写入磁盘或者把修改操作写入追加的记录文件，并且在此基础上实现了master-slave(主从)同步。

　　Redis 是一个高性能的key-value数据库。 redis的出现，很大程度补偿了memcached这类key/value存储的不足，在部 分场合可以对关系数据库起到很好的补充作用。它提供了Python，Ruby，Erlang，PHP客户端，使用很方便,Redis支持主从同步。数据可以从主服务器向任意数量的从服务器上同步，从服务器可以是关联其他从服务器的主服务器。这使得Redis可执行单层树复制。从盘可以有意无意的对数据进行写操作。由于完全实现了发布/订阅机制，使得从数据库在任何地方同步树时，可订阅一个频道并接收主服务器完整的消息发布记录。

 

**二、python操作redis**

**1、连接方式**

　　redis-py提供两个类Redis和StrictRedis用于实现Redis的命令，StrictRedis用于实现大部分官方的命令，并使用官方的语法和命令，Redis是StrictRedis的子类



```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import redis

r = redis.Redis(host='192.168.0.110', port=6379,db=0)
r.set('name', 'zhangsan')   #添加
print (r.get('name'))   #获取
```

**2、连接池**

**　　**redis-py使用connection pool来管理对一个redis server的所有连接，避免每次建立、释放连接的开销。默认，每个Redis实例都会维护一个自己的连接池。可以直接建立一个连接池，然后作为参数Redis，这样就可以实现多个Redis实例共享一个连接池。

```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import redis

pool = redis.ConnectionPool(host='192.168.0.110', port=6379)
r = redis.Redis(connection_pool=pool)
r.set('name', 'zhangsan')   #添加
print (r.get('name'))   #获取
```



**3、操作**

[ redis详细操作命令](http://www.cnblogs.com/melonjiang/p/5342505.html)

 

**4、管道**

　　redis-py默认在执行每次请求都会创建（连接池申请连接）和断开（归还连接池）一次连接操作，如果想要在一次请求中指定多个命令，则可以使用pipline实现一次请求指定多个命令，并且默认情况下一次pipline 是原子性操作。



```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import redis
pool = redis.ConnectionPool(host='192.168.0.110', port=6379)
r = redis.Redis(connection_pool=pool)

pipe = r.pipeline(transaction=True)

r.set('name', 'zhangsan')
r.set('name', 'lisi')

pipe.execute()
```

**5、发布和订阅**

首先定义一个RedisHelper类，连接Redis，定义频道为monitor，定义发布(publish)及订阅(subscribe)方法。



```
#!/usr/bin/env python
#-*- coding:utf-8 -*-
import redis

class RedisHelper(object):
    def __init__(self):
        self.__conn = redis.Redis(host='192.168.0.110',port=6379)#连接Redis
        self.channel = 'monitor' #定义名称

    def publish(self,msg):#定义发布方法
        self.__conn.publish(self.channel,msg)
        return True

    def subscribe(self):#定义订阅方法
        pub = self.__conn.pubsub()
        pub.subscribe(self.channel)
        pub.parse_response()
        return pub
```

 

发布者

```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
#发布
from RedisHelper import RedisHelper

obj = RedisHelper()
obj.publish('hello')#发布
```



订阅者



```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
#订阅
from RedisHelper import RedisHelper

obj = RedisHelper()
redis_sub = obj.subscribe()#调用订阅方法

while True:
    msg= redis_sub.parse_response()
    print (msg)
```



1、String 操作

　　redis中的String在在内存中按照一个name对应一个value来存储

set()

```
#在Redis中设置值，默认不存在则创建，存在则修改
r.set('name', 'zhangsan')
'''参数：
     set(name, value, ex=None, px=None, nx=False, xx=False)
     ex，过期时间（秒）
     px，过期时间（毫秒）
     nx，如果设置为True，则只有name不存在时，当前set操作才执行,同setnx(name, value)
     xx，如果设置为True，则只有name存在时，当前set操作才执行'''
```

```
setex(name, value, time)
#设置过期时间（秒）

psetex(name, time_ms, value)
#设置过期时间（豪秒）
```

mset()

```
#批量设置值
r.mset(name1='zhangsan', name2='lisi')
#或
r.mget({"name1":'zhangsan', "name2":'lisi'})
```

get(name)

　　获取值

mget(keys, *args)

```
#批量获取
print(r.mget("name1","name2"))
#或
li=["name1","name2"]
print(r.mget(li))
```

getset(name, value)

```
#设置新值，打印原值
print(r.getset("name1","wangwu")) #输出:zhangsan
print(r.get("name1")) #输出:wangwu
```

getrange(key, start, end)

```
#根据字节获取子序列
r.set("name","zhangsan")
print(r.getrange("name",0,3))#输出:zhan
```

setrange(name, offset, value)

```
#修改字符串内容，从指定字符串索引开始向后替换，如果新值太长时，则向后添加
r.set("name","zhangsan")
r.setrange("name",1,"z")
print(r.get("name")) #输出:zzangsan
r.setrange("name",6,"zzzzzzz")
print(r.get("name")) #输出:zzangszzzzzzz
```

setbit(name, offset, value)

```
#对二进制表示位进行操作
''' name:redis的name
    offset，位的索引（将值对应的ASCII码变换成二进制后再进行索引）
    value，值只能是 1 或 0 '''

str="345"
r.set("name",str)
for i in str:
    print(i,ord(i),bin(ord(i)))#输出 值、ASCII码中对应的值、对应值转换的二进制
'''
输出:
    3 51 0b110011
    4 52 0b110100
    5 53 0b110101'''

r.setbit("name",6,0)#把第7位改为0，也就是3对应的变成了0b110001
print(r.get("name"))#输出：145
```

getbit(name, offset)

```
#获取name对应值的二进制中某位的值(0或1)
r.set("name","3") # 对应的二进制0b110011
print(r.getbit("name",5))   #输出:0
print(r.getbit("name",6))   #输出:1
```

bitcount(key, start=None, end=None)

```
#获取对应二进制中1的个数
r.set("name","345")#0b110011 0b110100 0b110101
print(r.bitcount("name",start=0,end=1)) #输出:7
''' key:Redis的name
    start:字节起始位置
    end:字节结束位置'''
```

strlen(name)

```
#返回name对应值的字节长度（一个汉字3个字节）
r.set("name","zhangsan")
print(r.strlen("name")) #输出:8
```

incr(self, name, amount=1)

```
#自增mount对应的值，当mount不存在时，则创建mount＝amount，否则，则自增,amount为自增数(整数)
print(r.incr("mount",amount=2))#输出:2
print(r.incr("mount"))#输出:3
print(r.incr("mount",amount=3))#输出:6
print(r.incr("mount",amount=6))#输出:12
print(r.get("mount")) #输出:12
```

incrbyfloat(self, name, amount=1.0)

```
#类似 incr() 自增,amount为自增数(浮点数)
```

decr(self, name, amount=1)

```
#自减name对应的值,当name不存在时,则创建name＝amount，否则，则自减，amount为自增数(整数)
```

append(name, value)

```
#在name对应的值后面追加内容
r.set("name","zhangsan")
print(r.get("name"))    #输出:'zhangsan
r.append("name","lisi")
print(r.get("name"))    #输出:zhangsanlisi
```

 

2、Hash 操作

redis中的Hash 在内存中类似于一个name对应一个dic来存储 

 hset(name, key, value)

```
#name对应的hash中设置一个键值对（不存在，则创建，否则，修改）
r.hset("dic_name","a1","aa")
```

hget(name,key)

```
r.hset("dic_name","a1","aa")
#在name对应的hash中根据key获取value
print(r.hget("dic_name","a1"))#输出:aa
```

hgetall(name)

```
#获取name对应hash的所有键值
print(r.hgetall("dic_name"))
```

hmset(name, mapping)

```
#在name对应的hash中批量设置键值对,mapping:字典
dic={"a1":"aa","b1":"bb"}
r.hmset("dic_name",dic)
print(r.hget("dic_name","b1"))#输出:bb
```

hmget(name, keys, *args)

```
# 在name对应的hash中获取多个key的值
li=["a1","b1"]
print(r.hmget("dic_name",li))
print(r.hmget("dic_name","a1","b1"))
```

hlen(name)、hkeys(name)、hvals(name)

```
dic={"a1":"aa","b1":"bb"}
r.hmset("dic_name",dic)

#hlen(name) 获取hash中键值对的个数
print(r.hlen("dic_name"))

#hkeys(name) 获取hash中所有的key的值
print(r.hkeys("dic_name"))

#hvals(name) 获取hash中所有的value的值
print(r.hvals("dic_name"))
```

hexists(name, key)

```
#检查name对应的hash是否存在当前传入的key
print(r.hexists("dic_name","a1"))#输出:True
```

hdel(name,*keys)

```
#删除指定name对应的key所在的键值对
r.hdel("dic_name","a1")
```

hincrby(name, key, amount=1)

```
#自增hash中key对应的值，不存在则创建key=amount(amount为整数)
print(r.hincrby("demo","a",amount=2))
```

hincrbyfloat(name, key, amount=1.0)

```
#自增hash中key对应的值，不存在则创建key=amount(amount为浮点数)
```

 

hscan(name, cursor=0, match=None, count=None)

 

hscan_iter(name, match=None, count=None)

 

3、List 操作

redis中的List在在内存中按照一个name对应一个List来存储 

lpush(name,values)

```
# 在name对应的list中添加元素，每个新的元素都添加到列表的最左边
r.lpush("list_name",2)
r.lpush("list_name",3,4,5)#保存在列表中的顺序为5，4，3，2
```

rpush(name,values)

```
#同lpush，但每个新的元素都添加到列表的最右边
```

lpushx(name,value)

```
#在name对应的list中添加元素，只有name已经存在时，值添加到列表的最左边
```

rpushx(name,value)

```
#在name对应的list中添加元素，只有name已经存在时，值添加到列表的最右边
```

llen(name)

```
# name对应的list元素的个数
print(r.llen("list_name"))
```

linsert(name, where, refvalue, value))

```
# 在name对应的列表的某一个值前或后插入一个新值
r.linsert("list_name","BEFORE","2","SS")#在列表内找到第一个元素2，在它前面插入SS

'''参数：
     name: redis的name
     where: BEFORE（前）或AFTER（后）
     refvalue: 列表内的值
     value: 要插入的数据'''
```

r.lset(name, index, value)

```
#对list中的某一个索引位置重新赋值
r.lset("list_name",0,"bbb")
```

r.lrem(name, value, num)

```
#删除name对应的list中的指定值
r.lrem("list_name","SS",num=0)

''' 参数：
    name:  redis的name
    value: 要删除的值
    num:   num=0 删除列表中所有的指定值；
           num=2 从前到后，删除2个；
           num=-2 从后向前，删除2个'''
```

lpop(name)

```
#移除列表的左侧第一个元素，返回值则是第一个元素
print(r.lpop("list_name"))
```

lindex(name, index)

```
#根据索引获取列表内元素
print(r.lindex("list_name",1))
```

lrange(name, start, end)

```
#分片获取元素
print(r.lrange("list_name",0,-1))
```

ltrim(name, start, end)

```
#移除列表内没有在该索引之内的值
r.ltrim("list_name",0,2)
```

rpoplpush(src, dst)

```
# 从一个列表取出最右边的元素，同时将其添加至另一个列表的最左边
#src 要取数据的列表
#dst 要添加数据的列表
```

brpoplpush(src, dst, timeout=0)

```
#同rpoplpush，多了个timeout, timeout：取数据的列表没元素后的阻塞时间，0为一直阻塞
r.brpoplpush("list_name","list_name1",timeout=0)
```

blpop(keys, timeout)

```
#将多个列表排列,按照从左到右去移除各个列表内的元素
r.lpush("list_name",3,4,5)
r.lpush("list_name1",3,4,5)

while True:
    print(r.blpop(["list_name","list_name1"],timeout=0))
    print(r.lrange("list_name",0,-1),r.lrange("list_name1",0,-1))

'''keys: redis的name的集合
   timeout: 超时时间，获取完所有列表的元素之后，阻塞等待列表内有数据的时间（秒）, 0 表示永远阻塞'''
```

r.brpop(keys, timeout)

```
#同blpop，将多个列表排列,按照从右像左去移除各个列表内的元素
```

 

4、Set 操作

Set集合就是不允许重复的列表

sadd(name,values)

```
#给name对应的集合中添加元素
r.sadd("set_name","aa")
r.sadd("set_name","aa","bb")
```

smembers(name)

```
#获取name对应的集合的所有成员
```

scard(name)

```
#获取name对应的集合中的元素个数
r.scard("set_name")
```

sdiff(keys, *args)

```
#在第一个name对应的集合中且不在其他name对应的集合的元素集合
r.sadd("set_name","aa","bb")
r.sadd("set_name1","bb","cc")
r.sadd("set_name2","bb","cc","dd")

print(r.sdiff("set_name","set_name1","set_name2"))#输出:｛aa｝
```

sdiffstore(dest, keys, *args)

```
#相当于把sdiff获取的值加入到dest对应的集合中
```

sinter(keys, *args)

```
# 获取多个name对应集合的并集
r.sadd("set_name","aa","bb")
r.sadd("set_name1","bb","cc")
r.sadd("set_name2","bb","cc","dd")

print(r.sinter("set_name","set_name1","set_name2"))#输出:｛bb｝
```

sinterstore(dest, keys, *args)

```
#获取多个name对应集合的并集，再讲其加入到dest对应的集合中
```

sismember(name, value)

```
#检查value是否是name对应的集合内的元素
```

smove(src, dst, value)

```
#将某个元素从一个集合中移动到另外一个集合
```

spop(name)

```
#从集合的右侧移除一个元素，并将其返回
```

srandmember(name, numbers)

```
# 从name对应的集合中随机获取numbers个元素
print(r.srandmember("set_name2",2))
```

srem(name, values)

```
#删除name对应的集合中的某些值
print(r.srem("set_name2","bb","dd"))
```

sunion(keys, *args)

```
#获取多个name对应的集合的并集
r.sunion("set_name","set_name1","set_name2")
```

sunionstore(dest,keys, *args)

```
#获取多个name对应的集合的并集，并将结果保存到dest对应的集合中
```

有序集合：

　　在集合的基础上，为每元素排序，元素的排序需要根据另外一个值来进行比较，所以，对于有序集合，每一个元素有两个值，即：值和分数，分数专门用来做排序。

zadd(name, *args, **kwargs)

```
# 在name对应的有序集合中添加元素
r.zadd("zset_name", "a1", 6, "a2", 2,"a3",5)
#或
r.zadd('zset_name1', b1=10, b2=5)
```

zcard(name)

```
#获取有序集合内元素的数量
```

zcount(name, min, max)

```
#获取有序集合中分数在[min,max]之间的个数
print(r.zcount("zset_name",1,5))
```

zincrby(name, value, amount)

```
#自增有序集合内value对应的分数
r.zincrby("zset_name","a1",amount=2)#自增zset_name对应的有序集合里a1对应的分数
```

zrange( name, start, end, desc=False, withscores=False, score_cast_func=float)

```
# 按照索引范围获取name对应的有序集合的元素
aa=r.zrange("zset_name",0,1,desc=False,withscores=True,score_cast_func=int)
print(aa)
'''参数：
    name    redis的name
    start   有序集合索引起始位置
    end     有序集合索引结束位置
    desc    排序规则，默认按照分数从小到大排序
    withscores  是否获取元素的分数，默认只获取元素的值
    score_cast_func 对分数进行数据转换的函数'''
```

zrevrange(name, start, end, withscores=False, score_cast_func=float)

```
#同zrange，集合是从大到小排序的
```

zrank(name, value)、zrevrank(name, value)

```
#获取value值在name对应的有序集合中的排行位置（从0开始）
print(r.zrank("zset_name", "a2"))

print(r.zrevrank("zset_name", "a2"))#从大到小排序
```

zscore(name, value)

```
#获取name对应有序集合中 value 对应的分数
print(r.zscore("zset_name","a1"))
```

zrem(name, values)

```
#删除name对应的有序集合中值是values的成员
r.zrem("zset_name","a1","a2")
```

zremrangebyrank(name, min, max)

```
#根据排行范围删除
```

zremrangebyscore(name, min, max)

```
#根据分数范围删除
```

zinterstore(dest, keys, aggregate=None)

```
r.zadd("zset_name", "a1", 6, "a2", 2,"a3",5)
r.zadd('zset_name1', a1=7,b1=10, b2=5)

# 获取两个有序集合的交集并放入dest集合，如果遇到相同值不同分数，则按照aggregate进行操作
# aggregate的值为: SUM  MIN  MAX
r.zinterstore("zset_name2",("zset_name1","zset_name"),aggregate="MAX")
print(r.zscan("zset_name2"))
```

zunionstore(dest, keys, aggregate=None)

```
#获取两个有序集合的并集并放入dest集合，其他同zinterstore，
```

其他常用操作

delete(*names)

```
#根据name删除redis中的任意数据类型
```

exists(name)

```
#检测redis的name是否存在
```

keys(pattern='*')

```
#根据* ？等通配符匹配获取redis的name
```

expire(name ,time)

```
# 为某个name设置超时时间
```

rename(src, dst)

```
# 重命名
```

move(name, db))

```
# 将redis的某个值移动到指定的db下
```

randomkey()

```
#随机获取一个redis的name（不删除）
```

type(name)

```
# 获取name对应值的类型
```

 

 