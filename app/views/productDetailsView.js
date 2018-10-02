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

    //render individual product details
    render: function(product) {

      this.product = product;
      this.template = _.template(productDetailsTemplate);
      this.$el.html(this.template({
        product: product
      }));
    },

    events: {
      'change .product-select': 'onQuantityChange',
      'click #addToCart': 'onAddToCart',
      'click a.back': 'onBackToProducts'
    },

    // Event handler for quantity change dropdown
    onQuantityChange: function(event) {
      var selectedItemQuantity = parseInt(event.currentTarget.value);
      this.product.set('productQuantity', selectedItemQuantity);
    },

    // Event handler for back to products page link click
    onBackToProducts: function(event) {
      if (event) {
        event.preventDefault();
      }

      Backbone.Events.trigger('renderProducts');
    },

    // function to count the number of products added in cart
    countCartProducts: function() {
      var totalProductCount = 0;
      CartCollection.each(function(model, index, list) {
        var productQuantity = model.get('productQuantity');
        totalProductCount = totalProductCount + productQuantity;
      });
      return totalProductCount;
    },

    // Event handler to add to cart button click
    onAddToCart: function(event) {
      var cartModel = new CartModel({
        'productId': this.product.get('productId'),
        'productName': this.product.get('productName'),
        'productQuantity': this.product.get('productQuantity'),
        'productPrice': this.product.get('productPrice'),
        'productImage': this.product.get('productImage'),
      });

      //check if product is already added in cart collection or not
      var model = CartCollection.findWhere({
        'productId': this.product.get('productId')
      });

      //if product already in cart then update the quantity of that product in cart else add new product in cart
      if (model) {
        model.set('productQuantity', model.get('productQuantity') + this.product.get('productQuantity'));
      } else {
        CartCollection.add(cartModel);
      }

      //Render products page again after product is added in cart
      Backbone.Events.trigger('renderProducts');

      //Update product count of items in cart in header section
      Backbone.Events.trigger('updateCartCount', {
        productCount: this.countCartProducts()
      });
    }

  });

  return new ProductDetailsView();

});
