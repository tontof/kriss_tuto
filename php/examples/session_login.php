<?php
session_start();
if(isset($_POST['login']) && isset($_POST['pass'])) {
    if($_POST['login']=="login" && $_POST['pass']=="pass") {
        session_regenerate_id(true);
        $_SESSION['acces'] = true;
        $_SESSION['nom'] = $_POST['login'];
    }
} else {
    if (isset($_GET['logout'])) {
        session_unset();
        session_destroy();
        header("Location:session.php");
    }
}
?>
