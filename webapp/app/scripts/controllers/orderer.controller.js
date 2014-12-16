'use strict';

angular.module('icmApp')
  .controller('OrdererCtrl', ['$scope', '$interval', 'OrdererService','NavigationService',
    function($scope, $i, $orderS,$nav){

      $scope.company = $nav.getViewingCompany();

      if(!$scope.company){
        alert("Please select a company first!");
        $nav.go('companies');
      }

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

      // supplier stuff
      $scope.setSupplier = function() {
        $scope.orderToSend.Entidade = $scope.selectedSupplier.id;
        $orderS.getProducts()
          .then(
            function onSuccess(result){
              $scope.products = data;
              $scope.gotSupplier = true;
            },
            function onError(e){
              console.log(e);
              alert("Ocorreu um erro a processar o seu pedido. Por favor tente mais tarde.");
            }
          );
      };

      // order stuff
      var line_counter = 0,
        doc_number = 0;

      $scope.makeOrderOn = false;

      $scope.orderToSend = {
        id: "sample string 1",
        Entidade: "sample string 2",
        NumDoc: 1,
        NumDocExterno: "",
        Data: new Date().toJSON(),
        TotalMerc: 6.1,
        Serie: "serie",
        LinhasDoc: [
          {
            CodArtigo: "sample string 1",
            DescArtigo: "sample string 2",
            IdCabecDoc: "sample string 3",
            NumLinha: 4,
            Quantidade: 5.1,
            Unidade: "sample string 6",
            Desconto: 7.1,
            PrecoUnitario: 8.1,
            TotalILiquido: 9.1,
            TotalLiquido: 10.1
          },
          {
            CodArtigo: "sample string 1",
            DescArtigo: "sample string 2",
            IdCabecDoc: "sample string 3",
            NumLinha: 4,
            Quantidade: 5.1,
            Unidade: "sample string 6",
            Desconto: 7.1,
            PrecoUnitario: 8.1,
            TotalILiquido: 9.1,
            TotalLiquido: 10.1
          },
         {
            CodArtigo: "sample string 1",
            DescArtigo: "sample string 2",
            IdCabecDoc: "sample string 3",
            NumLinha: 4,
            Quantidade: 5.1,
            Unidade: "sample string 6",
            Desconto: 7.1,
            PrecoUnitario: 8.1,
            TotalILiquido: 9.1,
            TotalLiquido: 10.1
          }
        ]
      };

      $scope.orderList = [
        {
          CodArtigo: "art_1",
          DescArtigo: "Artigo nr 1",
          IdCabecDoc: "N sei qual é",
          NumLinha: 1,
          Quantidade: 5,
          Unidade: "UN",
          Desconto: 0.0,
          PrecoUnitario: 8.4,
          TotalILiquido: 9.1,
          TotalLiquido: 10.1
        },
        {
          CodArtigo: "art_1",
          DescArtigo: "Artigo nr 1",
          IdCabecDoc: "N sei qual é",
          NumLinha: 1,
          Quantidade: 5,
          Unidade: "UN",
          Desconto: 0.0,
          PrecoUnitario: 8.4,
          TotalILiquido: 9.1,
          TotalLiquido: 10.1
        },
        {
          CodArtigo: "art_1",
          DescArtigo: "Artigo nr 1",
          IdCabecDoc: "N sei qual é",
          NumLinha: 1,
          Quantidade: 5,
          Unidade: "UN",
          Desconto: 0.0,
          PrecoUnitario: 8.4,
          TotalILiquido: 9.1,
          TotalLiquido: 10.1
        },
        {
          CodArtigo: "art_1",
          DescArtigo: "Artigo nr 1",
          IdCabecDoc: "N sei qual é",
          NumLinha: 1,
          Quantidade: 5,
          Unidade: "UN",
          Desconto: 0.0,
          PrecoUnitario: 8.4,
          TotalILiquido: 9.1,
          TotalLiquido: 10.1
        },
        {
          CodArtigo: "art_1",
          DescArtigo: "Artigo nr 1",
          IdCabecDoc: "N sei qual é",
          NumLinha: 1,
          Quantidade: 5,
          Unidade: "UN",
          Desconto: 0.0,
          PrecoUnitario: 8.4,
          TotalILiquido: 9.1,
          TotalLiquido: 10.1
        },
        {
          CodArtigo: "art_1",
          DescArtigo: "Artigo nr 1",
          IdCabecDoc: "N sei qual é",
          NumLinha: 1,
          Quantidade: 5,
          Unidade: "UN",
          Desconto: 0.0,
          PrecoUnitario: 8.4,
          TotalILiquido: 9.1,
          TotalLiquido: 10.1
        },
        {
          CodArtigo: "art_1",
          DescArtigo: "Artigo nr 1",
          IdCabecDoc: "N sei qual é",
          NumLinha: 1,
          Quantidade: 5,
          Unidade: "UN",
          Desconto: 0.0,
          PrecoUnitario: 8.4,
          TotalILiquido: 9.1,
          TotalLiquido: 10.1
        },
        {
          CodArtigo: "art_1",
          DescArtigo: "Artigo nr 1",
          IdCabecDoc: "N sei qual é",
          NumLinha: 1,
          Quantidade: 5,
          Unidade: "UN",
          Desconto: 0.0,
          PrecoUnitario: 8.4,
          TotalILiquido: 9.1,
          TotalLiquido: 10.1
        },
        {
          CodArtigo: "art_1",
          DescArtigo: "Artigo nr 1",
          IdCabecDoc: "N sei qual é",
          NumLinha: 1,
          Quantidade: 5,
          Unidade: "UN",
          Desconto: 0.0,
          PrecoUnitario: 8.4,
          TotalILiquido: 9.1,
          TotalLiquido: 10.1
        },
        {
          CodArtigo: "art_1",
          DescArtigo: "Artigo nr 1",
          IdCabecDoc: "N sei qual é",
          NumLinha: 1,
          Quantidade: 5,
          Unidade: "UN",
          Desconto: 0.0,
          PrecoUnitario: 8.4,
          TotalILiquido: 9.1,
          TotalLiquido: 10.1
        },
        {
          CodArtigo: "art_1",
          DescArtigo: "Artigo nr 1",
          IdCabecDoc: "N sei qual é",
          NumLinha: 1,
          Quantidade: 5,
          Unidade: "UN",
          Desconto: 0.0,
          PrecoUnitario: 8.4,
          TotalILiquido: 9.1,
          TotalLiquido: 10.1
        },
        {
          CodArtigo: "art_1",
          DescArtigo: "Artigo nr 1",
          IdCabecDoc: "N sei qual é",
          NumLinha: 1,
          Quantidade: 5,
          Unidade: "UN",
          Desconto: 0.0,
          PrecoUnitario: 8.4,
          TotalILiquido: 9.1,
          TotalLiquido: 10.1
        },
        {
          CodArtigo: "art_1",
          DescArtigo: "Artigo nr 1",
          IdCabecDoc: "N sei qual é",
          NumLinha: 1,
          Quantidade: 5,
          Unidade: "UN",
          Desconto: 0.0,
          PrecoUnitario: 8.4,
          TotalILiquido: 9.1,
          TotalLiquido: 10.1
        },
        {
          CodArtigo: "art_1",
          DescArtigo: "Artigo nr 1",
          IdCabecDoc: "N sei qual é",
          NumLinha: 1,
          Quantidade: 5,
          Unidade: "UN",
          Desconto: 0.0,
          PrecoUnitario: 8.4,
          TotalILiquido: 9.1,
          TotalLiquido: 10.1
        }
      ];

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
        $scope.orderToSend.NumDoc = ++doc_number;
        $scope.orderToSend.NumDocExterno = ""+doc_number;
        $scope.orderToSend.id =  "enc_"+$scope.orderToSend.Entidade+"_"+doc_number;
      };

      function clear(){
        $scope.makeOrderOn = false;
        $nav.pathRmvLast();
      }

      $scope.emitOrder = function(){
        $scope.orderToSend.Data = new Date().toJSON();
        var total = 0;
        for(var i=0; i < $scope.orderToSend.LinhasDoc; i++){
          total += $scope.orderToSend.LinhasDoc.TotalLiquido;
        }
        $scope.orderToSend.TotalMerc = total;

        $orderS.sendOrder($scope.orderToSend)
        .then(
            function onSuccess(data){
              console.log("Order placed succesfully");
            },
            function onError(e){
              console.log(e);
              alert("Ocorreu um erro a processar o seu pedido. Por favor tente mais tarde.");
            })
        .finally(
          function(){
              clear();
            }
        );
      };

      $scope.cancel = function(){
        doc_number--;
        clear();
      };

      $scope.setupLine = function(){
        $scope.maxStock = $scope.tmpProduct.Stock;
        $scope.gotSelected = true;
        var selected = {
          CodArtigo: $scope.tmpProduct.CodArtigo,
          DescArtigo: $scope.tmpProduct.DescArtigo,
          IdCabecDoc: $scope.orderToSend.id,
          NumLinha: ++line_counter,
          Quantidade: 1.0,
          Unidade: "UN",
          Desconto: 0.0,
          PrecoUnitario: $scope.tmpProduct.PVP
        };

        selected.TotalILiquido = selected.Quantidade * selected.PrecoUnitario * (1 - selected.Desconto);
        selected.TotalLiquido = selected.Quantidade * selected.PrecoUnitario * (1 - selected.Desconto);

        $scope.addLineObj = selected;

        //console.log($scope.addLineObj);
      };

    }
  ]);
