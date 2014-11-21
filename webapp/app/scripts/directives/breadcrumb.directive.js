'use strict';

angular.module('icmApp')
	.controller('BreadcrumbCtrl', ['$scope','NavigationService', function($scope,$nav){
		$scope.crumbs = $nav.getPath();
		$scope.last = $scope.crumbs[$scope.crumbs.length-1];
		console.log($scope.crumbs);
				
		$scope.minusLast = function(){
			return $scope.crumbs.length-1;
		};
		
	}])
	.directive('breadcrumb', function(){
		return {
			restrict: 'E',
			scope: true,
			templateUrl: 'scripts/directives/breadcrumb.directive.html',
			controller: 'BreadcrumbCtrl'
		};
	});