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

      $scope.products = [
        {
          code: '1',
          descr: 'nome1',
          stock: 420,
          pvp: 81.5
        },
        {
          code: '2',
          descr: 'nome2',
          stock: 420,
          pvp: 81.5
        },
        {
          code: '3',
          descr: 'nome3',
          stock: 420,
          pvp: 81.5
        },
        {
          code: '4',
          descr: 'nome4',
          stock: 420,
          pvp: 81.5
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

      $scope.selectedSupplier = undefined;

      $scope.newOrder = function(){
        $scope.orderModal = $modal.open({
          templateUrl: 'views/orderer-modal.html',
          scope: $scope
        });
        $scope.company = $nav.getViewingCompany();
        $scope.cancel = function(){
          $scope.orderModal.dismiss('cancel');
        };
      };

      $scope.emitOrder = function(){
        $scope.orderModal.dismiss('cancel');
      };
    }
  ]);
