---
title: Python基础
tags: [Python]
categories: Python
---
**一、第一句python代码**

1.python执行过程：1.加载内存-词法分析-语法分析-编译-执行

![img](http://images2015.cnblogs.com/blog/866760/201512/866760-20151226215840937-943551152.png)

2.创建hello.py文件，输入内容

```
1 #!/usr/bin/env python
2 print "Hello" 
```

执行 hello.py 文件：python hello.py

3.解释器：上面执行hello.py 脚本时已明确指出用python解释器来执行，如果想要像shell脚本一样执行就要在开头指定解释器

**二、编码**

1.python解释器在加载 .py 文件中的代码时，会对内容进行编码（默认ascill），如果不告诉python解释器，用什么编码来执行源代码，就会报错

2.所以要告诉python解释器，用什么编码来执行

```
1 #!/usr/bin/env python
2 # -*- coding: utf-8 -*-
3 print "Hello"
```

3.注释：

　　当行注视：#

　　多行注释：""" 内容 """

**三、变量**

1.声明变量

```
name = "zhangsan"
```

变量名为： name 值为："zhangsan"

2.变量名定义柜子

(1)变量名只能是 字母、数字或下划线的任意组合

(2)变量名的第一个字符不能是数字

(3)关键字不能声明为变量

(4)外层变量，可以被内层变量使用,内层变量，无法被外层变量使用

**四、输入**

1.将用户输入的值赋值给name

```
#!/usr/bin/env python
# -*- coding: utf-8 -*-
import getpass
name = raw_input("请输入用户名：")
print name

#输入密码时，如果想要不可见，可导入getpass模块中的 getpass方法

pwd = getpass.getpass("请输入密码：")
print pwd
```

2.流程控制

```
#!/usr/bin/env python
# -*- coding: encoding -*-
name = raw_input('请输入用户名：')

if name == "zhangsan"：
    print "zhangsan"
elif name == "lisi":
    print "lisi"
elif name == "wangwu":
    print "wangwu"
else:
    print "null"
```

**五、数据类型**

1.数字

(1)int（整型）

(2)long（长整型）

(3)float（浮点型）

(4)complex（复数）

2、布尔值

(真或假 1 或 0)

 

3.字符串

(1).python用C语言写，C语言没有字符串，有字符

对于 hello 这个字符串是用字符数组保存的
字符数组['h','e','l','l','o']

(2).字符串特性：一旦修改，重新创建(所以要少用拼接"+")

```
print "Hello"+"a"+"b"

#会开辟3个内存
#'hello'
#'hello'+'w'
#'hello'+'w'+'e'
```

(3).字符串格式化

　　1.%

```
name = "zhangsan"
print "my name is %s " % name
```

　　2.索引

```
name="aaa,{0},{1}"
print name.format("bbb",20)
#输出：aaa,bbb,20
```

(4)字符串常用功能

　　1.移除空白

```
name="   aadd   "
print name.strip()
print name.lstrip() #左边空格
print name.rstrip() #右边空格
```

　　2.分割

```
name="aa,bb,cc,dd"
print name.split(',')
#得到列表['aa','bb','cc','dd']
#列表变回字符串：",".join(name)
```

　　3.长度

```
name="zhangsan"
print len(name) #输出：8
```

　　4.索引

```
name="zhangsan"
print name[1] #输出：h
```

　　5.切片

```
name="zhangsan"
print name[0:2] #输出：zh
print name[-1]  #输出：n
```

4.列表

(1)创建列表

```
namelist=['aa','bb','cc']
```

(2)列表常用功能

　　1.索引（同字符串）**

　　2.切片（同字符串）

　　3.追加

```
namelist=['aa','bb','cc']
namelist.append('dd')
```

　　4.删除

```
namelist=['aa','bb','cc']
del namelist[0]
```

　　5.长度（同字符串）

　　6.包含

```
namelist=['aa','bb','cc']
print "aa" in namelist #返回True或False
```

　　7.循环

```
continue  #本次循环不再继续向下执行，继续下一次循环
break     #跳出循环
```

5.元组

(1)创建元组

```
tuplename=('aa','bb','cc')
```

(2)元组基本操作(同上)

　　1.索引

　　2.切片

　　3.循环

　　4.长度

　　5.包含

6.字典(字典无序)

(1)创建字典

```
dic ={"name": "aaa", 'age': 18}
```

(2)字典常用操作

　　1.索引

```
dic ={"name": "aaa", 'age': 18}
print dic["name"] #输出：aaa
```

　　2.新增

```
dic ={"name": "aaa", 'age': 18}
dic["iphone"]=123456
```

　　3.删除

```
dic ={"name": "aaa", 'age': 18}
del dic["age"]
```

　　4.循环

　　　　dic.items() #所有元素（仅for循环使用）

```
dic ={"name": "aaa", 'age': 18}
for k,v in dic.items():
    print k     #字典的key
    print v     #字典的value

```

```
dic ={"name": "aaa", 'age': 18}
print dic.keys()    #输出一个列表，包含所有key
print dic.values()  #输出一个列表，包含所有value
```

5.长度(同字符串)

　　6.键、值(一个键对应一个值)

 **一、三元运算**

```
if True:
    name='a'
else:
    name='b'
#上面的代码用三元运算表示：
name="a" if True else "b"
```

**二、类中方法查看**

　　Python中一切事物都是对象，对象由类创建

　　type　　　　　 查看对象类型

　　dir(类型名)　　 查看类中提供的所有功能

　　help(类型名)    查看类中提供的功能详细

　　help(类型名.方法名)　　查看类中某功能的详细

 

**三、类型常用功能**

1.整形

```
abs(x)      #返回绝对值
x+y,x-y,x*y,x/y  #加减乘除
x/y         #取商，浮点数相除保留余数
x//y        #取商，浮点数相除余数为0
x%y         #取余
x**y         #幂次方
cmp(x,y)    #两个数比较，返回True或False相等则为0
coerce(x,y) #强制把两个数生成一个元组
divmod(x,y) #相除得到商和余数组成的元组
float(x)    #转换为浮点型
str(x)      #转换为字符串
hex(x)      #转换为16进制
oct(x)      #转换8进制

int
```

2.长整型，浮点型和整形基本相似

3.字符串

```
name='abc'
name.capitalize()    #首字母大写
name.center(20)      # 长度20居中
name.center(20),"*"  # 长度20里居中，其他用*填充
name.ljust(20)       #长度20居左，rjust()居右
name.count('a')      #字符串里a的个数
name.count('a',0,10) #字符串指定区域里a的个数
name.endswith('bc')  #字符串是否以bc为结尾
name.expandtabs(8)  #把tab键转换为空格，默认8个空格
name.find("b")  #找字符b的下标,找不到返回-1，如果有多个只找第一个
name.index("b") #找字符b的下标,找不到报错
name.isalnum()  #判断是否为字母或数字
name.isalpha()  #判断是否为字母
name.isdigit()  #判断是否为数字
name.islower()  #判断是否小写
name.isspace()  #判断是否都是空格
name.isupper()  #是否全变大写
name.lower()    #全变小写
name.upper()    #是否全变大写
name.swapcase() #大写变小写，小写 变大写
name.replace('cc','dd') # 符合的全部替换
name.strip()    #移除空格
name.split("b") #以b分割
#join
li=["aa","bb"]
'*'.join(li)    #把列表的元素用*连接起来
#istitle
name="Aa"
name.title()    #变为标题,标题(所有首字母大写就是标题)
name.istitle()  #判断是不是标题
#partition
name="aaccbb"
name.partition("cc")    #分割成3部分 (aa,bb,cc)

str
```

format格式化的4种方法

```
name="i {0},age {1}"           #按顺序
name.format("zhangsan",18)

name="i {0},age {1}"
li=["zhangsan",18]
name.format(*li)    #传列表要加*

name="i {aa},age {bb}"         #按名称
name.format(aa="zhangsan",bb=18)

name="i {aa},age {bb}"
dic={"aa":"zhangsan","bb":18}
name.format(**dic)  #字典加**
```

translate转换

```
import string
a1="myis"
a2="1234"
trantab=string.maketrans(a1,a2) #先做一个对应表
strstr="my name is zhang"
print strstr.translate(trantab) #把strstr中a1里的字母替换成a2里对应的数字
print strstr.translate(trantab,"is") #先删除strstr中的"is",在去替换
#输出结果：
#12 na1e 34 zhang
#12 na1e  zhang
```

4.列表

```
li=[11,22,33,44]
li.append() #追加
li.count()  #找到出现的次数
li.extend([55,66])  #给原列表进行扩展
li.index() #找字符的下标,找不到报错
li.insert() # 在指定下标位置插入
li.pop() #删除并返回指定下标的值，如果没有指定下标，则返回最后一个
li.remove()# 移除
li.reverse()# 列表顺序反转
li.sort()# 排序

list
```

5.元组

```
tup=(1,2,3)
tup.count() #找到出现的次数
tup.index() #找字符的下标,找不到报错

#元组的元素不能被修改
tup=(1,2,3)

#元组的元素里的元组可以修改
tup=(1,2,3,[5,6])

tuple
```

6.字典

```
#字典是无序的
dic={'aa':123,'bb':456}
dic.clear()   #清空内容
dic.get('bb') #找不到BB时不会报错 返回的是None
dic.get('bb','No')#找不到BB时不会报错 返回的是No
#items
dic.keys #取出所有key
dic.values #取出所有value
dic.pop("aa")#删除
dic.setdefault("aa",['22']) #如果字典里不存在aa则添加'aa'=‘22’,存在则不变
a={"bb":555,"cc":666}
dic.update(a) #整合到dic字典，a里的key在dic里是否存在,如果存在则把dic里存在的key的value改成a中key对应的values,不存在则直接整合

dict
```

浅copy，深copy

```
import copy
a={"a":1,"b":[1,2],"c":3}
b=a
c=a.copy()  #浅copy
d=copy.deepcopy(a)  #深copy
a["d"]=4
print(a)
print(b)
print(c)
print(d)
#输出结果：
#{'a': 1, 'c': 3, 'b': [1, 2], 'd': 4}   
#{'a': 1, 'c': 3, 'b': [1, 2], 'd': 4}
#{'a': 1, 'c': 3, 'b': [1, 2]}      浅copy
#{'a': 1, 'c': 3, 'b': [1, 2]}      深copy

a["b"].pop(0)
print(a)
print(b)
print(c)
print(d)
#输出结果：
#{'a': 1, 'c': 3, 'b': [2], 'd': 4}
#{'a': 1, 'c': 3, 'b': [2], 'd': 4}
#{'a': 1, 'c': 3, 'b': [2]}         浅copy，字典内b对应的数组还是变了
#{'a': 1, 'c': 3, 'b': [1, 2]}      深copy，完全独立

copy
```

7、集合set

```
#set是一个无序且不重复的元素集合
a=[1,1,2,2]
set(a) #去重

a=set(range(1,5))
b=set(range(4,7))
a&b #交集
a|b #并集
a^b #反交集
a-b #a在b中没有的
a.issubset(b) #a是不是都包含在b里
a.remove(1) #删除
a.update(b) #b并入a

set
```

四、解码编码

例：

gbk》》unicode》》utf-8

utf-8》》unicode》》gbk

unicode可以编码(encode)成gbk和utf-8

gbk和utf-8可以解码decode成unicode

a="好"　　a是gbk编码

a.decode('gbk') 把gbk解码成unicode

a.decode('gbk').encode('utf-8')解码后在编码成utf-8

**一、collections系列**

Counter是对字典类型的补充，用于追踪值的出现次数，具备字典的所有功能 + 自己的功能

1.计数器Counter

```
import collections
a='abababsbsbhh'
c=collections.Counter(a) #直接列出每个元素出现了几次，传入列表和元组也一样
print(c)
#输出：Counter({'b': 5, 'a': 3, 'h': 2, 's': 2})

#most_common 列出Counter内的前几个
print c.most_common()
print c.most_common(1)
print c.most_common(3)
'''
输出：
[('b', 5), ('a', 3), ('h', 2), ('s', 2)]
[('b', 5)]
[('b', 5), ('a', 3), ('h', 2)]
'''

#update 相加
c=collections.Counter(a)
c1=collections.Counter(a)
c.update(c1)
print(c)
#输出：Counter({'b': 10, 'a': 6, 'h': 4, 's': 4})

#subtract 减
aa=collections.Counter("as")
bb=collections.Counter("htw")
aa.subtract(bb) #c-c1
print(aa)
#输出：Counter({'a': 1, 's': 1, 'h': -1, 't': -1, 'w': -1})

#elements  返回包含所有元素集合的迭代器
for item in c.elements():
    print item

Counter
```

2、有序字典(orderedDict )

```
import collections
#有序字典，是对字典类型的补充，他记住了字典元素添加的顺序
#具备字典的所有功能 + 自己的功能
dic=collections.OrderedDict()   #定义有序字典
dic["a1"]=1
dic["a2"]=2
dic["a3"]=3
di={}
di["a1"]=1
di["a2"]=2
di["a3"]=3
print(dic)
print(di)
#输出：
# OrderedDict([('a1', 1), ('a2', 2), ('a3', 3)]) #有序
#{'a1': 1, 'a3': 3, 'a2': 2}    #无序
```

3、默认字典(defaultdict) 

```
import collections
#默认字典
#defaultdict    是对字典的类型的补充，他默认给字典的值设置了一个类型。
dic=collections.defaultdict(list) #默认字典的value，也可以是元组(tuple)或字典(dict)
#相当于
dic={}
dic["k1"]=[]
```

4、可命名元组

```
#tupled的扩展
#可命名元组
import collections
t=(1,2)
#创建一个扩展tuple的类，Mytuple
Mytuple=collections.namedtuple('Mytuple',['x','y'])
tu=Mytuple(1,2) #相当于给原来的值赋了一个key
print(t)
print(tu)
print tu.x,tu.y
'''
输出：
(1, 2)
Mytuple(x=1, y=2)
2
'''
```

5、双向队列、单向队列

```
#双向队列，两头都可以取可以插
#线程安全
import collections
q=collections.deque() #创建队列
q.append(1)
q.append(2)
q.append(3)
print(q)

#单向队列，一个方向拿
#线程安全
import Queue
q=Queue.Queue(10) #创建队列，指定最多放10个数据
q.put(1)    #进
q.put(2)
q.put(3)
print q.get()   #取
print q.get()
'''
队列和栈的结构:
    队列：先进先出
    栈：弹夹，后加先出
'''
```

**二、迭代器和生成器**

1.迭代器

```
'''
    只能通过循环从迭代器里拿数据
    next方法：返回迭代器的下一个元素
    __iter__方法：返回迭代器
'''

i=iter(range(3)) #使用内建的iter方法创建迭代器
print i.next()
print i.next()  #next()方法可以访问下一个元素
print i.next()
print i.next()  #python处理迭代器越界抛出StopIteration异常
'''
输出:
1
Traceback (most recent call last):
  File "E:/index.py", line 82, in <module>
    print i.next()
StopIteration
'''
#在for循环中，Python将自动调用iter()函数获得迭代器，自动调用next()获取元素，自动完成检查StopIteration异常的工作

迭代器
```

2.生成器

```
#生成器（生成器只有使用时才创建，从而避免内存浪费）
'''
    range不是生成器 和 xrange 是生成器
    readlines不是生成器 和 xreadlines 是生成器
'''
for i in range(100): #返回100个元素的列表
    print(i)
for i in xrange(100):#每次迭代中返回一个元素
    print(i)

#带有 yield 的函数在 Python 中被称之为 generator（生成器）

#yield  记住上一次的操作，下次在执行时继续执行
def aaa(arg):
    seed = 0
    while True:
        seed=seed+1
        if seed > arg:
            return
        else:
            yield seed  #每次经过yield都会返回到print输出i，然后回到原来位置继续执行
for i in aaa(10):
    print i

生成器
```

冒泡算法

```
#练习
#下标式循环
'''
有列表li=[13, 22, 6, 99, 11]
按照以下规则计算：
和 22 比较，将大的值放在右侧，即：[13, 22, 6, 99, 11]
和 6 比较，将大的值放在右侧，即：[13, 6, 22, 99, 11]
和 99 比较，将大的值放在右侧，即：[13, 6, 22, 99, 11]
和 42 比较，将大的值放在右侧，即：[13, 6, 22, 11, 99,]
和 6 比较，将大的值放在右侧，即：[6, 13, 22, 11, 99,]
'''
#冒泡算法 依次用下标对应的两个数字进行比较，大的放右边，从而进行排列
li=[13, 22, 6, 99, 11]
aa=(len(li)-1)
while aa>0:
    for m in range(aa):
        if li[m]>li[m+1]:
            temp=li[m]
            li[m]=li[m+1]
            li[m+1]=temp
    aa=aa-1
print(li)
#输出：[6, 11, 13, 22, 99]
```

**三、函数**

1.内置函数

常用内置函数

```
#常用内置函数
'''
基础
    help()
    dir()       不带参数时,返回当前范围内的变量、方法和定义的类型列表,带参数时,返回参数的属性、方法列表
    print vars()  当前模块的所有变量
    type()
    reload(temp)    真正的在导入一次一个模块
    id()
    is()
    range       产生一个序列，默认从0开始
    xrange
类型转换
    int()
    long()
    float()
    complex()
    str()
    list()
    tuple()
计算
    cmp(x,y)    x<y返回-1 x==y返回0 x>y返回1
    abs()
    boll()
    divmod()    #分别取商和余数
    max()
    min()
    sum()
    pow(x,y)  返回x的y次幂
    len()   长度
    all()   接受一个序列，如果所有都是真返回真，否则返回假
    any()   接受一个序列，只要有一个真就是真
    eval(dic) 把传入的字符串转换成字典
assic码转换
    chr() 接收数字返回字符
    ord() 接收字符返回数字
进制转换
    hex()  10转16
    oct()  10转8
    bin()  10转2

#enumerate
自动生成一列数字对应列表里的值,从0开始
li=[11,22,33,44]
for k,v in enumerate(li,1):#从1开始
    print(k,v)
输出：
(1, 11)
(2, 22)
(3, 33)
(4, 44)
'''
```

**isinstance**

　　isinstance：判断一个对象是不是某个类的实例，这个类可以是创建该对象的类，也可以是创建该对象的类的基类

在python中，判断对象类型的方法有两种，**type**和**isinstance**

```
a=2
print(isinstance(a,int))     #Ture
print(isinstance(a,str))     #False

print(type(a)==int)         #Ture
print(isinstance(a,str))    #False
```

　　(2)isinstance还能判断一个对象是不是某个类的实例

```
class test:
    pass
class AA(test):
    pass
class BB:
    pass

obj=AA()
#判断obj对象是不是AA类的实例
print(isinstance(obj,AA)) #Ture
print(isinstance(obj,BB)) #False

#判断obj对象是不是test类的实例
print(isinstance(obj,test)) #Ture
```

**issubclass**

　　issubclass：判断一个类是不是另一个类的派生类

```
class test:
    pass
class AA(test):
    pass
class BB:
    pass

#判断AA是不是test的派生类
print(issubclass(AA,test))  #True
#判断BB是不是test的派生类
print(issubclass(BB,test))  #False
```

**map遍历序列**

```
#map遍历序列，对序列中每个元素进行操作，最终获得新的序列
li=[11,22,33,44]
li1=[1,2,3,4]
def func(arg):
    return arg+10
print map(func,li)
#输出：[21, 32, 43, 54]

def func1(a1,a2):
    return a1+a2
print map(func1,li,li1)
#输出：[12, 24, 36, 48]

print map(lambda a1,a2:a1+a2,li,li1) #lambda一句实现
#输出：[12, 24, 36, 48]

map
```

**filter筛选**

```
#filter 筛选
li=[11,22,33,44,"",False,True,0]
print filter(None,li)   #传入None，返回是True的序列
#输出：[11, 22, 33, 44, True]

li1=[11,22,33,44,55,66]
print filter(lambda a:a>22,li1)#返回是True的序列
#输出:[33, 44, 55, 66]

filter
```

**reduce累积**

```
#reduce 累积操作
li=[1,2,3,4,5,6]
print reduce(lambda a1,a2:a1+a2,li)
#输出：21   就是((((1+2)+3)+4)+5)+6
#print reduce(lambda a1,a2:a1+a2,li,xxx)#累加  最后还可以加参数作为初始值
print reduce(lambda a1,a2:a1*a2,li)#来乘
#输出：720

reduce
```

每个文件模块自己的变量

```
#__file__
print __file__  #当前文件路径

#__doc__
import index
print index.__doc__ #index是模块名，可查看一个文件模块的顶部注释

#__name__  用来判断是不是程序的主文件
#当主程序执行时__name__="__main__"
if __name__=="__main__":
    pass
```

2.自定义函数

`　　def` `函数名(参数):`

`   　　 ``函数体`

1.return 当函数执行完毕后，可以给调用者返回数据

2.参数

　　普通参数：参数可以有n个，但必须传入指定个数的参数

　　默认参数：如果默认参数不传值，则使用默认值，并且默认参数只能放在最后

　　动态参数：

　　　　动态参数一：*args

```
#接受多个参数,内部自动构造元组
#传入序列要加*，避免内部构造元组
li=[11,22,33]
def func(*args):
    print(args)
func(li)    #把传的列表当成元组的元素
func(*li)   #加*把传的列表内的每个元素当成元组的元素
#输出：
#([11, 22, 33],)
#(11, 22, 33)
```

　动态参数二：**kwargs

```
#构造字典(两*)
dic={"a":1,"b":2}
def func1(**kwargs):
    print(kwargs)
func1(a=11)
func1(**dic)
#输出：
#{'a': 11}
#{'a': 1, 'b': 2}
```

结合上面两种：

```
def func2(*args,**kwargs):
    print(args)
    print(kwargs)
func2(1,2,3,a=1,b=2)
#输出：
#(1, 2, 3)
#{'a': 1, 'b': 2}
```

**四、文件操作**

1.打开文件

`文件句柄 ``=` `file``(``'文件路径'``, ``'模式'``)`

模式：

```
'''
r   只读模式
w   只写模式(不可读,不存在则创建,存在则删除内容)
a   追加模式(可读,不存在则创建,存在则只追加内容)
"+" 表示可以同时读写某个文件

r+  可读写文件(可读,可写,可追加)
w+  写读
a+  同a

rU  表示在读取时，可以将 \r \n \r\n自动转换成 \n （只能与r或r+模式一起使用）

"b" 表示处理二进制文件
rb  以2进制方式去读取文件
wb
ab
'''
```

2.操作文件

```
'''
close()     关闭文件
fileno()    文件描述符
flush()     刷新文件内部缓冲区
isatty()    判断文件是否是同意tty设备
next()      获取下一行数据，不存在，则报错
read()      读取指定字节数据
readline()  仅读取一行数据
readlines() 读取所有数据，并根据换行保存到列表
xreadlines()可用于逐行读取文件，非全部
seek()      指定文件中指针位置
tell()      获取当前指针位置
truncate()  截断指针后面的内容只留前面的
write()     写
writelines()将一个字符串列表写入文件
'''
```

with

　　为了避免打开文件后忘记关闭,当with代码块执行完毕时，内部会自动关闭并释放文件资源

```
with open('','r') as obj:
    obj.read()
```

Python 2.7后with还支持多个文件管理

```
with open('','r') as obj1,open('') as obj2:
    pass
```

**五、lambda 表达式**

lambda和三元运算类似，是为了简化函数，不过只能用于处理简单函数，并且能自动return

```
#正常函数
def lam1(arg):
    return  arg+1
print lam1(10)

#lambda表达式
lam2=lambda arg:arg+1#(lam2等于上面的函数名，arg等于上面的参数)
print lam2(10)

lam3=lambda a,b:a+b
print lam3(2,3)
```

 **六、递归**

1、递归：在运行的过程中调用自己就叫做递归

下面举个最典型的递归案例：斐波纳契数列（1、1、2、3、5、8、13、21.....）

```
#用递归实现
def func(arg1,arg2):
    if arg1 == 0:
        print(arg1)
        print(arg2)
    arg3=arg1+arg2
    print(arg3)
    if arg3>1000:
        return
    func(arg2,arg3) #在函数内部调用自身
func(0,1)
```

上面的代码可以实现斐波纳契数列的输出

2、递归的返回值

```
#递归的返回值
def func(arg1,arg2):
    if arg1 == 0:
        print(arg1)
        print(arg2)
    arg3=arg1+arg2
    if arg3>1000:
        return arg3 #返回值
    func(arg2,arg3)
result=func(0,1)
print(result)   #输出：None
```

上面代码可以看到，输出的是None，是因为函数第一次执行时的返回值才是result，当函数一直被调用时，return arg3 的返回值是返回给了他上一次

调用的函数func(arg2,arg3)，以此往前推

如果代码如下：递归函数就能返回最后一次的返回值

```
def func(arg1,arg2):
    if arg1 == 0:
        print(arg1)
        print(arg2)
    arg3=arg1+arg2
    if arg3>1000:
        return arg3
    ret=func(arg2,arg3) #把内部调用的函数的返回值赋值给ret
    return ret

result=func(0,1)
print(result)   #输出：1597
```

**装饰器**

1.普通函数

```
#简单的函数和调用
def a1():
    print("i am zhangsan")
def a2():
    print("i am lisi")
a1()
a2()
```

2.在函数前后添加功能

```
def inner(func):
    print("添加1")
    func()
    print("添加2")
    return func
def a1():
    print("i am zhangsan")
def a2():
    print("i am zhangsan")

a1=inner(a1)
a1()
a2=inner(a2)
a2()
```

3.使用装饰器

```
def mywork(func):
    def inner():
        print("添加1")
        func()
        print("添加2")
    return inner
@mywork     # @mywork就等于a1=mywork(a1)
def a1():
    print("i am zhangsan")

a1()
#执行时@mywork会把他下面的函数当成mywork函数的参数既mywork(a1)，然后在函数inner里执行，inner内func()=a1()
```

4.装饰带参数的函数

```
def mywork(func):
    def inner(arg):
        print("添加1")
        func(arg)
        print("添加2")
    return inner
@mywork
def a1(arg):
    print 'i am zhangsan',arg

a1("参数1")
```

5.装饰动态参数的函数

```
#合并无参，有参，多参  可以装饰含有N个参数的函数
def mywork(func):
    def inner(*args,**kwargs):
        print("添加1")
        func(*args,**kwargs)
        print("添加2")
    return inner
@mywork
def a1():
    print 'i am zhangsan'
@mywork
def a2(arg):
    print 'i am zhangsan',arg
@mywork
def a3(arg1,arg2):
    print 'i am zhangsan',arg1,arg2
a1()
a2("参数1")
a3("参数1","参数2")
```

6.装饰含有返回值的函数

```
#装饰含有返回值的函数
def mywork(func):
    def inner(*args,**kwargs):
        print("添加1")
        aa=func(*args,**kwargs)
        print("添加2")
        return aa
    return inner
@mywork
def a3(arg1,arg2):
    print 'i am zhangsan',arg1,arg2
    li=[1,2,3,4,5,6]
    return li   #返回一个列表

list=a3("参数1","参数2")    #list等于inner的返回值
print(list)
#li列表是a3的返回值，所以给在inner函数里执行的func()赋给aa，在通过inner的返回值就能拿到列表
```

7.装饰器实现登录验证简单原理

```
def login():
    name =raw_input("输入用户名：")
    if name == "zhangsan":
        return  True
    else:
        return False
def mywork(func):
    def inner(*args,**kwargs):
        lo_login = login()
        if not lo_login:    #如果login()返回的是False
            return "用户名错误!"
        aa=func(*args,**kwargs)
        return aa
    return inner
@mywork
def a3(arg1,arg2):
    print 'i am zhangsan',arg1,arg2
    li=[1,2,3,4,5,6]
    return li
list=a3("参数1","参数2")    #list等于inner的返回值
print(list)
```

8.多个装饰器装饰一个函数

```
def newwork1(func):
    def inner():
        print("newwork1前")
        func()
        print("newwork1后")
    return inner
def newwork2(func):
    def inner():
        print("newwork2前")
        func()
        print("newwork2后")
    return inner

@newwork2
@newwork1
def f1():
    print 'i am zhangsan'
f1()
'''
输出结果：
    newwork1前
    newwork2前
    i am zhangsan
    newwork2后
    newwork1后
'''
```

9.装饰器加参数

```
#3层装饰器
def Filter(a1,a2):
    def outer(func):
        def wrapper(request,kargs):
            print(a1)
            result=func(request,kargs)
            print(a2)
            return result
        return wrapper
    return  outer
aa=11
bb=22
@Filter(aa,bb)
def Index(request,kargs):
    print request,kargs

Index("zhangsan","lisi")
#@Filter(aa,bb)会先执行Filter(aa,bb)函数，获取到返回值outer后拼接成@outer，之后就变成普通的装饰器了
#wrapper函数内可以使用a1,a2,request,kargs 4个参数
```

**一、模块**

模块，是用一堆代码实现了某个功能的代码集合，模块分为三种：自定义模块(自己定义)、内置模块（python自带）、开源模块

导入模块

(1)、导入一个py文件，解释器解释该py文件

(2)、导入一个包，解释器解释该包下的 __init__.py 文件

```
#模块导入
import module
from module.xx import xx
from module.xx.xx import *

from module.xx.xx import xx as rename
#自己给模块定义一个名字rename，用在有两个模块分别有相同的文件名并同时导入时
```

(3) 导入模块时查找的路径

```
import sys
import os
print sys.path  #输出导入模块时找的路径

#如果sys.path路径列表没有你想要的路径，可以通过 sys.path.append('路径') 添加。
pre_path = os.path.abspath('路径')
sys.path.append(pre_path)
```

(4)模块源码安装

```
#下载源码、解压源码、进入目录、编译源码：python setup.py build、安装源码：python setup.py install

#注：在使用源码安装时，需要使用到gcc编译和python开发环境，所以，需要先执行：
#yum install gcc
#yum install python-devel
#或apt-get python-dev
```

1.json 和 pickle （用于序列化的两个模块）

Json模块和pickle模块提供了四个功能：dumps、dump、loads、load

pickle模块中的两个主要函数是dump()和load()。

dump()函数接受一个数据对象和一个文件句柄作为参数，把数据对象以特定的格式保存到给定的文件中。当我们使用load()函数从文件中取出已保存的对象时，pickle知道如何恢复它们本来的格式。

```
import pickle
import json
dic={"name":"zhangsan","age":18}

p_str=pickle.dumps(dic)      #pickle.dumps 将数据通过特殊形式转换为只有pytho语言认识的字符串

with open("test.txt","w") as o:
    pickle.dump(dic,o)      #pickle.dump 将数据通过特殊形式转换为只有pytho语言认识的字符串并写入文件

with open("test.txt","r") as o:#读取文件
    dic=pickle.load(o)


j_str=json.dumps(dic)       #json.dumps 将数据通过特殊形式转换为所有程序语言都认识的字符串

with open("test.txt","w") as o:
    json.dump(dic,o)        # json.dump 将数据通过特殊形式转换为所有程序语言都认识的字符串并写入文件
    
with open("test.txt","r") as o:#读取文件
    dic=pickle.load(o)
```

2.os

```
os.getcwd() 获取当前工作目录，即当前python脚本工作的目录路径
os.chdir("dirname")  改变当前脚本工作目录；相当于shell下cd
os.curdir  返回当前目录: ('.')
os.pardir  获取当前目录的父目录字符串名：('..')
os.makedirs('dirname1/dirname2')    可生成多层递归目录
os.removedirs('dirname1')    若目录为空，则删除，并递归到上一级目录，如若也为空，则删除，依此类推
os.mkdir('dirname')    生成单级目录；相当于shell中mkdir dirname
os.rmdir('dirname')    删除单级空目录，若目录不为空则无法删除，报错；相当于shell中rmdir dirname
os.listdir('dirname')    列出指定目录下的所有文件和子目录，包括隐藏文件，并以列表方式打印
os.remove()  删除一个文件
os.rename("oldname","newname")  重命名文件/目录
os.stat('path/filename')  获取文件/目录信息
os.sep    输出操作系统特定的路径分隔符，win下为"\\",Linux下为"/"
os.linesep    输出当前平台使用的行终止符，win下为"\t\n",Linux下为"\n"
os.pathsep    输出用于分割文件路径的字符串
os.name    输出字符串指示当前使用平台。win->'nt'; Linux->'posix'
os.system("bash command")  运行shell命令，直接显示
os.environ  获取系统环境变量
os.path.abspath(path)  返回path规范化的绝对路径
os.path.split(path)  将path分割成目录和文件名二元组返回
os.path.dirname(path)  返回path的目录。其实就是os.path.split(path)的第一个元素
os.path.basename(path)  返回path最后的文件名。如何path以／或\结尾，那么就会返回空值。即os.path.split(path)的第二个元素
os.path.exists(path)  如果path存在，返回True；如果path不存在，返回False
os.path.isabs(path)  如果path是绝对路径，返回True
os.path.isfile(path)  如果path是一个存在的文件，返回True。否则返回False
os.path.isdir(path)  如果path是一个存在的目录，则返回True。否则返回False
os.path.join(path1[, path2[, ...]])  将多个路径组合后返回，第一个绝对路径之前的参数将被忽略
os.path.getatime(path)  返回path所指向的文件或者目录的最后存取时间
os.path.getmtime(path)  返回path所指向的文件或者目录的最后修改时间
```

3.sys

```
sys.argv           命令行参数List，第一个元素是程序本身路径
sys.exit(n)        退出程序，正常退出时exit(0)
sys.version        获取Python解释程序的版本信息
sys.maxint         最大的Int值
sys.path           返回模块的搜索路径，初始化时使用PYTHONPATH环境变量的值
sys.platform       返回操作系统平台名称
sys.stdout.write('please:')
val = sys.stdin.readline()[:-1]
```

4.hashlib(加密)

```
import hashlib

# ######## md5 ########
hash = hashlib.md5()
hash.update('zhangsan')
print hash.hexdigest()

# ######## sha1 ########
hash = hashlib.sha1()
hash.update('zhangsan')
print hash.hexdigest()

# ######## sha256 ########
hash = hashlib.sha256()
hash.update('zhangsan')
print hash.hexdigest()

# ######## sha384 ########
hash = hashlib.sha384()
hash.update('zhangsan')
print hash.hexdigest()

# ######## sha512 ########
hash = hashlib.sha512()
hash.update('zhangsan')
print hash.hexdigest()

#以上加密算法虽然依然非常厉害，但时候存在缺陷，即：通过撞库可以反解。所以，有必要对加密算法中添加自定义key再来做加密。
import hashlib
# ######## md5 ########
hash = hashlib.md5('898oaFs09f')
hash.update('zhangsan')
print hash.hexdigest()

#python还有一个 hmac 模块，它内部对我们创建 key 和 内容 再进行处理然后再加密
import hmac
h = hmac.new('zhangsan')
h.update('hello')
print h.hexdigest()
```

5.subprocess（执行系统命令）

```
#subprocess
import subprocess
#call
#执行命令，返回状态码
ret = subprocess.call(["ls", "-l"], shell=False)
ret = subprocess.call("ls -l", shell=True)

#check_call
#执行命令，如果执行状态码是 0 ，则返回0，否则抛异常
subprocess.check_call(["ls", "-l"])
subprocess.check_call("exit 1", shell=True)

#check_output
#执行命令，如果状态码是 0 ，则返回执行结果，否则抛异常
subprocess.check_output(["echo", "Hello World!"])
subprocess.check_output("exit 1", shell=True)
#(shell = True ，允许 shell 命令是字符串形式)

#subprocess.Popen(...)
#用于执行复杂的系统命令
#参数：

'''
args：shell  命令，可以是字符串或者序列类型（如：list，元组）
bufsize：    指定缓冲。0 无缓冲,1 行缓冲,其他 缓冲区大小,负值 系统缓冲
stdin, stdout, stderr：  分别表示程序的标准输入、输出、错误句柄
preexec_fn： 只在Unix平台下有效，用于指定一个可执行对象（callable object），它将在子进程运行之前被调用
close_sfs： 在windows平台下，如果close_fds被设置为True，则新创建的子进程将不会继承父进程的输入、输出、错误管道。
            所以不能将close_fds设置为True同时重定向子进程的标准输入、输出与错误(stdin, stdout, stderr)。
shell：同上
cwd：    用于设置子进程的当前目录
env：    用于指定子进程的环境变量。如果env = None，子进程的环境变量将从父进程中继承。
universal_newlines： 不同系统的换行符不同，True -> 同意使用 \n
startupinfo与createionflags只在windows下有效
'''
#执行普通命令
import subprocess
ret1 = subprocess.Popen(["mkdir","t1"])
ret2 = subprocess.Popen("mkdir t2", shell=True)

#-----
import subprocess
obj = subprocess.Popen(["python"], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
obj.stdin.write('print 1 \n ')
obj.stdin.write('print 2 \n ')
obj.stdin.write('print 3 \n ')
obj.stdin.write('print 4 \n ')
obj.stdin.close()

cmd_out = obj.stdout.read()
obj.stdout.close()
cmd_error = obj.stderr.read()
obj.stderr.close()
print cmd_out
print cmd_error

#等于上面，可以省几个步骤，不用手动去读输出读错误，communicate会自动做这些事情
#------
import subprocess
obj = subprocess.Popen(["python"], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
obj.stdin.write('print 1 \n ')
obj.stdin.write('print 2 \n ')
obj.stdin.write('print 3 \n ')
obj.stdin.write('print 4 \n ')

out_error_list = obj.communicate()
print out_error_list
#---------

obj = subprocess.Popen(["python"], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
out_error_list = obj.communicate('print "hello"')
print out_error_list
```

6.shutil(拷贝、压缩)

```
import shutil
#拷贝文件
#shutil.copyfile(src, dst) src原文件，dst新文件
shutil.copyfile("111.txt", "222.txt")

#将文件内容拷贝到另一个文件中，可以部分内容
#shutil.copyfileobj(fsrc, fdst[, length])

#仅拷贝权限。内容、组、用户均不变
#shutil.copymode(src, dst)

#拷贝状态的信息，包括：mode bits, atime, mtime, flags
#shutil.copystat(src, dst)

#拷贝文件和权限
#shutil.copy(src, dst)

#拷贝文件和状态信息
#shutil.copy2(src, dst)

#压缩
#shutil.make_archive(base_name, format,...)
#将/test/bbb下的文件打包放置当前程序目录
import shutil
ret = shutil.make_archive("aaa", 'gztar', root_dir='/test/bbb')

#将/test/bbb下的文件打包放置/Users目录
import shutil
ret = shutil.make_archive("/Users/aaa", 'gztar', root_dir='/test/bbb')
'''
创建压缩包并返回文件路径，例如：zip、tar
base_name： 压缩包的文件名，也可以是压缩包的路径。只是文件名时，则保存至当前目录，否则保存至指定路径，
            如：/Users/111.txt =>保存至/Users目录
format：    压缩包种类，“zip”, “tar”, “bztar”，“gztar”
root_dir：    要压缩的文件夹路径（默认当前目录）
owner：    用户，默认当前用户
group：    组，默认当前组
logger：    用于记录日志，通常是logging.Logger对象
'''

#shutil不能直接解压缩，要调用相应模块来解压
#shutil 对压缩包的处理是调用 ZipFile 和 TarFile 两个模块来进行的
import zipfile
# 解压
z = zipfile.ZipFile('laxi.zip', 'r')
z.extractall()
z.close()

import tarfile
# 解压
tar = tarfile.open('your.tar','r')
tar.extractall()  # 可设置解压地址
tar.close()
```

7.ConfigParser

用于对特定的配置文件进行操作，当前模块的名称在 python 3.x 版本中变更为 configparser

```
#ConfigParser模块
#用于内容类似如下的文件
'''
[section1]
name = lisi
age = 20

[section2]
name = zhangsan
age = 18
'''


import ConfigParser
config = ConfigParser.ConfigParser()
config.read("text.txt")

print config.sections() #所有section
print config.options("section1")    #section1下的所有key
print config.items("section1")  #section1下的所有key和value
print config.get("section1","k1")   #section1下k1的value
print config.getint("section1","k1")#同get,只是多了个int()转换

config.remove_section("section1")   #把读在config里的内容删除section1
config.write(open("text.txt","w"))  #在把config里的内容写进文件

print config.has_section("section1")#有没有section1，True或False

config.add_section('section1')#添加一个section1
config.write(open("text.txt","w"))#写入

config.remove_option("section2","name")
config.write(open("text.txt","w"))#写入
```

8.logging

写入文件

```
import logging
logging.basicConfig(filename='log.log',
                    format='%(asctime)s - %(name)s - %(levelname)s -%(module)s:  %(message)s',
                    datefmt='%Y-%m-%d %H:%M:%S %p', #日期格式
                    level=10)   #大于当前日志等级的操作才会被记录
#asctime:当前时间  name:写日志的人  levelname:日志级别 module:什么模块调用的日志 message:具体的消息
logging.debug('debug')
logging.info('info')
logging.warning('warning')
logging.error('error')
logging.critical('critical')
logging.log(10,'log')

#日志级别：只有大于当前日志等级的操作才会被记录
CRITICAL = 50
FATAL = CRITICAL
ERROR = 40
WARNING = 30
WARN = WARNING
INFO = 20
DEBUG = 10
NOTSET = 0
```

屏幕输出并写入文件

```
#屏幕输出和写入文件同时进行
logging.basicConfig(filename='log.log', #日志文件名
                    format='%(asctime)s - %(name)s - %(levelname)s -%(module)s - %(message)s',
                    datefmt='%Y-%m-%d %H:%M:%S', #日期格式
                    level=logging.DEBUG)   #大于当前日志等级的操作才会被记录

ch = logging.StreamHandler()    #定义一个StreamHandler
ch.setLevel(logging.INFO)   #输出比INFO级别高的日志到屏幕
formatter = logging.Formatter("%(name)s -%(module)s - %(message)s")#屏幕输出的格式
ch.setFormatter(formatter)  #把格式应用给屏幕
logging.getLogger('').addHandler(ch)  #把屏幕和文件的句柄交给Logger接口执行

logging.debug('debug')
logging.info('info')
logging.warning('warning')
logging.error('error')
logging.critical('critical')
logging.log(10,'log')

#日志级别：只有大于当前日志等级的操作才会被记录
'''
CRITICAL = 50
FATAL = CRITICAL
ERROR = 40
WARNING = 30
WARN = WARNING
INFO = 20
DEBUG = 10
NOTSET = 0
'''
```

9.time

```
import time
print time.time()   #打印时间戳
print time.mktime(time.localtime())
print time.gmtime()    #可加时间戳参数
print time.localtime() #可加时间戳参数
#('2014-12-12 12:12', '%Y-%m-%d %H:%S')
print time.strftime('%Y-%m-%d') #默认当前时间,日期转字符串
print time.strftime('%Y-%m-%d',time.localtime()) #默认当前时间
print time.asctime()
print time.asctime(time.localtime())
print time.ctime(time.time())


t=time.strptime('2014-12-12 12:12','%Y-%m-%d %H:%S',)#字符串转日期,
#print time.mktime(t)#日期转时间戳
print t
print t.tm_year
print t[0]
#结果：
#time.struct_time(tm_year=2014, tm_mon=12, tm_mday=12, tm_hour=12, tm_min=0, tm_sec=12, tm_wday=4, tm_yday=346, tm_isdst=-1)
#2014
#2014
```

![img](http://images2015.cnblogs.com/blog/866760/201601/866760-20160107190934700-981334858.png)

```
#datetime
'''
datetime.date   ：表示日期的类。常用的属性有year, month, day
datetime.time   ：表示时间的类。常用的属性有hour, minute, second, microsecond
datetime.datetime   ：表示日期时间
datetime.timedelta  ：表示时间间隔，即两个时间点之间的长度
timedelta([days[, seconds[, microseconds[, milliseconds[, minutes[, hours[, weeks]]]]]]])
strftime("%Y-%m-%d")
'''
import datetime
print datetime.datetime.now()
print datetime.datetime.now() - datetime.timedelta(days=5)
#结果：(减5天)
#2016-01-07 18:35:30.948000
#2016-01-02 18:35:30.948000
```

10.random(验证码)

```
import random
print random.random()
print random.randint(1,2)   #1,2随机
print random.randrange(1,10)    #1-9随机

#随机验证码实例：
import random
checkcode = ''
for i in range(4):
    current = random.randrange(0,4)
    if current != i:
        temp = chr(random.randint(65,90))   #26个字母
    else:
        temp = random.randint(0,9)  #0-9
    checkcode += str(temp)
print checkcode
```

11.re正则表达式

 re模块用于对python的正则表达式的操作

```
'''
字符：
　　. 匹配除换行符以外的任意字符
　　\w    匹配字母或数字或下划线或汉字
　　\s    匹配任意的空白符
　　\d    匹配数字
　　\b    匹配单词的开始或结束
　　^    匹配字符串的开始
　　$    匹配字符串的结束
次数：
　　* 重复零次或更多次
　　+ 重复一次或更多次
　　? 重复零次或一次
　　{n}      重复n次
　　{n,}  重复n次或更多次
　　{n,m} 重复n到m次
'''
```

(1)、match

```
import re
#match(pattern, string, flags=0) 1.正则表达式 2.要匹配的字符串 3.标志位(用于控制正则表达式的匹配方式))
#从起始位置开始根据规则去字符串中匹配指定内容，匹配单个
str1="23ffdd333ss"
str2="dd23ffddss"
#例：匹配
print re.match("\d+",str1).group()  #匹配成功 返回：23
print re.match("\d+",str2).group()    #没有匹配成功，报错
```

(2)、search

```
#根据规则去字符串中匹配指定内容，匹配单个
str1="23ffdd333ss"
str2="dd23ffddss"
print re.search("\d+",str1).group() #输出：23
print re.search("\d+",str2).group() #输出：23
```

(3)、group

```
#group
str1="23ffdd333"                                           #输出：
print re.search("([0-9]*)([a-z]*)([0-9]*)", str1).group()  #23ffdd333
print re.search("([0-9]*)([a-z]*)([0-9]*)", str1).group(0) #23ffdd333
print re.search("([0-9]*)([a-z]*)([0-9]*)", str1).group(1) #23
print re.search("([0-9]*)([a-z]*)([0-9]*)", str1).group(2) #ffdd
print re.search("([0-9]*)([a-z]*)([0-9]*)", str1).groups() #('23', 'ffdd', '333')
```

(4)、findall

```
#匹配到字符串中所有符合条件的元素
str1="23ffdd333"
print re.findall("\d+",str1)  #['23', '333']
```

(5)、sub

```
#用于替换匹配的字符串
str1="aa22aa3345aa"
print re.sub("aa","bb",str1)    #bb22bb3345bb
```

(6)、split

```
#根据指定匹配进行分组
str1="aa22aa3345aa"
print re.split("\d+",str1)  #['aa', 'aa', 'aa']
```

面向对象编程简单来说就是基于对 **类** 和 **对象** 的使用，所有的代码都是通过类和对象来实现的编程就是面向对象编程！

面向对象的三大特性：**封装、继承、多态**

首先创建一个类

```
#使用class创建一个School类,类中有个student方法
class School:
    def student(self):
        pass
a1=School()
```

**一、封装**

1、封装：将某些内容先封装到一个地方，等到需要的时候再去调用

```
class School:
    def __init__(self,name,age):    #构造方法，创建对象是执行
        self.name=name
        self.age=age

#创建对象a1,a2
a1=School("zhangsan",18)
a2=School("lisi",18)
```

上面代码实现的就是封装的功能，把各自的name和age分别封装到了self的name和age属性中，就等于被封装到了对象a1和a2中

类中定义的函数叫做方法，带有__init__的函数称为构造方法，在创建a1,a2对象时会自动执行。

2、调用：调用有两种方式，通过对象直接调用和通过self间接调用

通过对象直接调用

```
class School:
    def __init__(self,name,age):
        self.name=name
        self.age=age

    def student(self):
        print("name:%s,age:%s"%(self.name,self.age))
#创建对象a1,a2
a1=School("zhangsan",18)
a2=School("lisi",18)

```

```
print a1.name,a1.age
print a2.name,a2.age
```

```
#执行结果: zhangsan 18
　　　　　 lisi 18
```

通过self间接调用

```
class School:
    def __init__(self,name,age):
        self.name=name
        self.age=age

    def student(self):
        print("name:%s,age:%s"%(self.name,self.age))
#创建对象a1,a2
a1=School("zhangsan",18)
a2=School("lisi",18)

#执行类中的方法时，通过self间接调用被封装的内容
a1.student()
a2.student()
#执行结果:
#name:zhangsan,age:18
#name:lisi,age:18
```

**二、继承**

1、继承：既派生类（子类）可以继承基类（父类）的方法，我们可以将多个类共有的方法提取到父类当中，这样子类仅需继承父类而不必一一实现每个方法

在类名后面括号中写上另一个类，表示继承了那个类

```
#使用class创建一个School类
class School:
    def __init__(self,name,age):
        self.name=name
        self.age=age

    def student(self):
        print("name:%s,age:%s"%(self.name,self.age))
    def classroom(self):
        print("%s去教室"%self.name)

class SchoolA(School):  #SchoolA继承School
    def __init__(self,name):
        self.name=name

class SchoolB(SchoolA): #SchoolB继承SchoolA
    def __init__(self,name):
        self.name=name
#创建对象a1
a1=SchoolA("zhangsan")
a1.classroom()
#创建对象a2
a2=SchoolB("lisi")
a2.classroom()

#执行结果：
#   zhangsan去教室
#   lisi去教室
```

在上面代码中我们可以看到，在SchoolA和SchoolB中都没有classroom方法，但由于SchoolB继承了SchoolA，而SchoolA又继承了School，所以他们创建对象后都能

调用School中的classroom方法。

2、多继承

在python中，类还可以继承多个类，在继承多个类时，他对类中的函数查找有两种方式

　　**深度优先**：类是经典类时，多继承情况下，会按照深度优先方式查找

　　**广度优先**：类是新式类时，多继承情况下，会按照广度优先方式查找

（在python3.x中）都默认为广度优先，但还是可以了解一下两个的区别，**新式类**：当前类或者基类继承了objiect类就叫新式类，否者就是经典类

在python2.7中

```
#python2.7中经典类
class A():
    def name(self):
        print("AAAAAA")
class B(A):
    pass
class C(A):
    def name(self):
        print("CCCCCC")
class D(B,C):
    pass
a1=D()
a1.name()   #输出：AAAAAA
#查找顺序:# 首先去自己D类中查找，如果没有，则继续去B类中找，没有则继续去A类中找，没有则继续去C类中找，如果还是未找到，则报错
#深度优先：D-B-A-C
```

```
#python2.7中新式类
class A(object):
    def name(self):
        print("AAAAAA")
class B(A):
    pass
class C(A):
    def name(self):
        print("CCCCCC")
class D(B,C):
    pass
a1=D()
a1.name()   #输出：CCCCCC
#查找顺序:# 首先去自己D类中查找，如果没有，则继续去B类中找，没有则继续去C类中找，没有则继续去A类中找，如果还是未找到，则报错
#广度优先：D-B-C-A
```

上面两个例子中我们可以看到，经典类和新式类输出的结果是不一样的，是因为他们的查找顺序不一样

python2.7中 广度优先的前提条件：D继承BC，BC又同时继承A，只有满足这个条件，新式类才会遵循广度优先，否者不会，例：

```
class A(object):
    def name(self):
        print("AAAAAA")
class B(A):
    pass
class C:
    def name(self):
        print("CCCCCC")
class D(B,C):
    pass
a1=D()
a1.name()   #输出：AAAAAA
```

如果C不在继承A，那么就算你是新式类，他也会按照深度优先的顺序查找

在python3.X之后就没有了上面的这些区别，它的查找顺序都是** 广度优先 **

**三、多态**

python不支持多态，也用不到多态，python是一种多态语言，崇尚鸭子类型

** 四、类中的成员**

类中的成员：字段、方法、属性

1、字段

字段：普通字段、静态字段

```
class School:
    headmaster="王五"
    def __init__(self,name,age):
        self.name=name
        self.age=age

    def student(self):
        print("name:%s,age:%s"%(self.name,self.age))

#创建对象a1
a1=School("zhangsan",18)
print(a1.name)  #访问普通字段
print(School.headmaster)    #访问静态字段

#执行结果:
#   zhangsan
#   王五
```

在上面代码中，__init__函数中的就是普通字段，headmaster就是静态字段

　　普通字段：属于对象，由对象来访问，在内存中每个对象都要保存一份

　　静态字段：属于类，由类直接访问，在内存中只保存一份

2、方法

方法：普通方法、静态方法、类方法

```
class School:
    headmaster="王五"
    def __init__(self,name,age):
        self.name=name
        self.age=age

    def student(self):  #普通方法 至少一个self
        print("普通方法")

    @staticmethod       #静态方法 任意参数
    def classroom():
        print("静态方法")

    @classmethod
    def dormitory(cls):    #类方法 只能一个cls
        print("类方法",cls)

#创建对象a1
a1=School("zhangsan",18)
a1.student()

School.classroom()    #访问静态方法
School.dormitory()     #访问类方法

'''执行结果：
    普通方法
    静态方法
    类方法 <class '__main__.School'>
    '''
```

普通方法：先创建一个对象，在用对象去调用这个方法

静态方法：直接用类调用，可以有任意参数(静态方法可以让类直接调用，省去了普通方法创建对象的步骤)

类方法：直接用类调用，只能一个cls参数

　　　　上面我们可以看到执行类方法时，输出了他传入的参数等于<class '__main__.School'>，是一个类，意思就是执行时，它会把当前的类当成参数传进去。

3、属性

属性定义：装饰器定义、静态字段定义

(1)装饰器定义

```
class School:
    headmaster="王五"
    def __init__(self,name,age):
        self.name=name
        self.age=age

    def student(self):  #方法
        print("方法")

    @property
    def classroom(self):    #属性，加上@property装饰器，仅有一个self参数
        print("属性")

#创建对象a1
a1=School("zhangsan",18)
a1.student()    #调用方法
a1.classroom    #调用属性

#执行结果：
#   方法
#   属性
```

在上面代码中可以看到，在方法上加上@property装饰器就叫属性，属性和方法的区别就是调用时**不用加括号**

**在新式类中，除了@property，还有另外两种装饰器**

```
class School(object):
    def __init__(self,name,age):
        self.name=name
        self.age=age

    @property
    def classroom(self):    #属性，加上@property装饰器，仅有一个self参数
        print(self.name,self.age)
    @classroom.setter
    def classroom(self,age):
        self.age=age    #把age修改为传入的参数
        print("修改",self.name,self.age)
    @classroom.deleter
    def classroom(self):
        del self.age        #删除age
        print("删除",self.name,self.age)

#创建对象a1
a1=School("张三",18)
a1.classroom    #1.执行后会自动调用@property方法
a1.classroom=20     #2.执行后会自动调用@classroom.setter的方法，并将20传给age参数
del a1.classroom    #3.执行后会自动调用@classroom.deleter的方法

'''执行结果:
    张三 18
    修改 张三 20
    在执行3时会报错,因为age已经在@classroom.deleter下面的方法里删除了，所以输出self.age时会出错
'''
```

(2)静态字段定义

```
class School(object):
    def __init__(self,name,age):
        self.name=name
        self.age=age

    def classroom(self):
        print(self.name,self.age)

    def classroom_update(self,age):
        self.age=age    #把age修改为传入的参数
        print("修改",self.name,self.age)

    def classroom_del(self):
        del self.age        #删除age
        print("删除",self.name,self.age)

    obj=property(classroom,classroom_update,classroom_del)  #静态字段方式定义属性

#创建对象a1
a1=School("张三",18)
a1.obj  #1.执行后会自动调用classroom方法
a1.obj=20     #2.执行后会自动调用classroom_update的方法，并将20传给age参数
del a1.obj    #3.执行后会自动调用classroom_delr的方法
```

4、公有成员和私有成员

在类中的每一个成员都有两种形式：公有、私有

**公有**：都可以访问　　　　　　**私有**：只有在类的内部可以访问

举几个例子

字段

```
class School(object):
    deg="狗" #公有静态字段
    __cat="猫"   #私有静态字段
    def __init__(self,name,age):
        self.name=name  #公有普通字段
        self.__age=age  #私有普通字段

    def dormitory(self):
        print(self.__age)

    def cat(self):
        print(School.__cat)

#创建对象a1
a1=School("张三",18)
#访问普通字段
print(a1.name)  #输出：张三
print(a1.age)   #报错，提示没有age，因为age是私有字段，只能间接内部访问
a1.dormitory()  #只能通过类内部访问私有字段
#访问静态字段
print(School.deg)   #输出：狗
print(School.__cat) #报错
a1.cat()        #输出：猫   可以间接通过内部的cat方法反问私有静态字段
```

方法

```
class School(object):

    def __init__(self,name,age):
        self.name=name
        self.__age=age

    def cat(self):  #公有方法
        print("cat")

    def __dog(self):   #私有方法
        print("dog")

    def doo(self):  #内部访问私有方法
        a1.__dog()
#创建对象a1
a1=School("张三",18)
a1.cat()    #输出：cat
a1.dog()    #报错
a1.doo()    #输出：dog  间接通过doo方法反问私有方法__dog
```

类中的其他成员也和上面的类似

如果想要强制访问私有字段，可以通过(对象._类名__私有字段名)访问，不建议强制访问私有成员。

5、类中的特殊成员

(1)**__doc__**

```
class School(object):
    """类的描述信息"""
    def __init__(self,name,age):
        self.name=name
        self.__age=age

print(School.__doc__)   #输出:类的描述信息
```

(2)**__init__**

在上面已经说过，在创建对象是自动执行

(3)**__del__**

当对象在内存中被释放时，自动触发执行

(4)**__call__**

在创建的对象后面加括号执行时，会自动执行类里的__call__方法

```
class School(object):

    def __call__(self, *args, **kwargs):
        print("触发__call__方法")

a1=School()
a1()    #输出：触发__call__方法
School()()  #输出：触发__call__方法
```

(5)**__dict__**

获取类或对象的所有成员

```
class School(object):
    """类的描述信息"""
    cat="猫"
    def __init__(self,name,age):
        self.name=name
        self.__age=age
    def dog(self):
        print("dog")

print(School.__dict__)  #获取类中的成员
a1=School("张三",18)
print(a1.__dict__)  #获取对象中的成员
'''
输出：
{'cat': '猫', '__init__': <function School.__init__ at 0x000000000226C950>, '__dict__': <attribute '__dict__' of 'School' objects>, '__weakref__': <attribute '__weakref__' of 'School' objects>, '__module__': '__main__', 'dog': <function School.dog at 0x000000000226CAE8>, '__doc__': '类的描述信息'}
{'name': '张三', '_School__age': 18}
'''
```

(6)**__str__**

没有__str__

```
class School(object):
    def __init__(self,name,age):
        self.name=name
        self.__age=age
a1=School("张三",18)
print(a1)   #输出：<__main__.School object at 0x000000000222B278>
```

有__str__

```
class School(object):
    def __init__(self,name,age):
        self.name=name
        self.__age=age

    def __str__(self):
        return("print对象时的返回值")
a1=School("张三",18)
print(a1)   #输出：print对象时的返回值
```

其他的特殊成员就不一一列举了，因为大多数情况下也不会用到