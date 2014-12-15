'use strict';

angular.module('icmApp')
.service('OrdererService', ['$http', 'NavigationService', 
	function($http, $nav){
		var endpoints = endpointsAPI.doc.order.from.client;
		this.getOrders = function(){
			var company = $nav.getViewingCompany();
			return $http.get(endpoints.default.get, {empresa: company.id});
		};

		this.getOrders = function(id){
			var company = $nav.getViewingCompany();
			return $http.get(endpoints.byID.get+id, {empresa: company.id});
		};

		this.sendOrder = function(order){
			var company = $nav.getViewingCompany();
			return $http.post(endpoints.default.post, order, {empresa: company.id});
		};
	
	}
]);