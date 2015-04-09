define([
  'quality-profiles/profile-header-view',
  'quality-profiles/profile-details-view'
], function (ProfileHeaderView, ProfileDetailsView) {

  var $ = jQuery;

  return Marionette.Controller.extend({

    initialize: function () {
      this.listenTo(this.options.app.profiles, 'select', this.onProfileSelect);
      this.listenTo(this.options.app.profiles, 'copy', this.onProfileCopy);
      this.listenTo(this.options.app.profiles, 'setAsDefault', this.onProfileSetAsDefault);
      this.listenTo(this.options.app.profiles, 'destroy', this.onProfileDestroy);
    },

    index: function () {
      this.fetchProfiles();
    },

    show: function (key) {
      var that = this;
      this.fetchProfiles().done(function () {
        var profile = that.options.app.profiles.findWhere({ key: key });
        if (profile != null) {
          profile.trigger('select', profile);
        }
      });
    },

    onProfileSelect: function (profile) {
      var that = this,
          key = profile.get('key'),
          route = 'show?key=' + encodeURIComponent(key);
      this.options.app.router.navigate(route);
      this.options.app.profilesView.highlight(key);
      this.fetchProfile(profile).done(function () {
        var profileHeaderView = new ProfileHeaderView({ model: profile });
        that.options.app.layout.headerRegion.show(profileHeaderView);

        var profileDetailsView = new ProfileDetailsView({ model: profile });
        that.options.app.layout.detailsRegion.show(profileDetailsView);
      });
    },

    onProfileCopy: function (name, profile) {
      var that = this,
          lang = profile.get('language');
      this.fetchProfiles().done(function () {
        var newProfile = that.options.app.profiles.findWhere({ language: lang, name: name });
        if (newProfile != null) {
          newProfile.trigger('select', newProfile);
        }
      });
    },

    onProfileSetAsDefault: function (profile) {
      var that = this,
          url = baseUrl + '/api/qualityprofiles/set_default',
          key = profile.get('key'),
          options = { profileKey: key };
      return $.post(url, options).done(function () {
        profile.set({ isDefault: true });
        that.fetchProfiles();
      });
    },

    onProfileDestroy: function () {
      this.options.app.router.navigate('');
      this.options.app.layout.headerRegion.reset();
      this.options.app.layout.detailsRegion.reset();
    },

    fetchProfiles: function () {
      var that = this,
          url = baseUrl + '/api/qualityprofiles/search',
          options = { f: 'key,name,language,languageName,isInherited,parentKey,parentName,isDefault,activeRuleCount' };
      return $.get(url, options).done(function (r) {
        that.options.app.profiles.reset(r.profiles);
      });
    },

    fetchProfile: function (profile) {
      return $.when(this.fetchProfileRules(profile));
    },

    fetchProfileRules: function (profile) {
      var url = baseUrl + '/api/rules/search',
          key = profile.get('key'),
          options = {
            ps: 1,
            facets: 'severities',
            qprofile: key,
            activation: 'true'
          };
      return $.get(url, options).done(function (r) {
        var severityFacet = _.findWhere(r.facets, { property: 'severities' });
        if (severityFacet != null) {
          profile.set({ rulesSeverities: severityFacet.values });
        }
      });
    }

  });

});
