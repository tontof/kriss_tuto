function formatSQL(commands) {
  commands = commands.replace(/([\s\n])minus([\s\n])/ig, '$1EXCEPT$2');
  commands = commands.replace(/([\s\n])int([\s\n])/ig, '$1INTEGER$2');
  commands = commands.replace(/(\w+[\s\n]*)enum\(([^\)]*)\)/ig, '$1TEXT CHECK ($1IN ($2))');
  commands = commands.replace(/([\s\n])auto_increment([,\s\n])/ig, '$1AUTOINCREMENT$2');
  commands = commands.replace(/([\s\n\(])year\(([^\)]*)\)/ig, '$1CAST(strftime("%Y",$2) as INTEGER)');
  commands = commands.replace(/(\w+)([\s\n])DATETIME([ ,])/ig, '$1$2DATETIME CHECK ($1==strftime("%Y-%m-%d %H:%M:%S",$1) AND strftime("%Y-%m-%d %H:%M:%S",$1) IS NOT NULL OR $1 IS NULL)$3');
  commands = commands.replace(/(\w+)([\s\n])DATE([ ,])/ig, '$1$2DATE CHECK ($1==strftime("%Y-%m-%d",$1) AND strftime("%Y-%m-%d",$1) IS NOT NULL OR $1 IS NULL)$3');
  commands = commands.replace(/(\w+)([\s\n])TIME([ ,])/ig, '$1$2TIME CHECK ($1==strftime("%H:%M:%S",$1) AND strftime("%H:%M:%S",$1) IS NOT NULL OR $1 IS NULL)$3');
  commands = commands.replace(/(\w+)([\s\n])YEAR([ ,])/ig, '$1$2YEAR CHECK ($1||""==strftime("%Y",$1||"-01-01") AND strftime("%Y",$1||"-01-01") IS NOT NULL OR $1 IS NULL)$3');
  return "PRAGMA foreign_keys=on;"+commands;
}
function dbExec(db, exec) {
  exec = formatSQL(exec);
  var results = [];
  try {
    results = db.exec(exec);
  } catch(e) {
    document.getElementById('error').innerHTML = e;
  }
  return results;
}

function displayTables(db) {
  var results = dbExec(db, "SELECT `name`, `sql` FROM `sqlite_master` WHERE type='table';");
  if (results !== undefined && results.length > 0) {
    document.getElementById('tables').innerHTML = '<div class="tab"></div>';
    query = "";
    for (var i=0; i<results[0].values.length; i++) {
      if (results[0].values[i][0] != 'sqlite_sequence') {
        listTable(db, results[0].values[i][0]);
      }
    }
  } else {
    document.getElementById('tables').innerHTML = 'Aucune table actuellement';
  }
}

function loadPk(db, name) {
  pk = [];
  var results = dbExec(db, 'PRAGMA table_info('+name+');');
  if (results.length > 0) {
    columns = results[0].values.map(function(data) { return data[1]; });
    pk = results[0].values.map(function(data) { if (data[5] != 0) return data[1]; else return null;});
  }
  return pk;
}

function loadFk(db, name) {
  var fk = {};
  var results = dbExec(db, 'PRAGMA foreign_key_list('+name+');');
  if (results.length > 0) {
    results[0].values.map(function(data) {
      fk[data[3]] = data[2]+'('+data[4]+')';
    });
  }
  return fk;
}

function loadTable(db, name) {
  var columns = [];
  var values = [];
  var results = dbExec(db, 'SELECT * FROM '+ name);
  if (results.length > 0) {
    if (results[0].values) values = results[0].values;
    if (results[0].columns) columns = results[0].columns;
  }
  return [columns, values];
}

function listTable(db, name) {
  var tables = document.getElementById('tables');
  var button = document.createElement('button');
  button.className = 'tablinks table';
  button.onclick = function() {
    openTab(event, 'table', name);
  };
  button.innerHTML = name;
  tables.querySelector('.tab').appendChild(button);
  var div = document.createElement('div');
  div.id = name;
  div.className = 'tabcontent table';
  tables.appendChild(div);
  var pk = loadPk(db, name);
  var fk = loadFk(db, name);
  var [columns, values] = loadTable(db, name);
  document.getElementById(name).innerHTML = '';
  document.getElementById(name).appendChild(tableCreate(columns, values, pk, fk, name));
}

function tableCreate(columns, values, pk, fk, name="") {
  function valconcat(vals, tagName) {
    if (vals.length === 0) return '';
    var open = '<'+tagName+'>', close='</'+tagName+'>';
    return open + vals.join(close + open) + close;
  }
  var tbl  = document.createElement('table');
  var html = '';
  if (name.length > 0) {
    html += '<caption>'+name+'</caption>';
  }
  html += '<thead>' + valconcat(columns, 'th') + '</thead>';
  values = values.map(function(v) {
             v = v.map(function(val) {
                   if (val == null) {
                     val='<strong>NULL</strong>';
                   } return val;})
             return v;
           });
  var rows = values.map(function(v){ return valconcat(v, 'td'); });
  html += '<tbody>' + valconcat(rows, 'tr') + '</tbody>';
  pk.forEach(function(value) {
    if (value) {
      html = html.replace('<th>'+value+'</th>','<th class="pk">'+value+'</th>');
    }
  });
  
  Object.entries(fk).forEach(function([value, ref]) {
    if (value) {
      html = html.replace('<th class="pk">'+value+'</th>','<th class="pk fk">'+value+' → '+ref+'</th>');
      html = html.replace('<th>'+value+'</th>','<th class="fk">'+value+' ⇒ '+ref+'</th>');
    }
  });
  tbl.innerHTML = html;
  return tbl;
}

