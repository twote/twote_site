(function (twote, Backbone) {
  'use strict';

  /**
   * Main model.
   */

  var Twote = {
    urlRoot: twote.config.api_root + '/twote',
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
      'overall_votes': 0
    };
  };

  /**
   * Extend and export.
   */

  twote.model.Twote = Backbone.Model.extend(Twote);

}(this.twote, Backbone));