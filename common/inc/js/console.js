/*global iframe */
(function(){
  Split({
    columnGutters: [{
      track: 1,
      element: document.getElementById('php-html-gutter')
    }, {
      track: 3,
      element: document.getElementById('html-gutter')
    }]
  });

  // https://stackoverflow.com/a/20584396
  function nodeScriptReplace(node) {
    if ( nodeScriptIs(node) === true ) {
      node.parentNode.replaceChild( nodeScriptClone(node) , node );
    }
    else {
      var i        = 0;
      var children = node.childNodes;
      while ( i < children.length ) {
        nodeScriptReplace( children[i++] );
      }
    }

    return node;
  }
  function nodeScriptIs(node) {
    return node.tagName === 'SCRIPT';
  }
  function nodeScriptClone(node){
    var script  = document.createElement("script");
    script.text = node.innerHTML;
    for( var i = node.attributes.length-1; i >= 0; i-- ) {
      script.setAttribute( node.attributes[i].name, node.attributes[i].value );
    }
    return script;
  }
  
  function load() {
    var editor = document.getElementById("editor");
    if (editor) {
      var editorPhp = CodeMirror.fromTextArea(document.querySelector('#php-source > textarea'), {
        lineNumbers: true,
        lineWrapping: true,
        autoRefresh: true,
        mode: 'php',
        theme: 'dracula'
      }),
          editorHtml = CodeMirror.fromTextArea(document.querySelector('#html-source > textarea'), {
            lineNumbers: true,
            lineWrapping: true,
            autoRefresh: true,
            mode: 'htmlmixed',
            theme: 'dracula'
          }),
          htmlOutput = document.getElementById("html-output"),
          path = window.location.pathname,
          clear = function(e){
            editorPhp.setValue('');
            editorPhp.refresh();
            editorHtml.setValue('');
            editorHtml.refresh();
            htmlOutput.innerHTML = '';
          },
          mode = function(e){
            if (document.querySelector('#editor > div').style['grid-template-columns'] == '33% 0.5% 33% 0.5% 33%') {
              document.querySelector('#editor > div').style['grid-template-columns'] = '0% 0% 49.5% 1% 49.5%';
            } else {
              document.querySelector('#editor > div').style['grid-template-columns'] = '33% 0.5% 33% 0.5% 33%';
            }
          },
          close = function(e){
            editor.style.display = "none";
          },
          run = function(e){
            if ( e !== undefined ){
              e.preventDefault();
            }
            var source = editorPhp.getValue();
            if (source) {
              opts = {
                SERVER: {
                  SCRIPT_FILENAME: path.substring(0, path.length - 1)
                }
              };
              opts.filesystem = new PHP.Adapters.XHRFileSystem();
              var engine = new PHP( source, opts);
              editorHtml.setValue(engine.vm.OUTPUT_BUFFER);
              editorHtml.refresh();
            }
            source = editorHtml.getValue();
            htmlOutput.innerHTML = '<iframe></iframe>';
            setTimeout(function(){
              var iframe = htmlOutput.querySelector('iframe').contentDocument.getElementsByTagName('html')[0]
              iframe.innerHTML = '<script>var iframe = this, log = console.log; console.log = function(param) { log(param); iframe.document.body.innerHTML += param + "<br>"; }</script>'
              iframe.innerHTML += source;
              nodeScriptReplace(iframe.parentNode);
            }, 240);
          };
      addEvent(document.getElementById('editor-mode'), 'click', mode);
      addEvent(document.getElementById('editor-close'), 'click', close);
      addEvent(document.getElementById('editor-clear'), 'click', clear);
      addEvent(document.getElementById('editor-run'), 'click', run);
      function checkKey(event) {
        var c = String.fromCharCode(event.keyCode || event.charCode);
        if (!editorPhp.hasFocus() && !editorHtml.hasFocus()) {
          if (c == 'x' || c == 'X') {
            var display = window.getComputedStyle(editor, null).getPropertyValue("display");
            if (display == 'none') {
              editor.style.display = "block";
            } else {
              close();
            }
          }
          if (c == 'w' || c == 'W') {
            var elem = document.getElementById("reveal-styles"),
                display = window.getComputedStyle(elem, null).getPropertyValue("display");
            if (display == 'none') {
              elem.style.display = "block";
            } else {
              elem.style.display = "none";
            }
          }
        }  
      }
      addEvent(window, 'keydown', checkKey);

      document.querySelectorAll('.org-src-container').forEach(function(elt){
        var code = elt.querySelector('code'),
            button = document.createElement('button');
        if (code) {
          code = code.innerText;
          button.innerHTML = "Run";
          addEvent(button, 'click', function() {
            editor.style.display = "block";
            clear();
            if (elt.classList.contains('src-html')) {
              document.querySelector('#editor > div').style['grid-template-columns'] = '0% 0% 49.5% 1% 49.5%';
              editorHtml.setValue(code);
              editorHtml.refresh();
            } else {
              document.querySelector('#editor > div').style['grid-template-columns'] = '33% 0.5% 33% 0.5% 33%';
              editorPhp.setValue(code);
              editorPhp.refresh();
            }
          });
        }
        if (elt.querySelectorAll('.src-html, .src-sql, .src-xml, .src-html-center, .src-js, .src-css, .src-php, .src-php-src, .src-c, .src-c-center').length) {
          elt = elt.querySelector('pre');
          if (elt.classList.contains('src-html') || elt.classList.contains('src-php')) {
            elt.appendChild(button);
          }
          var mode = 'htmlmixed';
          if (elt.classList.contains('src-sql')) {
            mode = 'sql';
          }
          if (elt.classList.contains('src-css')) {
            mode = 'css';
          }
          if (elt.classList.contains('src-js')) {
            mode = 'javascript';
          }
          if (elt.classList.contains('src-php') || elt.classList.contains('src-php-src')) {
            mode = 'php';
          }
          if (elt.classList.contains('src-c') || elt.classList.contains('src-c-center')) {
            mode = 'clike';
          }
          var tag = elt.querySelector('code');
          CodeMirror(function(e) {
            tag.parentNode.replaceChild(e, tag);
          }, {
            value: tag.innerText,
            mode: mode,
            theme: 'dracula',
            autoRefresh: true,
            readOnly: true,
            cursorBlinkRate: -1
          });
        }
      });
    }
  }
  function addEvent(obj, evType, fn, useCapture) {
    if (obj.addEventListener) {
      obj.addEventListener(evType, fn, useCapture);
    } else {
      if (obj.attachEvent) {
        obj.attachEvent('on' + evType, fn);
      } else {
        window.alert('Handler could not be attached');
      }
    }
  }

  addEvent(window, 'load', load);
})();
