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
		$orderer.getProducts()
	}

	this.getCompanies();
	$interval(this.getCompanies, 1000);

}]);