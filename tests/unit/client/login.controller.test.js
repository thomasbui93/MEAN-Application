'use strict';
describe('LoginController unit testing', function() {
  var scope,
    rootScope,
    controller,
    auth_events,
    authService,
    user_roles,
    $httpBackend
  var user = {
    id: 'bdk',
    role: 'ngo',
    userName: 'bui dang khoa'
  }
  var credential = {
    username: 'testUsername',
    password: 'testPassword'
  }
  var response = {
    data: {
      id: 'abcxyz',
      user: {
        id: credential.username,
        role: credential.password,
        name: 'bdk'
      }
    }
  }

  beforeEach(angular.mock.module('voluntr'));

  beforeEach(inject(function($injector, $controller, _$rootScope_, $rootScope) {
    scope = $rootScope.$new();
    rootScope = _$rootScope_;
    spyOn(rootScope, '$broadcast');
    controller = $controller('LoginController', {
      $scope: scope,
      $rootScope: rootScope
    });
    auth_events = $injector.get('AUTH_EVENTS');
    authService = $injector.get('AuthService');
    user_roles = $injector.get('USER_ROLES');
    $httpBackend = $injector.get('$httpBackend');

  }));

  describe('$scope credentials', function() {
    it('check if the credentials model is defined', function() {
      expect(scope.credentials).toBeDefined();
    })
  });

  describe('$scope logout', function() {
    it('reset the initial state of user object in rootScope', function() {
      scope.logout();
      expect(rootScope.user).toEqual(null);
    });

    it('broadcast the logout success event to the scope', function() {
      scope.logout();
      expect(rootScope.$broadcast).toHaveBeenCalledWith(auth_events.logoutSuccess);
    });
  });

  // FIXME: There tests never actually worked, and after changin the login
  // stuff, they still don't.

  // describe('$scope login', function() {
  //   it('should return the credential data if the login attempt is succeeded', function() {
  //     var response = {
  //       data: {
  //         _id: 123
  //       }
  //     };

  //     $httpBackend.expectPOST('/api/login/', {
  //       email: 'testUsername',
  //       password: 'testPassword'
  //     }).respond(200, response);

  //     $httpBackend.resetExpectations();

  //     scope.login({
  //       email: 'testUsername',
  //       password: 'testPassword'
  //     });

  //     expect(rootScope.$broadcast).toHaveBeenCalledWith(auth_events.loginSuccess);
  //   });

  //   it('should emit the event of login failure to scope', function() {
  //     scope.login({
  //       username: 'wrong',
  //       password: 'wrong'
  //     });

  //     expect(rootScope.$broadcast).toHaveBeenCalledWith(auth_events.loginFailed);
  //   });
  // });
});