<?php
  $col0 = 'html';
  $col1 = 'css';
  $col2 = 'js';
  $html = $_POST[$col0];
  $css = $_POST[$col1];
  $js = $_POST[$col2];
  $server = "localhost";
  $user = "root";
  $pass = "";
  $db = "db";
  $table = "code";

  $conn = mysqli_connect($server, $user, $pass, $db);

  if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
  }

  $sql = "INSERT INTO $table ($col0, $col1, $col2) VALUES ('$html', '$css', '$js')";
  $result = mysqli_query($conn, $sql);

  if ($result) {
    echo "Inserted";
  } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
  }
  /*
  if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
      echo "HTML<br>" . $row[$col0]. "<br>CSS<br>" . $row[$col1]. "<br>JavaScript<br>" . $row[$col2]. "<br>";
    }
  } else {
    echo "0 results";
  }
  */
  mysqli_close($conn);
?>
