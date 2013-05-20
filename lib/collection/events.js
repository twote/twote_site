(function (twote, Backbone, io) {
  'use strict';

  /**
   * Events simulate realtime updates from socket.io.
   */

  var Events = {};

  /**
   * Initialize, setup event listeners for socket.io.
   *
   * @return {object} this
   */

  Events.initialize = function () {
    io.on('connection_accepted', function () {
      console.log('connec');
    });
    return this;
  };

  /**
   * Start real time updates by opening a connection.
   *
   * @return {object} this
   */

  Events.listen = function () {
    io.connect(twote.config.api_root);
    return this;
  };

  /**
   * Extend and export.
   */

  twote.collection.Events = Backbone.Collection.extend(Events);

}(this.twote, Backbone, io));