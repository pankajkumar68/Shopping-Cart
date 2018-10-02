// Configure paths of all libraries used.

require.config({
  paths: {
    jquery: '../lib/jquery.min',
    underscore: '../lib/underscore-min',
    backbone: '../lib/backbone-min',
    templates: '../templates',
    text: '../lib/text'
  }
});

// start executing the app.js file

require([
  'app',
], function(App) {
  App.initialize();
});
