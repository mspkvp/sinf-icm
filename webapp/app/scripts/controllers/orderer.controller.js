'use strict';

angular.module('icmApp')
  .controller('OrdererCtrl', ['$scope', '$interval', 'OrdererService', 'NavigationService', 'UserService',
    function ($scope, $i, $orderS, $nav, $userS) {
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

      if (!$userS.getLoginStatus) {
        alert("Please login first!");
        $nav.setRedirection('client');
        $nav.go('login');
        return;
      }

      $scope.company = $nav.getViewingCompany();

      if (!$scope.company) {
        alert("Please select a company first!");
        $nav.setRedirection('client');
        $nav.go('companies');
      }

      $nav.setPath([
        $nav.getPath()[0],
        {
          name: 'Gerir',
          icon: '',
          url: '#/'
        },
        {
          name: 'Cliente',
          icon: '',
          url: '#/client'
        }
      ]);


      /*(function getHistory() {
        //ONLINE
        $orderS.getOrders()
          .then(
          function onSuccess(result) {
            $scope.orderHistory = result.data;
            console.log(result);
          },
          function onError(e) {
            console.log(e);
          });
      })();*/

      /* A product
       {
       "CodArtigo": "sample string 1",
       "DescArtigo": "sample string 2",
       "Stock": 3.1,
       "PVP": 4.1
       }
       */

      $scope.products = [];

      // supplier stuff
      $scope.setSupplier = function () {
        $scope.orderToSend.Entidade = $scope.selectedSupplier.NomeFornecedor;
        $orderS.getProducts($scope.selectedSupplier.CodFornecedor)
          .then(
          function onSuccess(result) {
            console.log(result);
            $scope.products = result.data;
            $scope.gotSupplier = true;
          },
          function onError(e) {
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
        Entidade: "sample string 2",
        NumDoc: 1,
        Data: new Date().toJSON(),
        TotalMerc: 0,
        Serie: "B",
        LinhasDoc: []
      };

      $scope.orderList = [];
      $scope.suppliers = [];

      (function loadOrdersProcessedCompanies() {
        $scope.orderHistorySuppliers = [];
        $scope.orderHistory.forEach(function (element, index, array) {
          if ($scope.orderHistorySuppliers.indexOf(element.Entidade) == -1) {
            $scope.orderHistorySuppliers.push(element.Entidade);
          }
        });
      })();


      /*(function getSuppliers(){
       //OFFLINE
       /*var companies = $nav.getCompanies();
       for(var i = 0; i<companies.length; i++){
       if(companies[i].name === $scope.company.name){
       companies.splice(i,1);
       break;
       }
       }
       $scope.suppliers = companies;
       //ONLINE
       $orderS.getSuppliers()
       .then(
       function onSuccess(result){
       for(var i = 0; i < result.data.length; i++){
       if(result.data[i].CodFornecedor == "FVD") continue;
       $scope.suppliers.push(result.data[i]);
       }
       console.log(result);
       },
       function onError(e){
       console.log(e);
       });
       })();*/


      $scope.newOrder = function () {
        $scope.makeOrderOn = true;
        $nav.addPath({
          name: 'Encomenda',
          icon: '',
          url: ''
        });
        $scope.orderToSend.NumDoc = ++doc_number;
        $scope.orderToSend.NumDocExterno = "" + doc_number;
      };

      function clear() {
        $scope.makeOrderOn = false;
        $nav.pathRmvLast();
      }

      $scope.emitOrder = function () {
        $scope.orderToSend.Data = new Date().toJSON();
        var total = 0;
        for (var i = 0; i < $scope.orderToSend.LinhasDoc; i++) {
          total += $scope.orderToSend.LinhasDoc.TotalLiquido;
        }
        $scope.orderToSend.TotalMerc = total;

        $orderS.sendOrder($scope.orderToSend)
          .then(
          function onSuccess(result) {
            console.log("Order from client placed succesfully", result.data);
            $scope.orderToSend.id = result.data.id;
            $scope.orderToSend.Entidade = $scope.company.id;
            $orderS.sendOrderNext($scope.selectedSupplier.CodFornecedor, $scope.orderToSend)
              .then(function onSuccess(result2) {
                console.log("Order to supplier placed succesfully", result2);
              }, function onError(e) {
                console.log(e);
              });
          },
          function onError(e) {
            console.log(e);
            alert("Ocorreu um erro a processar o seu pedido. Por favor tente mais tarde.");
          })
          .finally(
          function () {
            clear();
          }
        );
      };

      $scope.cancel = function () {
        doc_number--;
        clear();
      };

      $scope.setupLine = function () {
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

      $scope.addLine = function () {
        $scope.addLineObj.TotalLiquido = Math.round(parseFloat($scope.addLineObj.TotalLiquido) * 100) / 100;
        $scope.addLineObj.TotalILiquido = Math.round(parseFloat($scope.addLineObj.TotalILiquido) * 100) / 100;
        $scope.orderList.push($scope.addLineObj);
        $scope.addLineObj = undefined;
        $scope.tmpProduct = undefined;
        $scope.gotSelected = false;
      };

      $scope.rmvLine = function (line) {
        var nr = line.NumLinha;
        $scope.orderList.splice(nr - 1, 1);
        line_counter--;
        for (var i = 0; i < $scope.orderList.length; i++) {
          $scope.orderList[i].NumLinha = i + 1;
        }
      };

    }
  ]);
