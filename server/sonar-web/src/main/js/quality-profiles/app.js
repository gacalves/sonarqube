require([
  'quality-profiles/router',
  'quality-profiles/controller',
  'quality-profiles/layout',
  'quality-profiles/profiles-view'
], function (Router, Controller, Layout, ProfilesView) {

  var $ = jQuery,
      App = new Marionette.Application();

  App.on('start', function () {
    // Layout
    this.layout = new Layout({ el: '#quality-profiles' });
    this.layout.render();
    $('#footer').addClass('search-navigator-footer');

    // Profiles List
    this.profiles = new Backbone.Collection();

    // Controller
    this.controller = new Controller({ app: this });

    // Profiles View
    this.profilesView = new ProfilesView({
      collection: this.profiles
    });
    this.layout.resultsRegion.show(this.profilesView);

    // Router
    this.router = new Router({ app: this });
    Backbone.history.start({
      pushState: true,
      root: baseUrl + '/quality_profiles'
    });

  });

  window.requestMessages().done(function () {
    App.start();
  });

});
