'use strict';

angular.module('icmApp')
  .controller('LoginCtrl', ['$scope', '$location', function ($scope, $location) {

  	$scope.login_data = {
  		username: '',
  		password: ''
  	}

  	$scope.login = function login () {
  		$location.path('/');
  	};

  	this.showPassword = function showPassword() {
    
	    var key_attr = $('#key').attr('type');
	    
	    if(key_attr != 'text') {
	        
	        $('.checkbox').addClass('show');
	        $('#key').attr('type', 'text');
	        
	    } else {
	        
	        $('.checkbox').removeClass('show');
	        $('#key').attr('type', 'password');
	        
	    }
	    
	};

	
  }]);