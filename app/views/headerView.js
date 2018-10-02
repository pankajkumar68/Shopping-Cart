define([
  'jquery',
  'underscore',
  'backbone',
  'text!/app/templates/headerTemplate.html'

], function($, _, Backbone, headerTemplate) {

    var HeaderView = Backbone.View.extend({

    el: $('header'),

    initialize: function(){
        this.template = _.template(headerTemplate);
        var self = this;
        Backbone.Events.on('updateCartCount', function(obj){
          $('.count').html(obj.productCount);
          //self.render(obj.productCount);
        });
    },

    events: {

      'click .cart': 'proceedToCart',
      'click a.products': 'openProductsPage',

    },

    openProductsPage: function(event){
      if(event){
          event.preventDefault();
      }
      Backbone.Events.trigger('renderProducts');
    },

    proceedToCart: function(event){
        if(event){
            event.preventDefault();
        }
        //Backbone.history.navigate('/cart', {trigger: true});
        Backbone.Events.trigger('renderCartView');
    },

    render: function(productCount){
      this.$el.html(this.template({
        productCount: productCount

      }));
    }

    });

    return new HeaderView();

});
