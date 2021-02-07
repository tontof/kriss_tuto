/*global iframe */
(function(){
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
    
    var content = document.getElementById("phpjs-code"),
        result = document.getElementById("phpjs-result"),
        htmlResult = document.getElementById("phpjs-html-result"),
        path = window.location.pathname,
        clear = function(e){
          $("#phpjs-code").text("");
          htmlResult.innerHTML = '';
          result.innerHTML = '';
        },
        close = function(e){
          $("#phpjs-compiler").hide();
        },
        run = function(e){
          if ( e !== undefined ){
            e.preventDefault();
          }
          var source = content.innerText.replace(/ /g,' ').replace(/\n/g,"\r\n");
          if (content.classList.contains('php')) {
            opts = {
              SERVER: {
                SCRIPT_FILENAME: path.substring(0, path.length - 1)
              }
            };
            opts.filesystem = new PHP.Adapters.XHRFileSystem();
            var engine = new PHP( source, opts);
            htmlResult.classList.add('half');
            htmlResult.innerHTML = engine.vm.OUTPUT_BUFFER;
            result.classList.add('half');
            result.innerHTML = engine.vm.OUTPUT_BUFFER.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>");
          } else {
            htmlResult.innerHTML = '<iframe></iframe>';
            setTimeout(function(){
              var iframe = htmlResult.querySelector('iframe').contentDocument.getElementsByTagName('html')[0]
              iframe.innerHTML = '<script>var iframe = this, log = console.log; console.log = function(param) { log(param); iframe.document.body.innerHTML += param + "<br>"; }</script>'
              iframe.innerHTML += source;
              nodeScriptReplace(iframe.parentNode);
            }, 240);
          }
        };

    $("#phpjs-code").on("blur", function() {
      RevealHighlight().highlightBlock(document.getElementById('phpjs-code'));
    });
    $("#phpjs-close").on("click", close);
    $("#phpjs-clear").on("click", clear);
    $("#phpjs-run").on("click", run);
    
    function checkKey(event) {
      var char = String.fromCharCode(event.keyCode || event.charCode);
      if (char == 'v' || char == 'V') {
        var elem = document.getElementById("phpjs-compiler"),
            display = window.getComputedStyle(elem, null).getPropertyValue("display");
        if (display == 'none') {
          $("#phpjs-compiler").show();
        } else {
          $("#phpjs-compiler").hide();
        }
      }
      if (char == 'c' || char == 'C') {
        var elem = document.getElementById("reveal-styles"),
            display = window.getComputedStyle(elem, null).getPropertyValue("display");
        if (display == 'none') {
          $("#reveal-styles").show();
        } else {
          $("#reveal-styles").hide();
        }
        
      }  
    }

    $(window).on('keydown', checkKey);

    $("#phpjs-code").on("focus", function(){ $(window).off('keydown', checkKey); });
    $("#phpjs-code").on("blur", function(){ $(window).on('keydown', checkKey); });

    $('.org-src-container').each(function(index, value){
      var $element = $(value),
          $button = $('<button/>', {
            text: 'Run',
            click: function() {
              $("#phpjs-compiler").show();
              clear();
              $("#phpjs-code").text($element.find('code').text().replace(/ /g," "));
              $("#phpjs-code").html($("#phpjs-code").html().replace(/\n/g,'<br/>\n'));
              $("#phpjs-code").attr('class', $element.find('code').attr('class'));
              RevealHighlight().highlightBlock(document.getElementById('phpjs-code'));
            }
          });
      if ($element.find('.html, .php').length) {
        $element = $element.children('pre');
        $element.append($button);
      }
    });
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
