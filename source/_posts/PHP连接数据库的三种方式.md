---
title: PHP连接数据库的三种方式
tags: [php,数据库]
categories: php
---
```
 一、mysql_connect函数连接：
<?php
$dblink=mysql_connect("localhost","root","");
mysql_select_db("business",$dblink);
mysql_query("set names gbk");
?>

二、mysqli_connect函数连接：

<?php 
     $dblink=mysqli_connect("localhost","root","","business");
     if(!$dblink){
      echo "连接数据库失败!!"; 
         echo mysqli_connect_error();
         exit(); }
      mysqli_query($dblink,"set names gbk");
?>
备注：使用该函数连接数据库，需要将php.ini文中中“;extension=php_mysqli.dll”中的分号“;”去掉，然后从新启动Apache服务器。

三、面向对象方式连接数据库：

1、conn_class.php：
<?php
        class con
                {
                  private $hostname;
            private $username;
            private $userpwd;
            private $databasename;
                  public $conn; 
            public function __construct($x,$y,$m,$n)
            {
            $this->hostname=$x;
            $this->username=$y;
            $this->userpwd=$m;
      $this->databasename=$n;
            } 
                  public function getcon()
            {
            $this->conn=mysql_connect($this->hostname,$this->username,$this->userpwd);  
            mysql_select_db($this->databasename,$this->conn);
                          mysql_query("set names GBK");  
            }
               }
?>
2、config.php：
<?php 
              include_once('conn_class.php')
              $conndb=new con("localhost","root","","business");
              $conndb->getcon();
              if ($conndb == null)
                 {
                   echo "数据库连接失败<br>";
                   exit();
                  }
?>
备注：使用此连接方式，需要在SQL执行语句后加“,$conndb->conn”，如：
<?php
    include_once('config.php');
          $sql=mysql_query("select * from business_hezuo order by hezuo_rank asc",$conndb->conn);
    $info=mysql_fetch_array($sql);
    if($info==false){
      echo "暂无信息!";
    }else{
     do{       
?> 
```

