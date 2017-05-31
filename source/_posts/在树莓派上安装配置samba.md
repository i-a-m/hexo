---
title: 树莓派安装samba
tags: [树莓派,物联网,linux]
categories: raspberry pi
---
创建Samba共享其实非常简单（两个步骤）：

1. **安装Samba**
2. **配置Samba**

```
sudo apt-get install samba samba-common-bin
```

- 安装完成后接着添加samba用户和密码，为了方便直接使用树莓派的默认用户pi。

```
~ sudo smbpasswd -a pi
# password 123456789
# smbpasswd -x pi //delete user.
```

- 备份Samba[配置文件](http://www.07net01.com/tags-%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6-0.html)

```
# Backup conf file.
~ sudo cp -p /etc/samba/smb.conf /etc/samba/smb.conf_bak
```

- 修改默认的配置文件smb.conf（nano[编辑器](http://www.07net01.com/tags-%E7%BC%96%E8%BE%91%E5%99%A8-0.html)）

```
sudo nano /etc/samba/smb.conf
```

将[global]字段里的”workgroup = WORKGROUP”按需修改成和你[电脑](http://www.07net01.com/tags-%E7%94%B5%E8%84%91-0.html)同一个工作组（默认应该就是WORKGROUP），然后将位于下方的[homes]、[printers]字段的配置统统注释掉，然后添加下面配置。

```
#custom add begin.
[CohoStudio_NAS]
comment=Raspberry Pi NAS.
path=/home/pi/nas
read only = no #任何人都具有了访问修改的权限
#因为是公共文件夹，所以给了所有用户全部权限，可以自定义
create mask = 0777 #新创建文件的默认属性
directory mask = 0777 #新创建文件夹的默认属性
guest ok = yes #默认的访问用户名为guest
browseable = yes
public = yes

[RaspberryPi_HOME]
comment=Raspberry Pi Home.
path=/home/pi
writeable=yes
browsable=yes
create mask=0777
directory mask=0777
valid users=pi
public=no
# custom add end.
```

- 配置完成后启动

```
sudo /etc/init.d/samba restart
# ubuntu command:  sudo /etc/init.d/smbd restart
pi@raspberrypi ~ $ sudo /etc/init.d/samba start
[ ok ] Starting Samba daemons: nmbd smbd.
```

Well done. [Windows](http://www.07net01.com/)电脑连到Raspberry Pi同一个[局域网](http://www.07net01.com/tags-%E5%B1%80%E5%9F%9F%E7%BD%91-0.html)络，就可以看到树莓派的samba共享文件夹了。

注：

- 用 smbpasswd 命令直接设置，需要首先要添加系统用户然后用 smbpasswd -a 用户名 添加 Samba 用户；

```
smbpasswd -e 用户名 # 激活用户
```

- 挂载USB移动硬盘（将移动硬盘挂载在/home/pi/nas/目录下面）：

```
sudo mount /dev/sda1 /home/pi/nas/
```

有时候卸载USB移动硬盘的时候会提示设备忙(Device is busy)，只需要加上 –l 参数就行了：

```
sudo umount -l /home/pi/nas/
```
