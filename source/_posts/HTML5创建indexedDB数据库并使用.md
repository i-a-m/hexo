---
title: HTML5创建indexedDB数据库并使用
tags: [前端,数据库,]
categories: 前端
---

# HTML5本地存储——Web SQL Database与indexedDB

虽然在HTML5 WebStorage介绍了html5本地存储的Local Storage和Session Storage，这两个是以键值对存储的解决方案，存储少量数据结构很有用，但是对于大量结构化数据就无能为力了，灵活大不够强大。我们经常在数据库中处理大量结构化数据，html5引入Web SQL Database概念，它使用 SQL 来操纵客户端数据库的 API，这些 API 是异步的，规范中使用的方言是SQLlite。这个文档曾经在W3C推荐规范上，但规范工作已经停止了。目前已经陷入了一个僵局：目前的所有实现都是基于同一个SQL后端（SQLite），但是我们需要更多的独立实现来完成标准化。

接下来将和W3C力推的IndexedDB做比较，看看为什么要废弃这种方案。Web SQL Database 规范中定义的三个核心方法：

1. openDatabase：这个方法使用现有数据库或新建数据库来创建数据库对象
2. transaction：这个方法允许我们根据情况控制事务提交或回滚
3. executeSql：这个方法用于执行SQL 查询。

openDatabase

我们可以使用这样简单的一条语句，创建或打开一个本地的数据库对象

```
var db = openDatabase('testDB', '1.0', 'Test DB', 2 * 1024 * 1024);
```

openDatabase接收五个参数：

1. 数据库名字
2. 数据库版本号
3. 显示名字
4. 数据库保存数据的大小（以字节为单位 )
5. 回调函数（非必须)

如果提供了回调函数，回调函数用以调用 changeVersion() 函数，不管给定什么样的版本号，回调函数将把数据库的版本号设置为空。如果没有提供回调函数，则以给定的版本号创建数据库。

transaction方法用以处理事务，当一条语句执行失败的时候，整个事务回滚。方法有三个参数

1. 包含事务内容的一个方法
2. 执行成功回调函数（可选）
3. 执行失败回调函数（可选）

```
db.transaction(function (context) {
```

这个例子中，中我们创建了一个table，并在表中插入三条数据，四条执行语句任何一条出现错误，整个事务都会回滚

executeSql方法用以执行SQL语句，返回结果，方法有四个参数

1. 查询字符串
2. 用以替换查询字符串中问号的参数
3. 执行成功回调函数（可选）
4. 执行失败回调函数（可选）

![HTML5 创建indexedDB数据库并使用](http://p3.pstatp.com/large/2ed40004c6af518f9080)

```
db.transaction(function (context) {
```

![HTML5 创建indexedDB数据库并使用](http://p3.pstatp.com/large/2ed40004c6af518f9080)

由于Web SQL Database规范已经被废弃，原因说的很清楚，当前的SQL规范采用SQLite的SQL方言，而作为一个标准，这是不可接受的，每个浏览器都有自己的实现这还搞毛的标准。这样浏览器兼容性就不重要了，估计慢慢会被遗忘。

indexedDB——浏览器里边的内置数据库

IndexedDB是HTML5规范里新出现的浏览器里内置的数据库。对于在浏览器里存储数据，你可以使用cookies或local storage，但它们都是比较简单的技术，而IndexedDB提供了类似数据库风格的数据存储和使用方式。存储在IndexedDB里的数据是永久保存，不像cookies那样只是临时的。IndexedDB里提供了查询数据的功能，在online和offline模式下都能使用。你可以用IndexedDB存储大型数据。

IndexedDB里数据以对象的形式存储，每个对象都有一个key值索引。IndexedDB里的操作都是事务性的。一种对象存储在一个objectStore里，objectStore就相当于关系数据库里的表。IndexedDB可以有很多objectStore，objectStore里可以有很多对象。每个对象可以用key值获取。

1、indexedDB VS LocalStorage

IndexedDB和LocalStorage都是用来在浏览器里存储数据，但它们使用不同的技术，有不同的用途，你需要根据自己的情况适当的选择使用哪种。LocalStorage是用key-value键值模式存储数据，但跟IndexedDB不一样的是，它的数据并不是按对象形式存储。它存储的数据都是字符串形式。如果你想让LocalStorage存储对象，你需要借助`JSON.stringify()`能将对象变成字符串形式，再用`JSON.parse()`将字符串还原成对象。但如果要存储大量的复杂的数据，这并不是一种很好的方案。毕竟，localstorage就是专门为小数量数据设计的，它的api是同步的。

IndexedDB很适合存储大量数据，它的API是异步调用的。IndexedDB使用索引存储数据，各种数据库操作放在事务中执行。IndexedDB甚至还支持简单的数据类型。IndexedDB比localstorage强大得多，但它的API也相对复杂。

对于简单的数据，你应该继续使用localstorage，但当你希望存储大量数据时，IndexedDB会明显的更适合，IndexedDB能提供你更为复杂的查询数据的方式。

2、IndexedDB vs Web SQL

WebSQL也是一种在浏览器里存储数据的技术，跟IndexedDB不同的是，IndexedDB更像是一个NoSQL数据库，而WebSQL更像是关系型数据库，使用SQL查询数据。W3C已经不再支持这种技术。因为不再支持上面也大致分析了其用法，也就不再赘诉。

3、IndexedDB vs Cookies

Cookies(小甜点)听起来很好吃，但实际上并不是。每次HTTP接受和发送都会传递Cookies数据，它会占用额外的流量。例如，如果你有一个10KB的Cookies数据，发送10次请求，那么，总计就会有100KB的数据在网络上传输。Cookies只能是字符串。浏览器里存储Cookies的空间有限，很多用户禁止浏览器使用Cookies。所以，Cookies只能用来存储小量的非关键的数据。

4、IndexedDB的用法

想要理解这个API，最好的方法是创建一个简单的web应用：比如把你们班的学生的学号和姓名存储在IndexedDB里。IndexedDB里提供了简单的增、删、改、查接口。

(1)、浏览器是否支持：

```
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
```

```
if(!window.indexedDB){
```

(2)、创建

```
 一旦你的浏览器支持IndexedDB，我们就可以打开它。但不能直接打开IndexedDB数据库。IndexedDB需要你创建一个请求来打开它。
```

```

```

```
var request = window.indexedDB.open("testDB", 2);//第一个参数是数据库的名称，第二个参数是数据库的版本号。版本号可以在升级数据库时用来调整数据库结构和数据
```

但你增加数据库版本号时，会触发`onupgradeneeded`事件，这时可能会出现成功、失败和阻止事件三种情况。

```
var db;
```

![HTML5 创建indexedDB数据库并使用](http://p1.pstatp.com/large/2ed500012f303b49eb31)

```
　　onupgradeneeded

```

```
onupgradeneeded
```

```
onsuccess
```

```
onerror
```

```
onblocked
```

![HTML5 创建indexedDB数据库并使用](http://p1.pstatp.com/large/2ed40004c87fd774da52)

(3)增——往ObjectStore里新增对象

```
//为了往数据库里新增数据，我们首先需要创建一个事务，并要求具有读写权限。在indexedDB里任何的存取对象的操作都需要放在事务里执行。var transaction = db.transaction(["students"],"readwrite");
```

(4)删——ObjectStore里删除对象

```
//删除跟新增一样，需要创建事务，然后调用删除接口，通过key删除对象。
db.transaction(["students"],"readwrite").objectStore("students").delete(rollNo);
```

(5)查——通过key取出对象，即往`get()`方法里传入对象的key值，取出相应的对象。

```
var request = db.transaction(["students"],"readwrite").objectStore("students").get(rollNo);
```

(6)改—— 为了更新一个对象，首先要把它取出来，修改，然后再放回去。

```
var transaction = db.transaction(["students"],"readwrite");var objectStore = transaction.objectStore("students");var request = objectStore.get(rollNo);
```