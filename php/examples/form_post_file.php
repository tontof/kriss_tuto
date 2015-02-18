POST form with file
<form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>"
      method="post" enctype="multipart/form-data">
  <label>input :<input type="text" name="input"/></label><br>
  <label>file :<input type="file" name="file"/></label><br>
  <button type="submit">Valider</button>
</form>
