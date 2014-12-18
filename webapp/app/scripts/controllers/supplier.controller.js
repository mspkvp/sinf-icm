'use strict';

angular.module('icmApp')
  .controller('SupplierCtrl', ['$scope', '$modal', 'NavigationService', 'ShippingService',
    function ($scope, $modal, $nav, $ship) {

      if (!$userS.getLoginStatus()) {
        alert("Please login first!");
        $nav.setRedirection('/login');
        $nav.go('login');
        return;
      }

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

      (function loadOrdersToProcessCompanies() {
        $scope.ordersToProcessClients = [];
        $scope.ordersToProcess.forEach(function (element, index, array) {
          if ($scope.ordersToProcessClients.indexOf(element.Entidade) == -1) {
            $scope.ordersToProcessClients.push(element.Entidade);
          }
        });
      })();

      (function loadOrdersProcessedCompanies() {
        $scope.orderHistorySuppliers = [];
        $scope.orderHistory.forEach(function (element, index, array) {
          if ($scope.orderHistorySuppliers.indexOf(element.Entidade) == -1) {
            $scope.orderHistorySuppliers.push(element.Entidade);
          }
        });
      })();

      $scope.processOrder = function (order) {
        $ship.setOrder(order);
        $nav.go('shipping');
      };

      $scope.emitInvoice = function () {
        $scope.orderModal.dismiss('cancel');
      };
    }
  ]);
