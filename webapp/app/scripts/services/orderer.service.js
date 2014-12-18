'use strict';

angular.module('icmApp')
.service('OrdererService', ['$http', 'NavigationService',
	function($http, $nav){
		$http.defaults.headers.common["Accept"] = "application/json";
		$http.defaults.headers.common["Content-Type"] = "application/json";

		var endpoints = endpointsAPI.doc.order.from.client;
		this.getOrders = function(){
			var company = $nav.getViewingCompany();
			return $http.get(endpoints.default.get.url+'?empresa='+company.id);
		};

		this.getOrders = function(id){
			var company = $nav.getViewingCompany();
			return $http.get(endpoints.byID.get.url+id+'?empresa='+company.id);
		};

		this.sendOrder = function(order){
			var company = $nav.getViewingCompany();
			return $http.post(endpoints.default.post.url+'?empresa='+company.id, order);
		};

		this.sendOrderNext = function(supplierID, order){
			return $http.post(endpointsAPI.doc.order.to.supplier.default.post.url+'?empresa='+supplierID, order);
		};

		this.getProducts = function(company){
			var company = $nav.getViewingCompany();
			var url = endpointsAPI.products.default.get.url;
			return $http.get(url+'?empresa='+company);
		};

		this.getSuppliers = function(){
			var company = $nav.getViewingCompany();
			var url = endpointsAPI.suppliers.default.get.url;
			return $http.get(url+'?empresa='+company.id);
		};
	}
	]);
