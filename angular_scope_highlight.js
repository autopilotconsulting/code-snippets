window.ngHighlightScopes = function() {
  $('*').css('background', 'none')
    .find('.ng-scope').css('background-color', 'rgba(0, 0, 0, .2)').end()
    .find('.ng-isolate-scope').css('background-color', 'rgba(255, 0, 0, .2)')
}