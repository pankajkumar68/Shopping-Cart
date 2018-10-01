define([
  'jquery',
  'underscore',
  'backbone',
  'text!/app/templates/footerTemplate.html'

], function($, _, Backbone, footerTemplate) {

    var FooterView = Backbone.View.extend({

    el: $('footer'),

    initialize: function(){
        this.template = _.template(footerTemplate);
    },

    render: function(){
      this.$el.html(this.template);
    }

    });

    return new FooterView();

});
