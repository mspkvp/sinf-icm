'use strict';

angular.module('icmApp')
.controller('OrdererCtrl', ['$scope', '$interval', 'OrdererService', 'NavigationService', 'UserService','IOService', '$modal',
  function ($scope, $i, $orderS, $nav, $userS, $io, $modal) {

    if (!$userS.getLoginStatus()) {
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

    $scope.orderHistory = [];

    (function getHistory() {
      //ONLINE
      $orderS.getOrders()
      .then(
        function onSuccess(result) {
          $scope.orderHistory = result.data;
          $orderS.getInvoicesV($nav.getViewingCompany().id)
          .then(
            function onSuccess(iResult){
              var invoicesV = iResult.data;
              for(var i = 0; i < $scope.orderHistory.length; i++){
                for(var j = 0; j < invoicesV.length; j++){
                  $scope.orderHistory[i].Completo = false;
                  if($scope.orderHistory[i].DocsOriginais === invoicesV[i].NumDoc){
                    $scope.orderHistory[i].Completo = true;
                    $scope.orderHistory[i].invoice = invoicesV[i];
                    break;
                  }
                }
              }
            },
            function onError(e){
              console.log(e);
            }
            );

        },
        function onError(e) {
          console.log(e);
        }
        );
    })();


    $scope.products = [];

// supplier stuff
$scope.setSupplier = function () {
//  $scope.orderToSend.Entidade = $scope.selectedSupplier.NomeFornecedor;
$scope.products = [];
var tmpCompanies = $nav.getCompanies();
for(var i = 0; i < tmpCompanies.length; i++){
  if(tmpCompanies[i].name == $scope.selectedSupplier.NomeFornecedor){
    $scope.company = tmpCompanies[i];
    break;
  }
}
$orderS.getProducts($scope.selectedSupplier.CodFornecedor)
.then(
  function onSuccess(result) {
    $scope.gotSupplier = true;
    $orderS.getProducts($nav.getViewingCompany().id)
    .then(
      function onSuccess(result2){
        for(var i = 0; i < result.data.length; i++){
          for(var j = 0; j < result2.data.length; j++){
            if(result.data[i].CodArtigo == result2.data[j].CodArtigo){
              $scope.products.push(result.data[i]);
            }
          }
        }
      },
      function  onError(e){
        console.log(e);
        alert("Ocorreu um erro a processar o seu pedido. Por favor tente mais tarde.");
      }
    );
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

function initOrder() {
  $scope.orderToSend = {
    Entidade: "",
    NumDoc: 1,
    Data: new Date().toJSON(),
    TotalMerc: 0,
    Serie: "B",
    LinhasDoc: []
  };
};

initOrder();

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


(function getSuppliers(){

  $orderS.getSuppliers($nav.getViewingCompany().id)
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
})();


$scope.newOrder = function () {

  if ($scope.suppliers.length <= 0) {
    alert("Não tem fornecedores para efetuar encomendas");
  } else {
    $scope.makeOrderOn = true;
    $nav.addPath({
      name: 'Encomenda',
      icon: '',
      url: ''
    });
    $scope.orderToSend.NumDoc = ++doc_number;
    $scope.orderToSend.NumDocExterno = "" + doc_number;
  }
};

function clear() {
  $scope.makeOrderOn = false;
  $nav.pathRmvLast();
}

$scope.submitOrder = function () {
  $scope.orderToSend.LinhasDoc = $scope.orderList;
  for(var i = 0; i < $scope.orderToSend.LinhasDoc.length; i++){
    delete $scope.orderToSend.LinhasDoc[i]['$$hashKey'];
  }
  $scope.orderToSend.Data = new Date().toJSON();
  var total = 0;
  for (var i = 0; i < $scope.orderToSend.LinhasDoc; i++) {
    total += $scope.orderToSend.LinhasDoc.TotalLiquido;
  }
  $scope.orderToSend.TotalMerc = total;

  $io.get();
  var numDoc = $io.incNewDoc($scope.company.id);
  $scope.orderToSend.NumDoc = 23;
  $scope.orderToSend.Entidade = $nav.getViewingCompany().id;
  $orderS.sendOrder($scope.selectedSupplier.CodFornecedor, $scope.orderToSend)
  .then(
    function onSuccess(result) {
      console.log("Order from client placed succesfully", result);
      console.log("COMPANY = " + JSON.stringify($scope.company));
      numDoc = $io.incNewDoc($nav.getViewingCompany().id);
      $scope.orderToSend.NumDoc;
      $scope.orderToSend.Entidade = $scope.company.id;
      $scope.orderToSend.NumDocExterno = result.data.NumDoc;
      console.log("DOC = " + JSON.stringify($scope.orderToSend));
      $orderS.sendOrderNext($scope.orderToSend)
      .then(function onSuccess(result2) {
        console.log("Order to supplier placed succesfully", result2);
        initOrder();
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

  $scope.addLine = function () {
    $scope.addLineObj.TotalLiquido = Math.round(parseFloat($scope.addLineObj.TotalLiquido) * 100) / 100;
    $scope.addLineObj.TotalILiquido = Math.round(parseFloat($scope.addLineObj.TotalILiquido) * 100) / 100;
    $scope.addLineObj.TotalLiquido = 0;
    $scope.orderList.push($scope.addLineObj);
    $scope.orderToSend.TotalMerc += $scope.addLineObj.TotalLiquido;
    $scope.orderToSend.TotalMerc = Math.round(parseFloat($scope.orderToSend.TotalMerc) * 100) / 100;
    $scope.addLineObj = undefined;
    $scope.tmpProduct = undefined;
    $scope.gotSelected = false;
  };

  $scope.rmvLine = function (line) {
    var nr = line.NumLinha;
    $scope.orderToSend.TotalMerc -= line.TotalLiquido;
    $scope.orderToSend.TotalMerc = Math.round(parseFloat($scope.orderToSend.TotalMerc) * 100) / 100;
    $scope.orderList.splice(nr - 1, 1);
    line_counter--;
    for (var i = 0; i < $scope.orderList.length; i++) {
      $scope.orderList[i].NumLinha = i + 1;
    }
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

    $scope.selectedInvoiceV = $scope.orderSelected.invoice;

  }

}
]);
