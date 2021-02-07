<?php
  include "pdo_insert.php";

  // Création d'un objet PDOStatement
  $stmt = $pdo->prepare("SELECT animal_id FROM animals");

  // Création d'un second objet PDOStatement
  $otherStmt = $pdo->prepare("SELECT animal_name FROM animals");

  // Exécute la première requête
  $stmt->execute();

  // Récupération de la première ligne uniquement depuis le résultat
  var_dump($stmt->fetch());

  // L'appel suivant à closeCursor() peut être requis par quelques drivers
  $stmt->closeCursor();

  // Maintenant, nous pouvons exécuter la deuxième requête
  $otherStmt->execute();

  // Récupération de la première ligne uniquement depuis le résultat
  var_dump($otherStmt->fetch());
?>
