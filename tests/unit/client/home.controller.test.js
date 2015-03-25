describe("Unit: Test homeController", function() {

  beforeEach(module('voluntr'));

  var $controller;

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  describe('home hashs', function(){
     it('check the $scope.hashs to be defined and set to be an array', function(){
         $scope = {};
         var hashArray = ['header-container-page', 'about-page', 'contact-page', 'honor-page'];
         var controller = $controller('homeController', {$scope: $scope});
         expect($scope.hashs).toEqual(hashArray);
     })
  })  ;
});