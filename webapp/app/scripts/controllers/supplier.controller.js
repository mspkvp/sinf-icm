'use strict';

angular.module('icmApp')
	.controller('SupplierCtrl', ['$scope', 'NavigationService', 
		function($scope, $nav){
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
					item: 'coisa',
					date: new Date()
				},
				{
					code: '2',
					item: 'coisa',
					date: new Date()
				},
				{
					code: '3',
					item: 'coisa',
					date: new Date()
				},
				{
					code: '4',
					item: 'coisa',
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

		}
	]);