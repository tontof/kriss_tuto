POST form
<form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
  <label>input :<input type="text" name="input"/></label><br>
  <button type="submit">Valider</button>
</form>

