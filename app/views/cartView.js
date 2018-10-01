define([
  'jquery',
  'underscore',
  'backbone',
  'text!/app/templates/cartTemplate.html',
  'collections/cartCollection'

], function($, _, Backbone, cartTemplate, CartCollection) {

    var ShoppingCartView = Backbone.View.extend({

    el: $('#page'),

    initialize: function(){
        var self = this;
        Backbone.Events.on('renderCartView', function(){
          self.render();
        });
    },

    events: {

      'click #remove': 'onRemoveItem',
      'change .itemSel': 'onItemQuantityChange',
      'click a.back': 'onBackToProducts'

    },

    onBackToProducts: function(event){
      if(event){
          event.preventDefault();
      }
      Backbone.history.navigate('/products', {trigger: true});

    },

    onItemQuantityChange: function(event){
          var cid = event.currentTarget.dataset.cid;
          var selectedProdQuantity = parseInt(event.currentTarget.value);
          var cartModel = CartCollection.get(cid);
          cartModel.set('productQuantity', selectedProdQuantity);
          var totalCost = this.calculateCost();
          $('#totCost').html(totalCost);
          Backbone.Events.trigger('updateCartCount', {productCount: this.countCartProducts()});
          console.log('selected quantity - ' + selectedProdQuantity);
          console.log('selected cid - ' + cid);
          console.log('total cost- ' + totalCost);
    },

    onRemoveItem : function(event){
          console.log(event.currentTarget.dataset.itemcode);

          var cid = event.currentTarget.dataset.cid;
          CartCollection.remove(CartCollection.get(cid));
          this.render();
          Backbone.Events.trigger('updateCartCount', {productCount: this.countCartProducts()});

    },

    calculateCost : function(){
      var totalCost = 0;
      CartCollection.each(function(model, index, list){
        var productCost = model.get('productQuantity') * model.get('productPrice');
        totalCost = totalCost + productCost;
      });
      return totalCost;
    },

    countCartProducts : function(){
      var totalProductCount = 0;
      CartCollection.each(function(model, index, list){
        var productQuantity = model.get('productQuantity');
        totalProductCount = totalProductCount + productQuantity;
      });
      return totalProductCount;
    },

    render: function(){
      console.log('render function called');
      this.template = _.template(cartTemplate);
      var self = this;
      var totalCost = this.calculateCost();
      this.$el.html(this.template({
        cartCollection: CartCollection.models,
        totalCost: totalCost,
      }));

      if(totalCost===0){
          $('#totCost').hide();
      }

      else{
        $('#totCost').html(totalCost);
      }
      //this.$el.html('<p>This is text</p>');
    }

    });

    return new ShoppingCartView();

});
