/**
 * Created by Bui Dang Khoa on 3/17/2015.
 */
'use strict';
//session testing
describe('Authentication Unit Test: Session', function(){
    var session;
    beforeEach(angular.mock.module('voluntr'));
    beforeEach(angular.mock.inject(function($injector){
        session = $injector.get('Session');
    }))
    describe('Session.create', function(){
        it('set the Session object', function(){
           var sessionID = 'abc', userID= '123', userRole = 'admin', userName = 'testUser';
           session.create(sessionID, userID, userRole, userName);
           expect(session.id).toEqual(sessionID);
           expect(session.userId).toEqual(userID);
           expect(session.userRole).toEqual(userRole);
           expect(session.userName).toEqual(userName);
        });
    })
    describe('Session.destroy', function(){
        it('destroy the Session object', function(){
            session.destroy();
            expect(session.id).toEqual(null);
            expect(session.userId).toEqual(null);
            expect(session.userRole).toEqual('guest');
            expect(session.userName).toEqual(null);
        })
    })
});
//AuthService testing
describe('Authentication Unit Test: AuthService', function(){
    var authService, session, $httpBackend;
    beforeEach(angular.mock.module('voluntr'));
    beforeEach(inject(function($injector){
        authService = $injector.get('AuthService');
        $httpBackend = $injector.get('$httpBackend');
        session = $injector.get('Session');
    }));
    describe('AuthService.isAuthenticated', function(){
        it('check whether a user is logged in will return true', function(){
            var sessionID = 'abc', userID= '123', userRole = 'admin', userName = 'testUser';
            session.create(sessionID, userID, userRole, userName);
            expect(authService.isAuthenticated()).toEqual(true);
        })
        it('check whether a user is not logged in will return false ', function(){
            expect(authService.isAuthenticated()).toEqual(false);
        })
    })
    describe('AuthService.isAuthorized', function(){
        beforeEach(function(){
            var sessionID = 'abc', userID= '123', userRole = 'admin', userName = 'testUser';
            session.create(sessionID, userID, userRole, userName);
        })
        it('check whether a user has authorization will return true', function(){
            var authorizedRoles= ['guest', 'admin'];
            expect(authService.isAuthorized(authorizedRoles)).toEqual(true);
        })
        it('check whether a user has authorization will return true', function(){
            var data = {
                authorizedRoles: ['guest']
            }
            expect(authService.isAuthorized(data)).toEqual(false);
        })
    })
    describe('AuthService.login', function(){
        it('should invoke the request from the server with post', function(){
            var response = {
                data: {
                    id: 'abcxyz',
                    user: {
                        id: 'abc',
                        role: 'admin',
                        name: 'bdk'
                    }
                }
            };
            $httpBackend.expectPOST('/api/login/', {
                username: 'testUsername',
                password: 'testPassword'
            }).respond(200, response);
            $httpBackend.resetExpectations();
            session.create(response.data.id, response.data.user.id, response.data.user.role, response.data.user.name);
            expect(authService.isAuthenticated()).toEqual(true);
        })
        it('should check that the login attempt has failed', function(){
            var response = {
                data: {
                    id: 'abcxyz',
                    user: {
                        id: 'abc',
                        role: 'admin',
                        name: 'bdk'
                    }
                }
            };
            $httpBackend.expectPOST('/api/login/', {
                username: 'testUsername',
                testPassword: 'testPassword'
            }).respond(403);
            $httpBackend.resetExpectations();
            expect(authService.isAuthenticated()).toEqual(false);
        })
    })
})
//AuthInterceptor testing
describe('Authentication testing: AuthInterceptor', function(){

})
