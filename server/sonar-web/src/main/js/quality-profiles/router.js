define(function () {

  return Backbone.Router.extend({
    routes: {
      '': 'index',
      'index': 'index',
      'show?key=:key': 'show'
    },

    initialize: function (options) {
      this.app = options.app;
    },

    index: function () {
      this.app.controller.index();
    },

    show: function (key) {
      this.app.controller.show(key);
    }
  });

});
