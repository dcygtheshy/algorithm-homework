<?php
session_start();
if (!isset($_SESSION['username']) || !isset($_SESSION['userid'])) {
    // 如果用户未登录，重定向到登录页面
    header('Location: login.php');
    exit();
}

require 'login_db_connect.php'; // 数据库连接文件

$username = htmlspecialchars($_SESSION['username']);
$userid = htmlspecialchars($_SESSION['userid']);

// 查询历史记录
$sql = "SELECT id, user_id, algorithm_name, size, time FROM history WHERE user_id = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("i", $userid);
$stmt->execute();
$result = $stmt->get_result();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style1.css">
    <style>
                /* 设置页面背景和字体 */
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }

        /* 表格样式 */
        .history-table {
            width: 90%; /* 占据页面宽度的 90% */
            margin: 50px auto; /* 居中表格 */
            border-collapse: collapse; /* 去掉单元格间隙 */
            text-align: center; /* 文本居中 */
            background-color: white; /* 表格背景色 */
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 添加阴影 */
        }

        /* 表头样式 */
        .history-table thead th {
            background-color: #282828; /* 表头背景色 */
            color: white; /* 表头文字颜色 */
            padding: 15px; /* 单元格内边距 */
            font-size: 18px;
        }

        /* 表格内容样式 */
        .history-table tbody td {
            padding: 10px; /* 单元格内边距 */
            border: 1px solid #ddd; /* 单元格边框 */
            font-size: 16px;
        }

        /* 表格行背景交替效果 */
        .history-table tbody tr:nth-child(odd) {
            background-color: #f9f9f9;
        }

        .history-table tbody tr:nth-child(even) {
            background-color: #f1f1f1;
        }

        /* 鼠标悬停行高亮效果 */
        .history-table tbody tr:hover {
            background-color: #eaeaea;
        }
    </style>
    <title>历史记录</title>
</head>
<body>
<header>
    <ul>
        <li>欢迎，学员：<?php echo $username; ?> (ID: <?php echo $userid; ?>)</li>
        <li><a href="index.php" class="nav-link">返回首页</a></li>
    </ul>
</header>
<div class="container">
    <h1>历史记录</h1>
    <table border="1" cellspacing="0" cellpadding="10" class="history-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>算法名称</th>
                <th>数组大小</th>
                <th>执行时间（ms）</th>
            </tr>
        </thead>
        <tbody>
        <?php while ($row = $result->fetch_assoc()): ?>
            <tr>
                <td><?php echo htmlspecialchars($row['id']); ?></td>
                <td><?php echo htmlspecialchars($row['user_id']); ?></td>
                <td><?php echo htmlspecialchars($row['algorithm_name']); ?></td>
                <td><?php echo htmlspecialchars($row['size']); ?></td>
                <td><?php echo htmlspecialchars($row['time']); ?></td>
            </tr>
        <?php endwhile; ?>
        </tbody>
    </table>
</div>
</body>
</html>
<?php
$stmt->close();
$con->close();
?>
