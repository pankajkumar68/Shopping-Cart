define([
  'jquery',
  'underscore',
  'backbone',
  'collections/ItemCollection',
  'text!/app/templates/shoppingCart.html'

], function($, _, Backbone, ItemCollection, shoppingCartTemplate) {

    var ShoppingCartView = Backbone.View.extend({

    el: $('#page'),

    initialize: function(){
         this.itemCollection = new ItemCollection([
          {
            'itemName': 'Titan watch',
            'itemPrice': 100,
            'itemQuantity': 1,
            'currency': '$',
            'itemCode': '001',
            'itemImage': './assets/images/watch.jpeg'
          },

          {
            'itemName': 'Titan watch1',
            'itemPrice': 100,
            'itemQuantity': 1,
            'currency': '$',
            'itemCode': '001',
            'itemImage': './assets/images/watch.jpeg'
          },

          {
            'itemName': 'Titan watch2',
            'itemPrice': 100,
            'itemQuantity': 1,
            'currency': '$',
            'itemCode': '001',
            'itemImage': './assets/images/watch.jpeg'
          },

          {
            'itemName': 'Titan watch3',
            'itemPrice': 100,
            'itemQuantity': 1,
            'currency': '$',
            'itemCode': '001',
            'itemImage': './assets/images/watch.jpeg'
          },
        ]);

    },

    events: {

      'click #remove': 'onRemoveItem',
      'change .itemSel': 'onItemQuantityChange'

    },

    onItemQuantityChange: function(event){
          var cid = event.currentTarget.dataset.cid;
          var selectedItemQuantity = parseInt(event.currentTarget.value);
          var itemModel = this.itemCollection.get(cid);
          itemModel.set('itemQuantity', selectedItemQuantity);
          var totalCost = this.calculateCost();
          $('#totCost').html(totalCost);
          console.log('selected quantity - ' + selectedItemQuantity);
          console.log('selected cid - ' + cid);
          console.log('total cost- ' + totalCost);


    },

    onRemoveItem : function(event){
          console.log(event.currentTarget.dataset.itemcode);

          var cid = event.currentTarget.dataset.cid;
          this.itemCollection.remove(this.itemCollection.get(cid));
          this.render();

    },

    calculateCost : function(){
      var totalCost = 0;
      this.itemCollection.each(function(model, index, list){
        var itemCost = model.get('itemQuantity') * model.get('itemPrice');
        totalCost = totalCost + itemCost;
      });
      return totalCost;
    },

    render: function(){
      console.log('render function called');
      this.template = _.template(shoppingCartTemplate);
      var self = this;
      var test = self.itemCollection;
      var totalCost = this.calculateCost();
      this.$el.html(this.template({
        itemCollection: self.itemCollection.models,
        itemTotal: totalCost,
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

    return ShoppingCartView;

});
