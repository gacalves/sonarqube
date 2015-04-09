define([
  'common/modal-form',
  'templates/quality-profiles'
], function (ModalFormView) {

  var $ = jQuery;

  return ModalFormView.extend({
    template: Templates['quality-profiles-delete-profile'],

    modelEvents: {
      'destroy': 'close'
    },

    onFormSubmit: function () {
      ModalFormView.prototype.onFormSubmit.apply(this, arguments);
      this.sendRequest();
    },

    sendRequest: function () {
      var that = this,
          url = baseUrl + '/api/qualityprofiles/delete',
          options = { profileKey: this.model.get('key') };
      return $.ajax({
        type: 'POST',
        url: url,
        data: options,
        statusCode: {
          // do not show global error
          400: null
        }
      }).done(function () {
        that.model.trigger('destroy', that.model, that.model.collection);
      }).fail(function (jqXHR) {
        that.showErrors(jqXHR.responseJSON.errors, jqXHR.responseJSON.warnings);
      });
    }
  });

});
