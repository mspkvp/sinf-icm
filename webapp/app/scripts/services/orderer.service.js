'use strict';

angular.module('icmApp')
.service('OrdererService', ['$http', 'NavigationService',
	function ($http, $nav) {

		var endpoints = endpointsAPI.doc.order.from.client;
		this.getOrders = function (comp) {
			var company;
			if(comp === undefined || comp == "") company = $nav.getViewingCompany().id;
			else company = comp;
			return $http.get(endpointsAPI.doc.order.to.supplier.default.get.url + '?empresa=' + company);
		};

		this.getOrderSupplier = function(){
			var company = $nav.getViewingCompany();
			return $http.get(endpointsAPI.doc.order.from.client.default.get.url + '?empresa=' + company.id);
		};

		this.getOrdersByID = function (id) {
			var company = $nav.getViewingCompany();
			return $http.get(endpoints.byID.get.url + id + '?empresa=' + company.id);
		};

		this.sendOrder = function (supplierID, order) {
			return $http.post(endpoints.default.post.url + '?empresa=' + supplierID, order);
		};

		this.sendOrderNext = function (order) {
			var company = $nav.getViewingCompany();
			return $http.post(endpointsAPI.doc.order.to.supplier.default.post.url + '?empresa=' + company.id, order);
		};


		this.getProducts = function(company){
			var url = endpointsAPI.products.default.get.url;
			return $http.get(url+'?empresa=' + company);
		};

		this.getClients = function(company){
			var url = endpointsAPI.clients.default.get.url;
			return $http.get(url+'?empresa=' + company);
		};

		this.addProduct = function(company, product) {
			var url = endpointsAPI.products.default.post.url;
			console.log("COMPANY = " + company, " VIEWING = " + $nav.viewingCompany);
			return $http.post(url+"?empresa="+company,product);
		};

		this.getSuppliers = function(company){
			var url = endpointsAPI.suppliers.default.get.url;
			return $http.get(url+'?empresa='+company);
		};

		this.sendSupplier = function(company, newSupplier){
			var url = endpointsAPI.suppliers.default.post.url;
			return $http.post(url+'?empresa='+company, newSupplier);
		};

		this.sendClient = function(company, newClient){
			var url = endpointsAPI.clients.default.post.url;
			return $http.post(url+'?empresa='+company, newClient);
		};

		this.getInvoices = function(company){
			var url = endpointsAPI.doc.invoice.default.get.url;
			return $http.get(url+'?empresa='+company);
		};

		this.getInvoicesV = function(company){
			var url = endpointsAPI.doc.invoiceV.default.get.url;
			return $http.get(url+'?empresa='+company);
		};

		this.sendInvoice = function(company, invoice){
			var url = endpointsAPI.doc.invoice.default.post.url;
			return $http.post(url+'?empresa='+company, invoice);
		};

		this.sendInvoiceV = function(company, invoice){
			var url = endpointsAPI.doc.invoiceV.default.post.url;
			return $http.post(url+'?empresa='+company, invoice);
		};
	}
	]);
