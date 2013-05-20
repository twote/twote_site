(function (twote, Backbone, io) {
  'use strict';

  /**
   * Events simulate realtime updates from socket.io.
   */

  var Events = {};

  /**
   * Start real time updates by opening a connection.
   *
   * @return {object} this
   */

  Events.listen = function () {
    var socket = io.connect(twote.config.api_root);
    socket.on('connection_established', function () {
      console.log('connec');
    });
    return this;
  };

  /**
   * Extend and export.
   */

  twote.collection.Events = Backbone.Collection.extend(Events);

}(this.twote, Backbone, io));