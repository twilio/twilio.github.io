function loadReadme() {
    var language = $('.readme').data('language');

    $.ajax({
        url: 'https://raw.githubusercontent.com/twilio/twilio-' + language + '/master/README.md'
    }).done(function(data) {
        var converter = new showdown.Converter();
        converter.setFlavor('github');
        converter.setOption('simpleLineBreaks', false);
        $('.readme')[0].innerHTML = converter.makeHtml(data);
        $(document).ready(function() {
            $('.readme pre>code').each(function(i, block) {
                hljs.highlightBlock(block);
            });
        });
    })
}

window.onload = loadReadme(); 
