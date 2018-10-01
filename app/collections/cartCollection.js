define([
  'jquery',
  'underscore',
  'backbone',
  'models/cartModel'

], function($, _, Backbone, CartModel){

    var CartCollection = Backbone.Collection.extend({
        model: CartModel
    });

    return new CartCollection();
});
