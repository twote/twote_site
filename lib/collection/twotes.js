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
   * Extend and export.
   */

  twote.collection.Twotes = Backbone.Collection.extend(Twotes);

}(this.twote, Backbone));