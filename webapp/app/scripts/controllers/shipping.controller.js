'use strict';

angular.module('icmApp')
  .controller('ShippingCtrl', ['$scope', '$http', '$timeout', 'NavigationService', 'ShippingService', 'OrdererService', 'IOService',
    function controller($scope, $http, $timeout, $nav, $ship, $or, $io){

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

    //console.log($scope.order);
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
    
    (function init(){
        $or.getProducts($nav.getViewingCompany().id)
        .then(
            function onSuccess(result){
                $scope.products = result.data;
                console.log($scope.products);
                setStocks();
            },
            function onError(e){
                console.log(e);
            }
        );

    })();

    $scope.submitInvoice = function submitInvoice(){
    	// update on quantities is done with ng-model
        /*$or.sendInvoice($nav.getViewingCompany().id, $scope.order)
            .then(
                function onSuccess(result){
                    $or.sendInvoiceV($nav.getViewingCompany().id, $scope.order)
                        .then(
                            function onSuccess(result){
                                alert("Invoice Submitted Successfully");
                            },
                            function onError(e){
                                console.log(e);
                            }
                        );
                },
                function onError(e){
                    console.log(e);
                }
            );*/
        $io.addFatura($nav.getViewingCompany().id, $scope.order);
        var idcliente = $scope.order.Entidade;
        $scope.order.Entidade = $nav.getViewingCompany().id; 
        $io.addVFatura(idcliente, $scope.order);
    };
  }]);
