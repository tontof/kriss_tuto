<?php
session_start();
$_SESSION["public"] ++;
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>La page publique</title>
  </head>
  <body>
    <p>
      <a href="session.php">Page d'accueil</a><br>
      <?php echo "Page publique vue ". $_SESSION["public"]. " fois"; ?>
    </p>
  </body>
</html>
