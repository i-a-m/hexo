---
title: node+hexo
tags: [hexo,前端,node,js]
categories: hexo
---

安装nodejs

```
sudo dnf install nodejs
```

会同时安装npm

检查是否成功

```
node -v
npm -v
```

成功会显示版本号

安装hexo

```
$ npm install -g hexo-cli
```

如果出现npm error

则：

```
$ sudo npm install -g hexo-cli
```

## 初始化

在电脑的某个地方新建一个名为hexo的文件夹（名字可以随便取），比如我的是`F:\Workspaces\hexo`，由于这个文件夹将来就作为你存放代码的地方，所以最好不要随便放。

```
$ cd /f/Workspaces/hexo/
$ hexo init
```

```
$ hexo g # 生成
$ hexo s # 启动服务
```

如果hexo安装成功，则在C:\hexo文件夹下的文件目录为

```

.
├── _config.yml // 网站的配置信息，你可以在此配置大部分的参数。
├── package.json
├── scaffolds // 模板文件夹。当你新建文章时，Hexo会根据scaffold来建立文件。
├── source // 存放用户资源的地方
|   ├── _drafts
|   └── _posts
└── themes // 存放网站的主题。Hexo会根据主题来生成静态页面。
```

之后输入

```
hexo server
```

此时会启动本地部署好的默认的博客网站 地址是：[http://localhost:4000/](http://localhost:4000/)
不出意外 这里应该是没啥问题的。。

#### 创建Github账号

访问Github官网进行注册 ，这里没啥好说的。

#### 创建与账号同名的Repository

一定要同名的Repository，比如帐号是myid,那新建的Repository名称应该是myid.github.io

#### 配置SSH

##### (1) 生成SSH

检查是否已经有SSH Key，打开Git Bash，输入

cd ~/.ssh
如果没有这个目录，则生成一个新的SSH，输入

```
ssh-keygen -t rsa -C "your e-mail"
```

其中，your e-mail是你注册Github时用到的邮箱。

然后接下来几步都直接按回车键，最后生成如下

[![rsa](http://i.imgur.com/RSCTurW.jpg)](http://i.imgur.com/RSCTurW.jpg)

##### (2) 复制公钥内容到Github账户信息中

打开~/.ssh/id_rsa.pub文件，复制里面的内容；

打开Github官网，登陆后进入到个人设置(点击头像->setting)，点击右侧的SSH Keys，点击Add SSH key；填写title之后，将之前复制的内容粘贴到Key框中，最后点击Add key即可。

##### (3) 测试SSH是否配置成功

输入

```
ssh -T git@github.com
```

如果显示以下，则说明ssh配置成功。

```
Hi username! You've successfully authenticated, but GitHub does not
provide shell access.
```

##### (4) 配置github 账户

```
git config --global user.name "username"
git config --global user.email "email"
```

配置完之后输入：

```
git config --list查看已设配置
```

看username ,email是不是都对了

将网站发布到Github的同名repository中

打开C:\Hexo文件夹中的_config.yml文件，找到如下位置，填写

```
# Deployment
## Docs: http://hexo.io/docs/deployment.html
deploy:
  type: git
  repo: git@github.com:MyGithub/MyGithub.github.io
```

注： (1) 其中MyGithub替换成你的Github账户; (2)注意在yml文件中，:后面都是要带空格的。

此时，通过访问[http://MyGithub.github.io可以看到默认的Hexo首页面（与之前本地测试时一样）。](http://MyGithub.github.io%E5%8F%AF%E4%BB%A5%E7%9C%8B%E5%88%B0%E9%BB%98%E8%AE%A4%E7%9A%84Hexo%E9%A6%96%E9%A1%B5%E9%9D%A2%EF%BC%88%E4%B8%8E%E4%B9%8B%E5%89%8D%E6%9C%AC%E5%9C%B0%E6%B5%8B%E8%AF%95%E6%97%B6%E4%B8%80%E6%A0%B7%EF%BC%89%E3%80%82)

### 选择Hexo主题及发表文章

#### (1) 下载Next主题

我自己用的是Next主题，有很多版本，我没有使用最新的，用了个5.1.1版本 [下载地址](http://pan.baidu.com/s/1bJXJdG)

下载之后解压，重命名为next,拷贝到C:\hexo\themes 目录中即可

#### (2) 修改网站的主题为Next

打开C:\Hexo下的_config.yml文件，找到theme字段，将其修改为next

```
# Extensions
## Plugins: http://hexo.io/plugins/
## Themes: http://hexo.io/themes/
theme: next
```

#### (3) 本地验证是否可用

输入

```
hexo s --debug
```

访问本地网站[http://localhost:4000/](http://localhost:4000/)，确认网站主题是否切换为Next.

#### (4) 更新Github

在git中进入网站根目录

```
$ cd c:/hexo
$ hexo -g #编译本地内容
$ hexo -d #发布到github
```

这里可能会报错，如果提示需要安装hexo-deployer-git插件，就执行以下语句：

```
$ npm install hexo-deployer-git
```

之后重新部署发布即可

### 发布文章

这里可以参考hexo的官方文档，通过命令的形式来玩

```
hexo n "name of the new post"
```

回车后，在source文件夹下的_post文件夹下，可以看到新建了一个name of the new post.md的文件
也可以到C:\hexo\source_posts 目录下直接新建.md 结尾的文件就可以了，所以平时如果写了markdown格式的文档可以拷贝到这个路径下直接就发布了

完了之后走一遍：

```
hexo g -d
```

关于文章，注意需要使用markdown语法进行书写,这里推荐一个markdown的[简明语法介绍](http://ibruce.info/2013/11/26/markdown/)

### Goddady 域名与github博客地址绑定

截止到目前为止，你应该可以通过访问[http://MyGithub.github.io](http://MyGithub.github.io)来看到以上创建的网站了。

但是，如何拥有一个属于自己的域名地址，并将其指向在Github上所创建的网站呢？

#### 注册域名

我选择了国外的[Goddady](https://sg.godaddy.com/zh?isc=gennbacn29&countrview=1&currencytype=CNY&mkwid=WFSMCUdy&cvosrc=ppc.baidu)进行域名的注册  花了我29大洋申请了个域名[barrysite.me](http://barrysite.me/),怎么注册买东西这里不说。只谈绑定操作

##### 进入godaddy DNS 管理界面

##### 修改如下两个地方

[![1](https://github.com/lubaolei161/blogMaterial/blob/master/1.jpg?raw=true)](https://github.com/lubaolei161/blogMaterial/blob/master/1.jpg?raw=true)

类型为A的地方，IP地址修改为Githup服务器ip地址，通过以下命令获取：

```
ping github.io
```

类型为CNAME的地方，值修改为博客地址 如：lubaolei161.github.io

##### 添加CNAME文件到Github对应的repository

这里注意的是不要直接在github上建立这个文件，要在hexo的sources目录下新建个CNAME
内容就是你购买的域名,如我的：

```
barrysite.me
```

之后重新部署发布即可。 至此，可以通过自己的域名直接访问博客了。[我的博客地址](http://barrysite.me)

### Hexo Next主题下基本配置

列举了安装之后如何订制你的博客，请参考我的另一篇文章：
[Hexo Next主题下基本配置](http://barrysite.me/2017/05/07/Hexo%20Next%E4%B8%BB%E9%A2%98%E4%B8%8B%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE/)

hexo支持markdown，如何编辑文章并且发布到hexo博客网站上去？

**步骤如下：**

 1、选择一个markdown编辑器，编写文章，比如我使用markdownPad,

地址：[http://www.markdownpad.com/download.html](http://www.markdownpad.com/download.html)   ，编写好之后，保存为md文件。

还可以使用一些在线的markdown编辑器，比如csdn提供的[http://write.blog.csdn.net/mdeditor](http://write.blog.csdn.net/mdeditor)

也支持导出md文件，还支持图片，反而markdownPad选择图片功能要付钱呢



2、将md文件放在你的hexo网站所在位置下的source\_posts目录，这个目录下存储了很多个md文件，每个文件对应着一篇博客。



3、打开git bash,达到hexo网站的目录下，使用hexo generete 命令产生静态文件



4、hexo server ,然后到[http://localhost:4000/](http://localhost:4000/)预览网站效果，最后同步public目录下的文件到github 上就行啦。

## 写博客

定位到我们的hexo根目录，执行命令：

```
hexo new 'my-first-blog'
```

hexo会帮我们在`_posts`下生成相关md文件：

我们只需要打开这个文件就可以开始写博客了，默认生成如下内容：

当然你也可以直接自己新建md文件，用这个命令的好处是帮我们自动生成了时间。

一般完整格式如下：

```
---
title: postName #文章页面上的显示名称，一般是中文
date: 2013-12-02 15:30:16 #文章生成时间，一般不改，当然也可以任意修改
categories: 默认分类 #分类
tags: [tag1,tag2,tag3] #文章标签，可空，多标签请用格式，注意:后面有个空格
description: 附加一段文章摘要，字数最好在140字以内，会出现在meta的description里面
---

以下是正文
```

那么`hexo new page 'postName'`命令和`hexo new 'postName'`有什么区别呢？

```
hexo new page "my-second-blog"
```

生成如下：

最终部署时生成：`hexo\public\my-second-blog\index.html`，但是它不会作为文章出现在博文目录。

### 写博客工具

那么用什么工具写博客呢？这个我还没去找，以前自己使用editor.md简单弄了个，大家有好用的hexo写博客工具可以推荐个。

### 如何让博文列表不显示全部内容

默认情况下，生成的博文目录会显示全部的文章内容，如何设置文章摘要的长度呢？

答案是在合适的位置加上`<!--more-->`即可，例如：

```
# 前言

使用github pages服务搭建博客的好处有：

1. 全是静态文件，访问速度快；
2. 免费方便，不用花一分钱就可以搭建一个自由的个人博客，不需要服务器不需要后台；
3. 可以随意绑定自己的域名，不仔细看的话根本看不出来你的网站是基于github的；

<!--more-->

4. 数据绝对安全，基于github的版本管理，想恢复到哪个历史版本都行；
5. 博客内容可以轻松打包、转移、发布到其它平台；
6. 等等；
```
