'use strict';

angular.module('icmApp')
  .controller('OrdererCtrl', ['$scope', '$interval', 'NavigationService',
    function($scope, $i, $nav){

      $scope.company = $nav.getViewingCompany();

      $nav.setPath([
        $nav.getPath()[0],
        {
          name: 'Gerir',
          icon:'',
          url: '#/'
        },
        {
          name: 'Cliente',
          icon: '',
          url: '#/client'
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

      $scope.makeOrderOn = false;

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
        $scope.makeOrderOn = true;
        $nav.addPath({
          name: 'Encomenda',
          icon: '',
          url: ''
        });
      };

      function clear(){
        $scope.makeOrderOn = false;
        $nav.pathRmvLast();
      }

      $scope.emitOrder = function(){
        clear();
      };

      $scope.cancel = function(){
        clear();
      };

    }
  ]);
