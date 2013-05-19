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

    this.twotes = new twote.collection.Twotes();

    this.layout = new twote.view.Layout({
      el: $('.tw-layout')
    }).render();

    return this;
  };

  /**
   * Run the application and start the router.
   *
   * @return {object} this
   */

  App.run = function () {
    this.twotes.fetch();
    this.twotes.once('sync', this.listTop, this);

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
    this.twotes.each(function (cur) {
      var view = new twote.view.TwoteChart({model: cur}).render();
      this.layout.$content.append(view.el);
    }, this);
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