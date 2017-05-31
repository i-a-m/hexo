---
title: 树莓派搭建SVN
tags: [树莓派,物联网,linux]
categories: raspberry pi
---
1、首先需要安装Subversion软件：

```
sudo apt-get install subversion
```

2、创建仓库

```
svnadmin create /var/svn
```

/var/svn 为所创建仓库的路径，理论上可以是任何目录
3、修改配置文件/var/svn/conf/svnserve.conf

去掉#[general]前面的#号

```
[general]
#匿名访问的权限，可以是read,write,none,默认为read
anon-access = none
#认证用户的权限，可以是read,write,none,默认为write
auth-access = write
#密码数据库的路径，去掉前面的#
password-db = passwd
```

注意：所有的行都必须顶格，否则报错。 建议：为了防止不必要的错误，建议你直接用我上面的内容覆盖掉文件原来的内容.

4、修改配置文件passwd

```
[users]
svnuser = password
ukonline2000 = ukonline2000
```

注意：
一定要去掉[users]前面的#,否则svn只能以匿名用户登录，客户端不会出现登录窗口，除非你的anon不为none,否则将返回一个错误。
这里的密码都是没有加密的，我按照一些教程所说的用htpasswd生成的密码无法使用。

5、停止Subversion服务器：

```
killall svnserve
```

6、启动Subversion服务器 对于单个代码仓库,启动命令：

```
svnserve -d -r /var/svn
```

其中-d表示在后台运行，-r指定服务器的根目录，这样访问服务器时就可以直接 用svn://服务器ip来访问了。

另外,客户端推荐用TortoiseSVN。
