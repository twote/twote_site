(function (twote, Backbone) {
  'use strict';

  /**
   * Create global app object.
   */

  var App = {};

  /**
   * Run the application.
   *
   * @return {object} this
   */

  App.run = function () {
    return this;
  };

  /**
   * Extend and export.
   */

  twote.router.App = Backbone.Router.extend(App);

}(this.twote, Backbone));