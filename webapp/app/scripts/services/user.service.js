'use strict';

angular.module('icmApp')
    .service('UserService', [function service(){

    	var user = {
    		name: 'Mister Crowley',
    		access_type: 'admin'
    	};

    	this.getUser = function getUser(){
    		return user;
    	};

    	this.setUser = function setUser(user_set){
    		user = user_set;
    	};

    }]);