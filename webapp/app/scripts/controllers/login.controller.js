'use strict';

angular.module('icmApp')
  .controller('LoginCtrl', ['$scope', '$location', 'AuthService', 'UserService', 'NavigationService', function ($scope, $location, $auth, $user, $nav) {

  	$scope.login_data = {
  		username: '',
  		password: ''
  	};

  	$scope.login = function login () {
		$user.setUser({
            name: 'Mister Crowley',
            access_type: 'admin'
        });
       	$nav.go('');
  		/*
		$auth.login($scope.login_data.username, $scope.login_data.password).then(
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
    
	    var key_attr = $('#key').attr('type');
	    
	    if(key_attr !== 'text') {
	        
	        $('.checkbox').addClass('show');
	        $('#key').attr('type', 'text');
	        
	    } else {
	        
	        $('.checkbox').removeClass('show');
	        $('#key').attr('type', 'password');
	        
	    }
	    
	};

	
  }]);