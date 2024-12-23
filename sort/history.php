<?php
session_start();
require 'login_db_connect.php'; // 引入数据库连接文件

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 检查是否提供了必要的数据
    if (isset($_POST['algorithm']) && isset($_POST['array_size']) && isset($_POST['execution_time'])) {
        $userid = $_SESSION['userid']; // 从会话获取用户 ID
        $algorithm = htmlspecialchars($_POST['algorithm']);
        $arraySize = intval($_POST['array_size']);
        $executionTime = floatval($_POST['execution_time']);
        echo "<script>alert(`$algorithm;$arraySize;$executionTime`);</script>";
        echo "<script>alert('欢迎');</script>";
        // 插入数据到 history 表
        $stmt = $con->prepare("INSERT INTO history (user_id, algorithm_name, size, time) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("isid", $userid, $algorithm, $arraySize, $executionTime);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "历史记录已保存"]);
        } else {
            echo json_encode(["success" => false, "message" => "保存历史记录失败"]);
        }
        $stmt->close();
        $con->close();
    } else {
        echo json_encode(["success" => false, "message" => "缺少必要参数"]);
    }
    exit();
}
?>
