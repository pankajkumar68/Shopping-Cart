define([
  'jquery',
  'underscore',
  'backbone',
  'views/headerView',
  'views/footerView',
  'views/cartView',
  'routers/router'
], function($, _, Backbone, HeaderView, FooterView, CartView) {

    var initialize = function() {
        Backbone.history.start({
          pushState: true
        });
        HeaderView.render(0);
        FooterView.render();
        //Backbone.history.navigate('products', {trigger:true});
    };

    return {
      initialize: initialize
    };

  });
