function loadReadme() {
    var language = $('.readme').data('language');
    var branch = 'master';

    var readmeUrl = 'https://raw.githubusercontent.com/twilio/twilio-' + language + '/' + branch + '/README.md';
    var basePath = 'https://github.com/twilio/twilio-' + language + '/blob/' + branch + '/';

    $.ajax({
        url: readmeUrl
    }).done(function(data) {
        var converter = new showdown.Converter();
        converter.setFlavor('github');
        converter.setOption('simpleLineBreaks', false);
        converter.setOption('relativePathBaseUrl', basePath);

        var html = converter.makeHtml(data);

        // Prepend a base path to relative links or images.
        // TODO: Remove this line once showdown adds support for base URLs:
        // https://github.com/showdownjs/showdown/issues/536
        html = html.replace(/(a href|img src)="(?!([a-z]+:)?\/\/|mailto|#)/gi, '$&' + basePath);

        $('.readme')[0].innerHTML = html;

        $(document).ready(function() {
            $('.readme pre>code').each(function(i, block) {
                hljs.highlightBlock(block);
            });
        });
    })
}

window.onload = loadReadme();
