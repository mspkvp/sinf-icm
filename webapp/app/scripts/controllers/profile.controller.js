'use strict';

angular.module('icmApp')
  .controller('ProfileCtrl', ['$scope', function controller($scope) {
    if (!$userS.getLoginStatus()) {
      alert("Please login first!");
      $nav.setRedirection('/login');
      $nav.go('login');
      return;
    }
  }]);
