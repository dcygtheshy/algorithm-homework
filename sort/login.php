<?php
header('content-type:text/html;charset=utf-8');
require 'login_db_connect.php'; // 连接数据库

if (isset($_POST['username']) && isset($_POST['password'])) { // 登录表单已提交
    // 获取用户输入的用户名密码
    $user = $_POST["username"];
    $pwd = $_POST["password"];

    // 判断提交账号密码是否为空
    if ($user == '' || $pwd == '') {
        echo "<script>alert('账号或密码不能为空');location='view/login.html'</script>";
    } else {
        $sql = "SELECT * FROM user WHERE username = '$user'";
        $result = mysqli_query($con, $sql);
        $row = mysqli_fetch_assoc($result); // 获取查询结果

        if ($row) {
            $hashed_pwd = $row['password']; // 从数据库获取加密密码
            // 验证密码是否匹配
            if (password_verify($pwd, $hashed_pwd)) {
                // 密码正确，登录成功
                session_start();
                $_SESSION['username'] = $user;
                $_SESSION['userid'] = $row['id'];
                echo "<script>alert('登陆成功，欢迎！！！！');location='index.php'</script>";
            } else {
                // 密码错误
                echo "<script>alert('用户名或密码错误');location='view/login.html'</script>";
            }
        } else {
            // 用户名不存在
            echo "<script>alert('用户名或密码错误');location='view/login.html'</script>";
        }
    }
}
