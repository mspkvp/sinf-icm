'use strict';

angular.module('icmApp')
	.controller('LandingCtrl', ['$scope', 'NavigationService', function controller($scope, $nav){
		$nav.resetPath();
	}]);