---
title: NodeJS与MongoDB的交互
tags: [nodejs,前端,mongodb]
categories: nodejs
---
## 简介

#### MongoDB

开源，高性能的NoSQL数据库；支持索引、集群、复制和故障转移、各种语言的驱动程序；高伸缩性；

NoSQL毕竟还处于发展阶段，也有说它的各种问题的： [http://coolshell.cn/articles/5826.html](http://coolshell.cn/articles/5826.html)

官网地址： [http://www.mongodb.org/](http://www.mongodb.org/)

API Docs： [http://docs.mongodb.org/manual/](http://docs.mongodb.org/manual/)

#### node-mongodb-native

mongodb的nodejs驱动；

GitHub地址： [https://github.com/mongodb/node-mongodb-native](https://github.com/mongodb/node-mongodb-native)

## MongoDB安装(windows)

官方安装说明： [http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/)

按照官方说明在win7 64位环境下配置还是遇到了问题，我还是把我安装配置的过程写一下

#### 下载MongoDB并安装

下载地址： [http://www.mongodb.org/downloads](http://www.mongodb.org/downloads)

#### 创建数据库和日志存放目录

在C盘根目录下新建“M_DB”和“M_LOG”两个文件夹，分别存放数据库文件和日志文件

#### 创建一个config文件

打开目录“C:\Program Files\MongoDB 2.6 Standard\bin”，并在此目录下新建一个mongo.config文件，文件内容如下

```
##数据库目录
dbpath=C:\M_DB

##日志输出文件
logpath=C:\M_LOG\mongodb.log
```

#### 添加环境变量

在环境变量PATH中加入“C:\Program Files\MongoDB 2.6 Standard\bin“

#### 以Windows服务器运行MongoDB

以管理员方式打开CMD窗口，运行如下命令安装MongoDB服务，可以在 “控制面板\所有控制面板项\管理工具\服务”找到名为“MongoDB”的服务右键启动

```
mongod --config "C:\Program Files\MongoDB 2.6 Standard\bin\mongo.config" --install
```

#### 启动服务

在CMD窗口中运行如下命令，也可以在可以在 “控制面板\所有控制面板项\管理工具\服务”

```
net start mongodb
```

#### 测试连接

在CMD中运行如下命令，查看结果

```
mongo
```

![img](http://img1.tuicool.com/E32iaaN.png!web)

#### 安装成功！

最后两步非必需；MongoDB默认端口是27017，可以修改！

对于“C:\Program Files\MongoDB 2.6 Standard\bin”目录下的exe程序，做个简单的说明，可能更利于了解可以做些什么操作，基础学习关注mongod.exe和mongo.exe即可

mongo.exe：客户端，支持js语法

mongod.exe：服务端

mongodump.exe：备份工具

mongorestore.exe：恢复工具

mongoexport.exe：导出工具

mongoimport.exe：导入工具

mongostat.exe：实时性能监控工具

mongotop.exe：跟踪MongDB实例读写时间工具

更多详细解释或操作可以查看： [http://docs.mongodb.org/manual/reference/program/](http://docs.mongodb.org/manual/reference/program/)

## MongoDB基本语法和操作入门(mongo.exe客户端操作)

MongoDB已经安装好，下面先对MongoDB进行一个简单的入门，再用 [node-mongodb-native](https://github.com/mongodb/node-mongodb-native)去操作MongoDB

新建数据库：第一步：use 新建数据库名；第二步：进行此库相关的操作；如果不进行第二步，该数据库不会被创建

查看数据库：show dbs;

新建表：db.createCollection('要新建的表名');

查看当前数据库下表： show collections;

删除当前数据库指定表：db.表名.drop();

删除当前数据库：db.dropDatabase();

示例操作如下图：

![img](http://img0.tuicool.com/B3eIRz.png!web)

1.默认为存在“admin”和“local”两个数据库；admin数据库是存放管理员信息的数据库，认证会用到；local是存放replication相关的数据；这两处本篇都没有涉及到；

2.find();是个查询操作，后面会讲到，上面用到主要是为了演示use不存在的库后，进行相关操作会创建出这个库；

3.MongoDB没有像MySQL或MSSQL等数据库这么严格的规定，不是非得要先建库、建表、建各种字段，以后的操作中慢慢的会体会到^_^！

方法一：db.表名.insert(数据);

![img](http://img1.tuicool.com/6feE7z.png!web)

1.从上图操作可以看出，没有去创建“tb1”表，其实通过插入操作也会自动创建

2._id，是mongodb自已生成的，每行数据都会存在，默认是ObjectId，可以在插入数据时插入这个键的值(支持mongodb支持的所有数据类型)

方法二：db.表名.save(数据);

![img](http://img2.tuicool.com/rqiEfy.png!web)

1.从上图操作可以看出，save也可达到insert一样的插入效果

2._id可以自已插入

3.一个表中不一定要字段都相同

那它们有什么区别?

![img](http://img1.tuicool.com/BJvANbn.png!web)

从图中操作就可以看出，虽然insert和save方法都可以插入数据，当默认的“_id”值已存在时，调用insert方法插入会报错；而save方法不会,会更新相同的_id所在行数据的信息

查询表中所有数据：db.表名.find();

按条件查询（支持多条件）：db.表名.find(条件);

查询第一条（支持条件）：db.表名.findOne(条件);

限制数量：db.表名.find().limit(数量);

跳过指定数量：db.表名.find().skip(数量);

![img](http://img2.tuicool.com/vInY3a.png!web)

从上图中可以看出具体用法，批量插入默认数据我用了一个javascript语法循环；

比较查询

大于：$gt

小于：$lt

大于等于：$gte

小于等于：$lte

非等于：$ne

![img](http://img0.tuicool.com/AJBnui.png!web)

上面看到了AND的关系，或者的关系应该怎么用？

或者：$or

![img](http://img0.tuicool.com/zee6jmf.png!web)

in和not in查询(包含、不包含)

$in

$nin

![img](http://img2.tuicool.com/u2ie6r2.png!web)

查询数量：db.表名.find().count();

排序：db.表名.find().sort({"字段名":1});

1：表示升序  -1：表示降序

指定字段返回： db.表名.find({},{"字段名":0});

1：返回  0：不返回

![img](http://img2.tuicool.com/2UvYz2.png!web)

查询就讲到这里了，感觉查询示例一下讲不完，还有些高级查询，大家自行去了解一下吧^_^!

前面save在_id字段已存在是就是修改操作，按指定条件修改语法如下

db.表名.update({"条件字段名":"字段值"},{$set:{"要修改的字段名":"修改后的字段值"}});

![img](http://img0.tuicool.com/3AzMV3.png!web)

db.表名.remove(条件);

![img](http://img2.tuicool.com/zQzIru.png!web)

#### 存储过程

创建存储过程：

```
db.system.js.save({_id:"存储过程ID", 
value:function(参数){  
        -- 逻辑主体; 
        return 返回; 
}});                
```

调用存储过程

```
db.eval("存储过程ID()");
```

![img](http://img0.tuicool.com/z267Fz3.png!web)

所有存储过程都存放在db.system.js中

MongoDB基本操作就讲这么多了，基本够用，深入学习大家自已去看看API^_^!

## nodejs操作MongoDB

先用npm安装mongodb

```
npm install mongodb
```

安装成功后，继续在上面操作创建的库和表中操作

![img](http://img1.tuicool.com/NJRVnm.png!web)

```
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/wilsondb1';	
var insertData = function(db, callback) {  
	//连接到表  
	var collection = db.collection('tb2');
	//插入数据
	var data = [{"name":'wilson001',"age":21},{"name":'wilson002',"age":22}];
	collection.insert(data, function(err, result) { 
		if(err)
		{
			console.log('Error:'+ err);
			return;
		}	 
		callback(result);
	});
}
MongoClient.connect(DB_CONN_STR, function(err, db) {
	console.log("连接成功！");
	insertData(db, function(result) {
		console.log(result);
		db.close();
	});
});

```

示例源码

#### 查询

![img](http://img1.tuicool.com/JnAVji.png!web)

```
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/wilsondb1';  

var selectData = function(db, callback) {  
  //连接到表  
  var collection = db.collection('tb2');
  //查询数据
  var whereStr = {"name":'wilson001'};
  collection.find(whereStr).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }     
    callback(result);
  });
}

MongoClient.connect(DB_CONN_STR, function(err, db) {
  console.log("连接成功！");
  selectData(db, function(result) {
    console.log(result);
    db.close();
  });
});
```

示例源码

#### 修改

![img](http://img0.tuicool.com/ieu2yy.png!web)

```
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/wilsondb1';	
var updateData = function(db, callback) {  
	//连接到表  
	var collection = db.collection('tb2');
	//更新数据
	var whereStr = {"name":'wilson001'};
	var updateStr = {$set: { "age" : 100 }};
	collection.update(whereStr,updateStr, function(err, result) {
		if(err)
		{
			console.log('Error:'+ err);
			return;
		}	 
		callback(result);
	});
}
MongoClient.connect(DB_CONN_STR, function(err, db) {
	console.log("连接成功！");
	updateData(db, function(result) {
		console.log(result);
		db.close();
	});
});

```

示例源码

#### 删除

![img](http://img0.tuicool.com/NfMV7zI.png!web)

```
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/wilsondb1';  

var delData = function(db, callback) {  
  //连接到表  
  var collection = db.collection('tb2');
  //删除数据
  var whereStr = {"name":'wilson001'};
  collection.remove(whereStr, function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }     
    callback(result);
  });
}

MongoClient.connect(DB_CONN_STR, function(err, db) {
  console.log("连接成功！");
  delData(db, function(result) {
    console.log(result);
    db.close();
  });
});
```

示例源码

#### 调用存储过程

![img](http://img1.tuicool.com/j6fMreb.png!web)

```
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/wilsondb1';	
var invokeProcData = function(db, callback) {  
	//存储过程调用
	db.eval('get_tb2_count()', function(err, result) { 
		if(err)
		{
			console.log('Error:'+ err);
			return;
		}			 
		callback(result);
	});
}
MongoClient.connect(DB_CONN_STR, function(err, db) {
	console.log("连接成功！");
	invokeProcData(db, function(result) {
		console.log(result);
		db.close();
	});
});

```

示例源码

到此CRUD操作就完成，通过回调函数的result参数进行判断都可以进行业务逻辑的进一步组合！

## 写在之后...

本篇针对 [node-mongodb-native](https://github.com/mongodb/node-mongodb-native) 操作MongoDB没有做更深的讲解，原因是针对它的进行再次封装的东西很多，且更利于编程实现，比如： [mongoose](https://github.com/LearnBoost/mongoose) 、 [mongoskin](https://github.com/kissjs/node-mongoskin) 、 [mongolian](https://github.com/marcello3d/node-mongolian) 等等，应用性不错；

mongoose的可能用的比较多...

本文中很多地方我都还是习惯的用表、行等术语去描述，其实对NoSQL来说并不对，只是有助于习惯了关系型数据库的开发人员来解；

文章中“表”本应该描述为“collection(集合)”；“行”应该描述为“文档（document）”,一个database中可以有多个collection，一个collection中又可以有多个document

文章中并没有涉及认证的部分，大家自行去补一下，非常简单，我文中也挺到了两个默认数据库中的“admin”数据库

用CMD中使用mongo.exe操作时，插入中文遇一了问题，原因是MongoDB默认编辑是utf-8，而CMD是GBK，所以在CMD窗口中执行这个命令修改编辑即可：chcp 65001

注意mongodb严格区分大小写，比如查询 db.tb2.find({"name":"wilson0"})和 db.tb2.find({"Name":"wilson0"}) 并不是用的同一字段做的条件；