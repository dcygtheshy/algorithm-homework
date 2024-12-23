<?php
$host = 'mysql.sqlpub.com';
$port = 3306;
$username = 'zhuhao';
$password = '9F5LCT4iLrp9xz4S';
$database = 'zhuhao';

// 创建连接
$con = mysqli_connect($host, $username, $password, $database, $port);

// 检查连接是否成功
if (mysqli_connect_errno())
{
    echo "连接 MySQL 失败: " . mysqli_connect_error();
} 

echo '连接成功';

// 在此处编写您的数据库操作代码

// 关闭连接
//mysqli_close($con);
?>
