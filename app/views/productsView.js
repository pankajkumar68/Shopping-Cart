define([
  'jquery',
  'underscore',
  'backbone',
  'collections/productCollection',
  'views/productDetailsView',
  'text!/app/templates/productsTemplate.html'

], function($, _, Backbone, ProductCollection, ProductDetailsView, productsTemplate) {

    var ProductsView = Backbone.View.extend({

    el: $('#page'),

    initialize: function(){
         this.productCollection = new ProductCollection();
         //this.productDetailsView = new ProductDetailsView();
         var self = this;
         Backbone.Events.on('renderProducts', function(){
           self.render();
         });

    },

    events: {
        'click a.product-name': 'showProductDetails'
    },

    showProductDetails: function(event){
        if(event){
            event.preventDefault();
        }

        var cid = event.currentTarget.dataset.cid;
        ProductDetailsView.render(this.productCollection.get(cid));
        //Backbone.history.navigate('/productdetails', {trigger: true});
        var product  = this.productCollection.get(cid);
        //Backbone.Events.trigger('renderProductDetails', { product: product});
        console.log('cid - ' + cid);

    },

    render: function(){
      console.log('render function called');
      this.template = _.template(productsTemplate);
      var self = this;
      this.productCollection.fetch({
        type: 'GET',
        contentType: 'application/json',
        success: function(collection){

          self.$el.html(self.template({
            products: collection.models

          }));

        },
        error: function(collection, error){
            console.log('something went wrong in fetching products');
        }
      });
      //this.$el.html('<p>This is text</p>');
    }

    });

    return new ProductsView();

});
