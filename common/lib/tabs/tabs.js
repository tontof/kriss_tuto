// https://www.w3schools.com/howto/howto_js_tabs.asp
function openTab(evt, className, idName) {
  // Declare all variables
  var i, tabcontent, tablinks;
  var isActive = evt.target.classList.contains('active');
  
  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.querySelectorAll('.tabcontent.'+className);
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  
  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.querySelectorAll('.tablinks.'+className);
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  
  // Show the current tab, and add an "active" class to the button that opened the tab
  if (!isActive) {
    document.getElementById(idName).style.display = "block";
    evt.currentTarget.className += " active";
    var table = document.getElementById(idName).querySelector('table');
    if (table) createResizableTable(table);
  }
}      

