---
title: fedora清理垃圾
tags: [fedora,清理垃圾,linux]
categories: fedora
---
清除缓存目录(/var/cache/yum)下的软件包
yum clean packages

清除缓存目录(/var/cache/yum)下的 headers
yum clean headers

清除缓存目录(/var/cache/yum)下旧的 headers
yum clean oldheaders

清除缓存目录(/var/cache/yum)下的软件包及旧的headers
yum clean, yum clean all (= yum clean packages; yum clean oldheaders)

删除废旧内核（升级完系统后通常会有好几个内核)：
`rpm
 -qa | grep kernel // 查看并列出所有内核
   rpm -e kernel的名字 // 删除选定名字的内核`
