(function() {
    $(document).ready(function(){
        $('.choice_file').click(function(){
            $('#document').click();
        });
        $('.down_load').click(function(){
            if(!$('.out_inp').val()){
                $('.mess_box').show();
            }else{
                $('.down_load').attr('download',$('.out_inp').val()+'.html');
                var v=$('#outputNode').html().replace(/<table>/g,'<table width="100%" cellpadding="10" border="1px" cellspacing="0" style="border-collapse: collapse;">');
                var last = '<!DOCTYPE html>'+
                    '<html lang="en">'+
                        '<head>'+
                            '<meta charset="UTF-8">'+
                            '<meta name="viewport" content="width=device-width, initial-scale=1.0">'+
                            '<title>'+$('.out_inp').val()+'</title>'+
                        '</head>'+
                        '<body>'+
                            '<div class="wrap">'+v+
                            '</div>'+
                        '</body>'+
                    '</html>'
                var b=new Blob([last]);
                var href=URL.createObjectURL(b);
                this.href=href;
            }
        });
        $('.off_box').click(function(){
            $('.mess_box').hide();
        });
    });
    document.getElementById("document")
        .addEventListener("change", handleFileSelect, false);
        
    function handleFileSelect(event) {
        readFileInputEventAsArrayBuffer(event, function(arrayBuffer) {
            mammoth.convertToHtml({arrayBuffer: arrayBuffer})
                .then(displayResult)
                .done();
        });
    }
    
    function displayResult(result) {
        document.getElementById("output").innerHTML = result.value;
        
        var messageHtml = result.messages.map(function(message) {
            return '<li class="' + message.type + '">' + escapeHtml(message.message) + "</li>";
        }).join("");
        
        document.getElementById("messages").innerHTML = "<ul>" + messageHtml + "</ul>";
    }
    
    function readFileInputEventAsArrayBuffer(event, callback) {
        var file = event.target.files[0];

        var reader = new FileReader();
        
        reader.onload = function(loadEvent) {
            var arrayBuffer = loadEvent.target.result;
            callback(arrayBuffer);
        };
        
        reader.readAsArrayBuffer(file);
    }

    function escapeHtml(value) {
        return value
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
})();
