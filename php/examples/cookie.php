<?php
setcookie("hello","world");

setcookie("tableau[index1]","val1");
setcookie("tableau[index2]","val2");
setcookie("tableau[index3]","val3");
?>
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
include "form_table.php";
?>
  </body>
</html>