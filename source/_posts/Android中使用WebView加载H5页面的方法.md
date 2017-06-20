---
title: Android中使用WebView加载H5页面的方法
tags: [前端,webview,h5]
categories: 前端
---
1、AndroidManifest.xml中必须加权限，否则会出Web page not available错误。

<uses-permission [Android](http://lib.csdn.net/base/android):name="[android](http://lib.csdn.net/base/android).permission.INTERNET" />

2、如果访问的页面中有[JavaScript](http://lib.csdn.net/base/javascript)，则webview必须设置支持[javascript](http://lib.csdn.net/base/javascript)。
webview.getSettings().setJavaScriptEnabled(true); 

3、声明WebView控件，并设置URL

WebView.loadUrl(URL);（URL为H5页面的地址）

下面是XML文件的

<WebView
​            android:id="@+id/webView"
​            android:layout_width="match_parent"
​            android:layout_height="match_parent" />