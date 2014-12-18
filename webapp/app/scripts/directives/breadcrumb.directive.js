'use strict';

angular.module('icmApp')
.controller('BreadcrumbCtrl', ['$scope','NavigationService', function($scope,$nav){
	$scope.crumbs = $nav.getPath();
	$scope.last = $scope.crumbs[$scope.crumbs.length-1];
	
	$scope.minusLast = function(){
		$scope.last = $scope.crumbs[$scope.crumbs.length-1];
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