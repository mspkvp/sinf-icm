'use strict';

angular.module('icmApp')
	.controller('NavCtrl', ['$scope', 'UserService', 'NavigationService', function controller($scope, $userS, $nav){
		$scope.logged_user = $userS.getUser();

		$scope.logout = function logout() {
  			$nav.go('');
  			$user.resetUser();
  		};
	}]);