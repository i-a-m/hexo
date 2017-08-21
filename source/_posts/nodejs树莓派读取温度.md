---
title: nodejs树莓派读取温度
tags: [树莓派,node,]
categories: 树莓派
---

[![img](http://wenglou.qiniudn.com/FotLTArYVIVBqF60q4cOmHvQHe6h)](http://wenglou.qiniudn.com/FotLTArYVIVBqF60q4cOmHvQHe6h)

### 安装 BCM2835

```
wget http://www.airspayce.com/mikem/bcm2835/bcm2835-1.50.tar.gz

tar zxvf bcm2835-1.xx.tar.gz
cd bcm2835-1.xx
./configure
make
sudo make check
sudo make install

```

### 安装npm模块

<https://github.com/momenso/node-dht-sensor>

```
npm install node-gyp -g

npm install node-dht-sensor

```

第三代gpio引脚，不同版本引脚不同，网上很容易找到图示

![img](http://wenglou.qiniudn.com/FjkMX3kr53BCAcBgh4b6cXm2Mtdq)

![img](http://wenglou.qiniudn.com/Fik8D_Pb6VjZZM-liTdWDua5V1Ok)

### 代码

```
var sensor = require('node-dht-sensor');

var read = function() {
    // 第一个参数表示传感器类型，我这里用的是DHT11，传值为11； 第二个参数为gpi引脚
    sensor.read(11, 18, function(err, temperature, humidity) {
        if (!err) {
            console.log('温度: ' + temperature.toFixed(1) + '°C, ' +
                '湿度: ' + humidity.toFixed(1) + '%'
            );
        }
    });    
}

setInterval(read, 2000)

```

输出效果

![img](http://wenglou.qiniudn.com/FuiemsLQTa-GKi8wosqG0O87oaxn)