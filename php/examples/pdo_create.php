<?php
  error_reporting(E_ALL);
  ini_set('display_errors', '1');
  try {
    $pdo = new PDO('sqlite::memory:');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $table = "CREATE TABLE animals (
      animal_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      animal_type VARCHAR(25) NOT NULL,
      animal_name VARCHAR(25) NOT NULL 
    )";
    $pdo->exec($table);
  } catch(PDOException $e) {
    echo $e->getMessage();
  }
?>
