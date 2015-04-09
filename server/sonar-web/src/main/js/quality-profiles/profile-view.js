define([
  'templates/quality-profiles'
], function () {

  return Marionette.ItemView.extend({
    tagName: 'a',
    className: 'list-group-item',
    template: Templates['quality-profiles-profile'],

    modelEvents: {
      'change': 'render'
    },

    events: {
      'click': 'onClick'
    },

    onRender: function () {
      this.$el.toggleClass('active', this.options.highlighted);
    },

    onClick: function (e) {
      e.preventDefault();
      this.model.trigger('select', this.model);
    }
  });

});
