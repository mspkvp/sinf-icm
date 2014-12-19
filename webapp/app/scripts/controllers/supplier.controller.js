'use strict';

angular.module('icmApp')
  .controller('SupplierCtrl', ['$scope', '$modal', 'NavigationService', 'ShippingService', 'OrdererService',
    function ($scope, $modal, $nav, $ship, $orderS) {
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

      $scope.ordersToProcess = [
        {
          "id": "sample string 1",
          "Entidade": "sample string 1",
          "NumDoc": 3,
          "NumDocExterno": "sample string 4",
          "Data": "2014-12-12T10:06:16.9440679+00:00",
          "TotalMerc": 6.1,
          "Serie": "sample string 7",
          "LinhasDoc": [
            {
              "CodArtigo": "sample string 1",
              "DescArtigo": "sample string 2",
              "IdCabecDoc": "sample string 3",
              "NumLinha": 4,
              "Quantidade": 5.1,
              "Unidade": "sample string 6",
              "Desconto": 7.1,
              "PrecoUnitario": 8.1,
              "TotalILiquido": 9.1,
              "TotalLiquido": 10.1
            },
            {
              "CodArtigo": "sample string 1",
              "DescArtigo": "sample string 2",
              "IdCabecDoc": "sample string 3",
              "NumLinha": 4,
              "Quantidade": 5.1,
              "Unidade": "sample string 6",
              "Desconto": 7.1,
              "PrecoUnitario": 8.1,
              "TotalILiquido": 9.1,
              "TotalLiquido": 10.1
            },
            {
              "CodArtigo": "sample string 1",
              "DescArtigo": "sample string 2",
              "IdCabecDoc": "sample string 3",
              "NumLinha": 4,
              "Quantidade": 5.1,
              "Unidade": "sample string 6",
              "Desconto": 7.1,
              "PrecoUnitario": 8.1,
              "TotalILiquido": 9.1,
              "TotalLiquido": 10.1
            }
          ]
        },
        {
          "id": "sample string 1",
          "Entidade": "sample string 2",
          "NumDoc": 3,
          "NumDocExterno": "sample string 4",
          "Data": "2014-12-12T10:06:16.9440679+00:00",
          "TotalMerc": 6.1,
          "Serie": "sample string 7",
          "LinhasDoc": [
            {
              "CodArtigo": "sample string 1",
              "DescArtigo": "sample string 2",
              "IdCabecDoc": "sample string 3",
              "NumLinha": 4,
              "Quantidade": 5.1,
              "Unidade": "sample string 6",
              "Desconto": 7.1,
              "PrecoUnitario": 8.1,
              "TotalILiquido": 9.1,
              "TotalLiquido": 10.1
            },
            {
              "CodArtigo": "sample string 1",
              "DescArtigo": "sample string 2",
              "IdCabecDoc": "sample string 3",
              "NumLinha": 4,
              "Quantidade": 5.1,
              "Unidade": "sample string 6",
              "Desconto": 7.1,
              "PrecoUnitario": 8.1,
              "TotalILiquido": 9.1,
              "TotalLiquido": 10.1
            },
            {
              "CodArtigo": "sample string 1",
              "DescArtigo": "sample string 2",
              "IdCabecDoc": "sample string 3",
              "NumLinha": 4,
              "Quantidade": 5.1,
              "Unidade": "sample string 6",
              "Desconto": 7.1,
              "PrecoUnitario": 8.1,
              "TotalILiquido": 9.1,
              "TotalLiquido": 10.1
            }
          ]
        },
        {
          "id": "sample string 1",
          "Entidade": "sample string 3",
          "NumDoc": 3,
          "NumDocExterno": "sample string 4",
          "Data": "2014-12-12T10:06:16.9440679+00:00",
          "TotalMerc": 6.1,
          "Serie": "sample string 7",
          "LinhasDoc": [
            {
              "CodArtigo": "sample string 1",
              "DescArtigo": "sample string 2",
              "IdCabecDoc": "sample string 3",
              "NumLinha": 4,
              "Quantidade": 5.1,
              "Unidade": "sample string 6",
              "Desconto": 7.1,
              "PrecoUnitario": 8.1,
              "TotalILiquido": 9.1,
              "TotalLiquido": 10.1
            },
            {
              "CodArtigo": "sample string 1",
              "DescArtigo": "sample string 2",
              "IdCabecDoc": "sample string 3",
              "NumLinha": 4,
              "Quantidade": 5.1,
              "Unidade": "sample string 6",
              "Desconto": 7.1,
              "PrecoUnitario": 8.1,
              "TotalILiquido": 9.1,
              "TotalLiquido": 10.1
            },
            {
              "CodArtigo": "sample string 1",
              "DescArtigo": "sample string 2",
              "IdCabecDoc": "sample string 3",
              "NumLinha": 4,
              "Quantidade": 5.1,
              "Unidade": "sample string 6",
              "Desconto": 7.1,
              "PrecoUnitario": 8.1,
              "TotalILiquido": 9.1,
              "TotalLiquido": 10.1
            }
          ]
        }
      ];

      $scope.orderHistory = [
        {
          "id": "sample string 1",
          "Entidade": "sample string 1",
          "NumDoc": 3,
          "NumDocExterno": "sample string 4",
          "Data": "2014-12-12T10:06:16.9440679+00:00",
          "TotalMerc": 6.1,
          "Serie": "sample string 7",
          "LinhasDoc": [
            {
              "CodArtigo": "sample string 1",
              "DescArtigo": "sample string 2",
              "IdCabecDoc": "sample string 3",
              "NumLinha": 4,
              "Quantidade": 5.1,
              "Unidade": "sample string 6",
              "Desconto": 7.1,
              "PrecoUnitario": 8.1,
              "TotalILiquido": 9.1,
              "TotalLiquido": 10.1
            },
            {
              "CodArtigo": "sample string 1",
              "DescArtigo": "sample string 2",
              "IdCabecDoc": "sample string 3",
              "NumLinha": 4,
              "Quantidade": 5.1,
              "Unidade": "sample string 6",
              "Desconto": 7.1,
              "PrecoUnitario": 8.1,
              "TotalILiquido": 9.1,
              "TotalLiquido": 10.1
            },
            {
              "CodArtigo": "sample string 1",
              "DescArtigo": "sample string 2",
              "IdCabecDoc": "sample string 3",
              "NumLinha": 4,
              "Quantidade": 5.1,
              "Unidade": "sample string 6",
              "Desconto": 7.1,
              "PrecoUnitario": 8.1,
              "TotalILiquido": 9.1,
              "TotalLiquido": 10.1
            }
          ]
        },
        {
          "id": "sample string 1",
          "Entidade": "sample string 2",
          "NumDoc": 3,
          "NumDocExterno": "sample string 4",
          "Data": "2014-12-12T10:06:16.9440679+00:00",
          "TotalMerc": 6.1,
          "Serie": "sample string 7",
          "LinhasDoc": [
            {
              "CodArtigo": "sample string 1",
              "DescArtigo": "sample string 2",
              "IdCabecDoc": "sample string 3",
              "NumLinha": 4,
              "Quantidade": 5.1,
              "Unidade": "sample string 6",
              "Desconto": 7.1,
              "PrecoUnitario": 8.1,
              "TotalILiquido": 9.1,
              "TotalLiquido": 10.1
            },
            {
              "CodArtigo": "sample string 1",
              "DescArtigo": "sample string 2",
              "IdCabecDoc": "sample string 3",
              "NumLinha": 4,
              "Quantidade": 5.1,
              "Unidade": "sample string 6",
              "Desconto": 7.1,
              "PrecoUnitario": 8.1,
              "TotalILiquido": 9.1,
              "TotalLiquido": 10.1
            },
            {
              "CodArtigo": "sample string 1",
              "DescArtigo": "sample string 2",
              "IdCabecDoc": "sample string 3",
              "NumLinha": 4,
              "Quantidade": 5.1,
              "Unidade": "sample string 6",
              "Desconto": 7.1,
              "PrecoUnitario": 8.1,
              "TotalILiquido": 9.1,
              "TotalLiquido": 10.1
            }
          ]
        },
        {
          "id": "sample string 1",
          "Entidade": "sample string 3",
          "NumDoc": 3,
          "NumDocExterno": "sample string 4",
          "Data": "2014-12-12T10:06:16.9440679+00:00",
          "TotalMerc": 6.1,
          "Serie": "sample string 7",
          "LinhasDoc": [
            {
              "CodArtigo": "sample string 1",
              "DescArtigo": "sample string 2",
              "IdCabecDoc": "sample string 3",
              "NumLinha": 4,
              "Quantidade": 5.1,
              "Unidade": "sample string 6",
              "Desconto": 7.1,
              "PrecoUnitario": 8.1,
              "TotalILiquido": 9.1,
              "TotalLiquido": 10.1
            },
            {
              "CodArtigo": "sample string 1",
              "DescArtigo": "sample string 2",
              "IdCabecDoc": "sample string 3",
              "NumLinha": 4,
              "Quantidade": 5.1,
              "Unidade": "sample string 6",
              "Desconto": 7.1,
              "PrecoUnitario": 8.1,
              "TotalILiquido": 9.1,
              "TotalLiquido": 10.1
            },
            {
              "CodArtigo": "sample string 1",
              "DescArtigo": "sample string 2",
              "IdCabecDoc": "sample string 3",
              "NumLinha": 4,
              "Quantidade": 5.1,
              "Unidade": "sample string 6",
              "Desconto": 7.1,
              "PrecoUnitario": 8.1,
              "TotalILiquido": 9.1,
              "TotalLiquido": 10.1
            }
          ]
        }
      ];

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
              if(orders[k].NumDoc === invoices[i].NumDoc){ // is history
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
              invoices = result.data;
              $orderS.getOrders()
                then(
                  function onSuccess(resOrders){
                    orders = resOrders.data;
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
    }
  ]);
