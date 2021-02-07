<?php
  ini_set("display_errors", "1");
  error_reporting(E_ALL);
  try {
    $pdo = new PDO("mysql:host=localhost;dbname=database", "user", "password");
  } catch(PDOException $e) {
    echo $e->getMessage();
  }
?>
