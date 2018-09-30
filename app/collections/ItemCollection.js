define([
  'jquery',
  'underscore',
  'backbone',
  'models/ItemModel'

], function($, _, Backbone, ItemModel){

    var ItemCollection = Backbone.Collection.extend({
        model: ItemModel
    });

    return ItemCollection;
});
