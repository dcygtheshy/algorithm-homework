<?php
// 数据库连接参数
$servername = "mysql.sqlpub.com";
$username = "zhuhao";
$password = "9F5LCT4iLrp9xz4S";
$dbname = "zhuhao";

// 创建连接
$conn = new mysqli($servername, $username, $password, $dbname);

// 检查连接是否成功
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

// 要执行的 SQL 语句
$sql = "CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'id号',
  `username` varchar(60) NOT NULL COMMENT '用户名',
  `password` varchar(60) NOT NULL COMMENT '密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
INSERT INTO `user` VALUES (1,'lxq','1'),(5,'1','1'),(6,'22','22');
";

// 执行多条 SQL 语句
if ($conn->multi_query($sql)) {
    do {
        // 检查当前语句是否有结果集
        if ($result = $conn->store_result()) {
            // 处理结果集（如果需要）
            $result->free();
        }
        // 准备处理下一条语句
    } while ($conn->more_results() && $conn->next_result());
    echo 'SQL 语句执行成功';
} else {
    echo '执行错误: ' . $conn->error;
}

// 关闭连接
$conn->close();
?>
