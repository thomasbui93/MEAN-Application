'use strict';

angular.module('voluntr', [
  // module dependencies go here
  'ui.router',
  'restangular'
]).config(function($urlRouterProvider, $stateProvider, $locationProvider, USER_ROLES) {
  // Redirect to home on unmatched url.
  $urlRouterProvider.otherwise('/');

  // Here we set up the states.
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'app/home/home.html',
    controller: 'homeController',
    data: {
      authorizedRoles: [USER_ROLES.guest]
    }
  }).state('example', {
    url: '/example',
    templateUrl: 'app/test-folder/example.html',
    controller: 'exampleController',
    resolve: {
      items: function(Restangular) {
        return Restangular.all('api/example').getList();
      }
    },
    data: {
      authorizedRoles: [USER_ROLES.guest]
    }
  }).state('login', {
    url: '/login',
    templateUrl: 'app/authentication/login.html',
    controller: 'LoginController'
  });

  // This allows the address bar urls to seem natural
  // even though no actual pages aren't requested. Without
  // this settings urls would be /#/some/page instead of
  // /some/page
  // Base is disabled to make route testing way easier
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

}).run(function($http) {
  $http.get('api/organization').then(function(data) {
    console.log(data);
  });
});
