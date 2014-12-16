'use strict';

angular.module('icmApp')
	.controller('CompaniesCtrl', ['$scope', '$http', 'NavigationService', function($scope, $http, $nav){

		/*$nav.setPath([
			$nav.getPath()[0],
			{
				name: 'Consultar',
				icon:'',
				url: '/'
			},
			{
				name: 'Empresas',
				icon: '',
				url: ''
			}
		]);*/
	/*	$http.defaults.useXDomain = true;
		$http.defaults.withCredentials = false;
		delete $http.defaults.headers.common["X-Requested-With"];*/
		$http.defaults.headers.common["Accept"] = "application/json";
		$http.defaults.headers.common["Content-Type"] = "application/json";

		$scope.companies = [
			{
				"id" : "EMP1",
				"name" : "FOObin"
			},
			{
				"id" : "EMP2",
				"name" : "PixFlag"
			},
			{
				"id" : "EMP3",
				"name" : "SINFTech"
			},
			{
				"id" : "EMP4",
				"name" : "botNET"
			},
			{
				"id" : "EMP4",
				"name" : "Bragaboard"
			},
		];

		$scope.selectedCompany = {};
		$scope.viewCompanyModal = false;

		this.getCompanies = function getCompanies(){
			$http(angular.extend({}, endpointsAPI.companies, { data: {} }))
				.then(
					function onSuccess(data){
						$scope.companies = data.companies;
					},
					function onError(e){
						console.log(e);
					});
		};

		$scope.goCompany = function goCompany(company){
			$nav.setViewingCompany(company);
		};
	}])
	.config(function($httpProvider){
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
		$httpProvider.defaults.headers.common['Access-Control-Allow-Headers']
	});
