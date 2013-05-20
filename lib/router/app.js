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

    this.topTwotes = new twote.collection.Twotes().useSource(this.twotes);
    this.topTwotes.comparator = function (twote) {
      return (-1) * twote.get('overall_votes');
    };

    this.recentTwotes = new twote.collection.Twotes().useSource(this.twotes);
    this.recentTwotes.comparator = function (twote) {
      return (-1) * twote.get('last_activity');
    };

    this.layout = new twote.view.Layout({
      el: $('.tw-layout')
    }).render();

    this.layout.listenTo(this, 'route', this.layout.handleRoute);

    return this;
  };

  /**
   * Run the application and start the router.
   *
   * @return {object} this
   */

  App.run = function () {
    this.twotes.fetch();

    Backbone.history.start({ pushState: false });
    return this;
  };

  /**
   * Routes.
   */

  App.routes = {
    ''       : 'listRecent',
    '!recent': 'listRecent',
    '!top'   : 'listTop',
    '!wtf'   : 'showWtf',
    ':twote' : 'showTwote'
  };

  /**
   * List top twotes.
   *
   * @return {object} this
   */

  App.listTop = function () {
    var twoteList = new twote.view.TwoteList({
      collection: this.topTwotes
    });
    this.layout.changeContentAnimated(twoteList.render().el);
    return this;
  };

  /**
   * List recent twotes.
   *
   * @return {object} this
   */

  App.listRecent = function () {
    Backbone.history.navigate('!recent', {trigger: false});
    var twoteList = new twote.view.TwoteList({
      collection: this.recentTwotes
    });
    this.layout.changeContentAnimated(twoteList.render().el);
    return this;
  };

  /**
   * Show WTF / about page.
   *
   * @return {object} this
   */

  App.showWtf = function () {
    this.layout.changeContentAnimated('');
    return this;
  };

  /**
   * Show a twote's details.
   *
   * @param {string} twoteId
   * @return {object} this
   */

  App.showTwote = function (twoteId) {
    var model, view;

    model = new twote.model.Twote({twote: twoteId});
    view = new twote.view.TwoteChart({ model: model });

    this.layout.changeContentAnimated(view.render().el);
    model.fetch();

    return this;
  };

  /**
   * Extend and export.
   */

  twote.router.App = Backbone.Router.extend(App);

}(this.twote, Backbone, jQuery));