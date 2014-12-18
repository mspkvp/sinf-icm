'use strict';

angular.module('icmApp')
  .controller('ShippingCtrl', ['$scope', '$http', 'NavigationService', 'ShippingService', 'OrdererService', function controller($scope, $http, $nav, $ship, $or) {
    if (!$userS.getLoginStatus()) {
      alert("Please login first!");
      $nav.setRedirection('/login');
      $nav.go('login');
      return;
    }

    $scope.company = $nav.getViewingCompany();
    $scope.order = $ship.getOrder();
    //$scope.products = $or.getProducts($nav.getViewingCompany().id);
    //console.log($scope.products);
  }]);
