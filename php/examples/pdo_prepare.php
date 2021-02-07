<?php
  include "pdo_insert.php";
  
  // préparation d'une déclaration SQL
  $stmt = $pdo->prepare("SELECT * FROM animals
                         WHERE animal_name = :animal_name");
  
  // déclaration d'une variable
  $animal_name = "minou";
  
  // lien entre la déclaration SQL et la variable
  $stmt->bindParam(":animal_name", $animal_name);
  
  // exécution de la requête et affichage des résultats
  $stmt->execute();
  var_dump($stmt->fetchAll());
  
  // modification des paramètres
  $animal_name = "titi";
  $stmt->execute();
  var_dump($stmt->fetchAll());
?>