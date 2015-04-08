/**
 * Created by Bui Dang Khoa on 3/20/2015.
 */
'use strict';
angular.module('voluntr').controller('signUpController', ['$scope', '$state', 'Restangular','$rootScope',
  function($scope, $state, Restangular, $rootScope) {
      $scope.org = {
        name:null,
        email: null,
        locations: [],
        phone: null,
        causes: [],
        description: null
      };
      $scope.register = function(){
          console.log($rootScope.user.createdOn);

          Restangular.all('api/organisations').post({
              name: $scope.org.name,
              email: $scope.org.email,
              locations: $scope.org.locations,
              interests: $scope.org.causes,
              description: $scope.org.description,
              owner: $rootScope.user._id
          })
              .then(function(results) {
                  console.log('create');
                  $rootScope.user.managedOrganisations.push(results);
                  $rootScope.user.save();
                  $scope.success = true;

              });
      }
  }
]);