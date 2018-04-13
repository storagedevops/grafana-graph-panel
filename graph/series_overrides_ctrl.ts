import _ from 'lodash';
import angular from 'angular';

export class SeriesOverridesCtrl {
  /** @ngInject */
  constructor($scope, $element, popoverSrv) {
    $scope.overrideMenu = [];
    $scope.currentOverrides = [];
    $scope.override = $scope.override || {};

    $scope.addOverrideOption = function(name, propertyName, values) {
      var option = {
        text: name,
        propertyName: propertyName,
        index: $scope.overrideMenu.length,
        values: values,
        submenu: _.map(values, function(value) {
          // Allow for objects in submenus
          if (typeof value === 'object') {
            return { text: String(value.text), value: value.value, cssClass: value.cssClass };
          } else {
            return { text: String(value), value: value };
          }
        }),
      };

      $scope.overrideMenu.push(option);
    };

    $scope.setOverride = function(item, subItem) {
      // handle color overrides
      if (item.propertyName === 'color') {
        $scope.openColorSelector($scope.override['color']);
        return;
      }

      $scope.override[item.propertyName] = subItem.value;

      // automatically disable lines for this series and the fill bellow to series
      // can be removed by the user if they still want lines
      if (item.propertyName === 'fillBelowTo') {
        $scope.override['lines'] = false;
        $scope.ctrl.addSeriesOverride({ alias: subItem.value, lines: false });
      }

      $scope.updateCurrentOverrides();
      $scope.ctrl.render();
    };

    $scope.colorSelected = function(color) {
      $scope.override['color'] = color;
      $scope.updateCurrentOverrides();
      $scope.ctrl.render();
    };

    $scope.openColorSelector = function(color) {
      var fakeSeries = { color: color };
      popoverSrv.show({
        element: $element.find('.dropdown')[0],
        position: 'top center',
        openOn: 'click',
        template: '<series-color-picker series="series" onColorChange="colorSelected" />',
        model: {
          autoClose: true,
          colorSelected: $scope.colorSelected,
          series: fakeSeries,
        },
        onClose: function() {
          $scope.ctrl.render();
        },
      });
    };

    $scope.removeOverride = function(option) {
      delete $scope.override[option.propertyName];
      $scope.updateCurrentOverrides();
      $scope.ctrl.refresh();
    };

    $scope.getSeriesNames = function() {
      return _.map($scope.ctrl.seriesList, function(series) {
        return series.alias;
      });
    };

    $scope.updateCurrentOverrides = function() {
      $scope.currentOverrides = [];
      _.each($scope.overrideMenu, function(option) {
        var value = $scope.override[option.propertyName];
        if (_.isUndefined(value)) {
          return;
        }
        var objectValueOptions = option.values.find(function (o) { return o.value === value; });
        var cssClass = objectValueOptions ? objectValueOptions.cssClass : '';
        var valueText = objectValueOptions ? objectValueOptions.text : value;

        $scope.currentOverrides.push({
          name: option.text,
          propertyName: option.propertyName,
          value: String(valueText),
          cssClass: String(cssClass)
        });
      });
    };

    $scope.addOverrideOption('Bars', 'bars', [true, false]);
    $scope.addOverrideOption('Bars pattern', 'barsPattern', ['plain', 'diagonal', 'horizontal', 'vertical', 'hash', 'dots', 'squares']);
    $scope.addOverrideOption('Value label', 'valueLabels', [true, false]);
    $scope.addOverrideOption('Lines', 'lines', [true, false]);
    $scope.addOverrideOption('Line fill', 'fill', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    $scope.addOverrideOption('Line width', 'linewidth', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    $scope.addOverrideOption('Null point mode', 'nullPointMode', ['connected', 'null', 'null as zero']);
    $scope.addOverrideOption('Fill below to', 'fillBelowTo', $scope.getSeriesNames());
    $scope.addOverrideOption('Staircase line', 'steppedLine', [true, false]);
    $scope.addOverrideOption('Dashes', 'dashes', [true, false]);
    $scope.addOverrideOption('Dash Length', 'dashLength', [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
    ]);
    $scope.addOverrideOption('Dash Space', 'spaceLength', [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
    ]);
    $scope.addOverrideOption('Points', 'points', [true, false]);
    $scope.addOverrideOption('Points Radius', 'pointradius', [1, 2, 3, 4, 5]);
    $scope.addOverrideOption('Stack', 'stack', [true, false, 'A', 'B', 'C', 'D']);
    $scope.addOverrideOption('Color', 'color', ['change']);
    $scope.addOverrideOption('Y-axis', 'yaxis', [1, 2]);
    $scope.addOverrideOption('Z-index', 'zindex', [-3, -2, -1, 0, 1, 2, 3]);
    $scope.addOverrideOption('Transform', 'transform', ['negative-Y']);
    $scope.addOverrideOption('Legend', 'legend', [true, false]);
    $scope.addOverrideOption('Legend Icon', 'legendIcon', [
      { text: '\uf111 fa-circle', value: 'fa-circle', cssClass: 'fa' },
      { text: '\uf0c8 fa-square', value: 'fa-square', cssClass: 'fa'},
      { text: '\uf068 fa-minus', value: 'fa-minus', cssClass: 'fa'},
      { text: '\uf067 fa-plus', value: 'fa-plus', cssClass: 'fa'},
      { text: '\uf00d fa-times', value: 'fa-times', cssClass: 'fa'},
      { text: '\uf005 fa-star', value: 'fa-star', cssClass: 'fa'},
      { text: '\uf069 fa-asterisk', value: 'fa-asterisk', cssClass: 'fa'},
      { text: '\uf00c fa-check', value: 'fa-check', cssClass: 'fa'},
      { text: '\uf155 fa-usd', value: 'fa-usd', cssClass: 'fa'},
      { text: '\uf0e7 fa-bolt', value: 'fa-bolt', cssClass: 'fa'},
      { text: '\uf06d fa-fire', value: 'fa-fire', cssClass: 'fa'},
      { text: '\uf10c fa-circle-o', value: 'fa-circle-o', cssClass: 'fa'},
      { text: '\uf096 fa-square-o', value: 'fa-square-o', cssClass: 'fa'},
      { text: '\uf006 fa-star-o', value: 'fa-star-o', cssClass: 'fa'},
      { text: '\uf08a fa-heart-o', value: 'fa-heart-o', cssClass: 'fa'},
      { text: '\uf2dc fa-snowflake-o', value: 'fa-snowflake-o', cssClass: 'fa'},
      { text: '\uf28d fa-stop-circle', value: 'fa-stop-circle', cssClass: 'fa'},
      { text: '\uf2c7 fa-thermometer-full', value: 'fa-thermometer-full', cssClass: 'fa'},
      { text: '\uf2c9 fa-thermometer-half', value: 'fa-thermometer-half', cssClass: 'fa'},
      { text: '\uf2cb fa-thermometer-empty', value: 'fa-thermometer-empty', cssClass: 'fa'},
      { text: '\uf056 fa-minus-circle', value: 'fa-minus-circle', cssClass: 'fa'},
      { text: '\uf055 fa-plus-circle', value: 'fa-plus-circle', cssClass: 'fa'},
      { text: '\uf057 fa-times-circle', value: 'fa-times-circle', cssClass: 'fa'}]);
    $scope.updateCurrentOverrides();
  }
}

angular.module('grafana.controllers').controller('SeriesOverridesCtrl', SeriesOverridesCtrl);
