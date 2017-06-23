---
title: python发送邮件方法
tags: [python,邮件,前端]
categories: Python
---

**1、普通文本邮件**

```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import smtplib
from email.mime.text import MIMEText
mail_user="xxxx@126.com"    #发送邮件的邮箱
mail_pass="xxxxxxx"   #密码，口令
mailto_list="xxxxx@qq.com"   #接受邮件的邮箱
mail_host="smtp.126.com"  #设置服务器 例：smtp.126.com

strstr='你好' #内容
msg = MIMEText(strstr,'plain','utf-8')  #邮件类型设置为plain
msg['Subject'] = "主题" #主题
msg['From'] = mail_user
msg['To'] = mailto_list
#邮件中文如果显示乱码，可以加上下面两句
msg["Accept-Language"]="zh-CN"
msg["Accept-Charset"]="ISO-8859-1,utf-8"

server = smtplib.SMTP()
server.connect(mail_host)   #连接smtp邮件服务器
server.login(mail_user,mail_pass)   #登录
server.sendmail(mail_user, mailto_list, msg.as_string())      #发送
server.close()   #关闭
```

**2、HTML格式邮件**

```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
mail_user="xxxxxxx@126.com"    #发送邮件的邮箱
mail_pass="xxxxxx"   #口令
mailto_list="xxxxxx@qq.com"  #接收邮件的邮箱
to_list=[mailto_list,]
mail_host="smtp.126.com"  #设置服务器

msg = MIMEMultipart()
msg['Subject'] = "主题" #主题
msg['From'] = mail_user
msg['To'] = mailto_list
#正文
#<img src="cid:image1">为图片显示位置
strstr="""
<html>
<head>正文</head>
<body>
<h1>Hello</h1>
<h2>你们好</h2>
</body>
</html>
"""
htm=MIMEText(strstr,'html','utf-8')       #邮件类型设置为html
msg.attach(htm)

server = smtplib.SMTP()
server.connect(mail_host)   #连接smtp邮件服务器
server.login(mail_user,mail_pass)   #登录
server.sendmail(mail_user, to_list, msg.as_string())      #发送
server.close()   #关闭
```

**3、带附件的邮件**

```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
mail_user="xxxx@126.com"    #发送邮件的邮箱
mail_pass="xxxxxxx"   #口令
mailto_list="xxxxx@qq.com"  #接收邮件的邮箱
to_list=[mailto_list,]
mail_host="smtp.126.com"  #设置服务器

msg = MIMEMultipart()
msg['Subject'] = "主题" #主题
msg['From'] = mail_user
msg['To'] = mailto_list
#文字部分
strstr="Hello"  #文字内容
att = MIMEText(strstr,'plain','utf-8')
msg.attach(att)
#附件
att = MIMEApplication(open('E:\\111.txt','rb').read())  #你要发送的附件地址
att.add_header('Content-Disposition', 'attachment', filename="222.txt") #filename可随意取名
msg.attach(att)

server = smtplib.SMTP()
server.connect(mail_host)   #连接smtp邮件服务器
server.login(mail_user,mail_pass)   #登录
server.sendmail(mail_user, to_list, msg.as_string())    #发送
server.close()  #关闭
```

**4、正文显示图片的邮件**

```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
mail_user="xxxxx@126.com"    #发送邮件的邮箱
mail_pass="xxxxxx"   #口令
mailto_list="xxxxxx@qq.com"  #接收邮件的邮箱
to_list=[mailto_list,]
mail_host="smtp.126.com"  #设置服务器

msg = MIMEMultipart()
msg['Subject'] = "主题" #主题
msg['From'] = mail_user
msg['To'] = mailto_list
#正文
#<img src="cid:image1">为图片显示位置
strstr="""
<html>
<head>正文图片</head>
<body>
<p>Hello<br>
你们好<br>
<br><img src="cid:image1"></br> 
</p>
</body>
</html>
"""
htm=MIMEText(strstr,'html','utf-8')
msg.attach(htm)

image = MIMEImage(open("F:\\111.jpg",'rb').read())
image.add_header('Content-ID','<image1>')
msg.attach(image)

server = smtplib.SMTP()
server.connect(mail_host)
server.login(mail_user,mail_pass)
server.sendmail(mail_user,mailto_list,msg.as_string())
server.quit()
```