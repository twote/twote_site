(function (twote, Backbone) {
  'use strict';

  /**
   * Main application view.
   */

  var Layout = {
    tagName  : 'div',
    className: 'tw-layout'
  };

  /**
   * Initialize the layout, render structure and setup outlets.
   *
   * @return {object} this
   */

  Layout.initialize = function (options) {
    // setup outlets
    this.$header     = this.$('.tw-header');
    this.$navigation = this.$('.tw-navigation');
    this.$search     = this.$('.tw-search');
    this.$content    = this.$('.tw-content');
    this.$footer     = this.$('.tw-footer');

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
   * Handle route to `route`.
   *
   * @param {string} route
   * @return {object} this
   */

  Layout.handleRoute = function (route) {
    // deselect all, only select the current one
    this.$navigation.find('li a').removeClass('active');
    this.$navigation.find('.tw-route-' + route).addClass('active');
    return this;
  };

  /**
   * Extend and export.
   */

  twote.view.Layout = Backbone.View.extend(Layout);

}(this.twote, Backbone));