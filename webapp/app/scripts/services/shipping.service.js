'use strict';

angular.module('icmApp')
  .service('ShippingService', ['$http', 'NavigationService',
    function ($http, $nav) {
      this.order = undefined;

      this.setOrder = function (newOrder){
        this.order = newOrder;
      };

      this.getOrder = function (){
        return this.order;
      };

      this.deleteOrder = function (){
        this.order = undefined;
      };
    }]);
