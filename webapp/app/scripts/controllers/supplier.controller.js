'use strict';

angular.module('icmApp')
  .controller('SupplierCtrl', ['$scope', '$modal', 'NavigationService', 'ShippingService', 'OrdererService', 'IOService',
    function ($scope, $modal, $nav, $ship, $orderS, $io) {
      $nav.setPath([
        $nav.getPath()[0],
        {
          name: 'Gerir',
          icon: '',
          url: '/'
        },
        {
          name: 'Fornecedor',
          icon: '',
          url: ''
        }
      ]);

      $scope.ordersToProcess = [];

      $scope.orderHistory = [];

      (function _init(){
        var orders = [],
          invoices = [];
          //$scope.ordersToProcess = [];
          //$scope.orderHistory = [];
        function sortOrders(){
          var k=0;
          while(orders.length > 0){
            if(k === orders.length ){
              $scope.ordersToProcess = $scope.ordersToProcess.concat(orders);
              break;
            };

            for(var i=0; i<invoices.length; i++){
              if(orders[k].NumDoc === invoices[i].DocsOriginais){ // is history
                $scope.orderHistory.push(orders[k]);
                orders.splice(k, 1);
                k=0;
              }
            };
            k++;
          };
        };

        $orderS.getInvoices($nav.getViewingCompany().id)
          .then(
            function onSuccess(result){
              var tmpCompanies = $nav.getCompanies();
              invoices = result.data;
              for(var i = 0; i < invoices.length; i++){
                for(var j = 0; j < tmpCompanies.length; j++){
                  if(invoices[i].Entidade == tmpCompanies[j].id){
                    invoices[i].Entidade = tmpCompanies[j].name;
                  }
                }
              }
              $orderS.getOrderSupplier()
                .then(
                  function onSuccess(resOrders){
                    orders = resOrders.data;
                    for(var i = 0; i < orders.length; i++){
                      for(var j = 0; j < tmpCompanies.length; j++){
                        if(orders[i].Entidade == tmpCompanies[j].id){
                          orders[i].Entidade = tmpCompanies[j].name;
                        }
                      }
                    }
                    sortOrders();
                    loadOrdersToProcessCompanies();
                    loadOrdersProcessedCompaniesH();
                  },
                  function onError(e){
                    console.log(e);
                  });
            },
            function onError(e){
              console.log(e);
            });
        /*
        $io.get();
        invoices = $io.getFatura($nav.getViewingCompany().id);
        orders = $io.getEncomendaDeCliente($nav.getViewingCompany().id);
        sortOrders();
        loadOrdersToProcessCompanies();
        loadOrdersProcessedCompaniesH();*/
      })();

      function loadOrdersToProcessCompanies() {
        $scope.ordersToProcessClients = [];
        $scope.ordersToProcess.forEach(function (element, index, array) {
          if ($scope.ordersToProcessClients.indexOf(element.Entidade) == -1) {
            $scope.ordersToProcessClients.push(element.Entidade);
          }
        });
      };

      function loadOrdersProcessedCompaniesH() {
        $scope.orderHistorySuppliers = [];
        $scope.orderHistory.forEach(function (element, index, array) {
          if ($scope.orderHistorySuppliers.indexOf(element.Entidade) == -1) {
            $scope.orderHistorySuppliers.push(element.Entidade);
          }
        });
      };

      $scope.processOrder = function (order) {
        $ship.setOrder(order);
        $nav.go('shipping');
      };

      $scope.emitInvoice = function () {
        $scope.orderModal.dismiss('cancel');
      };

      $scope.showOrderModal = function(orderSelected){
        $scope.orderSelected = orderSelected;
        $scope.modalInstance = $modal.open({
          templateUrl: 'views/order-invoice-view.html',
          controller: orderModalCtrl,
          size: 'lg',
          scope: $scope
        });
      };

      function orderModalCtrl(){
        $scope.close = function(){
          $scope.modalInstance.close();
        };

        $scope.selectedInvoice = $scope.orderSelected.invoice;
      }
    }
  ]);
