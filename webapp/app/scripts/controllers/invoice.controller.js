'use strict';

angular.module('icmApp')
	.controller('InvoiceCtrl', ['$scope', '$http', function($scope, $http){
	
		$scope.orders = [
			{
				code : '1',
				desc : 'artigo1',
				date : new Date()
			},
			{
				code : '2',
				desc : 'artigo2',
				date : new Date()
			},
			{
				code : '3',
				desc : 'artigo3',
				date : new Date()
			}
		];
		
		$scope.invoices = [
			{
				code : '1',
				desc : 'artigo1',
				date : new Date()
			},
			{
				code : '2',
				desc : 'artigo2',
				date : new Date()
			},
			{
				code : '3',
				desc : 'artigo3',
				date : new Date()
			}
		];
		
	}
	
]);