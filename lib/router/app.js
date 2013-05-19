(function (twote, Backbone, $) {
  'use strict';

  /**
   * Create global app object.
   */

  var App = {};

  /**
   * Initialize the application.
   *
   * @return {object} this
   */

  App.initialize = function () {

    this.layout = new twote.view.Layout({
      el: $('body')
    }).render();

    return this;
  };

  /**
   * Run the application and start the router.
   *
   * @return {object} this
   */

  App.run = function () {
    Backbone.history.start({ pushState: false });
    return this;
  };

  /**
   * Routes.
   */

  App.routes = {
    '(/)'      : 'listTop',
    'top(/)'   : 'listTop',
    'recent(/)': 'listRecent'
  };

  /**
   * List top twotes.
   *
   * @return {object} this
   */

  App.listTop = function () {
    return this;
  };

  /**
   * List recent twotes.
   *
   * @return {object} this
   */

  App.listRecent = function () {
    return this;
  };

  /**
   * Extend and export.
   */

  twote.router.App = Backbone.Router.extend(App);

}(this.twote, Backbone, jQuery));