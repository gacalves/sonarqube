define([
  'templates/quality-profiles'
], function () {

  var $ = jQuery;

  return Marionette.Layout.extend({
    template: Templates['quality-profiles-layout'],

    regions: {
      headerRegion: '.search-navigator-workspace-header',
      actionsRegion: '.search-navigator-filters',
      resultsRegion: '.quality-profiles-results',
      detailsRegion: '.search-navigator-workspace-list'
    },

    onRender: function () {
      var navigator = $('.search-navigator');
      navigator.addClass('sticky');
      var top = navigator.offset().top;
      this.$('.search-navigator-workspace-header').css({ top: top });
      this.$('.search-navigator-side').css({ top: top }).isolatedScroll();
    }
  });

});
