<?php
  include "pdo_insert.php";

  $sql = "SELECT * FROM animals";
  $stmt = $pdo->query($sql);

  echo "<br><b>PDO::FETCH_ASSOC</b><br>\n";
  var_dump($stmt->fetch(PDO::FETCH_ASSOC));

  echo "<br><b>PDO::FETCH_NUM</b><br>\n";
  var_dump($stmt->fetch(PDO::FETCH_NUM));

  echo "<br><b>PDO::FETCH_BOTH</b><br>\n";
  var_dump($stmt->fetch(PDO::FETCH_BOTH));

  echo "<br><b>fetchAll</b><br>\n";
  var_dump($stmt->fetchAll(PDO::FETCH_ASSOC));
?>