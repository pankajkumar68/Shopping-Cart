define([
  'jquery',
  'underscore',
  'backbone',
  'views/productsView'
], function($, _, Backbone, ProductsView){

    var Router = Backbone.Router.extend({
      routes: {
        '': 'products',
        'products': 'products',
        'cart': 'cart'
      },

      products: function(){
        //var productsView = new ProductsView();
        ProductsView.render();
      },

      products: function(){
        ProductsView.render();
      }
    });

    return new Router();
});
