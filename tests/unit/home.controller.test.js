describe("Unit: Test homeController", function() {

  beforeEach(module('voluntr'));

  var $controller;

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  describe("$home.title", function() {
    it("checks that the title is set to home", function() {
      $scope = {};
      var controller = $controller('homeController', {$scope: $scope});
      expect($scope.title).toBe("Home");
    })
  });
});