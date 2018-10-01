define([
  'jquery',
  'underscore',
  'backbone',
  'collections/productCollection',
  'text!/app/templates/productsTemplate.html',
  'views/productDetailsView'

], function($, _, Backbone, ProductCollection, productsTemplate, ProductDetailsView) {

    var ProductsView = Backbone.View.extend({

    el: $('#page'),

    initialize: function(){
         this.productCollection = new ProductCollection();
         //this.productDetailsView = new ProductDetailsView();

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
        Backbone.history.navigate('/productdetails', {trigger: true});
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
