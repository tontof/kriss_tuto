<?php
  include "pdo_create.php";

  $pdo->exec("INSERT INTO animals (animal_type, animal_name) VALUES ('chien', 'médor')");
  $pdo->exec("INSERT INTO animals (animal_type, animal_name) VALUES ('vache', 'marguerite')");
  $pdo->exec("INSERT INTO animals (animal_type, animal_name) VALUES ('souris', 'jerry')");
  $pdo->exec("INSERT INTO animals (animal_type, animal_name) VALUES ('oiseau', 'titi')");
  $pdo->exec("INSERT INTO animals (animal_type, animal_name) VALUES ('chat', 'minou')");
  $pdo->exec("INSERT INTO animals (animal_type, animal_name) VALUES ('poisson', 'némo')");
  $pdo->exec("INSERT INTO animals (animal_type, animal_name) VALUES ('lapin', 'jeannot')");
  echo "id du dernier animal inséré : ".$pdo->lastInsertId()."<br>\n";
?>



    
