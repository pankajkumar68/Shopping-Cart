define([
  'jquery',
  'underscore',
  'backbone'

], function($, _, Backbone) {

  var itemModel = Backbone.Model.extend({
    defaults: {

      'productQuantity': 1,

    }
  });

  return itemModel;
});
