<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>PHP form</title>
    <style>
      table{
        border: 1px solid black;
        width: 100%;
      }
     td,th{
        border: 1px solid black;
      }
    </style>
  </head>
  <body>
    <?php
      $allowedPages = array('form_get', 'form_post', 'form_post_file', 'form_post_files', 'form_validation', 'form_multiple_get', 'form_multiple_post', 'form_multiple_button');
      if (isset($_GET['filename']) && in_array($_GET['filename'], $allowedPages) && empty($_POST)) {
          $index = array_search($_GET['filename'], $allowedPages);
          include $allowedPages[$index].'.php';
      }
      if (isset($_REQUEST['input']) || empty($_GET)) {
          include 'form_table.php';
      }
    ?>
  </body>
</html>
