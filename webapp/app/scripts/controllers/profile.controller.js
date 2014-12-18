'use strict';

angular.module('icmApp')
  .controller('ProfileCtrl', ['$scope', 'NavigationService', 'UserService',  function controller($scope, $nav, $userS) {
    if (!$userS.getLoginStatus()) {
      alert("Please login first!");
      $nav.setRedirection('/login');
      $nav.go('login');
      return;
    }
  }]);
