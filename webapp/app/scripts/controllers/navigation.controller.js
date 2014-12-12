'use strict';

angular.module('icmApp')
.controller('NavCtrl', ['$scope', '$interval', 'UserService', 'NavigationService', function controller($scope, $interval, $userS, $nav){
  $scope.loggedUser = $userS.getUser();

  $scope.company = $nav.getViewingCompany();

  $scope.logout = function logout() {
   $nav.go('');
   $userS.resetUser();
   $scope.loggedUser = $userS.getUser();
 };

 function update(){
   $scope.loggedUser = $userS.getUser();
   $scope.company = $nav.getViewingCompany();
 };

 $scope.isLoggedIn = function() {
  return $scope.isClient || $scope.isSupplier;
};

$scope.isClient = function() {
  return $scope.loggedUser.permission == "CLIENT";
};

$scope.isSupplier = function() {
  return $scope.loggedUser.permission == "SUPPLIER";
};

$interval(update, 1000);

}]);
