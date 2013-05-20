(function (twote, Backbone, io) {
  'use strict';

  /**
   * Events simulate realtime updates from socket.io.
   */

  var Events = {};

  /**
   * Initialize.
   *
   * Events triggered:
   *
   *  `twote:update (data)` triggered when a twote changes
   *
   * @return {object} this
   */

  Events.initialize = function () {
    // store the socket
    this._socket = null;

    return this;
  };

  /**
   * Start real time updates by opening a connection.
   *
   * @return {object} this
   */

  Events.listen = function () {
    if (this._socket) { return this; }

    var socket = io.connect(twote.config.socket_root);

    socket.on('connect', function () {
      console.log('connect');
      // expose socket
      this._socket = socket;
    }.bind(this));

    socket.on('update_twote', function (data) {
      console.log('update_twote');

      this.trigger('twote:update', data);
    }.bind(this));

    socket.on('disconnect', function () {
      console.log('disconnect');

      this._socket = null;
    }.bind(this));

    return this;
  };

  /**
   * Subscribe to a given twote id and callback `cb(err, data)`, whenever
   * something changes.
   *
   * @param {string} twoteId
   * @return {object} this
   */

  Events.subscribeTwote = function (twoteId) {
    if (!this._socket) { return this; }
    console.log('subscribeTwote', twoteId);

    this._socket.emit('subscribe_twote', { twote_id: twoteId });

    return this;
  };

  /**
   * Unsubscribe all.
   *
   * @return {object} this
   */

  Events.unsubscribeAll = function () {
    if (!this._socket) { return this; }
    console.log('unsubscribe_twote_all');

    this._socket.emit('unsubscribe_twote_all');
    this.off('twote:update');

    return this;
  };

  /**
   * Extend and export.
   */

  twote.collection.Events = Backbone.Collection.extend(Events);

}(this.twote, Backbone, io));