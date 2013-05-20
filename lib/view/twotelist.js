(function (twote, Backbone, _) {
  'use strict';

  var templateMarkup, TwoteList;

  /**
   * Define template (header).
   */

  templateMarkup = [
    '<li class="cf head">',
    '<span class="item votecount">Votes</span>',
    '<span class="item topic">Topic</span>',
    '<span class="item lastvote">Last Acvitity</span>',
    '</li>'
  ].join('');

  /**
   * Display twotes in a list.
   */

  TwoteList = {
    tagName  : 'ol',
    className: 'tw-twotes',
    template : _.template(templateMarkup)
  };

  /**
   * Initialize with `options`.
   *
   * Required keys in `options`:
   *
   *  - `maxEntries` number of max entries
   *  - `collection` instance of `Collection`
   *
   * @param {object} options
   * @return {object} this
   */

  TwoteList.initialize = function (options) {
    // this.collection is automatically assigned
    this.maxEntries = options.maxEntries || 10;

    // listen to events
    this.listenTo(this.collection, 'sort', this.render);

    return this;
  };

  /** 
   * Render.
   *
   * @return {object} this
   */

  TwoteList.render = function () {
    this.$el.html(this.template(this.collection.attributes));
    this.collection.chain().slice(0, this.maxEntries).each(this.addOne, this);
    return this;
  };

  /**
   * Append an item to the list.
   *
   * @param {Twote} model
   * @return {object} this
   */

  TwoteList.addOne = function (model) {
    var view = new twote.view.TwoteListItem({ model: model });
    this.$el.append(view.render().el);
    return this;
  };

  /**
   * Extend and export.
   */

  twote.view.TwoteList = Backbone.View.extend(TwoteList);

}(this.twote, Backbone, _));