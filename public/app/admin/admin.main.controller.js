/**
 * Created by Bui Dang Khoa on 3/29/2015.
 */
'use strict';
angular.module('voluntr').controller('adminController', function($scope, $state) {
  $scope.isState = function(name) {
    return $state.is(name);
  };
});