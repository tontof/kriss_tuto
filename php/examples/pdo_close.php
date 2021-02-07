<?php
  try {
    // ouverture de la base de données
    $pdo = new PDO("sqlite::memory:");

    echo "Connecté à la base de données";

    // fermeture de la base de données
    $pdo = null;
  } catch(PDOException $e) {
    echo $e->getMessage();
  }
?>