'use strict';

angular.module('icmApp')
    .service('UserService', [function service(){

    	var user = {
    		name: undefined,
    		access_type: undefined,
            login_status: false
    	};

    	this.getUser = function getUser(){
    		return user;
    	};

    	this.setUser = function setUser(user_set){
    		user.name = user_set.name;
            user.access_type = user_set.access_type;
            user.login_status = true;
    	};

        this.resetUser = function setUser(user_set){
            user = {
                name: undefined,
                access_type: undefined,
                login_status: false
            };
        };

        this.getLoginStatus = function getLoginStatus () {
            return user.login_status;
        };
    }]);