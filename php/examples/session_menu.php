<p> Visiter les pages du site <br />
<ul>
  <li><a href="session.php">Page d'accueil</a></li>
  <li>
    <a href="session_public.php">Page publique</a>
    <?php if(isset($_SESSION['public'])) echo " vue ". $_SESSION['public']. " fois"; ?>
  </li>
  <li>
    <a href="session_protected.php">Page protégée </a>
    <?php if(isset($_SESSION['protected'])) echo " vue ". $_SESSION['protected']." fois"; ?>
  </li>
  <?php if (isset($_SESSION['acces'])) { ?>
  <li><a href="session.php?logout">Logout</a></li>
  <?php } ?>
</ul>
