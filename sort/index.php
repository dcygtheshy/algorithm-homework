<?php
session_start();
$username = htmlspecialchars($_SESSION['username']);
$userid = htmlspecialchars($_SESSION['userid']);
// if (isset($_SESSION['username']) && isset($_SESSION['userid'])) {
//     $username = htmlspecialchars($_SESSION['username']);
//     $userid = htmlspecialchars($_SESSION['userid']);
// } else {
//     // 如果用户未登录，重定向到登录页面
//     header('Location: login.php');
//     exit();
// }
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/style1.css" />
    <title>Sorting</title>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.2.0/p5.min.js"></script> -->

  </head>
  <body>
    <header>
      <ul>
        <!-- <li>Logo/Name</li> -->
        <li>Welcome, <?php echo "学员：$username"; ?> (ID: <?php echo $userid; ?>)</li>
        <li>
            <label for="arraySize">Array Size:</label>
            <input type="number" value="100"/>
            <input type="submit" id="arrLength" value="generate new array">
        </li>
        
        <!-- Add this as a dropdown list of types of sorts -->
        <li>
            <label for="sort_name">Select a sort:</label>
            <input type="button" class="sort-btn" value="Quick Sort" name="quicksort" />
            <input type="button" class="sort-btn" value="Insertion Sort" name="insertionsort" />
        </li>
        <!-- <li>
            <label for="submit"></label>
            <input type="submit" value="Go" />
        </li> -->
        <li>
            <a href="history_list.php" class="nav-link">历史记录</a>
        </li>
      </ul>
    </header>
    <div class="container">
      <div class="array-container" id="array-container"></div>
    </div>
  </body>
  
  <script src="js/Node.js"></script>
  <script src="js/ArrayList.js"></script>
  <script src="js/script.js"></script>
</html>
