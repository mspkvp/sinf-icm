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
      .otherwise({
        redirectTo: '/'
      });
  });
