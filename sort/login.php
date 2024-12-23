<?php
header('content-type:text/html;charset=utf-8');
//登录界面
require 'login_db_connect.php';//连接数据库


//判断表单是否提交,用户名密码是否提交
if (isset($_POST['username'])&&isset($_POST['password'])){//登录表单已提交
    
    //获取用户输入的用户名密码
    $username=$_POST["username"];
    $pwd=$_POST["password"];
    $sql="select id,username,password from user where username='$username' and password='$pwd';";
    $result=mysqli_query($con, $sql);//执行sql语句
    $row=mysqli_num_rows($result);//返回值条目
    if (!$row){//若返回条目不存在则证明该账号不存在或者密码输入错误
        echo "<script>alert('账号不存在或密码错误，点击前往注册');location='./register.php'</script>";
        //exit('账号或密码错误');
    }else{//存在返回条目证明用户账号密码匹配，进入主页面
        session_start();
        $_SESSION['username']=$_POST['username'];
        echo "<script>alert('欢迎');location='index.html'</script>";
    }   
}


require '../view/login.html';