'use strict';

angular.module('icmApp')
  .controller('CompaniesCtrl', ['$scope', '$http', 'NavigationService', '$interval', 'UserService', function controller($scope, $http, $nav, $interval, $userS) {
    if (!$userS.getLoginStatus()) {
      alert("Please login first!");
      $nav.setRedirection('login');
      $nav.go('login');
      return;
    }

    $nav.setPath([
      $nav.getPath()[0],
      {
        name: 'Escolher',
        icon: '',
        url: ''
      },
      {
        name: 'Empresa',
        icon: '',
        url: ''
      }
    ]);
    /*	$http.defaults.useXDomain = true;
     $http.defaults.withCredentials = false;
     delete $http.defaults.headers.common["X-Requested-With"];*/
    $http.defaults.headers.common["Accept"] = "application/json";
    $http.defaults.headers.common["Content-Type"] = "application/json";

    $scope.selectedCompany = {};
    $scope.viewCompanyModal = false;

    this.getCompanies = function () {
      $scope.companies = $nav.getCompanies();
      if ($scope.companies != undefined) {
        $nav.setLoading(false);
      }
      /*$http(angular.extend({}, endpointsAPI.companies, { data: {} }))
       .then(
       function onSuccess(data){
       $scope.companies = data.companies;
       },
       function onError(e){
       console.log(e);
       });*/
    };

    $scope.goCompany = function goCompany(company) {
      $nav.setViewingCompany(company);
      if ($userS.isClient()) {
        $nav.setRedirection('client');
      } else {
        $nav.setRedirection('supplier');
      }
      $nav.redirect();
    };

    $nav.setLoading(true);

    $interval(this.getCompanies, 1000);
  }])
  .config(function ($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common['Access-Control-Allow-Headers']
  });
