Multiple POST form
<form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
  <p>
    Langues pratiquées :<br />
    <select name="lang[]" multiple size="4">
      <option value="français"> français</option>
      <option value="anglais"> anglais</option>
      <option value="allemand"> allemand</option>
      <option value="espagnol"> espagnol</option>
  </select>
  </p>
  <p>
    Compétences informatiques :<br />
    <label>HTML<input type="checkbox" name="input[]" value="HTML" /></label>
    <label>PHP<input type="checkbox" name="input[]" value="PHP" /></label>
    <label>MySQL<input type="checkbox" name="input[]" value="MySQL" /></label>
  </p>
  <input type="reset" value="EFFACER"/>
  <input type="submit" value="ENVOI"/>
</form>
