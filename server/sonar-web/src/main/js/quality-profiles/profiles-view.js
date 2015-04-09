define([
  'quality-profiles/profile-view'
], function (ProfileView) {

  return Marionette.CollectionView.extend({
    className: 'list-group',
    itemView: ProfileView,

    itemViewOptions: function (model) {
      return {
        collectionView: this,
        highlighted: model.get('key') === this.highlighted
      };
    },

    highlight: function (key) {
      this.highlighted = key;
      this.render();
    }
  });

});
