<?php
session_start();
if(!isset($_SESSION['acces'])) {
    header("Location:session.php");
} else {
    $_SESSION['protected'] ++;
}
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>La page protégée</title>
  </head>
  <body>
    <p>
      <a href="session.php">Page d'accueil</a><br>
      <?php echo "Page protégée vue ". $_SESSION['protected']. " fois"; ?><br>
      <?php echo "<h4>Bonjour ". $_SESSION['nom']."</h4>"; ?>
      <a href="session.php?logout">Logout</a>
    </p>
  </body>
</html>