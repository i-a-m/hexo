---
title: Python之微信聊天机器人
tags: [Python,机器学习]
categories: Python
---
本教程适合于有一定编程经验的同学，使用Python3，在Jupyter进行调试开发。

最近聊天机器人很火，要想开发从头开发一个工作量比较大，这里使用第三方库ChatBot和wxpy进行开发。这里简单感受下聊天机器人的魅力，如要深入研究，可以从这些的源代码入手进行学习。

- ChatBot

  ChatterBot是一个基于机器学习的聊天机器人引擎,可以从已有的对话中学习。它的原理是每当用户输入一句话，机器人将存下它，同时也存下答复的句子。 当获取获取用户输入后，它从已知句子中匹配出与用户输入最相近的句子，找到最有可能的回复。随着机器人接受的输入的增加，它会统计各个回答的频率,以此作为回答的一句。


- wxpy

  wxpy是根据网页版微信API实现的Python库，方便用Python进行微信交互操作

## **1. 初始化机器人**

In [81]:

```
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

# 初始化机器人
chatbot = ChatBot("deepThought")
chatbot.set_trainer(ChatterBotCorpusTrainer)

# 这里先使用该库现成的中文语料库训练
chatbot.train("chatterbot.corpus.chinese")  

```

In [82]:

```
# 这里进行简单测试
print(chatbot.get_response("很高兴认识你"))

```

```
谢谢你。你也一样.

```

In [83]:

```
# 也可以自定义训练
# 比如当前输入”讲个笑话“
print(chatbot.get_response('讲个笑话'))

```

```
优美胜于丑陋

```

In [84]:

```
from chatterbot.trainers import ListTrainer

# 使用ListTrainer进行自定义训练，输入内容为一个列表
chatbot.set_trainer(ListTrainer)
chatbot.train([
    "讲个笑话",
    "一天和同学出去吃饭，买单的时候想跟服务员开下玩笑。“哎呀，今天没带钱出来埃”“你可以刷卡。”“可是我也没带卡出来的埃”“那你可以刷碗“",
])

```

In [85]:

```
print(chatbot.get_response("讲个笑话"))

```

```
一天和同学出去吃饭，买单的时候想跟服务员开下玩笑。“哎呀，今天没带钱出来埃”“你可以刷卡。”“可是我也没带卡出来的埃”“那你可以刷碗“

```

注:这里只是简单做个展示，如要丰富机器人的对话，可以从微博、微信、QQ上抓取大量的聊天记录进行优化训练。

## **2.将机器人接入微信**

In [86]:

```
from wxpy import *

# 初始化机器人，这里会生成一张二维码，用微信扫码继续登陆
bot = Bot()

```

```
Getting uuid of QR code.
Downloading QR code.
Please scan the QR code to log in.
Please press confirm on your phone.
Loading the contact, this may take a little while.
Login successfully as 愛非愛

```

In [87]:

```
# 获取好友列表，这里随意使用一个好友进行测试
bot.friends()
friend = bot.friends()[0]

```

In [89]:

```
# 向好友发送消息
friend.send('hi')

```

Out[89]:

```
↪ Walker : hi (Text)
```

In [90]:

```
# 使用机器人进行自动回复
@bot.register(friend)
def reply_my_friend(msg):
    return chatbot.get_response(msg.text).text

```

效果图如下：

![img](http://101python.cn/static/images/dialog.jpg)