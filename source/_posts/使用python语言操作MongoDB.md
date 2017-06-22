---
title: 使用python语言操作MongoDB
tags: [Python,数据库,mongodb]
categories: Python
---
[MongoDB](http://lib.csdn.net/base/mongodb)是一个跨平台的NoSQL，基于Key-Value形式保存数据。其储存格式非常类似于[Python](http://lib.csdn.net/base/python)的字典，因此用[python](http://lib.csdn.net/base/python)操作[mongodb](http://lib.csdn.net/base/mongodb)会非常的容易。

------

**pymongo的两种安装命令**

```
pip install pymongo

easy_install pymongo
```

------

**Python操作MongoDB**

```
#encoding:utf=8  
import pymongo  

connection=pymongo.Connection('10.32.38.50',27017)  

#选择myblog库  
db=connection.myblog  

# 使用users集合  
collection=db.users  




#添加命令如下：  

# 添加单条数据到集合中  
user = {"name":"xiaoxu","age":"23"}  
collection.insert(user)     #添加数据
collection.save(users)      #添加数据

#同时添加多条数据到集合中  
users=[{"name":"xiaoxu","age":"23"},{"name":"xiaoli","age":"20"}]  
collection.insert(users)    #添加数据
collection.save(users)      #添加数据




#删除命令如下：
collection.remove({"name":"xiaoxu"})


#修改命令如下：
collection.update(xxxx)


#查询命令如下： 

#查询单条记录  
print collection.find_one()  

#查询所有记录  
for data in collection.find():  
    print data  

#查询此集合中数据条数  
print collection.count()  

#简单参数查询  
for data in collection.find({"name":"1"}):  
print data  

#使用find_one获取一条记录  
print collection.find_one({"name":"1"})  
12345678910111213141516171819202122232425262728293031323334353637383940414243444546474849505152535455561234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556
```

------

实例如下：

```
#-*-coding:utf8-*-
import pymongo

connection = pymongo.MongoClient()
tdb = connection.Jikexueyuan
post_info = tdb.test

jike = {'name':u'极客', 'age':'5', 'skill': 'Python'}
god = {'name': u'玉皇大帝', 'age': 36000, 'skill': 'creatanything', 'other': u'王母娘娘不是他的老婆'}
godslaver = {'name': u'月老', 'age': 'unknown', 'other': u'他的老婆叫孟婆'}
post_info.insert(jike)
post_info.insert(god)
post_info.insert(godslaver)
post_info.remove({'name': u'极客'})

print u'操作数据库完成！'
```