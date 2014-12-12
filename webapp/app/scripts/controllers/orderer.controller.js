'use strict';

angular.module('icmApp')
  .controller('OrdererCtrl', ['$scope', '$modal', 'NavigationService',
    function($scope, $modal, $nav){
      $nav.setPath([
        $nav.getPath()[0],
        {
          name: 'Gerir',
          icon:'',
          url: '/'
        },
        {
          name: 'Cliente',
          icon: '',
          url: ''
        }
      ]);

      /* A product
        {
          "CodArtigo": "sample string 1",
          "DescArtigo": "sample string 2",
          "Stock": 3.1,
          "PVP": 4.1
        }
      */

      $scope.products = [
        {
          CodArtigo: '1',
          DescArtigo: 'nome1',
          Stock: 70,
          PVP: 23.5
        },
        {
          CodArtigo: '2',
          DescArtigo: 'nome2',
          Stock: 20,
          PVP: 34.5
        },
        {
          CodArtigo: '3',
          DescArtigo: 'nome3',
          Stock: 10,
          PVP: 81.5
        },
        {
          CodArtigo: '4',
          DescArtigo: 'nome4',
          Stock: 42,
          PVP: 53.5
        }
      ];

      $scope.orderHistory = [
        {
          code: '1',
          name: 'nome1',
          orderDate: new Date(),
          deliveryDate: new Date(),
          status: 'Pago'
        },
        {
          code: '2',
          name: 'nome2',
          orderDate: new Date(),
          deliveryDate: '',
          status: 'Pedido'
        },
        {
          code: '3',
          name: 'nome3',
          orderDate: new Date(),
          deliveryDate: new Date(),
          status: 'Em Discussão'
        },
        {
          code: '4',
          name: 'nome4',
          orderDate: new Date(),
          deliveryDate: new Date(),
          status: 'Recebido'
        }
      ];

      $scope.orderList = [
        {
          code: "a1",
          desc: "cenas",
          quantity: 24,
          pvp: 15.79
        }
      ];
      $scope.orderList.total = 123;

      $scope.suppliers = [
        {
          name:'fornecedor1'
        },
        {
          name:'fornecedor2'
        },
        {
          name:'fornecedor3'
        }
      ];

      $scope.newOrder = function(){
        $scope.orderModal = $modal.open({
          templateUrl: 'views/orderer-modal.html',
          controller: OrdererModalCtrl,
          scope: $scope
        });
      };

      $scope.emitOrder = function(){
        $scope.orderModal.dismiss('cancel');
      };

      $scope.cancelModal = function(){
        $scope.orderModal.dismiss('cancel');
      };

      $scope.company = $nav.getViewingCompany();

      $scope.setSupplier = function(supplier){
        console.log('Supplier selected: ', supplier);
        $scope.selectedSupplier = supplier;
      };

      var OrdererModalCtrl = function($scope, $interval){
        $scope.suppliers = $scope.$parent.suppliers;
        $scope.company = $scope.$parent.company;
        $scope.setSupplier = function(){
          $scope.$parent.setSupplier($scope.selectedSupplier);
        };
        $scope.emitOrder = $scope.$parent.emitOrder;
        $scope.cancel = $scope.$parent.cancelModal;
      };
    }
  ]);
