(function (twote, Backbone) {
  'use strict';

  /**
   * Main application view.
   */

  var Layout = {};

  /**
   * Initialize the layout, render the structure and setup outlets.
   *
   * @return {object} this
   */

  Layout.initialize = function () {

    // setup outlets
    this.$header     = this.$('.js-header');
    this.$navigation = this.$('.js-navigation');
    this.$search     = this.$('.js-search');
    this.$content    = this.$('.js-content');
    this.$footer     = this.$('.js-footer');

    return this;
  };

  /**
   * Render the main layout. Enhances the markup in `index.html`.
   *
   * @return {object} this
   */

  Layout.render = function () {
    return this;
  };

  /**
   * Extend and export.
   */

  twote.view.Layout = Backbone.View.extend(Layout);

}(this.twote, Backbone));