'use strict';

angular.module('voluntr', [
  // module dependencies go here
  'ui.router',
  'restangular',
  'ngAnimate'
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
    controller: 'LoginController',
    data: {
      authorizedRoles: [USER_ROLES.guest]
    }
  }).state('search', {
    url: '/search',
    templateUrl: 'app/search/search.html',
    controller: 'searchController',
    data: {
      authorizedRoles: [USER_ROLES.guest]
    }
  }).state('register', {
    url: '/register',
    data: {
      authorizedRoles: [USER_ROLES.guest]
    },
    controller: 'signUpController',
    templateUrl: 'app/sign-up/sign-up.html'
  }).state('register.volunteer', {
    url: '/volunteer',
    controller: 'volunteerSignUpController',
    templateUrl: 'app/sign-up/volunteer-sign-up.html',
    data: {
      authorizedRoles: [USER_ROLES.guest]
    }
  }).state('register.ngo', {
    url: '/ngo/:slug',
    templateUrl: 'app/sign-up/ngo-sign-up.html',
    data: {
      authorizedRoles: [USER_ROLES.guest]
    },
    controller: 'ngoSignUpController'
  }).state('user-dashboard', {
    url: '/user/dashboard',
    templateUrl: 'app/user-dashboard/dashboard.html',
    data: {
      authorizedRoles: [USER_ROLES.guest]
    },
    controller: 'userDashboardController'
  }).state('ngoDashboard', {
    abstract: true,
    url: '/ngo/dashboard',
    controller: 'ngoDashBoardMainController',
    templateUrl: 'app/ngo-dashboard/dashboard.html',
    data: {
      authorizedRoles: [USER_ROLES.guest]
    }
  }).state('ngoDashboard.eventManage', {
    url: '',
    views: {
      'main': {
        controller: 'ngoEventManageController',
        templateUrl: 'app/ngo-dashboard/eventManage.html'
      }
    }
  }).state('ngoDashboard.eventEdit', {
    url: 'event/edit/{id}',
    views: {
      'main': {
        controller: 'ngoEventEditController',
        templateUrl: 'app/ngo-dashboard/eventEdit.html'
      }
    }
  }).state('ngoDashboard.eventCreate', {
    url: 'event/create',
    views: {
      'main': {
        controller: 'ngoEventCreateController',
        templateUrl: 'app/ngo-dashboard/eventCreate.html'
      }
    }
  }).state('ngoDashboard.jobManage', {
    url: 'job/',
    views: {
      'main': {
        controller: 'ngoJobManageController',
        templateUrl: 'app/ngo-dashboard/jobManage.html'
      }
    }
  }).state('ngoDashboard.jobCreate', {
    url: 'job/create',
    views: {
      'main': {
        controller: 'ngoJobCreateController',
        templateUrl: 'app/ngo-dashboard/jobCreate.html'
      }
    }
  }).state('ngoDashboard.jobEdit', {
    url: 'job/edit/{id}',
    views: {
      'main': {
        controller: 'ngoJobEditController',
        templateUrl: 'app/ngo-dashboard/jobEdit.html'
      }
    }
  }).state('ngoDashboard.representativeManage', {
    url: 'representative',
    views: {
      'main': {
        controller: 'ngoRepresentativeManageController',
        templateUrl: 'app/ngo-dashboard/representativeManage.html'
      }
    }
  }).state('adminDashboard', {
    abstract: true,
    url: '/admin/',
    controller: 'adminController',
    templateUrl: 'app/admin/admin.main.html',
    data: {
      authorizedRoles: [USER_ROLES.guest]
    }
  }).state('adminDashboard.blacklist', {
    url: '',
    views: {
      'main': {
        controller: 'adminBlacklistController',
        templateUrl: 'app/admin/admin.blacklist.html'
      }
    }
  }).state('adminDashboard.report', {
    url: 'report/',
    views: {
      'main': {
        controller: 'adminReportController',
        templateUrl: 'app/admin/admin.report.html'
      }
    }
  }).state('adminDashboard.content', {
    url: 'content/',
    views: {
      'main': {
        controller: 'adminContentController',
        templateUrl: 'app/admin/admin.content.html'
      }
    }
  }).state('ngoHomePage', {
    url: '/ngo/home/:id',
    controller: 'ngoHomePageController',
    templateUrl: 'app/ngo-homepage/homepage.html',
    data: {
      authorizedRoles: [USER_ROLES.guest]
    },
    resolve: {
      organisation: function(Restangular, $stateParams) {
        return Restangular.one('api/organisations', $stateParams.id).get();
      },
      events: function(Restangular, $stateParams) {
        return Restangular.one('api/organisations', $stateParams.id)
          .getList('events');
      },
      recruitments: function(Restangular, $stateParams) {
        return Restangular.one('api/organisations', $stateParams.id)
          .getList('recruitments');
      }
    }
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


}).run(function($http) {});