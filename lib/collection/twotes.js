(function (twote, Backbone) {
  'use strict';

  /**
   * Main collection.
   */

  var Twotes = {
    model     : twote.model.Twote,
    url       : twote.config.api_root + '/twote'
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
   * Use another twotes collection as the source object.
   *
   * @param {Twotes} source
   * @return {object} this
   */

  Twotes.useSource = function (source) {
    source.on('sync', function () {
      this.add(source.models);
    }, this);
    return this;
  };

  /**
   * Extend and export.
   */

  twote.collection.Twotes = Backbone.Collection.extend(Twotes);

}(this.twote, Backbone));