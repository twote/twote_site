(function (exports, _) {
  'use strict';

  /**
   * Configure underscore templating.
   */

  _.templateSettings = {
    escape : /\{\{(.+?)\}\}/g
  };

  /**
   * Export global twote object, prepare namespaces.
   */

  exports.twote = {
    collection: {},
    model: {},
    view: {},
    router: {},
    config: {
      api_root: 'http://twote.io'
    }
  };

}(this, _));