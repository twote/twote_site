(function (twote, Backbone, _) {
  'use strict';

  var templateMarkup, TwoteListItem;

  /**
   * Define template.
   */

  templateMarkup = [
    '<span class="item votecount">{{ overall_votes }}</span>',
    '<span class="item topic">{{ twote }}</span>',
    '<span class="item lastvote">2013-05-19 23:34</span>'
  ].join('');

  /**
   * Display a twote in a chart.
   */

  TwoteListItem = {
    tagName  : 'li',
    className: 'cf',
    template : _.template(templateMarkup)
  };

  /**
   * Initialize with `options`.
   *
   * Required keys in `options`:
   *
   *  - `model` instance of `Twote`
   *
   * @param {object} options
   * @return {object} this
   */

  TwoteListItem.initialize = function (options) {
    // this.model is automatically assigned
    return this;
  };

  /**
   * Render.
   *
   * @return {object} this
   */

  TwoteListItem.render = function () {
    this.$el.html(this.template(this.model.attributes));
    return this;
  };

  /**
   * Events.
   */

  TwoteListItem.events = {
    'click': 'handleClick'
  };

  /**
   * Handle a click on the whole element.
   *
   * @param {Event} ev
   * @return {object} this
   */

  TwoteListItem.handleClick = function (ev) {
    Backbone.history.navigate(this.model.get('twote'), {trigger: true});
    return this;
  };

  /**
   * Extend and export.
   */

  twote.view.TwoteListItem = Backbone.View.extend(TwoteListItem);

}(this.twote, Backbone, _));