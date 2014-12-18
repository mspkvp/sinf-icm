'use strict';

angular.module('icmApp')
.controller('SyncCtrl', ['$scope', '$http', 'NavigationService', '$interval', 'OrdererService', 'UserService', function($scope, $http, $nav, $interval, $orderer, $userS){

	$scope.syncErr = '';
	$scope.syncSucc = '';

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
		$scope.syncSucc = '';
		$scope.syncErr = '';
		$nav.setLoading(true);
		$orderer.getProducts($scope.baseCompany)
		.success( function(result) {
			$scope.products = result.data;
			$nav.setLoading(false);
		});
	};

	$scope.updateSelectedProduct = function() {
		$scope.syncErr = '';
		$scope.syncSucc = '';
		for (var i = 0; i < companies.length; i++) {
			if (companies[i].id != $scope.baseCompany) {
				$nav.setLoading(true);
				$orderer.getProducts($companies[i].id)
				.success(
					function(result) {
						companies[i].products = result.data;
						$nav.setLoading(false);
					});

				if (companies[i].indexOf($scope.product) == -1) {
					$scope.missingCompanies.push(companies[i]);
				}
			}
		}
	}

	$scope.updateCompany = function(companyID) {
		$scope.syncErr = '';
		$scope.syncSucc = '';
		for (i = 0; i < companies.length; i++) {
			if (companies[i].id != companyID) {
				$nav.setLoading(true);
				$orderer.addProduct(companyID, $scope.product)
				.success(function(result) {
					var res = result.data;
					$nav.setLoading(false);
				});

				if (res) {
					$scope.syncErr = '';
					angular.element('#cb_' + companyID).attr('disabled','disabled');
					$scope.syncSucc = 'Sucesso ao sincronizar produtos';
				} else {
					$scope.syncErr = "Erro ao sincronizar produtos";
				}
			}
		}
	}

	this.getCompanies();
	$interval(this.getCompanies, 1000);

}]);
