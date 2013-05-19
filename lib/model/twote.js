(function (twote, Backbone) {
  'use strict';

  /**
   * Main model.
   */

  var Twote = {
    urlRoot: twote.config.api_root + '/twote'
  };

  /**
   * Properties.
   *
   * @return {object} defaults
   */

  Twote.defaults = function () {
    return {
      'id': null,
      'votes': {}
    };
  };

  /**
   * Extend and export.
   */

  twote.model.Twote = Backbone.Model.extend(Twote);

}(this.twote, Backbone));