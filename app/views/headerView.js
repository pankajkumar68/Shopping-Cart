define([
  'jquery',
  'underscore',
  'backbone',
  'text!/app/templates/headerTemplate.html'

], function($, _, Backbone, headerTemplate) {

  var HeaderView = Backbone.View.extend({

    el: $('header'),

    initialize: function() {
      this.template = _.template(headerTemplate);
      var self = this;

      // Event listener to update count in header
      Backbone.Events.on('updateCartCount', function(obj) {
        $('.count').html(obj.productCount);
      });
    },

    //render function for header
    render: function(productCount) {
      this.$el.html(this.template({
        productCount: productCount
      }));
    },

    events: {

      'click .cart': 'proceedToCart',
      'click a.products': 'openProductsPage',

    },

    // Products menu click event handler
    openProductsPage: function(event) {
      if (event) {
        event.preventDefault();
      }
      Backbone.Events.trigger('renderProducts');
    },

    // Event handler for shoopint cart button in header
    proceedToCart: function(event) {
      if (event) {
        event.preventDefault();
      }
    
      Backbone.Events.trigger('renderCartView');
    }

  });

  return new HeaderView();

});
