'use strict';

angular.module('icmApp')
.controller('SyncCtrl', ['$scope', '$http', 'NavigationService', '$interval', 'OrdererService', 'UserService', function($scope, $http, $nav, $interval, $orderer, $userS){

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
		$scope.products = $orderer.getProducts($scope.baseCompany);
		$nav.setLoading(false);
	};

	$scope.updateSelectedProduct = function() {
		$scope.addState = '';
		$nav.setLoading(true);
		for (i = 0; i < companies.length; i++) {
			if (companies[i].id != $scope.baseCompany) {
				companies[i].products = $orderer.getProducts($companies[i].id);

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
				var res = $orderer.addProduct(companyID, $scope.product);

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