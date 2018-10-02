define([
  'jquery',
  'underscore',
  'backbone',
  'views/headerView',
  'views/footerView',
  'views/cartView',
  'views/productsView',
  'views/productDetailsView',
  'routers/router'
], function($, _, Backbone, HeaderView, FooterView, CartView, ProductsView, ProductDetailsView) {

    var initialize = function() {

        HeaderView.render(0);
        FooterView.render();
        ProductsView.render();
        // Backbone.history.start({
        //   pushState: true
        // });
        //Backbone.history.navigate('products', { trigger:true});
    };

    return {
      initialize: initialize
    };

  });
