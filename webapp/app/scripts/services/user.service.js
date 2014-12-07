'use strict';

angular.module('icmApp')
    .service('UserService', [function service(){

    	var user = {
    		name: undefined,
    		accessType: undefined,
            loginStatus: false
    	};

    	this.getUser = function getUser(){
    		return user;
    	};

    	this.setUser = function setUser(userSet){
    		user.name = userSet.name;
            user.accessType = userSet.accessType;
            user.loginStatus = true;
    	};

        this.resetUser = function setUser(userSet){
            user = {
                name: undefined,
                accessType: undefined,
                loginStatus: false
            };
        };

        this.getLoginStatus = function getLoginStatus () {
            return user.loginStatus;
        };
    }]);
