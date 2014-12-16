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
				id: 1,
				name: 'Empresa 1',
			},
			{
				id: 2,
				name: 'Empresa 2',
			},
			{
				id: 3,
				name: 'Empresa 3',
			},
			{
				id: 4,
				name: 'Empresa 4',
			},
			{
				id: 5,
				name: 'Empresa 5',
			},
			{
				id: 6,
				name: 'Empresa 6',
			}
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
			$http.get('http://localhost:49209/api/Fornecedores?empresa=EMP1').
				success(function(data, status, headers, config){
					alert("CONSEGEUI CARALHO = " + data);
				}).
				error(function(data, status, headers, config){
					alert("ERRO CARALHO " + data + " " + status + " --" + headers() + " --" + config);
					console.log(headers());
					console.log(config);
				});
		};
	}])
	.config(function($httpProvider){
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
		$httpProvider.defaults.headers.common['Access-Control-Allow-Headers']
	});
