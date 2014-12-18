'use strict';

angular.module('icmApp')
.service('AuthService', ['$http', 'NavigationService', function($http, $nav){
	this.login = function login(user, password){
		return $http.get('/database/users.json').then(
			function onSuccess(result) {
				var registeredUser = null;
				result.data.forEach(function(regUser) {
					if (regUser.username === user && regUser.password === password) {
						registeredUser = regUser;
					}
				});
				if (registeredUser != null) {
					return registeredUser
				} else {
					throw new Error("err1");
				}
			},
			function onError(e) {
				throw new Error("err2");
			});
	};
}]);