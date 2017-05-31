---
title: 移动端WEB给用户发送邮件
tags: [前端,移动端,WEB,邮件]
categories: 移动端
---
#### mailto使用方法

1、基础写法

当浏览者点击这个链接时，浏览器会自动调用默认的客户端电子邮件程序，并在收件人框中自动填上收件人的地址下面
```
<a href="mailto:peun@foxmail.com">单击这里给peun发电子邮件</a>
```
http://images2015.cnblogs.com/blog/278431/201511/278431-20151116114810108-1436165533.jpg
2、在收件人地址后用?cc=开头，填写抄送地址(android存在兼容问题)
```
<a href="mailto:peun@foxmail.com?cc=lina@qq.com">单击这里给peun发电子邮件</a>
```
http://images2015.cnblogs.com/blog/278431/201511/278431-20151116114824155-71907555.jpg
3、紧跟着抄送地址之后，写上&bcc=，填上密件抄送地址(android存在兼容问题)
```
<a href="mailto:peun@foxmail.com?cc=lina@qq.com&bcc=luna@qq.com">单击这里给peun发电子邮件</a>
```
注意：在添加这些功能时，第一个功能以"?"开头，后面的以"&"开头
http://images2015.cnblogs.com/blog/278431/201511/278431-20151116114835780-1630655331.jpg
4、包含多个收件人、抄送、密件抄送人，用分号隔(;)开多个收件人的地址即可实现
```
<a href="mailto:peun@foxmail.com;dana@foxmail.com">单击这里给peun发电子邮件</a>
```
http://images2015.cnblogs.com/blog/278431/201511/278431-20151116114851436-1245383931.jpg
5、包含主题，用?subject=可以填上主题
```
<a href="mailto:peun@foxmail.com?subject=【邀请函】">单击这里给peun发电子邮件</a>
```
http://images2015.cnblogs.com/blog/278431/201511/278431-20151116114914030-2074510330.jpg

6、包含内容，用?body=可以填上内容

内容包含文本，使用%0A给文本换行
```
<a href="mailto:peun@foxmail.com?body=邀请您参加腾讯onepiece分享%0A%0A期待您的到来%0A%0Apeunzhang">单击这里给peun发电子邮件</a>
```
http://images2015.cnblogs.com/blog/278431/201511/278431-20151116115920765-333659373.jpg
内容包含链接，含http(s)://等的文本自动转化为链接
```
<a href="mailto:peun@foxmail.com?body=http://www.cnblogs.com/PeunZhang/">单击这里给peun发电子邮件</a>
```
http://images2015.cnblogs.com/blog/278431/201511/278431-20151116115252436-619314432.jpg
内容包含图片，PC端不支持
```
<a href="mailto:peun@foxmail.com?body=<img src='http://images.cnblogs.com/cnblogs_com/PeunZhang/286351/o_peunzhang_cnblogs_code.png' width='200' height='200'>">单击这里给peun发电子邮件</a>
```
http://images2015.cnblogs.com/blog/278431/201511/278431-20151116115300061-1441809387.jpg
8、完整示例，如果mailto后面同时有多个参数的话，第一个参数必须以“?”开头，后面的每一个都以“&”开头
```
<a href="mailto:aaa@xxx.com;bbb@xxx.com;ccc@xxx.com?cc=ddd@yyy.com;eee@yyy.com&bcc=fff@zzz.com&subject=【邀请函】&body=邀请您参加腾讯onepiece分享">单击这里给peun发电子邮件</a>
```
http://images2015.cnblogs.com/blog/278431/201511/278431-20151116120359452-1156860153.jpg
知道基本的用法后，回到微信商户通的需求点，有了以下的界面：
http://images2015.cnblogs.com/blog/278431/201511/278431-20151110135935181-17939860.jpg
发送成功后，在QQ邮箱打开的界面：
http://images2015.cnblogs.com/blog/278431/201511/278431-20151110135648853-154642654.jpg
重点代码展示：

HTML

```
<a href="javascript:;" class="btn btn-green form-btn" id="sendBtn">打开邮箱</a>
```
javascript
```
var txt = "?subject=［微信支付停车场行业资源包v1.0］&body=停车场行业 - 微信支付行业设计方案资源包v1.0%0A%0A"
            + "http://action.weixin.qq.com/payact/readtemplate?t=/mobile/merchant/project/parking/download_tmpl%0A%0A"
            + "里面含有：%0A%0A1.停车场行业方案设计模版.ai%0A2.停车场前端页面开发文件.html%0A%0A"
            + "您可以用源文件直接编辑后印刷或开发。%0A%0A"
            + "资源包如果有最新版本会第一时间更新。欢迎继续关注微信支付行业设计方案，或者分享给您的商业伙伴。%0A%0A"
            + "微信支付行业设计方案：%0A%0A"
            + "<img src='http://ol.weixin.qq.com/public/demo/parking/parking_discount/img/code.png' width='200' height='200'>";

var sendBtn = document.getElementById("sendBtn"),
    sendName = document.getElementById("sendName");
sendBtn.addEventListener("click",function(e){
        sendNameVal = document.getElementById("sendName").value;
        if (filter.test(sendNameVal) == false) {
            e.preventDefault();
            removeClass(info,"hide")
        }
        else
        if(filter.test(sendNameVal) == true){
            sendBtn.setAttribute("href","mailto:" + sendNameVal + txt);
        }
    })
```
缺点

    部分用户打开邮箱后不知道是自己给自己发送邮件
    部分用户没有手机邮箱账户，点击打开邮件后不会设置，放弃下载
    邮件成功后，被部分客户端当做垃圾邮件处理，用户找不到邮件

于是在此缺点的上补充了手机自带的复制功能，保证用户可以拿到下载链接，完善后下载量也提升了~

长按a标签弹出系统默认菜单，点复制(拷贝)，保证用户有办法可以拿到下载链接：
http://images2015.cnblogs.com/blog/278431/201511/278431-20151116140743186-890588449.jpg
重点代码展示：

HTML
```
<a href="http://action.weixin.qq.com/payact/readtemplate?t=mobile/merchant/project/parking/download_tmpl" target="_blank" class="copy">http://action.weixin.qq.com/payact/readtemplate?t=mobile/merchant/project/parking/download_tmpl</a>
```
css
```
 .copy{-webkit-touch-callout: default;}
```
javascript
```
//检测平台，PC端可点击a，移动端禁止a
    function mobilePreventA(e){
        var system = {
            win: false,
            mac: false,
            xll: false,
            ipad:false
        };
        var p = navigator.platform;
        system.win = p.indexOf("Win") == 0;
        system.mac = p.indexOf("Mac") == 0;
        system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
        if (!(system.win || system.mac || system.xll)) {
             e.preventDefault();
        }
    }
    var copyBtn = document.querySelector(".copy");
    copyBtn.addEventListener("click",function(e){
        mobilePreventA(e);
    })
```
缺点

    需要发送下载链接到PC的微信或者QQ等，操作不方便

调用QQ邮件分享功能

QQ邮件分享功能

http://images2015.cnblogs.com/blog/278431/201511/278431-20151116134553921-1856479774.jpg
重点代码展示：
```
<script type="text/javascript">
(function(){
var p = {
url:location.href,
to:'qqmail',
desc:'', /*默认分享理由(可选)*/
summary:'请打开http://www.cnblogs.com/PeunZhang/下载',/*摘要(可选)*/
title:'资源下载',/*分享标题(可选)*/
site:'白树博客',/*分享来源 如：腾讯网(可选)*/
pics:'ttp://images.cnblogs.com/cnblogs_com/PeunZhang/286351/o_peunzhang_cnblogs_code.png' /*分享图片的路径(可选)*/
};
var s = [];
for(var i in p){
s.push(i + '=' + encodeURIComponent(p[i]||''));
}
document.write(["<a target='_blank' ", 'href="http://mail.qq.com/cgi-bin/qm_share?', s.join("&"), '"', ' style="cursor:pointer;text-decoration:none;outline:none"><img src="http://rescdn.qqmail.com/zh_CN/htmledition/images/function/qm_open/ico_share_01.png"/></a>'].join(""));
})();
```
缺点

    移动端并没有做兼容，手机设备上操作难度大
    没有设置viewport，页面内容特别小
    没有微信登陆授权操作，需要手动输入QQ账号

出处：http://peunzhang.cnblogs.com/
