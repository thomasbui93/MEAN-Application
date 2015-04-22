'use strict';

angular.module('voluntr')
  .factory('FileUploader', function($http) {
    return {
      // returns $http promise
      upload: function(url, file) {
        var fd = new FormData();

        fd.append('file', file);

        return $http.post(url, fd, {
          withCredentials: true,
          headers: {
            'Content-Type': undefined
          },
          transformRequest: angular.identity
        });
      }
    }
  });