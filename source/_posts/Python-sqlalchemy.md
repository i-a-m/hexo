---
title: Python—sqlalchemy
tags: [Python]
categories: Python
---
**SQLAlchemy**

　　SQLAlchemy是Python编程语言下的一款ORM框架，该框架建立在数据库API之上，使用关系对象映射进行数据库操作。

```
#Dialect用于和数据API进行交流，根据配置文件的不同调用不同的数据库API，从而实现对数据库的操作:
'''
MySQL-Python
    mysql+mysqldb://<user>:<password>@<host>[:<port>]/<dbname>
 
pymysql
    mysql+pymysql://<username>:<password>@<host>/<dbname>[?<options>]
 
MySQL-Connector
    mysql+mysqlconnector://<user>:<password>@<host>[:<port>]/<dbname>
 
cx_Oracle
    oracle+cx_oracle://user:pass@host:port/dbname[?key=value&key=value...]
'''
```

 

1、使用 Schema Type/SQL Expression Language/Engine/ConnectionPooling/Dialect 进行数据库操作。

```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
from sqlalchemy import create_engine, Table, Column, Integer, String, MetaData, ForeignKey,select
metadata = MetaData()

user = Table('pepole', metadata,
    Column('id', Integer, primary_key=True),
    Column('name', String(20)),
)

color = Table('color', metadata,
    Column('id', Integer, primary_key=True),
    Column('name', String(20)),
)
engine = create_engine("mysql+mysqldb://root:123456@172.16.8.47:3306/test" ,max_overflow=5)
#metadata.create_all(engine)创建表

conn = engine.connect()
#--增
#sql = user.insert().values(id=3, name='lisi')
#conn.execute(sql)
#conn.close()
#--删
#sql = user.delete().where(user.c.id == 1)
#conn.execute(sql)
#conn.close()
#--改
#sql = user.update().where(user.c.name == 'zhangsan').values(name='lisi')
#conn.execute(sql)
#conn.close()
#--查
#sql = select([user, ])
#sql = select([user.c.id, ])
#sql = select([user.c.name, color.c.name]).where(user.c.id==color.c.id)#查找user和color表中id相等的name
#sql = select([user.c.name]).order_by(user.c.name)

#result = conn.execute(sql)
#print result.fetchall()
```

 

2、使用 ORM/Schema Type/SQL Expression Language/Engine/ConnectionPooling/Dialect 所有组件对数据进行操作。根据类创建对象，对象转换成SQL，执行SQL。

```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

engine = create_engine("mysql+mysqldb://root:123456@192.168.0.110:3306/test" ,max_overflow=5)#echo=True显示过程

Base = declarative_base()

class Host(Base):
    __tablename__ = 'hosts'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))

# 寻找Base的所有子类，按照子类的结构在数据库中生成对应的数据表信息
Base.metadata.create_all(engine)
```

 增、删、改、查

```
Session = sessionmaker(bind=engine)
session = Session()
#--------增
u = Host(id=2, name='zhansgan')
session.add(u)
session.add_all([
                 Host(id=3, name='lisi'),
                 Host(id=4, name='wangwu')
     ])
session.commit()
```



```
#--------删
session.query(Host).filter(Host.id > 2).delete()
session.commit()
```

```
#--------改
session.query(Host).filter(Host.id == 2).update({'name' : "wangwu"})
session.commit()
```



```
#--------查
result=session.query(Host).filter_by(id=2).first()#first()第一个 all()全部
print result

offs=session.query(Host).offset(1).all()#从第4条数据开始
print(offs)

ret = session.query(Host).order_by(Host.id).all()#排序
ret = session.query(Host).order_by(Host.id)[0:3]#找出前3条记录

print(ret)

session.commit()
```



```
query = session.query(Host.name)
print query.all()
print query.limit(1).all() # 最多返回 1 条记录
print query.offset(1).all() # 从第 2 条记录开始返回
print query.order_by(Host.name).all() # 排序
print query.order_by(Host.name.desc()).all()
```

filter其他常用功能：

equals**

```
query.filter(User.name == 'ed')
```

not equals**

```
query.filter(User.name != 'ed')
```

LIKE:****

```
query.filter(User.name.like('%ed%'))
```

IN:

```
query.filter(User.name.in_(['ed', 'wendy', 'jack']))#在列表内存在就找出
# works with query objects too:
query.filter(User.name.in_(
　　　　　　session.query(User.name).filter(User.name.like('%ed%'))
))#先找出符合%ed%的列表在判断是否在该列表内
```

NOT IN:**

```
query.filter(~User.name.in_(['ed', 'wendy', 'jack']))
```

IS NULL:**

```
query.filter(User.name == None)
# alternatively, if pep8/linters are a concern
query.filter(User.name.is_(None))
```

IS NOT NULL:**

```
query.filter(User.name != None)
# alternatively, if pep8/linters are a concern
query.filter(User.name.isnot(None))
```

AND:

```
from sqlalchemy import and_

query.filter(and_(User.name == 'ed', User.fullname == 'Ed Jones'))
```

OR:

```
from sqlalchemy import or_
query.filter(or_(User.name == 'ed', User.name == 'wendy'))
```

 

外键关联

一对多的关联引用parent.relationship()

```
class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    group_id=Column(Integer,ForeignKey("group.id"))#关联
    group=relationship("Group",backref="group_list")#可以通过group获取Group表里的数据，backref:反向关联

class Group(Base):
    __tablename__ = 'group'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
```



```
#在表Group插入两个组
g1=Group(name="g1")
g2=Group(name="g2")
session.add_all([g1,g2])
session.commit()
```



```
#插入一个用户
g1=session.query(Group).filter(Group.name=="g1").first()
u = User(id=1, name='zhangsan',group_id=g1.id)
session.add(u)

#可以通过User表查看zhangsan在Group表里对应的组
h=session.query(User).filter(User.name=="zhangsan").first()
print(h.group.name)
```



relationship()中的backref（反向关联）

```
#查看g1组下有几个用户关联
gg=session.query(Group).filter(Group.name=="g1").first()
print(gg.group_list)
```

 

join查询

**INNER JOIN**:

```
aa=session.query(User).join(User.group).all()
print(aa)

aa=session.query(User).join(User.group).filter(Group.name=="g1").all()#加条件
print(aa)
```

 

**多对多关联查询**（需创建一个中间表）



```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String,ForeignKey,Table
from sqlalchemy.orm import sessionmaker,relationship
from sqlalchemy import create_engine

engine = create_engine("mysql+mysqldb://root:123456@172.16.8.47:3306/test" ,max_overflow=5)#echo=True显示过程
Base = declarative_base()

#创建中间表，关联另外两个表
HostGroup = Table("Host_Group",Base.metadata,
                  Column("host_id",ForeignKey("host.id"),primary_key=True),
                  Column("group_id",ForeignKey("group.id"),primary_key=True),
                  )

class Host(Base):
    __tablename__ = 'host'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    #group_id=Column(Integer,ForeignKey("group.id"))

    group=relationship("Group",
                       secondary=HostGroup,#指定中间表的实例
                       backref="group_list")
    def __repr__(self):
        return "id:%s,name:%s"%(self.id,self.name)

class Group(Base):
    __tablename__ = 'group'
    id = Column(Integer, primary_key=True)
    name = Column(String(50),unique=True,nullable=False)

    def __repr__(self):
        return "id:%s,name:%s"%(self.id,self.name)

# 寻找Base的所有子类，按照子类的结构在数据库中生成对应的数据表信息
Base.metadata.create_all(engine)
```



创建组和主机



```
Session = sessionmaker(bind=engine)
session = Session()

#创建组
g1 = Group(name="g1")
g2 = Group(name="g2")
g3 = Group(name="g3")
session.add_all([g1,g2,g3])

#创建主机
h1 = Host(name="172.0.0.1")
h2 = Host(name="172.0.0.2")
h3 = Host(name="172.0.0.3")
session.add_all([h1,h2,h3])
```



进行关联



```
groups = session.query(Group).all()#找出所有组

h1=session.query(Host).filter(Host.name=="172.0.0.1").first()#找出h1
    
h2=session.query(Host).filter(Host.name=="172.0.0.2").first()#找出h2

h1.group=groups#h1关联3个组
h2.group=groups[1:-1]#h2关联两个组
```



查询

```
g1=session.query(Group).filter(Group.name=="g1").first()
h2=session.query(Host).filter(Host.name=="172.0.0.1").first()

print(g1.group_list)#查看g1组下有哪些主机
print(h2.group)#查看172.0.0.1属于哪些组
```

 



 