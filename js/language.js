function loadReadme() {
  var language = $('.readme').data('language');

  $.ajax({
    url: 'https://raw.githubusercontent.com/twilio/twilio-' + language + '/master/README.md'
  }).done(function(data) {
    var converter = new showdown.Converter();
    converter.setFlavor('github');
    converter.setOption('simpleLineBreaks', false);
    $('.readme')[0].innerHTML = converter.makeHtml(data);
  })
}

window.onload = loadReadme(); 
