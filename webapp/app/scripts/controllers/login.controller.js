'use strict';

angular.module('icmApp')
  .controller('LoginCtrl', ['$scope', '$location', 'AuthService', 'UserService', 'NavigationService', function ($scope, $location, $auth, $user, $nav) {

  	$scope.loginData = {
  		username: '',
  		password: ''
  	};

  	$scope.login = function login () {
		$user.setUser({
            name: 'Mister Crowley',
            accessType: 'admin'
        });
       	$nav.go('');
  		/*
		$auth.login($scope.loginData.username, $scope.loginData.password).then(
			function onSuccess(userData){
				$user.setUser(userData);
				$location.path('/');
			},
			function onError(e){
				console.log("Failed Login", e);
			});
  		*/
  	};

  	$scope.showPassword = function showPassword() {

	    var keyAttr = $('#key').attr('type');

	    if(keyAttr !== 'text') {

	        $('.checkbox').addClass('show');
	        $('#key').attr('type', 'text');

	    } else {

	        $('.checkbox').removeClass('show');
	        $('#key').attr('type', 'password');

	    }

	};


  }]);
