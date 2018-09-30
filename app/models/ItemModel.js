define([
  'jquery',
  'underscore',
  'backbone'

], function($, _, Backbone){

    var ItemModel = Backbone.Model.extend({
        defaults: {
          'itemName': 'abc',
          'itemPrice': 0,
          'itemQuantity': 0,
          'currency': '$'
        },
        initialize: function(){

        }
    });

    return ItemModel;
});
