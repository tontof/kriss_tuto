<?php
  ini_set('display_errors', '1');
  error_reporting(E_ALL);
  $error = isset($_GET['error'])?$_GET['error']:'default';
  try {
    $pdo = new PDO('sqlite::memory:');
    switch($error) {
    case 'exception':
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      break;
    case 'warning':
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
      break;
    case 'silent':
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
      break;
    }

    var_dump($pdo->exec("Hello world"));
    echo '<br>Code erreur : '.$pdo->errorCode().'<br>';

    $pdo = null;
  } catch(PDOException $e) {
    echo $e->getMessage();
  }
?>
