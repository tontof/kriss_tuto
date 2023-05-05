const config = {
    locateFile: filename => `../common/lib/sql-wasm/${filename}`
}

function load() {
    var editor = document.getElementById("editor-sql"),
        result = document.getElementById("output"),
        commands = document.getElementById('commands'),
        editorSql = CodeMirror.fromTextArea(commands, {
            lineNumbers: true,
            lineWrapping: true,
            autoRefresh: true,
            mode: 'sql'
        }),
        close = function(e){
            editor.style.display = "none";
        },
        clear = function(e){
            document.getElementById('error').innerHTML = "";
            document.getElementById('tables').innerHTML = "";
            document.getElementById('output').innerHTML = "";
            editorSql.setValue('');
            editorSql.refresh();
        },
        mode = function(e){
            document.querySelector('#editor-sql > main').classList.toggle('mode');
        },
        load = async function(e){
            if ( e !== undefined ){ e.preventDefault(); }
            document.getElementById('error').innerHTML = "";
            document.getElementById('output').innerHTML = "";
            const SQL = await initSqlJs(config);
            var db;
            if (commands.hasAttribute('data-load')) {
                const buf = await fetch("inc/db/"+commands.getAttribute('data-load')).then(res => res.arrayBuffer());
                db = new SQL.Database(new Uint8Array(buf));
            } else {
                db = new SQL.Database();
            }
            return db;
        },
        run = async function(e){
            var source = editorSql.getValue();
            var db = await load(e);
            res = dbExec(db, source);
            result.innerHTML = "";
            for (var i=0; i<res.length; i++) {
                result.appendChild(tableCreate(res[i].columns, res[i].values, [], []));
            }
            displayTables(db);
            exportSqlite(db);            
        },
        exportSqlite = function(db) {
            const data = db.export();
            var blob = new Blob([data], {type:"application/octet-stream"});
            var button = document.getElementById('tables-save');
            if (button.hasAttribute('data-blob')) {
                URL.revokeObjectURL(button.getAttribute('data-blob'));
            }           
            button.setAttribute('data-blob', URL.createObjectURL(blob));
        }
        save = function(e){
            var button = document.getElementById('tables-save');
            if (button.hasAttribute('data-blob')) {
	        var a = document.createElement("a");
	        document.body.appendChild(a);
	        a.href = button.getAttribute('data-blob');
	        a.download = "sql.db";
	        a.onclick = function () {
		    setTimeout(function () {
		        window.URL.revokeObjectURL(a.href);
		    }, 1500);
	        };
	        a.click();
            } else {
                alert('No tables to save');
            }
        },
        inline = async function(elt, source, dataLoad) {
            if (dataLoad) {
                commands.setAttribute('data-load', dataLoad);
            } else {
                commands.removeAttribute('data-load');
            }
            db = await load();
            res = dbExec(db, source);
            for (var i=0; i<res.length; i++) {
                elt.parentNode.insertBefore(tableCreate(res[i].columns, res[i].values, [], []), elt);
            }
            elt.outerHTML = "";
        };
    document.querySelectorAll('.org-src-container').forEach(function(elt){
        var code = elt.querySelector('code'),
            button = document.createElement('button'),
            source = code.innerText;
        if (source.indexOf('/'+'*'+' load:') !== -1) {
            const rx = /\/\* load: (.*) \*\//g;
            const arr = rx.exec(source);
            code.parentNode.setAttribute('data-load', arr[1]);
            source = source.substring(source.indexOf("\n") + 1);
        }
        button.innerHTML = "Run";
        addEvent(button, 'click', function() {
            editor.style.display = "block";
            clear();
            if (button.parentNode.hasAttribute('data-load')) {
                commands.setAttribute('data-load', button.parentNode.getAttribute('data-load'));
            } else {
                commands.removeAttribute('data-load');
            }
            editorSql.setValue(source);
            editorSql.refresh();
        });
        if (elt.querySelectorAll('.src-sql').length) {
            elt = elt.querySelector('pre');
            elt.appendChild(button);
            var tag = elt.querySelector('code');
            
            CodeMirror(function(e) {
                tag.parentNode.replaceChild(e, tag);
            }, {
                value: source,
                mode: 'sql',
                theme: 'dracula',
                autoRefresh: true,
                readOnly: true,
                cursorBlinkRate: -1
            });
        }
        if (elt.querySelectorAll('.src-sql-inline').length) {            
            inline(elt, source, code.parentNode.getAttribute('data-load'));
        }
    });

    Split({
        columnGutters: [{
            track: 1,
            element: document.getElementById('table-gutter')
        }, {
            track: 3,
            element: document.getElementById('query-gutter')
        }]
    });
    addEvent(document.getElementById('editor-mode'), 'click', mode);
    addEvent(document.getElementById('editor-close'), 'click', close);
    addEvent(document.getElementById('editor-clear'), 'click', clear);
    addEvent(document.getElementById('editor-run'), 'click', run);
    addEvent(document.getElementById('tables-save'), 'click', save);
}

addEvent(window, 'load', load);