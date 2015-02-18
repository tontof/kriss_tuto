<?php include('session_login.php'); ?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Les sessions</title>
  </head>
  <body>
<?php
if (isset($_SESSION['acces'])) {
    echo "<h4>Authentifié comme ". $_SESSION['nom']. "</h4>";
} else {
    include('session_form.php');
}
include('session_menu.php');
include('session_info.php');
?>
  </body>
</html>