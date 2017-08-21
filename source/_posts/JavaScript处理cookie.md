---
title: JavaScript处理cookie
tags: [前端,js]
categories: 前端
---
```
//设置cookies函数
function setcookie ( name , value )
{
    var Days = 30 ;
     var exp   = new Date ();    
    exp . setTime ( exp . getTime () + Days  24  60  60  1000 );
   document . cookie = name + "=" + escape ( value ) + ";expires=" + exp . toGMTString ();
}
//取cookies函数      
function getcookie ( name )  
{
     var arr = document . cookie . match ( new RegExp ( "(^| )" + name + "=([^;]*)(;|$)" ));
    if ( arr != null ) return unescape ( arr [ 2 ]); return null ;
}
//删除cookie
function delcookie ()
{
var name = "comparelist" ;
    var exp = new Date ();
   exp . setTime ( exp . getTime () - 1 );
    var cval = getcookie ( name );
    document . getElementById ( "comparelist" ). innerHTML = '' ;
    if ( cval != null ) document . cookie = name + "=" + cval + ";expires=" + exp .toGMTString ();
}
```

