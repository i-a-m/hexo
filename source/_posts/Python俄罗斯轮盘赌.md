---
title: Python俄罗斯轮盘赌
tags: [Python,代码块]
categories: Python
---
```
# coding: utf-8
import random

print "Please enter your deposit:" 
total = int(raw_input())
totaln = total```


while True:
    list = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','00']
    m = int(random.choice(list)) % 2
    if m == 0:
        totaln -= 1
        print totaln
        if totaln//total == 2 or total == 0:
            print "game over"
            break
        elif totaln <=0:
            print "game over"
            break
    elif m != 0:
        totaln += 1
        print totaln
        if totaln//total == 2 or total == 0:
            print "game over"
            break
        elif totaln <= 0:
            print "game over"
            break
    
    


        

    


```