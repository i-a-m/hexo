# 使用 HTML5 开发离线应用

Web2.0 技术鼓励个人的参与，每个人都是 Web 内容的撰写者。如果 Web 应用能够提供离线的功能，让用户在没有网络的地方（例如飞机上）和时候（网络坏了），也能进行内容撰写，等到有网络的时候，再同步到 Web 上，就大大方便了用户的使用。HTML5 作为新一代的 HTML 标准，包含了对离线功能的支持。本文介绍了 HTML5 离线功能中的离线资源缓存、在线状态检测、本地数据存储等内容，并举例说明了如何使用 HTML5 的新特性开发离线应用。

## HTML5 离线功能介绍

HTML5 是目前正在讨论的新一代 HTML 标准，它代表了现在 Web 领域的最新发展方向。在 HTML5 标准中，加入了新的多样的内容描述标签，直接支持表单验证、视频音频标签、网页元素的拖拽、离线存储和工作线程等功能。其中一个新特性就是对离线应用开发的支持。

在开发支持离线的 Web 应用程序时，开发者通常需要使用以下三个方面的功能：

1. 离线资源缓存：需要一种方式来指明应用程序离线工作时所需的资源文件。这样，浏览器才能在在线状态时，把这些文件缓存到本地。此后，当用户离线访问应用程序时，这些资源文件会自动加载，从而让用户正常使用。HTML5 中，通过 cache manifest 文件指明需要缓存的资源，并支持自动和手动两种缓存更新方式。
2. 在线状态检测：开发者需要知道浏览器是否在线，这样才能够针对在线或离线的状态，做出对应的处理。在 HTML5 中，提供了两种检测当前网络是否在线的方式。
3. 本地数据存储：离线时，需要能够把数据存储到本地，以便在线时同步到服务器上。为了满足不同的存储需求，HTML5 提供了 DOM Storage 和 Web SQL Database 两种存储机制。前者提供了易用的 key/value 对存储方式，而后者提供了基本的关系数据库存储功能。

尽管 HTML5 还处于草稿状态，但是各大主流浏览器都已经实现了其中的很多功能。Chrome、Firefox、Safari 和 Opera 的最新版本都对 HTML5 离线功能提供了完整的支持。IE8 也支持了其中的在线状态检测和 DOM Storage 功能。下面将具体介绍 HTML5 离线功能中的离线资源缓存、在线状态检测、DOM Storage 和 Web SQL Database，最后通过一个简单的 Web 程序说明使用 HTML5 开发离线应用的方法。

## 离线资源缓存

为了能够让用户在离线状态下继续访问 Web 应用，开发者需要提供一个 cache manifest 文件。这个文件中列出了所有需要在离线状态下使用的资源，浏览器会把这些资源缓存到本地。本节先通过一个例子展示 cache manifest 文件的用途，然后详细描述其书写方法，最后说明缓存的更新方式。

### cache manifest 示例

我们通过 W3C 提供的示例来说明。Clock Web 应用由三个文件“clock.html”、“clock.css”和“clock.js”组成。

##### 清单 1. Clock 应用代码

```
 <!-- clock.html --> 
 <!DOCTYPE HTML> 
 <html> 
 <head> 
  <title>Clock</title> 
  <script src="clock.js"></script> 
  <link rel="stylesheet" href="clock.css"> 
 </head> 
 <body> 
  <p>The time is: <output id="clock"></output></p> 
 </body> 
 </html> 

 /* clock.css */ 
 output { font: 2em sans-serif; } 

 /* clock.js */ 
 setTimeout(function () { 
    document.getElementById('clock').value = new Date(); 
 }, 1000);
```

当用户在离线状态下访问“clock.html”时，页面将无法展现。为了支持离线访问，开发者必须添加 cache manifest 文件，指明需要缓存的资源。这个例子中的 cache manifest 文件为“clock.manifest”，它声明了 3 个需要缓存的资源文件“clock.html”、“clock.css”和“clock.js”。

##### 清单 2. clock.manifest 代码

```
 CACHE MANIFEST 
 clock.html 
 clock.css 
 clock.js
```

添加了 cache manifest 文件后，还需要修改“clock.html”，把 <html> 标签的 manifest 属性设置为“clock.manifest”。修改后的“clock.html”代码如下。

##### 清单 3. 设置 manifest 后的 clock.html 代码

```
 <!-- clock.html --> 
 <!DOCTYPE HTML> 
 <html manifest="clock.manifest"> 
 <head> 
  <title>Clock</title> 
  <script src="clock.js"></script> 
  <link rel="stylesheet" href="clock.css"> 
 </head> 
 <body> 
  <p>The time is: <output id="clock"></output></p> 
 </body> 
 </html>
```

修改后，当用户在线访问“clock.html”时，浏览器会缓存“clock.html”、“clock.css”和“clock.js”文件；而当用户离线访问时，这个 Web 应用也可以正常使用了。

### cache manifest 格式

下面说明书写 cache manifest 文件需要遵循的格式。

1. 首行必须是 CACHE MANIFEST。
2. 其后，每一行列出一个需要缓存的资源文件名。
3. 可根据需要列出在线访问的白名单。白名单中的所有资源不会被缓存，在使用时将直接在线访问。声明白名单使用 NETWORK：标识符。
4. 如果在白名单后还要补充需要缓存的资源，可以使用 CACHE：标识符。
5. 如果要声明某 URI 不能访问时的替补 URI，可以使用 FALLBACK：标识符。其后的每一行包含两个 URI，当第一个 URI 不可访问时，浏览器将尝试使用第二个 URI。
6. 注释要另起一行，以 # 号开头。

清单 4 的代码中给出了 cache manifest 中各类标识符的使用示例。

##### 清单 4. cache manifest 示例代码

```
 CACHE MANIFEST 
 # 上一行是必须书写的。

 images/sound-icon.png 
 images/background.png 

 NETWORK: 
 comm.cgi
```

\# 下面是另一些需要缓存的资源，在这个示例中只有一个 css 文件。

```
 CACHE: 
 style/default.css 

 FALLBACK: 
 /files/projects /projects
```

### 更新缓存

应用程序可以等待浏览器自动更新缓存，也可以使用 Javascript 接口手动触发更新。

1. 自动更新

   浏览器除了在第一次访问 Web 应用时缓存资源外，只会在 cache manifest 文件本身发生变化时更新缓存。而 cache manifest 中的资源文件发生变化并不会触发更新。

2. 手动更新

   开发者也可以使用 window.applicationCache 的接口更新缓存。方法是检测 window.applicationCache.status 的值，如果是 UPDATEREADY，那么可以调用 window.applicationCache.update() 更新缓存。示范代码如下。

   ##### 清单 5 手动更新缓存

   ```
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) 
   ｛
    window.applicationCache.update(); 
   ｝
   ```

## 在线状态检测

如果 Web 应用程序仅仅是一些静态页面的组合，那么通过 cache manifest 缓存资源文件以后，就可以支持离线访问了。但是随着互联网的发展，特别是 Web2.0 概念流行以来，用户的提交的数据渐渐成为互联网的主流。那么在开发支持离线的 Web 应用时，就不能仅仅满足于静态页面的展现，还必需考虑如何让用户在离线状态下也可以操作数据。离线状态时，把数据存储在本地；在线以后，再把数据同步到服务器上。为了做到这一点，开发者首先必须知道浏览器是否在线。HTML5 提供了两种检测是否在线的方式：navigator.online 和 online/offline 事件。

1. navigator.onLine

   navigator.onLine 属性表示当前是否在线。如果为 true, 表示在线；如果为 false, 表示离线。当网络状态发生变化时，navigator.onLine 的值也随之变化。开发者可以通过读取它的值获取网络状态。

2. online/offline 事件

   当开发离线应用时，通过 navigator.onLine 获取网络状态通常是不够的。开发者还需要在网络状态发生变化时立刻得到通知，因此 HTML5 还提供了 online/offline 事件。当在线 / 离线状态切换时，online/offline 事件将触发在 body 元素上，并且沿着 document.body、document 和 window 的顺序冒泡。因此，开发者可以通过监听它们的 online/offline 事件来获悉网络状态。

## DOM Storage

在开发支持离线功能的 Web 应用时，开发者需要在本地存储数据。当前浏览器支持的 cookie 虽然也可以用来存储数据，但是 cookie 长度非常小（通常几 k），而且功能有限。因此，HTML5 中新引入了 DOM Storage 机制，用于存储 key/value 对，它的设计目标是提供大规模、安全且易用的存储功能。

### DOM Storage 分类

DOM Storage 分为两类：sessionStorage 和 localStorage。除了以下区别外，这两类存储对象的功能是完全一致的。

1. sessionStorage 用于存储与当前浏览器窗口关联的数据。窗口关闭后，sessionStorage 中存储的数据将无法使用。
2. localStorage 用于长期存储数据。窗口关闭后，localStorage 中的数据仍然可以被访问。所有浏览器窗口可以共享 localStorage 的数据。

### DOM Storage 接口

每一个 Storage 对象都可以存储一系列 key/value 对，Storage 接口定义为：

```
 interface Storage { 
  readonly attribute unsigned long length; 
  getter DOMString key(in unsigned long index); 
  getter any getItem(in DOMString key); 
  setter creator void setItem(in DOMString key, in any data); 
  deleter void removeItem(in DOMString key); 
  void clear(); 
 };
```

其中最常用的接口是 getItem 和 setItem。getItem 用于获取指定 key 的 value，而 setItem 用于设置指定 key 的 value。

### DOM Storage 示例

这里给出一个使用了 sessionStorage 的例子，localStorage 的用法与它相同。首先使用 SetItem 添加了一个名为“userName”的项，它的值是“developerworks”。然后，调用 getItem 得到“userName”的值，并且弹出提示框显示它。最后，调用 removeItem 删除“userName”。

##### 清单 6 DOM Storage 示例代码

```
 <!DOCTYPE HTML> 
 <html> 
 <body> 
 <script> 
 // 在 sessionStorage 中定义'userName'变量
 sessionStorage.setItem('userName', 'developerworks');       
 // 访问'userName'变量
 alert("Your user is: " + sessionStorage.getItem('userName')); 
 // 最后删除'userName'
 sessionStorage.removeItem('userName');                       
 </script> 
 </body> 
 </html>
```

## Web SQL Database

除了 DOM Storage 以外，HTML5 中还有另外一种数据存储方式 Web SQL Database。它提供了基本的关系数据库功能，支持页面上的复杂的、交互式的数据存储。它既可以用来存储用户产生的数据，也可以作为从服务器获取数据的本地高速缓存。例如可以把电子邮件、日程等数据存储到数据库中。Web SQL Database 支持数据库事务的概念，从而保证了即使多个浏览器窗口操作同一数据，也不会产生冲突。

### Web SQL Database 基本用法

1. 创建和打开数据库

使用数据库的第一步是创建并打开数据库，API 是 openDatabase。当数据库已经存在时，openDatabase 仅仅打开数据库；如果这个数据库不存在，那么就创建一个空数据库并且打开它。openDatabase 的定义是：

```
  Database openDatabase(in DOMString name, in DOMString version, 
  in DOMString displayName, in unsigned long estimatedSize, 
  in optional DatabaseCallback creationCallback);
```

name：数据库名。

version：数据库版本。

displayName：显示名称。

estimatedSize：数据库预估长度（以字节为单位）。

creationCallback：回调函数。

1. 执行事务处理

   在打开数据库以后，就可以使用事务 API transaction。每一个事务作为操作数据库的原子操作，不会被打断，从而避免了数据冲突。transaction 的定义是：

   ```
    void transaction(in SQLTransactionCallback callback, 
    in optional SQLTransactionErrorCallback errorCallback, 
    in optional SQLVoidCallback successCallback);
   ```

   callback：事务回调函数，其中可以执行 SQL 语句。

   errorCallback：出错回调函数。

   successCallback：执行成功回调函数。

2. 执行 SQL 语句

   在事务的回调函数 callback 中，可以执行 SQL 语句，API 是 executeSQL。executeSQL 的定义是：

   ```
     void executeSql(in DOMString sqlStatement, 
     in optional ObjectArray arguments, in optional SQLStatementCallback callback, 
     in optional SQLStatementErrorCallback errorCallback);
   ```

   sqlStatement：SQL 语句。

   arguments：SQL 语句需要的参数。

   callback：回调函数。

   errorCallback：出错回调函数。

### Web SQL Database 示例

下面通过一个例子说明 Web SQL Database 的基本用法。它首先调用 openDatabase 创建了名为“fooDB”的数据库。然后使用 transaction 执行两条 SQL 语句。第一条 SQL 语句创建了名为“foo”的表，第二条 SQL 语句向表中插入一条记录。

##### 清单 7 Web SQL Database 示例代码

```
 var db = openDatabase('fooDB', '1.0', 'fooDB', 2 * 1024); 
 db.transaction(function (tx) { 
  tx.executeSql('CREATE TABLE IF NOT EXISTS foo (id unique, text)');  
  tx.executeSql('INSERT INTO foo (id, text) VALUES (1, "foobar")'); 
 });
```

## 离线应用示例

最后，通过一个例子来说明使用 HTML5 开发离线应用的基本方法。这个例子会用到前面提到的离线资源缓存、在线状态检测和 DOM Storage 等功能。假设我们开发一个便签管理的 Web 应用程序，用户可以在其中添加和删除便签。它支持离线功能，允许用户在离线状态下添加、删除便签，并且当在线以后能够同步到服务器上。

1. 应用程序页面

   这个程序的界面很简单，如图 1 所示。用户点击“New Note”按钮可以在弹出框中创建新的便签，双击某便签就表示删除它。

   ##### 图 1. 应用程序页面

   ​

   这个页面的源文件是 index.html，它的代码如清单 8 所示。

   ##### 清单 8 页面 HTML 代码

   ```
    <html manifest="notes.manifest"> 
    <head> 
    <script type="text/javascript" src="server.js"></script> 
    <script type="text/javascript" src="data.js"></script> 
    <script type="text/javascript" src="UI.js"></script> 
    <title>Note List</title> 
    </head> 

    <body onload = "SyncWithServer()"> 
    <input type="button" value="New Note" onclick="newNote()"> 
    <ul id="list"></ul> 
    </body> 
    </html>
   ```

   在 body 中声明了一个按钮和一个无序列表。当按下“New Note”按钮时，newNote 函数将被调用，它用来添加一条新的便签。而无序列表初始为空，它是用来显示便签的列表。

2. cache manifest 文件

   定义 cache manifest 文件，声明需要缓存的资源。在这个例子中，需要缓存“index.html”、“server.js”、“data.js”和“UI.js”等 4 个文件。除了前面列出的“index.html”外，“server.js”、“data.js”和“UI.js”分别包含服务器相关、数据存储和用户界面代码。cache manifest 文件定义如下。

   ##### 清单 9 cache manifest 文件

   ```
    CACHE MANIFEST 
    index.html 
    server.js 
    data.js 
    UI.js
   ```

3. 用户界面代码

   用户界面代码定义在 UI.js 中。

   ##### 清单 10 用户界面代码 UI.js

   ```
    function newNote() 
    { 
       var title = window.prompt("New Note:"); 
       if (title) 
       { 
           add(title); 
       } 
    } 

    function add(title) 
    { 
       // 在界面中添加
       addUIItem(title); 
       // 在数据中添加
       addDataItem(title); 
    } 

    function remove(title) 
    { 
       // 从界面中删除
       removeUIItem(title); 
       // 从数据中删除
       removeDataItem(title); 
    } 

    function addUIItem(title) 
    { 
       var item = document.createElement("li"); 
       item.setAttribute("ondblclick", "remove('"+title+"')"); 
       item.innerHTML=title; 

       var list = document.getElementById("list"); 
       list.appendChild(item);    
    }  

    function removeUIItem(title) 
    { 
       var list = document.getElementById("list"); 
       for (var i = 0; i < list.children.length; i++) { 
           if(list.children[i].innerHTML == title) 
           { 
               list.removeChild(list.children[i]); 
           } 
       } 
    }
   ```

   UI.js 中的代码包含添加便签和删除便签的界面操作。

   - 添加便签

   1. 用户点击“New Note”按钮，newNote 函数被调用。
   2. newNote 函数会弹出对话框，用户输入新便签内容。newNote 调用 add 函数。
   3. add 函数分别调用 addUIItem 和 addDataItem 添加页面元素和数据。addDataItem 代码将在后面列出。
   4. addUIItem 函数在页面列表中添加一项。并指明 ondblclick 事件的处理函数是 remove，使得双击操作可以删除便签。

   - 删除便签

   1. 用户双击某便签时，调用 remove 函数。
   2. remove 函数分别调用 removeUIItem 和 removeDataItem 删除页面元素和数据。removeDataItem 将在后面列出。
   3. removeUIItem 函数删除页面列表中的相应项。

4. 数据存储代码

   数据存储代码定义在 data.js 中。

   ##### 清单 11 数据存储代码 data.js

   ```
    var storage = window['localStorage']; 

    function addDataItem(title) 
    { 
       if (navigator.onLine) // 在线状态
       { 
           addServerItem(title); 
       } 
       else // 离线状态
       { 
           var str = storage.getItem("toAdd"); 
           if(str == null) 
           { 
               str = title; 
           } 
           else 
           { 
               str = str + "," + title; 
           } 
           storage.setItem("toAdd", str); 
       } 
    } 

    function removeDataItem(title) 
    { 
       if (navigator.onLine) // 在线状态
       { 
           removeServerItem(title); 
       } 
       else // 离线状态
       { 
           var str = storage.getItem("toRemove"); 
           if(str == null) 
           { 
               str = title; 
           } 
           else 
           { 
               str = str + "," + title; 
           } 
           storage.setItem("toRemove", str); 
       } 
    } 
     
    function SyncWithServer() 
    { 
       // 如果当前是离线状态，不需要做任何处理
       if (navigator.onLine == false)return; 

       var i = 0; 
       // 和服务器同步添加操作
       var str = storage.getItem("toAdd"); 
       if(str != null) 
       { 
           var addItems = str.split(","); 
           for(i = 0; i<addItems.length; i++) 
           { 
               addDataItem(addItems[i]); 
           } 
           storage.removeItem("toAdd"); 
       } 

       // 和服务器同步删除操作
       str = storage.getItem("toRemove"); 
       if(str != null) 
       { 
           var removeItems = str.split(","); 
           for(i = 0; i<removeItems.length; i++) 
           { 
               removeDataItem(removeItems[i]); 
           } 
           storage.removeItem("toRemove"); 
       } 

       // 删除界面中的所有便签   
       var list = document.getElementById("list"); 
       while(list.lastChild != list.firstElementChild) 
           list.removeChild(list.lastChild); 
       if(list.firstElementChild) 
           list.removeChild(list.firstElementChild);        

       // 从服务器获取全部便签，并显示在界面中
       var allItems = getServerItems(); 
       if(allItems != "") 
       { 
           var items = allItems.split(","); 
           for(i = 0; i<items.length; i++) 
           { 
               addUIItem(items[i]); 
           } 
       } 
    }
   ```

   window.addEventListener("online", SyncWithServer,false);

   data.js 中的代码包含添加便签、删除便签和与服务器同步等数据操作。其中用到了 navigator.onLine 属性、online 事件、DOM Storage 等 HTML5 新功能。

   - 添加便签：addDataItem

   1. 通过 navigator.onLine 判断是否在线。
   2. 如果在线，那么调用 addServerItem 直接把数据存储到服务器上。addServerItem 将在后面列出。
   3. 如果离线，那么把数据添加到 localStorage 的“toAdd”项中。

   - 删除便签：removeDataItem

   1. 通过 navigator.onLine 判断是否在线。
   2. 如果在线，那么调用 removeServerItem 直接在服务器上删除数据。removeServerItem 将在后面列出。
   3. 如果离线，那么把数据添加到 localStorage 的“toRemove”项中。

   - 数据同步：SyncWithServer

   在 data.js 的最后一行，注册了 window 的 online 事件处理函数 SyncWithServer。当 online 事件发生时，SyncWithServer 将被调用。其功能如下。

   1. 如果 navigator.onLine 表示当前离线，则不做任何操作。
   2. 把 localStorage 中“toAdd”项的所有数据添加到服务器上，并删除“toAdd”项。
   3. 把 localStorage 中“toRemove”项的所有数据从服务器中删除，并删除“toRemove”项。
   4. 删除当前页面列表中的所有便签。
   5. 调用 getServerItems 从服务器获取所有便签，并添加在页面列表中。getServerItems 将在后面列出。

5. 服务器相关代码

   服务器相关代码定义在 server.js 中。

   ##### 清单 12 服务器相关代码 server.js

   ```
    function addServerItem(title) 
    { 
       // 在服务器中添加一项
    } 

    function removeServerItem(title) 
    { 
       // 在服务器中删除一项
    } 

    function getServerItems() 
    { 
       // 返回服务器中存储的便签列表
    }
   ```

   由于这部分代码与服务器有关，这里只说明各个函数的功能，具体实现可以根据不同服务器编写代码。

   - 在服务器中添加一项：addServerItem
   - 在服务器中删除一项：removeServerItem
   - 返回服务器中存储的便签列表：getServerItems

## 总结

本文介绍了 HTML5 为了支持离线应用程序新增的强大功能。通过阅读本文，读者能够了解到 HTML5 中离线相关特性的基本用法，从而掌握利用 HTML5 开发 Web 离线应用的方法。