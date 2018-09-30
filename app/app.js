define([
  'jquery',
  'underscore',
  'backbone',
  'views/ShoppingCartView'
], function($, _, Backbone, ShoppingCartView) {

    var initialize = function() {
        console.log('inside initialize');
        var shoppingCartView = new ShoppingCartView();
        shoppingCartView.render();
    };

    return {
      initialize: initialize
    };

  });
