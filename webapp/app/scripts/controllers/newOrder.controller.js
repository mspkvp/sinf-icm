'use strict';

angular.module('icmApp')
  .controller('newOrderCtrl', ['$scope', '$http', 'NavigationService', 'UserService',
    function controller($scope, $http, $nav, $userS) {
    if (!$userS.getLoginStatus()) {
      alert("Please login first!");
      $nav.setRedirection('login');
      $nav.go('login');
      return;
    }

    $scope.company = $nav.getViewingCompany();
    $scope.suppliers = [];
    $scope.optionText;
    $scope.selectedSupplier = "";
    $scope.selectedProducts = [];
    $scope.products = [];
    $scope.newProduct;
    $scope.newProductText;
    $scope.newProductStock;

    if ($scope.company != undefined) {
      $http.get('http://localhost:49209/api/Fornecedores?empresa=' + $scope.company.id).
        success(function (data, status, headers, config) {
          for (var i = 0; i < data.length; i++) {
            $scope.suppliers.push(data[i]);
          }
        });
    }

    $scope.supplierChosen = function () {
      var arrowIndex = $scope.optionText.indexOf("->");
      $scope.selectedSupplier = $scope.optionText.substr(0, arrowIndex); //Just id text, like "EMP1"

      $http.get('http://localhost:49209/api/Artigos?empresa=' + $scope.selectedSupplier).
        success(function (data, status, headers, config) {
          for (var i = 0; i < data.length; i++) {
            $scope.selectedProducts.push(data[i]);
          }
        });

    };

    $scope.codeWritten = function () {
      if ($scope.company === undefined || $scope.selectedSupplier == "") return;
      for (var i = 0; i < $scope.selectedProducts.length; i++) {
        if ($scope.newProduct == $scope.selectedProducts[i].CodArtigo) {
          $scope.newProductText = $scope.selectedProducts[i].DescArtigo;
          $scope.newProductStock = $scope.selectedProducts[i].Stock;
          break;
        }
      }
    };
  }]);
