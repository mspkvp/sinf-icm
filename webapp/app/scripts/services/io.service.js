'use strict';

angular.module('icmApp')
.service('IOService', [ '$q','$http', 'LS', 'NavigationService',
	function service($q, $http, $storage, $nav){

		$http.defaults.headers.common["Accept"] = "application/json";
		$http.defaults.headers.common["Content-Type"] = "application/json";

		var data = undefined;

		this.get = function(){
			data = $storage.getData();

			if(!data){
				data = [];
				var companies = $nav.getCompanies();

				for(var i=0; i<companies.length; i++){
					data.push({
						id: companies[i],
						docCounter: 0,
						encomendaDeCliente: [],
						encomendaAFornecedor: [],
						fatura: [],
						vFatura: []
					});
				}

				$storage.setData(data);
			}

			return data;
		};

		this.save = function(object){
			return $storage.setData(object);
		};

		this.incNewDoc = function(id){
			var count = 0;
			data = $storage.getData();

			for(var i=0; i<companies.length; i++){
				if( data[i].id === id){
					count = ++data[i].docCounter;
					break;
				}
			}

			$storage.setData(data);
			return count;
		};

		this.addEncomendaDeCliente = function(id, doc){
			data = $storage.getData();

			for(var i=0; i<companies.length; i++){
				if( data[i].id === id){
					data[i].encomendaDeCliente.push(doc);
					break;
				}
			}

			$storage.setData(data);
		};

		this.getEncomendaDeCliente = function(id){
			data = $storage.getData();

			for(var i=0; i<companies.length; i++){
				if( data[i].id === id){
					return data[i].encomendaDeCliente;
				}
			}
		};

		this.addEncomendaAFornecedor = function(id, doc){
			data = $storage.getData();

			for(var i=0; i<companies.length; i++){
				if( data[i].id === id){
					data[i].encomendaAFornecedor.push(doc);
					break;
				}
			}

			$storage.setData(data);
		};

		this.getEncomendaAFornecedor = function(id){
			data = $storage.getData();

			for(var i=0; i<companies.length; i++){
				if( data[i].id === id){
					return data[i].encomendaAFornecedor;
				}
			}
		};

		this.addFatura = function(id, doc){
			data = $storage.getData();

			for(var i=0; i<companies.length; i++){
				if( data[i].id === id){
					data[i].fatura.push(doc);
					break;
				}
			}

			$storage.setData(data);
		};

		this.getFatura = function(id){
			data = $storage.getData();

			for(var i=0; i<companies.length; i++){
				if( data[i].id === id){
					return data[i].fatura;
				}
			}
		};

		this.addVFatura = function(id, doc){
			data = $storage.getData();

			for(var i=0; i<companies.length; i++){
				if( data[i].id === id){
					data[i].vFatura.push(doc);
					break;
				}
			}

			$storage.setData(data);
		};

		this.getVFatura = function(id){
			data = $storage.getData();

			for(var i=0; i<companies.length; i++){
				if( data[i].id === id){
					return data[i].vFatura;
				}
			}
		};
	}
]);