'use strict';

angular.module('icmApp')
.controller('NavCtrl', ['$scope', '$interval', 'UserService', 'NavigationService', function controller($scope, $interval, $userS, $nav){
  $scope.loggedUser = $userS.getUser();

  $scope.company = $nav.getViewingCompany();

  $scope.logout = function() {
   $nav.go('');
   $userS.resetUser();
   $scope.loggedUser = $userS.getUser();
 };

 function update(){
   $scope.loggedUser = $userS.getUser();
   $scope.company = $nav.getViewingCompany();
 };

 $scope.isLoggedIn = function() {
  return $userS.getLoginStatus();
};

$scope.isClient = function() {
  return $userS.isClient() && $nav.getViewingCompany() != undefined;
};

$scope.isSupplier = function() {
  return $userS.isSupplier() && $nav.getViewingCompany() != undefined;
};

$interval(update, 1000);

}]);
