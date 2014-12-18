'use strict';

angular.module('icmApp')
  .controller('ShippingCtrl', ['$scope', '$http', 'NavigationService', 'ShippingService', 'OrdererService', function controller($scope, $http, $nav, $ship, $or){
    $scope.company = $nav.getViewingCompany();
    $scope.order = $ship.getOrder();
    $scope.products = $or.getProducts($nav.getViewingCompany().id);
    console.log($scope.products);
    console.log("--------------------------------------");
    console.log($scope.order.LinhasDoc);
  }]);
