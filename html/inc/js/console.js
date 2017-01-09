(function(){
    function load() {
        var content = document.getElementById("phpjs-code"),
        result = document.getElementById("phpjs-result"),
        htmlResult = document.getElementById("phpjs-html-result"),
        path = window.location.pathname,
        clear = function(e){
            $("#phpjs-code").val("<?php\n  \n?>");
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
            opts = {
                SERVER: {
                    SCRIPT_FILENAME: path.substring(0, path.length - 1)
                }
            };



            opts.filesystem = new PHP.Adapters.XHRFileSystem();
            var engine = new PHP( content.value.replace(/\n/g,"\r\n"), opts);
            htmlResult.innerHTML = engine.vm.OUTPUT_BUFFER;
            result.innerHTML = engine.vm.OUTPUT_BUFFER.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>");
        };

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
                    $(this).text('');
                    $("#phpjs-code").val($element.text());
                    $(this).text('Run');
                }
            });

            if ($element.children('.src').length) {
                $element = $element.children('pre');
                if ($element.attr('id') && $element.attr('id').substr(0,6) === "phpjs-") {
                    $element.append($button);
                }
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
