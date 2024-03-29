    'use strict';

/**
 * @ngdoc overview
 * @name icmApp
 * @description
 * # icmApp
 *
 * Main module of the application.
 */
angular
  .module('icmApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(['$httpProvider', '$routeProvider', function ($httpProvider, $routeProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.post['Accept'] = 'application/json';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.common['Accept'] = 'application/json';
    $routeProvider
      .when('/', {
        templateUrl: 'views/landing.html',
        abstract: true,
        controller: 'LandingCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/companies', {
        templateUrl: 'views/companies.html',
        controller: 'CompaniesCtrl'
      })
      .when('/relation',{
        templateUrl: 'views/relation.html',
        controller: 'RelationCtrl'
      })
      .when('/sync',{
        templateUrl:'views/sync.html',
        controller:'SyncCtrl'
      })
      .when('/client', {
        templateUrl: 'views/orderer.html',
        controller: 'OrdererCtrl'
      })
      .when('/supplier', {
        templateUrl: 'views/supplier.html',
        controller: 'SupplierCtrl'
      })
      .when('/invoice', {
        templateUrl: 'views/invoice.html',
        controller: 'InvoiceCtrl'
      })
      .when('/shipping', {
        templateUrl: 'views/shipping.html',
        controller: 'ShippingCtrl'
      })
      .otherwise({
        templateUrl:'404.html'
      });
  }]);
