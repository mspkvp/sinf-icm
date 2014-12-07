'use strict';

angular.module('icmApp')
	.controller('SupplierCtrl', ['$scope', '$modal', 'NavigationService', 
		function($scope, $modal, $nav){
			$nav.setPath([
				$nav.getPath()[0],
				{
					name: 'Gerir',
					icon:'',
					url: '/'
				},
				{
					name: 'Fornecedor',
					icon: '',
					url: ''
				}
			]);
			$scope.ordersToProcess = [
				{
					code: '1',
					name: 'nome1',
					item: 'coisa',
					quantity: 6,
					pricepu: 10,
					date: new Date()
				},
				{
					code: '2',
					name: 'nome2',
					item: 'coisa',
					quantity: 6,
					pricepu: 11,
					date: new Date()
				},
				{
					code: '3',
					name: 'nome3',
					item: 'coisa',
					quantity: 6,
					pricepu: 4,
					date: new Date()
				},
				{
					code: '4',
					name: 'nome4',
					item: 'coisa',
					quantity: 6,
					pricepu: 23,
					date: new Date()
				}
			];

			$scope.orderHistory = [
				{
					code: '1',
					item: 'coisa',
					date: new Date(),
					end: new Date()
				},
				{
					code: '2',
					item: 'coisa',
					date: new Date(),
					end: new Date()
				},
				{
					code: '3',
					item: 'coisa',
					date: new Date(),
					end: new Date()
				},
				{
					code: '4',
					item: 'coisa',
					date: new Date(),
					end: new Date()
				}
			];


			$scope.clients = [
				{
					name:'cliente1'
				},
				{
					name:'cliente2'
				},
				{
					name:'cliente3'
				}
			];

			$scope.selectedClient = undefined;

			$scope.processOrder = function(order){
				$scope.orderModal = $modal.open({
					templateUrl: 'views/supplier-modal.html',
					scope: $scope
				});
				$scope.order = order;
				$scope.company = $nav.getViewingCompany();
				$scope.cancel = function(){
					$scope.orderModal.dismiss('cancel');
				};
			};

			$scope.emitInvoice = function(){
				$scope.orderModal.dismiss('cancel');
			};
		}
	]);