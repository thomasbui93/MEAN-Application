'use strict';

angular.module('voluntr', [
  // module dependencies go here
  'ui.router',
  'restangular',
  'ngAnimate'
]).config(function($urlRouterProvider, $stateProvider, $locationProvider, USER_ROLES, RestangularProvider) {
  // Redirect to home on unmatched url.
  $urlRouterProvider.otherwise('/');

  RestangularProvider.setRestangularFields({
    id: '_id'
  });

  // Here we set up the states.
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'app/home/home.html',
    controller: 'homeController',
    resolve: {
      organisations: function(Restangular) {
        return Restangular.all('api/organisations').getList();
      }
    },
    data: {
      authorizedRoles: [USER_ROLES.guest, USER_ROLES.volunteer]
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
      authorizedRoles: [USER_ROLES.guest, USER_ROLES.volunteer]
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
      authorizedRoles: [USER_ROLES.guest, USER_ROLES.volunteer]
    }
  }).state('register', {
    url: '/register',
    data: {
      authorizedRoles: [USER_ROLES.guest, USER_ROLES.volunteer]
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
    url: '/ngo',
    templateUrl: 'app/sign-up/ngo-sign-up.html',
    data: {
      authorizedRoles: [USER_ROLES.guest, USER_ROLES.volunteer]
    },
    controller: 'ngoSignUpController'
  }).state('user-dashboard', {
    url: '/user/dashboard',
    templateUrl: 'app/user-dashboard/dashboard.html',
    data: {
      authorizedRoles: [USER_ROLES.volunteer]
    },
    controller: 'userDashboardController',
    resolve: {
      managedOrganisations: function(Restangular, $rootScope) {
        if ($rootScope.user !== undefined) {
          return Restangular.one('api/users', $rootScope.user._id).getList('managedOrganisations');
        } else {
          return {};
        }
      },
      representOrganisations: function(Restangular, $rootScope) {
        if ($rootScope.user !== undefined) {
          return Restangular.one('api/users', $rootScope.user._id).getList('representOrganisations');
        } else {
          return {};
        }
      },
      events: function(Restangular, $rootScope) {
        if ($rootScope.user !== undefined) {
          return Restangular.one('api/users', $rootScope.user._id).getList('events');
        } else {
          return {};
        }
      }
    }
  }).state('ngoDashboard', {
    abstract: true,
    url: '/ngo/dashboard/:orgId',
    controller: 'ngoDashBoardMainController',
    templateUrl: 'app/ngo-dashboard/dashboard.html',
    data: {
      authorizedRoles: [USER_ROLES.volunteer, USER_ROLES.guest]
    },
    resolve: {
      organisation: function(Restangular, $stateParams) {
        return Restangular.one('api/organisations', $stateParams.orgId).get();
      },
      events: function(Restangular, $stateParams) {
        return Restangular.one('api/organisations', $stateParams.orgId)
          .getList('events');
      }
    }
  }).state('ngoDashboard.eventManage', {
    url: '',
    views: {
      'main': {
        controller: 'ngoEventManageController',
        templateUrl: 'app/ngo-dashboard/eventManage.html'
      }
    },
    resolve: {
      events: function(events) {
        return events;
      },
      organisation: function(organisation) {
        return organisation;
      }
    }
  }).state('ngoDashboard.eventEdit', {
    url: '/event/edit/{id}',
    views: {
      'main': {
        controller: 'ngoEventEditController',
        templateUrl: 'app/ngo-dashboard/eventEdit.html'
      }
    },
    resolve: {
      event: function(Restangular, $stateParams) {
        return Restangular.one('api/events', $stateParams.id).get();
      }
    }
  }).state('ngoDashboard.eventCreate', {
    url: '/event/create',
    views: {
      'main': {
        controller: 'ngoEventCreateController',
        templateUrl: 'app/ngo-dashboard/eventCreate.html'
      }
    },
    resolve: {
      organisation: function(organisation) {
        return organisation;
      }
    }
  }).state('ngoDashboard.jobManage', {
    url: '/job',
    views: {
      'main': {
        controller: 'ngoJobManageController',
        templateUrl: 'app/ngo-dashboard/jobManage.html'
      }
    }
  }).state('ngoDashboard.jobCreate', {
    url: '/job/create',
    views: {
      'main': {
        controller: 'ngoJobCreateController',
        templateUrl: 'app/ngo-dashboard/jobCreate.html'
      }
    }
  }).state('ngoDashboard.jobEdit', {
    url: '/job/edit/{id}',
    views: {
      'main': {
        controller: 'ngoJobEditController',
        templateUrl: 'app/ngo-dashboard/jobEdit.html'
      }
    }
  }).state('ngoDashboard.representativeManage', {
    url: '/representative',
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
      authorizedRoles: [USER_ROLES.admin]
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
      authorizedRoles: [USER_ROLES.guest, USER_ROLES.volunteer]
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
  }).state('events', {
    url: '/events/{id}',
    controller: 'eventMainController',
    templateUrl: 'app/event/event.main.html',
    data: {
      authorizedRoles: [USER_ROLES.guest, USER_ROLES.volunteer]
    },
    resolve: {
      event: ['$stateParams', 'Restangular',
        function($stateParams, Restangular) {
          return Restangular.one('api/events', $stateParams.id).get();
        }
      ]
    }
  }).state('users', {
    url: '/users/{id}',
    controller: 'userMainController',
    templateUrl: 'app/user-homepage/user.home.html',
    data: {
      authorizedRoles: [USER_ROLES.guest, USER_ROLES.volunteer]
    },
    resolve: {
      user: ['$stateParams', 'Restangular',
        function($stateParams, Restangular) {
          return Restangular.one('api/users', $stateParams.id).get();
        }
      ]
    }
  }).state('advancedSearch', {
    url: '/search-advanced/{key}',
    controller: 'searchAdvancedController',
    templateUrl: 'app/search/search.advanced.html',
    data: {
      authorizedRoles: [USER_ROLES.guest, USER_ROLES.volunteer]
    },
    resolve: {
      initialResult: ['$stateParams', 'Restangular',
        function($stateParams, Restangular) {
          var results = {
            organizations: [],
            jobs: [],
            events: []
          };
          Restangular.all('api/organisations').getList({
            name: $stateParams.key,
            locations: $stateParams.location
          }).then(function(data) {
            results.organizations = data;
          });
          return results;
        }
      ]
    }
  }).state('permissionDenied', {
    url: '/permission-denied',
    templateUrl: 'app/static/permission-denied.html',
    data: {
      authorizedRoles: [USER_ROLES.guest, USER_ROLES.volunteer]
    }
  }).state('loginRequired', {
    url: '/login-required',
    templateUrl: 'app/static/login-required.html',
    data: {
      authorizedRoles: [USER_ROLES.guest, USER_ROLES.volunteer]
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


}).run(['$http', '$rootScope', 'Restangular', '$state', 'AuthService', 'USER_ROLES',
  function($http, $rootScope, Restangular, $state, AuthService, USER_ROLES) {
    // Every time the app runs, we're GETting the "current user",
    // which the server returns depending on the session cookie.
    // The asynchronous nature of this approach may cause some trouble
    // and needs more thought and testing.
    $http.get('api/users/self').success(function(user) {
      $rootScope.user = Restangular.restangularizeElement(null, user, 'api/users', user._id);
      //console.log('Restored session, here\'s the current user:', $rootScope.user);
    }).error(function() {
      console.log('No login session. Should we redirect to front page or what?');
    });

  }
]);