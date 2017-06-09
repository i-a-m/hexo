---
title: hexo-Maupassant主题
tags: [hexo,主题,前端]
categories: hexo
---
Maupassant最初是由Cho大神为Typecho平台设计开发的一套响应式模板，体积只有20KB，在各种尺寸的设备上表现出色。由于其简洁大气的风格受到许多用户喜爱，目前也已经被移植到了多个平台上，例如：

    Typecho：https://github.com/pagecho/maupassant/
    Octopress：https://github.com/pagecho/mewpassant/
    Farbox：https://github.com/pagecho/Maupassant-farbox/
    Wordpress：https://github.com/iMuFeng/maupassant/
    Ghost: https://github.com/LjxPrime/maupassant/

我在一年多以前使用Typecho博客程序的时候就用过这套主题（历史文章），后来更换至Hexo后不得不暂时放弃它，直到几个月前发现了由icylogic移植到Hexo的版本，喜出望外，立刻回归到Maupassant。

不过由icylogic最初移植的版本只保留了主题最基本的模块，跟Cho自己发布的Farbox版类似，无法满足大部分爱折腾的Hexoer的需要。因此，在这半年的使用过程中，我将icylogic的源码fork过来，陆陆续续添加了一些想要的功能，目前能够实现的功能已经跟当初Typecho平台上的版本差不多了。

我已经将修改后的代码发布在Github上，有兴趣的朋友可以下载试用，并欢迎反馈问题：
tufu9441
maupassant-hexo
####安装主题和渲染器：
```
$ git clone https://github.com/tufu9441/maupassant-hexo.git themes/maupassant
$ npm install hexo-renderer-jade@0.3.0 --save
$ npm install hexo-renderer-sass --save
```
编辑Hexo目录下的 _config.yml，将theme的值改为maupassant。

注：若npm install hexo-renderer-sass安装时报错，可能是国内网络问题，请尝试使用代理或者切换至淘宝NPM镜像安装，感谢光头强提供的方法。
功能配置

默认配置:
_config.yml
```
fancybox: true ## If you want to use fancybox please set the value to true.
duoshuo: ## Your duoshuo_shortname, e.g. username
disqus: ## Your disqus_shortname, e.g. username
uyan: ## Your uyan_id, e.g. 1234567
gentie: ## Your gentie_productKey, e.g. fc799538c7ad4cf5a5a0c2877a90cbd7
google_search: true ## Use Google search, true/false.
baidu_search: ## Use Baidu search, true/false.
swiftype: ## Your swiftype_key, e.g. m7b11ZrsT8Me7gzApciT
tinysou: ## Your tinysou_key, e.g. 4ac092ad8d749fdc6293
self_search: ## Use a jQuery-based local search engine, true/false.
google_analytics: ## Your Google Analytics tracking id, e.g. UA-42425684-2
baidu_analytics: ## Your Baidu Analytics tracking id, e.g. 8006843039519956000
show_category_count: false ## If you want to show the count of categories in the sidebar widget please set the value to true.
toc_number: true ## If you want to add list number to toc please set the value to true.
shareto: true ## If you want to use the share button please set the value to true.
busuanzi: true ## If you want to use Busuanzi page views please set the value to true.
widgets_on_small_screens: false ## Set to true to enable widgets on small screens.
menu:
  - page: home
    directory: .
    icon: fa-home
  - page: archive
    directory: archives/
    icon: fa-archive
  - page: about
    directory: about/
    icon: fa-user
  - page: rss
    directory: atom.xml
    icon: fa-rss
widgets: ## Six widgets in sidebar provided: search, category, tag, recent_posts, rencent_comments and links.
  - search
  - category
  - tag
  - recent_posts
  - recent_comments
  - links
links:
  - title: site-name1
    url: http://www.example1.com/
  - title: site-name2
    url: http://www.example2.com/
  - title: site-name3
    url: http://www.example3.com/

timeline:
  - num: 1
    word: 2014/06/12-Start
  - num: 2
    word: 2014/11/29-XXX
  - num: 3
    word: 2015/02/18-DDD
  - num: 4
    word: More

# Static files
js: js
css: css
# Theme version
version: 0.0.0
```

    fancybox - 是否启用Fancybox图片灯箱效果
    duoshuo - 多说评论 shortname
    disqus - Disqus评论 shortname
    uyan - 友言评论 id
    gentie - 网易云跟帖 productKey
    google_search - 默认使用Google搜索引擎
    baidu_search - 若想使用百度搜索，将其设定为true。
    swiftype - Swiftype 站内搜索key
    tinysou - 微搜索 key
    self_search - 基于jQuery的本地搜索引擎，需要安装hexo-generator-search插件使用。
    google_analytics - Google Analytics 跟踪ID
    baidu_analytics - 百度统计 跟踪ID
    show_category_count - 是否显示侧边栏分类数目
    toc_number - 是否显示文章中目录列表自动编号
    shareto - 是否使用分享按鈕
    busuanzi - 是否使用不蒜子页面访问计数
    widgets_on_small_screens - 是否在移动设备屏幕底部显示侧边栏
    menu - 自定义页面及菜单，依照已有格式填写。填写后请在source目录下建立相应名称的文件夹，并包含index.md文件，以正确显示页面。导航菜单中集成了FontAwesome图标字体，可以在这里选择新的图标，并按照相关说明使用。
    widgets - 选择和排列希望使用的侧边栏小工具。
    links - 友情链接，请依照格式填写。
    timeline - 网站历史时间线，在页面front-matter中设置layout: timeline可显示。
    Static files - 静态文件存储路径，方便设置CDN缓存。
    Theme version - 主题版本，便于静态文件更新后刷新CDN缓存。
#### 主题特性

##### 网站图标

若要设置网站Favicon，可以将favicon.ico放在Hexo根目录的source文件夹下，建议的大小：32px*32px。

若要为网站添加苹果设备图标，请将命名为apple-touch-icon.png的图片放在同样的位置，建议的大小：114px*114px。

##### 文章摘要

首页默认显示文章摘要而非全文，可以在文章的front-matter中填写一项description:来设置你想显示的摘要，或者直接在文章内容中插入<!--more-->以隐藏后面的内容。
若两者都未设置，则自动截取文章第一段作为摘要。

##### 添加页面

在source目录下建立相应名称的文件夹，然后在文件夹中建立index.md文件，并在index.md的front-matter中设置layout为layout: page。若需要单栏页面，就将layout设置为 layout: single-column。

##### 文章目录

在文章的front-matter中添加toc: true即可让该篇文章显示目录。

##### 文章评论

文章和页面的评论功能可以通过在front-matter中设置comments: true或comments: false来进行开启或关闭（默认开启）。

##### 语法高亮

要启用代码高亮，请在Hexo目录的_config.yml中将highlight选项按照如下设置：
```
highlight:
  enable: true
  auto_detect: true
  line_number: true
  tab_replace:
```
##### 数学公式

要启用数学公式支持，请在Hexo目录的_config.yml中添加：
```
mathjax: true
```
并在相应文章的front-matter中添加mathjax: true，例如：
```
title: Test Math
date: 2016-04-05 14:16:00
categories: math
mathjax: true
---
```
数学公式的默认定界符是$$...$$和\\[...\\]（对于块级公式），以及$...$和\\(...\\)（对于行内公式）。

但是，如果你的文章内容中经常出现美元符号“$”, 或者说你想将“$”用作美元符号而非行内公式的定界符，请在Hexo目录的_config.yml中添加：
```
mathjax2: true
```
而不是mathjax: true。 相应地，在需要使用数学公式的文章的front-matter中也添加mathjax2: true。

示例。

##### 支持语言

目前支持简体中文（zh-CN），繁体中文（zh-TW），英语（en），法语（fr-FR），德语（de-DE），韩语（ko）和西班牙语（es-ES），欢迎翻译至其它语言。
问题解决

    检查一下终端当前的目录是否为Hexo的根目录，并包含source/和themes/。

    使用过程中遇到问题欢迎提交issue。
