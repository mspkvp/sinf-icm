'use strict';

angular.module('icmApp')
	.controller('NavCtrl', ['$scope', 'UserService', 'NavigationService', function controller($scope, $userS){
		$scope.logged_user = $userS.getUser();
		
	}]);