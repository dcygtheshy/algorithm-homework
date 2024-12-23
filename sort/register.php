<?php
header('content-type:text/html;charset=utf-8');
require 'login_db_connect.php'; // 连接数据库

// 判断表单是否提交, 用户名密码是否提交
if (isset($_POST['username']) && isset($_POST['pwd'])) { // 登录表单已提交
    // 获取用户输入的用户名密码
    $user = $_POST["username"];
    $pwd = $_POST["pwd"];

    // 判断提交账号密码是否为空
    if ($user == '' || $pwd == '') {
        echo "<script>alert('账号或密码不能为空');location='view/register.html'</script>";
    } else {
        // 对密码进行加密
        $hashed_pwd = password_hash($pwd, PASSWORD_DEFAULT);

        // 检查用户是否已存在
        $select_sql = "SELECT username FROM user WHERE username = ?";
        $stmt = mysqli_prepare($con, $select_sql);
        mysqli_stmt_bind_param($stmt, "s", $user); // "s" 表示字符串类型
        mysqli_stmt_execute($stmt);
        mysqli_stmt_store_result($stmt);

        if (mysqli_stmt_num_rows($stmt) > 0) {
            // 用户已存在
            echo "<script>alert('该用户已经存在，请直接登录');location='view/login.html'</script>";
        } else {
            // 插入新用户
            $insert_sql = "INSERT INTO user (username, password) VALUES (?, ?)";
            $stmt_insert = mysqli_prepare($con, $insert_sql);
            mysqli_stmt_bind_param($stmt_insert, "ss", $user, $hashed_pwd); // "ss" 表示两个字符串类型
            if (mysqli_stmt_execute($stmt_insert)) {
                // 注册成功
                echo "<script>alert('注册成功，请登录');location='view/login.html'</script>";
            } else {
                // 注册失败
                echo "<script>alert('注册失败，请重新注册');location='view/register.html'</script>";
            }
            mysqli_stmt_close($stmt_insert);
        }
        mysqli_stmt_close($stmt);
    }
}

// 加载注册页面
require 'view/register.html';
?>
