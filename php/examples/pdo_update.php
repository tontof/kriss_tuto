<?php
  include 'pdo_insert.php';

  $count = $pdo->exec("UPDATE animals SET animal_name='mickey' WHERE animal_name='jerry'");

  echo $count.' animaux mis à jour';
  var_dump($pdo->query("SELECT * FROM animals")->fetchAll(PDO::FETCH_ASSOC));
?>