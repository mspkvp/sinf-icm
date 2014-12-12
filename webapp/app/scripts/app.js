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
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        abstract: true,
        controller: 'LoginCtrl'
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
      .when('/newOrder', {
        templateUrl: 'views/newOrder.html'
      })
      .when('/supplier', {
        templateUrl: 'views/supplier.html',
        controller: 'SupplierCtrl'
      })
      .when('/invoice', {
        templateUrl: 'views/invoice.html',
        controller: 'InvoiceCtrl'
      })
      .otherwise({
        templateUrl:'404.html'
      });
  });
