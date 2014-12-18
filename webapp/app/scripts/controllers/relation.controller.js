'use strict';

angular.module('icmApp')
	.config(['$httpProvider',function($httpProvider){
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	}])
	.controller('RelationCtrl', ['$scope', '$http' ,'NavigationService','OrdererService', function($scope, $http,$nav, $ord){


		$nav.setPath([
			$nav.getPath()[0],
			{
				name: 'Gestão',
				icon:'',
				url: '/'
			},
			{
				name: 'Empresas',
				icon: '',
				url: ''
			}
		]);

		$scope.companies = $nav.getCompanies();
		$scope.supplier;
		$scope.supplierID;
		$scope.client;
		$scope.clientID;
		$scope.suppliersClients = []; //The supplier's clients
		$scope.clientsSuppliers = []; //The client's suppliers
		$scope.fullClient;//JSON client
		$scope.fullSupplier;//JSON supplier

		$scope.selectedSupplier = function(){
			for(var key in $scope.companies){
				if($scope.companies.hasOwnProperty(key)){
					if($scope.companies[key].name == $scope.supplier){
						$scope.supplierID = $scope.companies[key].id;
						$scope.fullSupplier = $scope.companies[key];
						break;
					}
				}
			}
			$http.get('http://localhost:49209/api/Clientes?empresa=' + $scope.supplierID).
				success(function(data, status, headers, config){
					$scope.suppliersClients = data;
				});

		}

		$scope.selectedClient = function(){
			for(var key in $scope.companies){
				if($scope.companies.hasOwnProperty(key)){
					if($scope.companies[key].name == $scope.client){
						$scope.clientID = $scope.companies[key].id;
						$scope.fullClient = $scope.companies[key];
						break;
					}
				}
			}

			$http.get('http://localhost:49209/api/Fornecedores?empresa=' + $scope.clientID).
				success(function(data, status, headers, config){
					$scope.clientsSuppliers = data;
				});
		}

		$scope.alreadyConnected = function(){
			if($scope.suppliersClients.length == 0 || $scope.clientsSuppliers.length == 0 || $scope.clientID == $scope.supplierID) {
				return true;
			}
			var disabled = false;

			for(var i = 0; i < $scope.suppliersClients.length; i++){
				if($scope.suppliersClients[i].CodCliente == $scope.clientID) {
					disabled = true;
				}
			}
			for(var i = 0; i < $scope.clientsSuppliers.length; i++){
				if($scope.clientsSuppliers[i].CodFornecedor == $scope.supplierID) {
					disabled = true;
				}
			}

			return disabled;
		}

		$scope.submit = function(){
			var tmpClient = $scope.fullClient;
			var tmpSupplier = $scope.fullSupplier;
			delete tmpClient['$$hashKey'];
			delete tmpSupplier['$$hashKey'];
			tmpClient['Moeda'] = "EUR";
			tmpSupplier['Moeda'] = "EUR";
			tmpSupplier['CodFornecedor'] = $scope.fullSupplier['id'];
			tmpSupplier['NomeFornecedor'] = $scope.fullSupplier['name'];
			tmpClient['CodCliente'] = $scope.fullClient['id'];
			tmpClient['NomeCliente'] = $scope.fullClient['name'];
			delete tmpSupplier['id'];
			delete tmpSupplier['name'];
			delete tmpClient['id'];
			delete tmpClient['name'];
			console.log("SUPPLIER = " + JSON.stringify(tmpSupplier));
			console.log("CLIENT = " + JSON.stringify(tmpClient));

			$ord.sendSupplier($scope.clientID, tmpSupplier).
				success(function(data, status, headers, config){
					$ord.sendClient($scope.supplierID, tmpClient).
					success(function(data, status, headers, config){
						console.log("SYNC MADE");
					});
				});
		}

	}]);
