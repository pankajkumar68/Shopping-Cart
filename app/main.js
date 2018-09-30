require.config({
  paths: {
    jquery: '../lib/jquery.min',
    underscore: '../lib/underscore-min',
    backbone: '../lib/backbone-min',
    templates: '../templates',
    text: '../lib/text',


  }
});

require([
  
  'app',
], function(App){
  App.initialize();
});
