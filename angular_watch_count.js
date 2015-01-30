window.ngWatchCount = function (targetElements) {
  targetElements = angular.element(targetElements || document);

  var countWatchers = function(element) {
    var watchers = 0;
    var scope = null;

    element = angular.element(element);

    if (element.is('.ng-scope')) {
      scope = element.scope();
    }

    // I believe scopes and isolate scopes are meant to be mutually exclusive
    else if (element.is('.ng-isolate-scope')) {
      scope = element.isolateScope();
    }

    if (scope && scope.$$watchers) {
      watchers += scope.$$watchers.length;
    }

    angular.forEach(element.children(), function(childElement) {
        watchers += countWatchers(childElement);
    });

    return watchers;
  }

  var watchers = 0;
  angular.forEach(targetElements, function(element) {
    watchers += countWatchers(element);
  })

  console.log(['Watcher count', targetElements, watchers]);
  return watchers;
}

window.ngWatchCount();