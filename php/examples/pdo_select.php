<?php
  include "pdo_insert.php";

  $sql = "SELECT * FROM animals";
  foreach ($pdo->query($sql) as $row) {
    print $row["animal_type"] ." - ". $row["animal_name"] . "<br />";
  }
?>

