(function (twote, Backbone) {
  'use strict';

  /**
   * Main collection.
   */

  var Twotes = {
    model: twote.model.Twote,
    url: twote.config.api_root + '/twote'
  };

  /**
   * Parse the result list.
   *
   * @param {object} data
   * @result {object} parsed data
   */

  Twotes.parse = function (data) {
    return data.result;
  };

  /**
   * Extend and export.
   */

  twote.collection.Twotes = Backbone.Collection.extend(Twotes);

}(this.twote, Backbone));