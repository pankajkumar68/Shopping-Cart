define([
  'jquery',
  'underscore',
  'backbone',
  'text!/app/templates/productDetailsTemplate.html',
  'collections/cartCollection',
  'models/cartModel'

], function($, _, Backbone, productDetailsTemplate, CartCollection, CartModel) {

    var ProductDetailsView = Backbone.View.extend({

      el: $('#page'),

      initialize: function(){
        // var self = this;
        // Backbone.Events.on('renderProductDetails', function(product){
        //   self.render(product);
        // });
      },

      events: {
          'change .product-select': 'onQuantityChange',
          'click #addToCart': 'onAddToCart',
          'click a.back': 'onBackToProducts'
      },

      onQuantityChange: function(event){
            var selectedItemQuantity = parseInt(event.currentTarget.value);
            this.product.set('productQuantity', selectedItemQuantity);
            console.log('selected quantity - ' + selectedItemQuantity);

      },

      onBackToProducts: function(event){
        if(event){
            event.preventDefault();
        }
        Backbone.Events.trigger('renderProducts');
        //Backbone.history.navigate('/products', {trigger: true});

      },


      countCartProducts : function(){
        var totalProductCount = 0;
        CartCollection.each(function(model, index, list){
          var productQuantity = model.get('productQuantity');
          totalProductCount = totalProductCount + productQuantity;
        });
        return totalProductCount;
      },

      onAddToCart: function(event){
          var cartModel = new CartModel({
            'productId': this.product.get('productId'),
            'productName': this.product.get('productName'),
            'productQuantity': this.product.get('productQuantity'),
            'productPrice': this.product.get('productPrice'),
            'productImage': this.product.get('productImage'),
          });
          var model = CartCollection.findWhere({'productId': this.product.get('productId')});

          if(model){
              model.set('productQuantity', model.get('productQuantity')+this.product.get('productQuantity'));
          }
          else{
              CartCollection.add(cartModel);
          }

          Backbone.Events.trigger('renderProducts');
          Backbone.Events.trigger('updateCartCount', {productCount: this.countCartProducts()});

      },

      render: function(product){
          console.log('render function called for product details view');
          this.template = _.template(productDetailsTemplate);
          this.$el.html(this.template({
            product: product

          }));

          this.product = product;
      }
      //this.$el.html('<p>This is text</p>');
    });

    return new ProductDetailsView();

});
