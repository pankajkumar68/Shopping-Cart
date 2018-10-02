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

    initialize: function() {
      //initialize product collection here.
      this.productCollection = new ProductCollection();
      var self = this;

      //listen for renderProducts event and paint the view once it recieves the event
      Backbone.Events.on('renderProducts', function() {
        self.render();
      });

    },

    render: function() {

      // Compiles JavaScript templates into functions that can be evaluated for rendering
      this.template = _.template(productsTemplate);
      var self = this;

      //Fetch products list from API, since API is not in place fetch products from JSON file.
      this.productCollection.fetch({
        type: 'GET',
        contentType: 'application/json',
        //success callback
        success: function(collection) {
          // render template
          self.$el.html(self.template({
            products: collection.models

          }));

        },
        //error callback
        error: function(collection, error) {
          console.log('something went wrong in fetching products');
        }

      });
    },

    // Click event handler if user clicks on a product to view its details
    events: {
      'click a.product-name': 'showProductDetails'
    },

    // method to call product details function
    showProductDetails: function(event) {
      if (event) {
        event.preventDefault();
      }

      //cid is the unique identifier of model which can be used further to fetch model from collection
      var cid = event.currentTarget.dataset.cid;

      // render selected product details view
      ProductDetailsView.render(this.productCollection.get(cid));
    }

  });

  return new ProductsView();

});
