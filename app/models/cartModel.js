define([
  'jquery',
  'underscore',
  'backbone'

], function($, _, Backbone) {

  var CartModel = Backbone.Model.extend({

    defaults: {
      'productQuantity': 1,
    }
    
  });

  return CartModel;
});
