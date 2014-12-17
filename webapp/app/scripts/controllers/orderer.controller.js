'use strict';

angular.module('icmApp')
  .controller('OrdererCtrl', ['$scope', '$interval', 'OrdererService','NavigationService', 'UserService',
    function($scope, $i, $orderS,$nav, $userS){

      if(!$userS.getLoginStatus){
        alert("Please login first!");
        $nav.setRedirection('client');
        $nav.go('login');
      }

      $scope.company = $nav.getViewingCompany();

      if(!$scope.company){
        alert("Please select a company first!");
        $nav.setRedirection('client');
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
              console.log(result);
              $scope.products = result.data;
              $scope.gotSupplier = true;
            },
            function onError(e){
              console.log(e);
              alert("Ocorreu um erro a processar o seu pedido. Por favor tente mais tarde.");
            }
          );
        $scope.gotSupplier = true;
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
        TotalMerc: 0,
        Serie: "serie",
        LinhasDoc: []
      };

      $scope.orderList = [];
      $scope.suppliers = [];

      (function getSuppliers(){
        //OFFLINE
        /*var companies = $nav.getCompanies();
        for(var i = 0; i<companies.length; i++){
          if(companies[i].name === $scope.company.name){
            companies.splice(i,1);
            break;
          }
        }
        $scope.suppliers = companies;*/
        //ONLINE
        $orderS.getSuppliers()
          .then(
            function onSuccess(result){
              $scope.suppliers = result.data;
              console.log(result);
            },
            function onError(e){
              console.log(e);
            });
      })();
      

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

        /*$orderS.sendOrder($scope.orderToSend)
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
        );*/
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

      $scope.addLine = function(){
        $scope.orderList.push($scope.addLineObj);
        $scope.addLineObj = undefined;
        $scope.tmpProduct = undefined;
        $scope.gotSelected = false;
      };

      $scope.rmvLine = function(line){
        var nr = line.NumLinha;
        console.log("linha"+nr,"index"+nr-1);
        $scope.orderList.splice(nr-1, 1);
        line_counter--;
        for(var i=0; i < $scope.orderList.length; i++){
          $scope.orderList[i].NumLinha = i+1;
        }
      };
    }
  ]);
