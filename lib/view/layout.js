(function (twote, Backbone) {
  'use strict';

  /**
   * Main application view.
   */

  var Layout = {
    tagName: 'div',
    className: 'tw-layout'
  };

  /**
   * Initialize the layout, render the structure and setup outlets.
   *
   * @return {object} this
   */

  Layout.initialize = function () {

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
   * Events.
   * Forward all click events to the router.
   */

  Layout.events = {
    'click a[data-external!="true"]': 'dispatchLinkEvent'
  };

  /**
   * Dispatch all clicks on links with the router.
   *
   * @param {object} ev
   * @return {object} this
   */

  Layout.dispatchLinkEvent = function (ev) {
    ev.preventDefault();
    Backbone.history.navigate(ev.target.pathname, {trigger: true});
    return this;
  };

  /**
   * Extend and export.
   */

  twote.view.Layout = Backbone.View.extend(Layout);

}(this.twote, Backbone));