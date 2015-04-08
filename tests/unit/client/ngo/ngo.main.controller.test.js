/**
 * Created by Bui Dang Khoa on 3/31/2015.
 */
'use strict';
describe('NGO main controller unit test', function() {
  var scope;
  var Validation;
  var ngoError;
  var controller;

  var organisation = {
    _id: '55095c4e2d316055807f0000',
    name: 'Greenpeace',
    locations: ['Oulu', 'Helsinki'],
    interests: ['food', 'drink']
  };

  beforeEach(angular.mock.module('voluntr'));

  beforeEach(angular.mock.inject(function($injector, $controller, $rootScope) {
    Validation = $injector.get('Validation');
    ngoError = $injector.get('NGO_ERRORS');
    scope = $rootScope.$new();
    controller = $controller('ngoDashBoardMainController', {
      $scope: scope,
      organisation: organisation
    });
  }));

  describe('define variable: ', function() {
    it('should define the scope.currentNGo', function() {
      expect(scope.currentNGO).toBeDefined();
    });

    it('should define the scope.edit', function() {
      expect(scope.edit).toBeDefined();
    });

    it('should define scope.error and equal NGO_ERRORS', function() {
      expect(scope.errors).toBeDefined();
      expect(scope.errors).toEqual(ngoError);
    });

    it('should define the inputCause', function() {
      expect(scope.inputCause).toEqual('');
    });
  });

  describe('editInformation method: ', function() {
    it('change the state of scope.edit', function() {
      scope.editInformation();
      expect(scope.edit).toEqual({
        show: true,
        state: 'Save'
      });
    });
  });

  describe('saveInformation method: ', function() {
    it('should alter scope.errors error state', function() {
      scope.currentNGO = {
        name: 'Helping Hand',
        establish: new Date('Feb 20 1999'),
        address: ['Oulu, Finland', 'Helsinki, Finland'],
        causes: ['Humanity', 'Children', 'Animation', 'Environment'],
        description: 'Morbi in sem quis dui pla Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.'
      };

      scope.saveInformation();

      expect(scope.errors).toEqual({
        name: {
          violate: false,
          message: 'Please enter name of your Organisation'
        },
        email: {
          violate: true,
          message: 'You must provide an appropriate email.'
        },
        phone: {
          violate: true,
          message: 'Your phone number is not found.'
        },
        description: {
          violate: true,
          message: 'Your description should be informative (more than 30 words)'
        }
      });
    });

    it('should alter scope.errors error state', function() {
      scope.currentNGO = {
        name: 'Helping Hand',
        establish: new Date('Feb 20 1999'),
        address: ['Oulu, Finland', 'Helsinki, Finland'],
        causes: ['Humanity', 'Children', 'Animation', 'Environment'],
        description: 'a a a a a a a a a a a a a a a a a a  a a a  a a a a  a a a  a a a a a aa a a a a a a  a aa a a  a   a  aa'
      };

      scope.saveInformation();

      expect(scope.errors).toEqual({
        name: {
          violate: false,
          message: 'Please enter name of your Organisation'
        },
        email: {
          violate: true,
          message: 'You must provide an appropriate email.'
        },
        phone: {
          violate: true,
          message: 'Your phone number is not found.'
        },
        description: {
          violate: false,
          message: 'Your description should be informative (more than 30 words)'
        }
      });
    });

  });
});