'use strict';

angular.module('icmApp')
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }])
  .controller('RelationCtrl', ['$scope', '$http', 'NavigationService', 'OrdererService', 'UserService',
    function ($scope, $http, $nav, $ord, $userS) {
    if (!$userS.getLoginStatus()) {
      alert("Please login first!");
      $nav.setRedirection('login');
      $nav.go('login');
      return;
    }

		$nav.setPath([
			$nav.getPath()[0],
			{
				name: 'Sincronizar',
				icon:'',
				url: '/'
			},
			{
				name: 'Terceiros',
				icon: '',
				url: '/relation'
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
		$scope.relationSuccess="";
		$scope.relationError="";
		$scope.addedRelation = false;

		$scope.selectedSupplier = function(){
			$scope.addedRelation = false;
			for(var key in $scope.companies){
				if($scope.companies.hasOwnProperty(key)){
					if($scope.companies[key].name == $scope.supplier){
						$scope.supplierID = $scope.companies[key].id;
						$scope.fullSupplier = $scope.companies[key];
						break;
					}
				}
			}
			$ord.getClients($scope.supplierID).
				success(function(data, status, headers, config){
					$scope.suppliersClients = data;
				});
			};



		$scope.selectedClient = function(){
			$scope.addedRelation = false;
			for(var key in $scope.companies){
				if($scope.companies.hasOwnProperty(key)){
					if($scope.companies[key].name == $scope.client){
						$scope.clientID = $scope.companies[key].id;
						$scope.fullClient = $scope.companies[key];
						break;
					}
				}
			}

			$ord.getSuppliers($scope.clientID).
				success(function(data, status, headers, config){
					$scope.clientsSuppliers = data;
				});
		};

		$scope.alreadyConnected = function(){
			$scope.relationSuccess="";
			$scope.relationError="";
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

			if(disabled == true){
				$scope.relationError = "Já existe esta relação cliente->fornecedor";
			}

			return disabled;
		};

		$scope.submit = function(){
			$scope.addedRelation = false;
			$scope.relationError = "";
			$scope.relationSuccess = "";
			var tmpClient = jQuery.extend({}, $scope.fullClient);
			var tmpSupplier = jQuery.extend({}, $scope.fullSupplier);
			//delete tmpClient['$$hashKey'];
			//delete tmpSupplier['$$hashKey'];
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

			$nav.setLoading(true);
			$ord.sendSupplier($scope.clientID, tmpSupplier).
				success(function(data, status, headers, config){
					$ord.sendClient($scope.supplierID, tmpClient).
					success(function(data, status, headers, config){
						$scope.relationSuccess = "Relação adicionada com successo";
						$nav.setLoading(false);
						$scope.addedRelation = true;
					});
				});
		}

	}]);
