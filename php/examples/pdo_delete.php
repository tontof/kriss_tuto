<?php
  include 'pdo_insert.php';

  $count = $pdo->exec("DELETE FROM animals
                       WHERE animal_name = 'médor' OR animal_name = 'titi'");

  echo $count.' animaux supprimés';
  var_dump($pdo->query("SELECT * FROM animals")->fetchAll(PDO::FETCH_ASSOC));
?>
