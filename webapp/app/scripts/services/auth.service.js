'use strict';

angular.module('icmApp')
	.service('AuthService', ['$http', function($http){
		this.login = function login(user, password){
			return $http(angular.extend({}, endpointsAPI.login,{
				data: {
					username: user,
					password: password
				}
			}));
		};
	}]);