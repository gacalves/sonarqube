/*
 * SonarQube, open source software quality management tool.
 * Copyright (C) 2008-2014 SonarSource
 * mailto:contact AT sonarsource DOT com
 *
 * SonarQube is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * SonarQube is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
define(function () {

  var $ = jQuery;

  return Backbone.Model.extend({
    idAttribute: 'key',

    defaults: {
      activeRuleCount: 0
    },

    fetch: function () {
      var that = this;
      this.fetchChanged = {};
      return $.when(
          this.fetchProfileRules(),
          this.fetchInheritance()
      ).done(function () {
            that.set(that.fetchChanged);
          });
    },

    fetchProfileRules: function () {
      var that = this,
          url = baseUrl + '/api/rules/search',
          key = this.id,
          options = {
            ps: 1,
            facets: 'severities,tags',
            qprofile: key,
            activation: 'true'
          };
      return $.get(url, options).done(function (r) {
        var severityFacet = _.findWhere(r.facets, { property: 'severities' });
        if (severityFacet != null) {
          var severities = severityFacet.values,
              severityComparator = function (s) {
                return window.severityColumnsComparator(s.val);
              },
              sortedSeverities = _.sortBy(severities, severityComparator);
          _.extend(that.fetchChanged, { rulesSeverities: sortedSeverities });
        }
      });
    },

    fetchInheritance: function () {
      var that = this,
          url = baseUrl + '/api/qualityprofiles/inheritance',
          options = { profileKey: this.id };
      return $.get(url, options).done(function (r) {
        _.extend(that.fetchChanged, r.profile, {
          ancestors: r.ancestors,
          children: r.children
        });
      });
    }
  });

});
