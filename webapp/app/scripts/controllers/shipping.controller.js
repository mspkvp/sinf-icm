'use strict';

angular.module('icmApp')
  .controller('ShippingCtrl', ['$scope', '$http', '$timeout', 'NavigationService', 'ShippingService', 'OrdererService', 'IOService', 'UserService',
    function controller($scope, $http, $timeout, $nav, $ship, $or, $io, $userS){

    if (!$userS.getLoginStatus()) {
        alert("Please login first!");
        $nav.setRedirection('client');
        $nav.go('login');
        return;
    }

    $scope.priceChanged = false;
    $scope.quantityChanged = false;

    $scope.changedPrice = function(product) {
      if(!$scope.priceChanged) {
        alert("Editou o preço que o cliente espera pagar. Por favor contacte o mesmo para acordar estas alterações");
        $scope.priceChanged = true;
      }
      calculatePrices(product);
    }

    $scope.changedQuantity = function(product) {
      if(!$scope.quantityChanged) {
        alert("Editou a quantidade que o cliente espera receber. Por favor contacte o mesmo para acordar estas alterações");
        $scope.quantityChanged = true;
      }
      calculatePrices(product);
    }

    $scope.changedTax = function(product){
      calculatePrices(product);
    }

    $scope.company = $nav.getViewingCompany();
    $scope.order = $ship.getOrder();
    if(!$scope.order)
    	$nav.go('supplier');
    $scope.products = [];

    //console.log($scope.order);
    $scope.stocks = [];

    $scope.getStock = function(index){
    	return $scope.stocks[index];
    }

    function calculatePrices(product){
      product.TotalILiquido = product.PrecoUnitario * product.newQuantity;
      product.TotalLiquido = product.TotalILiquido * (1 + product.Taxa / 100);

      product.TotalILiquido = Math.round(parseFloat(product.TotalILiquido) * 100) / 100
      product.TotalLiquido = Math.round(parseFloat(product.TotalLiquido) * 100) / 100
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
      $nav.setLoading(true);
      var total = 0;
      delete $scope.order.NumDocExt;
      delete $scope.order['$$hashKey'];
      for(var i = 0; i < $scope.order.LinhasDoc.length; i++){
        delete $scope.order.LinhasDoc[i].Taxa;
        $scope.order.LinhasDoc[i].Quantidade = $scope.order.LinhasDoc[i].newQuantity;
        delete $scope.order.LinhasDoc[i].newQuantity;
        total += $scope.order.LinhasDoc[i].TotalLiquido;
      }
        $scope.order.TotalMerc = total;
        $io.get();
        var tmpCompanies = $nav.getCompanies();
        for(var i = 0; i < tmpCompanies.length; i++){
          if($scope.order.Entidade == tmpCompanies[i].name){
            $scope.order.Entidade = tmpCompanies[i].id;
            break;
          }
        }
        var numDoc = $io.incNewDoc($nav.getViewingCompany().id);
        $scope.order.DocsOriginais = $scope.order.NumDoc;
        $scope.order.NumDoc = numDoc;
        console.log("BEFORE, ORDER = " + JSON.stringify($scope.order));
        $or.sendInvoice($nav.getViewingCompany().id, $scope.order)
            .then(
                function onSuccess(result){
                    var idCliente = $scope.order.Entidade;
                    $scope.order.Entidade = $nav.getViewingCompany().id;
                    var orders = $or.getOrders(idCliente)
                      .then(
                        function onSuccess(result){
                          console.log("Got Orders");
                          var docOriginal;
                          for(var i = 0; i < result.data.length; i++){
                            if(result.data[i].NumDocExt == $scope.order.NumDoc){
                              docOriginal = result.data[i].NumDoc;
                              break;
                            }
                          }
                          $scope.order.NumDocExterno = $scope.order.NumDoc;
                          numDoc = $io.incNewDoc(idCliente);
                          $scope.order.DocsOriginais = docOriginal;
                          console.log("BEFORE SEND INVOICE, ORDER = " + JSON.stringify($scope.order));
                          $or.sendInvoiceV(idCliente, $scope.order)
                          .then(
                            function onSuccess(result){
                              console.log("Invoice Submitted Successfully");
                              $nav.setLoading(false);
                            },
                            function onError(e){
                              console.log(e);
                              $nav.setLoading(false);
                            }
                          );
                        },
                        function onError(e){
                          console.log(e);
                          $nav.setLoading(false);
                        }
                      );

                },
                function onError(e){
                    console.log(e);
                    $nav.setLoading(false);
                }
            );
        /*$io.addFatura($nav.getViewingCompany().id, $scope.order);
        var idcliente = $scope.order.Entidade;
        $scope.order.Entidade = $nav.getViewingCompany().id;
        $io.addVFatura(idcliente, $scope.order);*/
    };

  }]);
