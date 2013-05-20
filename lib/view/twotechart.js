(function (twote, Backbone, _) {
  'use strict';

  /**
   * Display a twote in a chart.
   */

  var TwoteChart = {
    tagName: 'div',
    className: 'tw-twote-chart',
    template: _.template(
      '<div class="tw-twote-chart-chart"></div>'
    )
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

  TwoteChart.initialize = function (options) {
    // this.model is automatically assigned

    this.listenTo(this.model, 'sync', this.render);

    return this;
  };

  /**
   * Render.
   *
   * @return {object} this
   */

  TwoteChart.render = function () {
    this.$el.html(this.template(this.model.attributes));

    this.$('.tw-twote-chart-chart').highcharts({
      chart: {
        type: 'column',
        backgroundColor: '#1A1A1A'
      },
      title: { text: '#' + this.model.get('twote') },
      xAxis: { title: { text: 'Options' } },
      yAxis: { title: { text: 'Votes' } },
      series: _.map(this.model.get('votes'), function (value, key) {
        return {
          name: key,
          data: [value]
        };
      })
    });

    return this;
  };


  /**
   * Apply a socket.io update.
   *
   * @param {object} data
   * @result {object} this
   */

  TwoteChart.applyUpdate = function (data) {
    var vote;

    if (data.twote_id !== this.model.get('twote')) { return this; }

    for (vote in data.delta) {
      if (data.delta.hasOwnProperty(vote)) {
        console.log(data.delta[vote]);
      }
    }

    return this;
  };

  /**
   * Extend and export.
   */

  twote.view.TwoteChart = Backbone.View.extend(TwoteChart);

}(this.twote, Backbone, _));