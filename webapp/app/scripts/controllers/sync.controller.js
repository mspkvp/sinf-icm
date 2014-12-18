'use strict';

angular.module('icmApp')
.controller('SyncCtrl', ['$scope', '$http', 'NavigationService', function($scope, $http, $nav){

	$nav.setPath([
		$nav.getPath()[0],
		{
			name: 'Syncronizar Artigos',
			icon: '',
			url: '/sync'
		}
		]);


	$scope.companies = undefined;

	this.getCompanies = function(){
		$scope.companies = $nav.getCompanies();
	};

	$scope.items = undefined;



}]);