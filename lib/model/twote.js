(function (twote, Backbone) {
  'use strict';

  /**
   * Main model.
   */

  var Twote = {
    urlRoot    : twote.config.api_root + '/twote',
    idAttribute: 'twote'
  };

  /**
   * Properties.
   *
   * @return {object} defaults
   */

  Twote.defaults = function () {
    return {
      'twote'        : '',
      'votes'        : {},
      'overall_votes': 0,
      'last_activity': 0
    };
  };

  /**
   * Parse.
   *
   * @param {object} data
   * @return {object} parsed
   */

  Twote.parse = function (data) {
    var parsed = data.result ? data.result : data;
    return parsed;
  };

  /**
   * Extend and export.
   */

  twote.model.Twote = Backbone.Model.extend(Twote);

}(this.twote, Backbone));