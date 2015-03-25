/**
 * Created by Bui Dang Khoa on 3/25/2015.
 */
'use strict';
angular.module('voluntr')
  .directive('ngScroll', ['$parse',
    function($parse) {
      return function(scope, element, attr) {
        var fn = $parse(attr.ngScroll);
        element.bind('mousewheel', function(event) {
          scope.$apply(function() {
            fn(scope, {
              $event: event
            });
          });
        });
      };
    }
  ]);