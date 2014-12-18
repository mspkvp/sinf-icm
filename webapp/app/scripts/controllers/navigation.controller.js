'use strict';

angular.module('icmApp')
  .controller('NavCtrl', ['$scope', '$interval', 'UserService', 'NavigationService', function controller($scope, $interval, $userS, $nav) {
    if (!$userS.getLoginStatus()) {
      alert("Please login first!");
      $nav.setRedirection('/login');
      $nav.go('login');
      return;
    }

    $scope.loggedUser = $userS.getUser();

    $scope.company = $nav.getViewingCompany();

    $scope.logout = function () {
      $nav.go('');
      $userS.resetUser();
      $nav.setViewingCompany(undefined);
      $scope.loggedUser = $userS.getUser();
    };

    function update() {
      $scope.loggedUser = $userS.getUser();
      $scope.company = $nav.getViewingCompany();
    };

    $scope.isLoggedIn = function () {
      return $userS.getLoginStatus();
    };

    $scope.isClient = function () {
      return $userS.isClient() && $scope.company != undefined;
    };

    $scope.isSupplier = function () {
      return $userS.isSupplier() && $scope.company != undefined;
    };

    $interval(update, 1000);

  }]);
