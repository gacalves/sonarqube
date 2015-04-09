define([
  'common/select-list',
  'templates/quality-profiles'
], function () {

  return Marionette.ItemView.extend({
    template: Templates['quality-profiles-profile-details'],

    modelEvents: {
      'change': 'render'
    },

    onRender: function () {
      var key = this.model.get('key');
      if (!this.model.get('isDefault')) {
        new SelectList({
          el: this.$('#quality-profile-projects'),
          width: '100%',
          readOnly: false,
          focusSearch: false,
          format: function (item) {
            return item.name;
          },
          searchUrl: baseUrl + '/api/qualityprofiles/projects?key=' + encodeURIComponent(key),
          selectUrl: baseUrl + '/api/qualityprofiles/add_project',
          deselectUrl: baseUrl + '/api/qualityprofiles/remove_project',
          extra: {
            profileKey: key
          },
          selectParameter: 'projectUuid',
          selectParameterValue: 'key',
          labels: {
            selected: t('quality_gates.projects.with'),
            deselected: t('quality_gates.projects.without'),
            all: t('quality_gates.projects.all'),
            noResults: t('quality_gates.projects.noResults'),
          },
          tooltips: {
            select: t('quality_gates.projects.select_hint'),
            deselect: t('quality_gates.projects.deselect_hint')
          }
        });
      }
    },

    serializeData: function () {
      var key = this.model.get('key'),
          rulesSearchUrl = '/coding_rules#qprofile=' + encodeURIComponent(key) + '|activation=true';
      return _.extend(Marionette.ItemView.prototype.serializeData.apply(this, arguments), {
        rulesSearchUrl: rulesSearchUrl
      });
    }
  });

});
