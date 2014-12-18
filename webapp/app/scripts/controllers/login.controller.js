'use strict';

angular.module('icmApp')
  .controller('LoginCtrl', ['$scope', '$location', 'AuthService', 'UserService', 'NavigationService', function ($scope, $location, $auth, $user, $nav) {

    $scope.loginData = {
      username: '',
      password: ''
    };

    $scope.loginState = "";
    $scope.login = function login() {
      $auth.login($scope.loginData.username, $scope.loginData.password).then(
        function onSuccess(userData) {
          $user.setUser(userData);
          $location.path('/companies');
        },
        function onError(e) {
          if (e.message === "err1") {
            $scope.loginState = "Invalid username or password";
            $scope.loginData.password = '';
          }
          else {
            $scope.loginState = "Error accessing users' database";
            $scope.loginData.password = '';
          }
        });
    };

    $scope.showPassword = function showPassword() {

      var keyAttr = $('#key').attr('type');

      if (keyAttr !== 'text') {

        $('.checkbox').addClass('show');
        $('#key').attr('type', 'text');

      } else {

        $('.checkbox').removeClass('show');
        $('#key').attr('type', 'password');

      }

    };


  }]);
