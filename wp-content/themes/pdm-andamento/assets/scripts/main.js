require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        d3: '../bower_components/d3/d3.min',
        //leaflet: '../bower_components/leaflet/src/Leaflet',
        leaflet: "//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.2/leaflet",
        foundation: '../bower_components/foundation/js/foundation',
        polyfil: '../bower_components/REM-unit-polyfill/js/rem.min',
        ticker: '../bower_components/jQuery-News-Ticker/includes/jquery.ticker',
        list: '../bower_components/list.js/dist/list.min'
    },
    shim: {
        d3: {
            exports: 'd3'
        },
        jQuery: {
            exports: 'jquery'
        },
        foundation: {
            deps: ['jquery']
        },
        polyfil: {
            exports: 'polyfil'
        },
        ticker: {
            deps: ['jquery']
        },
        list: {
          exports: 'List'
        }
    }
});

require(['chart', 'map', 'app', 'jquery', 'buscaPorCep', 'polyfil', 'ticker', 'list'], function (chart, map, app, $, buscaPorCep, List) {
    'use strict';
    // use app here
    app.init();

    // startup map
    $('.map-render').each(function () {
        map.init(this);
    });

    // startup chart
    $('.chart-render').each(function () {
        var data = $(this).data('chart');
        switch (data.type) {
           case 'pie':
              switch (data.size) {
                  case 'small':
                      chart.pieSmall(this, data.values);
                      break;
                  case 'large':
                      chart.pieLarge(this, data.values);
                      break;
              }
              break;
           case 'line':
              chart.line(this, data_chart.labels, data_chart.values[0]);
              break;
        }
    });

    jQuery('form[name="projetos-por-perto"] input[name="cep"]');

    jQuery('form[name="projetos-por-perto"] .bprefeitura').on('click', function (evt) {
      window.location = SITE_URL + '/?subprefeitura=' + jQuery('select#subprefeitura-topo').val() + '#resultado';
    });
     jQuery('form[name="metas-por-objetivo"] .bojetivo').on('click', function (evt) {
      window.location = SITE_URL + '/?objetivo=' + jQuery('select#objetivo-topo').val() + '#resultado';
    });
    jQuery('form[name="projetos-relacionados"] select#projetos-topo').on('change', function (evt) {
      window.location = SITE_URL + '/projeto/' + jQuery(evt.currentTarget).val();
    });

    jQuery('select#filtra-grafico-por-subprefeitura').on('change', function (evt) {
      chart.line(document.getElementById('chart-month-a'), data_chart.labels, data_chart.values[$(evt.currentTarget).val()]);
    });

    buscaPorCep.init();

    //.filtrar-todas-as-metas.button
});
