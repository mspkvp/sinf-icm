'use strict';

angular.module('icmApp')
.controller('SyncCtrl', ['$scope', '$http', 'NavigationService', '$interval', 'OrdererService', 'UserService',
    function($scope, $http, $nav, $interval, $orderer, $userS){

	$scope.syncErr = '';
	$scope.syncSucc = '';
  $scope.missingCompanies = [];
  $scope.sendingProduct;

    if (!$userS.getLoginStatus()) {
      alert("Please login first!");
      $nav.setRedirection('/login');
      $nav.go('login');
      return;
    }

	$nav.setPath([
		$nav.getPath()[0],
		{
			name: 'Sincronizar',
			icon: '',
			url: ''
		},
		{
			name: 'Artigos',
			icon: '',
			url: '/sync'
		}
		]);


	$scope.companies = undefined;
	$scope.items = undefined;

	this.getCompanies = function(){
		$scope.companies = $nav.getCompanies();

		if ($scope.companies == undefined) {
			$nav.setLoading(true);
		} else {
			$nav.setLoading(false);
		}
	};

	$scope.updateBaseCompany = function() {
    $scope.missingCompanies = [];
		$scope.syncSucc = '';
		$scope.syncErr = '';
    $scope.product = undefined;
		$nav.setLoading(true);
		$orderer.getProducts($scope.baseCompany)
		.success( function(data, status, headers, config) {
			$scope.products = data;
      if ($scope.products === undefined || $scope.products.length == 0){
        $scope.syncErr = "A empresa selecionada não tem produtos";
      }
			$nav.setLoading(false);
		});
	};

	$scope.updateSelectedProduct = function() {
    $scope.missingCompanies = [];
		$scope.syncErr = '';
		$scope.syncSucc = '';
   for(var i = 0; i < $scope.products.length; i++){
      if($scope.products[i]['CodArtigo'] == $scope.product){
        $scope.sendingProduct = $scope.products[i];
        delete $scope.sendingProduct['$$hashKey'];
      }
    }
		for (var i = 0; i < $scope.companies.length; i++) {
      delete $scope.companies[i]['$$hashKey'];
			if ($scope.companies[i].id != $scope.baseCompany) {
				$nav.setLoading(true);
        $scope.setProducts(i);
			}
		}

	}

  $scope.setProducts = function(itCounter){
    $orderer.getProducts($scope.companies[itCounter].id)
    .success(
      function(data, status, headers, config) {
        $scope.companies[itCounter].products = data;
        var found = false;
        for(var i = 0; i < $scope.companies[itCounter].products.length; i++){
          if($scope.companies[itCounter].products[i]['CodArtigo'] == $scope.product){
            found = true;
          }
        }

        if(found == false){
          $scope.missingCompanies.push($scope.companies[itCounter]);
        }
        $nav.setLoading(false);
      });
  }

	$scope.updateCompany = function(companyID) {
		$scope.syncErr = '';
		$scope.syncSucc = '';
		for (var i = 0; i < $scope.companies.length; i++) {
			if ($scope.companies[i].id === companyID) {
				$nav.setLoading(true);
        $scope.sendProducts(companyID);
        break;
			}
		}
	}

  $scope.sendProducts = function(id){
    var res;
    console.log("TRYING TO ADD " + JSON.stringify($scope.sendingProduct));
    $orderer.addProduct(id, $scope.sendingProduct)
    /*.success(function(data, status, headers, config) {
      res = data;
      $nav.setLoading(false);
    });

    if (res) {
      $scope.syncErr = '';
      angular.element('#cb_' + companyID).attr('disabled','disabled');
      $scope.syncSucc = 'Sucesso ao sincronizar produtos';
    } else {
      $scope.syncErr = "Erro ao sincronizar produtos";
    }*/
    .then(
      function onSuccess(data){
        res = data;
        $nav.setLoading(false);
        $scope.syncErr = '';
        angular.element('#cb_' + id).attr('disabled','disabled');
        $scope.syncSucc = 'Sucesso ao sincronizar produtos';
      },
      function onError(e){
        console.log(e);
        $scope.syncErr = "Erro ao sincronizar produtos";
      }
    );
  }

	this.getCompanies();
	$interval(this.getCompanies, 1000);

}]);
