/**
 * Created by Bui Dang Khoa on 4/9/2015.
 */
'use strict';
angular.module('voluntr').controller('mainController', function ($scope) {
    $scope.menu = false;
    $scope.toggleMenu = function () {
        $scope.menu =! $scope.menu;
        console.log('click');
    };
});