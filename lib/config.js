(function (exports) {
  'use strict';

  /**
   * Export global twote object, prepare namespaces.
   */

  exports.twote = {
    collection: {},
    model: {},
    view: {},
    router: {},
    config: {
      api_root: 'http://api.twote.io'
    }
  };

}(this));