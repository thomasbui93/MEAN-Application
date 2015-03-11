'use strict';

angular.module('voluntr', [
  // module dependencies go here
  'ui.router',
  'restangular'
]).config(function($urlRouterProvider, $stateProvider, $locationProvider) {
  // Redirect to home on unmatched url.
  $urlRouterProvider.otherwise('/');

  // Here we set up the states.
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'app/home/home.html',
    controller: 'homeController',
  }).state('other', {
    url: '/other',
    templateUrl: 'app/test-folder/other.html',
    controller: 'otherController'
  }).state('example', {
    url: '/example',
    templateUrl: 'app/test-folder/example.html',
    controller: 'exampleController',
    resolve: {
      items: function(Restangular) {
        return Restangular.all('api/example').getList();
      }
    }
  });

  // This allows the address bar urls to seem natural
  // even though no actual pages aren't requested. Without
  // this settings urls would be /#/some/page instead of
  // /some/page
  $locationProvider.html5Mode(true);

}).run(function($http) {
  $http.get('api/organization').then(function(data) {
    console.log(data);
  });
});
