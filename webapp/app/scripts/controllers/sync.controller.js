'use strict';

angular.module('icmApp')
.controller('SyncCtrl', ['$scope', '$http', 'NavigationService', '$interval', 'OrdererService', 'UserService', function($scope, $http, $nav, $interval, $orderer, $userS){

	$scope.addState = '';

	if(!$userS.getLoginStatus()){
		alert("Please login first!");
		$nav.setRedirection('/login');
		$nav.go('login');
		return;
	}

	$nav.setPath([
		$nav.getPath()[0],
		{
			name: 'Syncronizar Artigos',
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
		$scope.addState = '';
		$nav.setLoading(true);
		$orderer.getProducts($scope.baseCompany)
		.success( function(result) {
			$scope.products = result.data;
		});
		$nav.setLoading(false);
	};

	$scope.updateSelectedProduct = function() {
		$scope.addState = '';
		$nav.setLoading(true);
		for (i = 0; i < companies.length; i++) {
			if (companies[i].id != $scope.baseCompany) {
				$orderer.getProducts($companies[i].id)
				.success(
					function(result) {
						companies[i].products = result.data
					});

				if (companies[i].indexOf($scope.product) == -1) {
					$scope.missingCompanies.push(companies[i]);
				}
			}
		}
		$nav.setLoading(false);
	}

	$scope.updateCompany = function(companyID) {
		$nav.setLoading(true);
		for (i = 0; i < companies.length; i++) {
			if (companies[i].id != companyID) {
				$orderer.addProduct(companyID, $scope.product)
				.success(function(result) {
					var res = result.data;
				});

				if (res) {
					$scope.addState = '';
					angular.element('#cb_' + companyID).attr('disabled','disabled');
				} else {
					$scope.addState = "Error inserting"
				}
			}
		}
		$nav.setLoading(false);
	}

	this.getCompanies();
	$interval(this.getCompanies, 1000);

}]);