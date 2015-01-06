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
      $nav.setLoading(true);
      $orderS.getOrders()
      .then(
        function onSuccess(result) {
          $scope.orderHistory = result.data;
          var tmpCompanies = $nav.getCompanies();
          for(var i = 0; i < $scope.orderHistory.length; i++){
            for(var j = 0; j < tmpCompanies.length; j++){
              if($scope.orderHistory[i].Entidade == tmpCompanies[j].id){
                $scope.orderHistory[i].Entidade = tmpCompanies[j].name;
              }
            }
          }
          $orderS.getInvoicesV($nav.getViewingCompany().id)
          .then(
            function onSuccess(iResult){
              var invoicesV = iResult.data;
              console.log("INVOICES = " + JSON.stringify(invoicesV));
              for(var i = 0; i < $scope.orderHistory.length; i++){
                for(var j = 0; j < invoicesV.length; j++){
                  $scope.orderHistory[i].Completo = false;
                  if(invoicesV[i] != undefined && $scope.orderHistory[i].NumDoc == invoicesV[i].DocsOriginais){
                    $scope.orderHistory[i].Completo = true;
                    $scope.orderHistory[i].invoice = invoicesV[i];
                    break;
                  }
                }
              }
              $nav.setLoading(false);
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
$scope.orderList = [];
var tmpCompanies = $nav.getCompanies();
for(var i = 0; i < tmpCompanies.length; i++){
  if(tmpCompanies[i].name == $scope.selectedSupplier.NomeFornecedor){
    $scope.company = tmpCompanies[i];
    break;
  }
}
$nav.setLoading(true);
$orderS.getProducts($scope.selectedSupplier.CodFornecedor)
.then(
  function onSuccess(result){
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

        $nav.setLoading(false);
        if ($scope.products.length <= 0) {
          alert("O fornecedor selecionado não possuí produtos na base de dados em comum com a empresa cliente. Por favor adicione os desejados primeiro.");
          $scope.products = [];
        } else {
          $scope.gotSupplier = true;
        }
      },
      function  onError(e){
        $nav.setLoading(false);
        console.log(e);
        alert("Ocorreu um erro a processar o seu pedido. Por favor tente mais tarde.");
      }
      );
  },
  function  onError(e){
    $nav.setLoading(false);
    console.log(e);
    alert("Ocorreu um erro a processar o seu pedido. Por favor tente mais tarde.");
  }
  );
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
  $nav.setLoading(true);

  $orderS.getSuppliers($nav.getViewingCompany().id)
  .then(
    function onSuccess(result){
      for(var i = 0; i < result.data.length; i++){
        if(result.data[i].CodFornecedor == "FVD") continue;
        $scope.suppliers.push(result.data[i]);
      }
      $nav.setLoading(false);
      console.log(result);
    },
    function onError(e){
      console.log(e);
    });
})();


$scope.newOrder = function () {

  if ($scope.suppliers.length <= 0) {
    alert("Não tem fornecedores para efetuar encomendas. Por favor adicione nas ferramentas de Gestão");
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
  $nav.setLoading(true);
  $scope.orderToSend.LinhasDoc = $scope.orderList;
  for(var i = 0; i < $scope.orderToSend.LinhasDoc.length; i++){
    delete $scope.orderToSend.LinhasDoc[i]['$$hashKey'];
  }
  $scope.orderToSend.Data = new Date().toJSON();
  var total = 0;
  for (var i = 0; i < $scope.orderToSend.LinhasDoc; i++) {
    total += $scope.orderToSend.LinhasDoc.TotalILiquido;
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
        $nav.setLoading(false);
        initOrder();
        alert("Encomenda colocada com sucesso");
      }, function onError(e) {
        console.log(e);
      });
    },
    function onError(e) {
      console.log(e);
      $nav.setLoading(false);
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
    Quantidade: $scope.maxStock,
    Unidade: "UN",
    Desconto: 0.0,
    PrecoUnitario: $scope.tmpProduct.PVP
  };

  selected.TotalILiquido = selected.Quantidade * selected.PrecoUnitario; // * (1 - selected.Desconto);
  selected.TotalLiquido = 0; //selected.Quantidade * selected.PrecoUnitario * (1 - selected.Desconto);


  $scope.addLineObj = selected;

    //console.log($scope.addLineObj);
  };

  $scope.addLine = function () {
    if ($scope.tmpProduct.Stock < $scope.addLineObj.Quantidade) {
      if (!confirm("Tem a certeza que pretende encomendar uma quantidade superior ao stock do fornecedor? (Stock: " + $scope.tmpProduct.Stock + ")")) {
        return;
      }
    }

    $scope.addLineObj.TotalLiquido = 0 // Math.round(parseFloat($scope.addLineObj.TotalLiquido) * 100) / 100;
    $scope.Desconto = 0.0;
    $scope.addLineObj.TotalILiquido = Math.round(parseFloat($scope.addLineObj.TotalILiquido) * 100) / 100;
    $scope.orderList.push($scope.addLineObj);
    $scope.orderToSend.TotalMerc += $scope.addLineObj.TotalILiquido;
    $scope.orderToSend.TotalMerc = Math.round(parseFloat($scope.orderToSend.TotalMerc) * 100) / 100;
    $scope.addLineObj = undefined;
    $scope.tmpProduct = undefined;
    $scope.gotSelected = false;
  };

  $scope.rmvLine = function (line) {
    var nr = line.NumLinha;
    $scope.orderToSend.TotalMerc -= line.TotalILiquido;
    if($scope.orderToSend.TotalMerc < 0) $scope.orderToSend.TotalMerc = 0;
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

    $scope.selectedInvoice = $scope.orderSelected.invoice;

  }

}
]);
