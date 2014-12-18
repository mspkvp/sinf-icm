'use strict';

angular.module('icmApp')
  .controller('AppCtrl', ['$http', function ($scope, $http) {
    if (!$userS.getLoginStatus()) {
      alert("Please login first!");
      $nav.setRedirection('/login');
      $nav.go('login');
      return;
    }
    $http.defaults.headers.common.Accept = 'text/json';
    $http.defaults.useXDomain = true;
    $http.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $http.defaults.headers.common["Accept"] = "application/json";
    $http.defaults.headers.common["Content-Type"] = "application/json";
  }])
