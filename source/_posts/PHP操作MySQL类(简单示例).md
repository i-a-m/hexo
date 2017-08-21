---
title: PHP操作MySQL类(简单示例)
tags: [php,数据库]
categories: php
---
```
下面这个，是针对php5的一个简单数据库封装类，适合学习，其他的如删除、更新等操作，你可以自己加上：
<?php
class Mysql{    //首先定义一个类,首写字母大写
    public $host;//服务器名,访问修饰符PUBLIC证明$host是一个公共的属情在类的内部外部都可访问,可以被继承
    public $user;//用户名,是公共的属性
    private $pass;//密码,问修饰符private证明$pass是私有的.只能在类的内部使用且不能被继承.
    public $dbname;//数据库名,也是公共的属性.
     //construct声名这是一个造函数,定义一些初始的信息.有三个参数
                  public function construct($host,$user,$pass,$dbname){
        $this->host = $host;
        $this->user = $user;
        $this->pass = $pass;
        $this->dbname = $dbname;
        $link = @mysql_connect($this->host,$this->user,$this->pass)
             or die(\"error\");
         @mysql_select_db($this->dbname,$link)
             or die(\"error2\");
     }
//定义数据库的查寻和显示函数
function myQuery($sql){
        $result = mysql_query($sql);
         if(!$result){
             echo \"error3\";
             exit;
         }
        $num = mysql_num_rows($result);
         if($num){
             echo \"NO\".$num;
         }
         while($row = mysql_fetch_assoc($result)){
             echo \'<tr><td bgcolor=\"#fffddd\"><pre>\'.htmlspecialchars(stripslashes($row[\'body\'])).\"<pre></td></tr>\";
         }
     }
}
$rutt = new Mysql(\'localhost\',\'root\',\'ssss\',\'calvin\');//实例化一个类...记住这里的参数是和构造函数的参数一样的...
$rutt->myQuery(\'select * from calvin_body\');//运行数据库查寻并显示的函数..
?> 


下面这个是针对php5以下版本的数据库封装类，体现了php类的继承，一个许愿版程序的：
<?php
/*


    FileName: DatabaseSQL.inc.php

    Author: Terry

    Function: 建立DatabaseSQL对象，实现对数据库的基本操作

    Version : Blue-System v2.0

    CreateDate: 2004-03-10

    Copyright: Blue-Workshop / http://www.blue4me.net */


// 定义DatabaseSQL对象
Class DatabaseSQL
{
   var $CONN = \"\";     // 连接号
     var $HOST = \"Localhost\";     // 主机名
     var $USER = \"\";              // 用户名
     var $PASSWORD = \"\";          // 密码

 // DatabaseSQL类的构造函数
 function DatabaseSQL($DBNAME)
 {
   $user = $this -&gt; USER;
     $password = $this -&gt; PASSWORD;
     $host = $this -&gt; HOST;
     $db = $DBNAME;

     // 连接数据库
     $conn = mysql_connect($host, $user, $password);
     mysql_select_db($db, $conn);
     $this -&gt; CONN = $conn;
     return true;
 }

 // 定义查询操作
 function select($strSQL = \"\")
 {
   if ( empty($strSQL) ) return false;
     if ( empty($this -&gt; CONN) ) return false;
     $conn = $this -&gt; CONN;

     // 发送SQL语句，获得结果
     $result = mysql_query($strSQL, $conn);
     if ( (!$result) or (empty($result)) ) {
       return false;
     }
     $num = 0;
     $data = array();
     // 将查询结果放二维数组中
     while ( $row = mysql_fetch_array($result) ) {
       $data[$num] = $row;
         $num++;
     }
     mysql_free_result($result);
     return $data;
 }

 // 定义插入操作
 function insert($strSQL = \"\")
 {
   if ( empty($strSQL) ) return false;
     if ( empty($this -&gt; CONN) ) return false;
     $conn = $this -&gt; CONN;

     // 发送SQL语句，插入新数据
     $result = mysql_query($strSQL, $conn);
     if ( !result ) return false;

     // 获得记录的id号
     $result = mysql_insert_id();
     return $result;
 }

 // 定义更新操作
 function update($strSQL = \"\")
 {
   if ( empty($strSQL) ) return false;
     if ( empty($this -&gt; CONN) ) return false;
     $conn = $this -&gt; CONN;

     // 发送SQL语句，更新数据库
     $result = mysql_query($strSQL, $conn);
     return $result;
 }

 // 定义删除操作
 function delete($strSQL = \"\")
 {
   if ( empty($strSQL) ) return false;
     if ( empty($this -&gt; CONN) ) return false;
     $conn = $this -&gt; CONN;

     // 发送SQL语句，删除记录

   $result = mysql_query($strSQL, $conn);
         return $result;
     }

}
?>


<?php
/*


    FileName: Wish.inc.php

    Author: Terry

    Function: 建立Wish对象，实现对许愿板进行操作功能

    Version : Blue-System v2.0

    CreateDate: 2004-03-10

    Copyright: Blue-Workshop / http://www.blue4me.net */


require \"config.inc.php\";
require \"DatabaseSQL.inc.php\";

// 定义Wish对象
Class Wish extends DatabaseSQL
{
   // 构造函数
     function Wish()
     {
         $DBName = $GLOBALS[\"dbname\"];
         $this -> DatabaseSQL($DBName);
     }

 // 添加新愿望(use in wish/save.php?action=add_wish)
 function AddWish($name,$receiver,$type,$address,$content,$hide,$addtime)

{
       $strSQL = \"insert into Wish (Name, Receiver, Type, Address, Content, Hide, AddTime) values (\'$name\', \'$receiver\', \'$type\', \'$address\', \'$content\', \'$hide\', \'$addtime\')\";
         $result = $this -> insert($strSQL);
         return $result;
     }

 // 修改指定id的愿望内容(use in save.php?action=edit_wish)
 function EditWish($wid,$name,$receiver,$type,$address,$content,$hide)

{
       $strSQL = \"update 
Wish
 set 
Name
 = \'$name\', 
Receiver
 = \'$receiver\', 
Type
 = \'$type\', 
Address
 = \'$address\', 
Content
 = \'$content\', 
Hide
 = \'$hide\' where 
WID
 = \'$wid\' \";
         $result = $this -> update($strSQL);
         return $result;
     }

 // 愿望列表(use in index.php)
 function ListWish($startid,$list_nums)
 {
   $strSQL = \"select * from Wish order by AddTime desc LIMIT $startid,$list_nums\";
     $result = $this -&gt; select($strSQL);
     return $result;
 }

 // 获取指定愿望信息(use in index.php?go=view_wish)
 function GetWish($wid)
 {
   $strSQL = \"select * from Wish where WID = \'$wid\'\";
     $result = $this -&gt; select($strSQL);
     return $result;
 }

 // 更新指定愿望的浏览数(use in index.php?go=view_wish)
 function UpdateHit($wid)
 {
   $strSQL = \"update `Wish` set `Hit` = ( `Hit` + 1 ) where `WID` = \'$wid\'\";
     $result = $this -&gt; update($strSQL);
     return $result;
 }

 // 删除指定愿望信息(use in save.php?action=del_wish)
 function DelWish($wid)
 {
   $strSQL = \"delete from Wish where WID = \'$wid\'\";
     $result = $this -&gt; delete($strSQL);
     return $result;
 }

}
?>


<?php
/*


    FileName: config.inc.php

    Author: Terry

    Function: 系统基本设置

    Version : B.S - Wish v1.0

    CreateDate: 2004-03-19

    Copyright: Blue-Workshop


        Tec-Support:  http://www.blue4me.net   / http://feeltouch.8u8.com     Attention: 请保留版权信息，谢谢 ^_^
        /


    // 数据库信息
    $dbhost = \"Localhost\";      / 主机名 /
    $dbuser = \"\";         / 数据库用户 /
    $dbpwd = \"\";          / 数据库密码 /
    $dbname = \"BS_Wish\";        / 数据库名 /

    // 管理员信息
    $adminname = \"blue\";               / 初始化管理员 /
    $adminpwd = \"blue\";                     / 初始化管理密码 /
    ?> 
```

