'use strict';

angular.module('icmApp')
  .service('UserService', [function service() {

    var user = {
      username: undefined,
      permission: undefined,
      loginStatus: true
    };

    this.getUser = function getUser() {
      return user;
    };

    this.setUser = function setUser(userSet) {
      user.username = userSet.username;
      user.permission = userSet.permission;
      user.loginStatus = true;
    };

    this.resetUser = function setUser(userSet) {
      user = {
        username: undefined,
        permission: undefined,
        loginStatus: false
      };
    };

    this.getLoginStatus = function getLoginStatus() {
      return user.loginStatus;
    };

    this.isClient = function () {
      return user.permission == 'CLIENT';
    };

    this.isSupplier = function () {
      return user.permission == 'SUPPLIER';
    };
  }]);
