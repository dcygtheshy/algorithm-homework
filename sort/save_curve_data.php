<?php
$host = 'mysql.sqlpub.com';
$port = 3306;
$username = 'zhuhao';
$password = '9F5LCT4iLrp9xz4S';
$database = 'zhuhao';
header('Content-Type: application/json; charset=utf-8');
// 创建连接
$con = mysqli_connect($host, $username, $password, $database, $port);

// 检查连接是否成功
if (mysqli_connect_errno())
{
    echo "连接 MySQL 失败: " . mysqli_connect_error();
} 

try {
    // 获取前端传递的数据
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $algorithm_name = isset($_POST['algorithm_name']) ? $_POST['algorithm_name'] : ''; // 获取算法名称
        $num = isset($_POST['num']) ? (int)$_POST['num'] : 0; // 获取点数

        // 验证输入数据
        if (empty($algorithm_name) || $num <= 0) {
            // 如果数据无效，返回错误消息
            echo json_encode(['status' => 'error', 'message' => 'Invalid data. Algorithm name and number must be provided.']);
            exit;
        }
        
        // $sql="INSERT INTO complexity (algorithm_name, num) VALUES ($algorithm_name, $num)";
        // $result=mysqli_query($con, $sql);//执行sql语句
        // 插入数据到数据库
        $stmt = $con->prepare("INSERT INTO complexity (algorithm_name, num) VALUES (?, ?)");
        $stmt->execute([$algorithm_name, $num]);

        // 返回成功的 JSON 响应
        echo json_encode(['status' => 'success', 'message' => 'Data saved successfully']);
    } else {
        // 如果请求方法不是 POST，返回错误
        echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
    }

} catch (PDOException $e) {
    // 数据库错误处理
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
} catch (Exception $e) {
    // 处理其他类型的错误
    echo json_encode(['status' => 'error', 'message' => 'Unexpected error: ' . $e->getMessage()]);
}
?>
?>