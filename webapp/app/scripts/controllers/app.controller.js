'use strict';

angular.module('icmApp')
  .controller('AppCtrl', ['$http', 'NavigationService', function ($scope, $http, $nav) {
    $http.defaults.headers.common.Accept = 'text/json';
    $http.defaults.useXDomain = true;
    $http.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $http.defaults.headers.common["Accept"] = "application/json";
    $http.defaults.headers.common["Content-Type"] = "application/json";
  }]);
