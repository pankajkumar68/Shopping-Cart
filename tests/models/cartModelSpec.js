//Test File

define([
  'jquery',
  'backbone',
  'underscore',
  'models/cartModel'
], function($, Backbone, _, CartModel){
    describe('ShoppingCart.Models.CartModel', function(){
        describe('Model class exists', function(){
          it('should be defined', function(){
            expect(CartModel).toBeDefined();
          });

          it('can be instantiated', function(){
            var model = new CartModel();
            expect(CartModel).toBeDefined();
          });
        });
    });
});
