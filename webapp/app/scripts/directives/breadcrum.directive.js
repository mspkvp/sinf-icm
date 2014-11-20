angular.module('icmApp')
	.directive('breadcrumb', ['$scope','NavigationService', function($scope, $nav){
		return {
			restrict: 'E',
			template: 'scripts/directives/breadcrumb.directive.html',
			controller: function($scope, $nav){
				$scope.crumbs = $nav.getPath();
				$scope.minusLast = function(){
					return $scope.crumbs.length-1;
				};
				$scope.getLast = function(){
					return $scope.crumbs[$scope.crumbs.length-1];
				}
			}
		};
	}]);