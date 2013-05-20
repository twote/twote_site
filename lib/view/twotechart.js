(function (twote, Backbone, _) {
  'use strict';

  /**
   * Display a twote in a chart.
   */

  var TwoteChart = {
    tagName: 'div',
    className: 'tw-twote-chart',
    template: _.template(
      '<div class="tw-twote-chart-chart" style="width: 100%;"></div>'
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
        backgroundColor: '#1A1A1A',
        width: Backbone.$('.tw-navigation').width()
      },
      title: {
        text: '#' + this.model.get('twote')
      },
      xAxis: {
        lineWidth: 1,
        lineColor: '#606060',
        categories: _.keys(this.model.get('votes')),
        labels: {
          rotation: -45,
          align: 'right',
          style: {
            color: '#fff',
            fontSize: '14px',
            top: 30,
            fontFamily: 'Arial, sans-serif',
            'text-transform': 'uppercase'
          }
        }
      },
      yAxis: {
        title: {
          text: ''
        },
        gridLineWidth: 1,
        gridLineColor: '#272727'
      },
      legend: {
        enabled: false
      },
      tooltip: function () { return false; },
      series: [{
        name: 'key',
        data: _.values(this.model.get('votes')),
        showInLegend: false,
        borderWidth: 1,
        borderColor: '#1A1A1A',
        dataLabels: {
          enabled: true,
          rotation: 0,
          color: '#fff',
          align: 'center',
          x: 0,
          y: 0,
          style: {
            fontSize: '24px',
            fontFamily: 'LeagueGothicRegular, sans-serif'
          }
        }
      }],
      colors: [
        '#949FB2'
      ]
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
