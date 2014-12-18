'use strict';

angular.module('icmApp')
  .controller('ShippingCtrl', ['$scope', '$http', '$timeout', 'NavigationService', 'ShippingService', 'OrdererService', function controller($scope, $http, $timeout, $nav, $ship, $or){

    $scope.company = $nav.getViewingCompany();
    $scope.order = $ship.getOrder();
    if(!$scope.order)
    	$nav.go('supplier');
    $scope.products = [
	    {
	    	CodArtigo: "sample string 1",
	    	DescArtigo: "sample string 2",
	    	Stock: 3,
	    	PVP: 4.1
	  	},
	  	{
	    	CodArtigo: "sample string 1",
	    	DescArtigo: "sample string 2",
	    	Stock: 2,
	    	PVP: 4.1
	  	},
	  	{
	    	CodArtigo: "sample string 1",
	    	DescArtigo: "sample string 2",
	    	Stock: 6,
	    	PVP: 4.1
	  	}];


    /* GET PRODUCTS
    $or.getProducts($nav.getViewingCompany().id).then(
		function onSuccess(result){
			$scope.products = result.data;
			console.log($scope.products);
		},
		function onError(e){
			console.log(e);
		)
    );*/

    console.log($scope.order);
    $scope.stocks = [];

    $scope.getStock = function(index){
    	return $scope.stocks[index];
    }

    function setStocks(){
    	for(var i=0; i<$scope.order.LinhasDoc.length; i++){
    		for(var j=0; j<$scope.products.length; j++){
    			if($scope.products[j].CodArtigo === $scope.order.LinhasDoc[i].CodArtigo){
    				$scope.stocks.push($scope.products[j].Stock);
    				break;
    			}
    		}
    	}
    };
    setStocks();
    
    (function init(){

    })();

    $scope.submitInvoice = function submitInvoice(){
    	
    };
  }]);
