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

        // Start rendering header, footer and the products view
        HeaderView.render(0);
        FooterView.render();
        ProductsView.render();

    };

    return {
        initialize: initialize
    };

  });
