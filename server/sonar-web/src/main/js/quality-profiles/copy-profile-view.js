define([
  'common/modal-form',
  'templates/quality-profiles'
], function (ModalFormView) {

  var $ = jQuery;

  return ModalFormView.extend({
    template: Templates['quality-profiles-copy-profile'],

    onFormSubmit: function () {
      ModalFormView.prototype.onFormSubmit.apply(this, arguments);
      this.sendRequest();
    },

    sendRequest: function () {
      var that = this,
          url = baseUrl + '/api/qualityprofiles/copy',
          name = this.$('#copy-name').val(),
          options = {
            fromKey: this.model.get('key'),
            toName: name
          };
      return $.ajax({
        type: 'POST',
        url: url,
        data: options,
        statusCode: {
          // do not show global error
          400: null
        }
      }).done(function () {
        // TODO open new profile using key from response
        that.model.trigger('copy', name, that.model);
        that.close();
      }).fail(function (jqXHR) {
        that.showErrors(jqXHR.responseJSON.errors, jqXHR.responseJSON.warnings);
      });
    }
  });

});
