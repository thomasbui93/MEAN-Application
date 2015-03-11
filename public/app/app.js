'use strict';

angular.module('voluntr', [
  // module dependencies go here
  'ui.router',
  'restangular'
]).config(function($urlRouterProvider, $stateProvider) {
  // Redirect to home on unmatched url.
  $urlRouterProvider.otherwise('/');

  // Here we set up the states.
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'app/home/home.html',
    controller: 'homeController',
    resolve: {
      exampleRestfulItems: function(Restangular) {
        return Restangular.all('api/example').getList();
      }
    }
  }).state('other', {
    url: '/other',
    templateUrl: 'app/test-folder/other.html',
    controller: 'otherController'
  });


}).run(function () {

});
