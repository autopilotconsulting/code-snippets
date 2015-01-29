describe('angular watch counter', function() {
  it('returns no watches if there are no scopes', function() {
    var element = angular.element('<div />');
    var watches = window.ngWatchCount(element);

    expect(watches).toBe(0);
  })

  it('returns no watches if there are no watches', function() {
    var element = angular.element('<div class="ng-scope" />');
    var watches = window.ngWatchCount(element);

    expect(watches).toBe(0);
  })

  describe('with an angular scope', function() {
    var $scope, $element;

    beforeEach(angular.mock.inject(function($rootScope, $compile){
      $scope = $rootScope.$new(true)
      $scope.numbers = [217, 1118];

      template = [
        '<div>',
        '  <div class="child" ng-repeat="number in numbers">{{ number }}</div>',
        '</div>'].join('\n');

      $element = $compile(template)($scope)
      $scope.$digest();
    }))

    it('returns watch count for a single element', function() {
      var child = $element.find('.child').first();
      var watches = window.ngWatchCount(child);

      expect(watches).toBe(1);
    })

    it('returns watch count for a set of element', function() {
      var children = $element.find('.child');
      var watches = window.ngWatchCount(children);

      expect(watches).toBe(2);
    })

    it('returns watch count for an element and its children', function() {
      var watches = window.ngWatchCount($element);

      expect(watches).toBe(3);
    })

    it('falls back to document if an element is not specified', function() {
      $element.appendTo(document.body);
      var watches = window.ngWatchCount();
      $element.remove();

      expect(watches).toBe(3);
    })
  })
})