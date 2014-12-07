'use strict';

angular.module('icmApp')
	.controller('NavCtrl', ['$scope', '$interval', 'UserService', 'NavigationService', function controller($scope, $interval, $userS, $nav){
		$scope.loggedUser = $userS.getUser();

		$scope.company = $nav.getViewingCompany();

		$scope.logout = function logout() {
  			$nav.go('');
  			$userS.resetUser();
  			$scope.loggedUser = $userS.getUser();
  		};

  		function update(){
  			$scope.loggedUser = $userS.getUser();
			$scope.company = $nav.getViewingCompany();
  		}

  		$interval(update, 1000);

	}]);
