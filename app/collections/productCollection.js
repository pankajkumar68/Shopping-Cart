define([
  'jquery',
  'underscore',
  'backbone',
  'models/productModel'

], function($, _, Backbone, ProductModel){

    var ProductCollection = Backbone.Collection.extend({
        model: ProductModel,
        
        url: 'localdata/products.json',

        parse: function(response) {
          return response.products;
        }
    });

    return ProductCollection;
});
