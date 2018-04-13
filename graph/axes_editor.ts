import kbn from 'app/core/utils/kbn';

export class AxesEditorCtrl {
  panel: any;
  panelCtrl: any;
  unitFormats: any;
  logScales: any;
  timeFormatTooltip: any;
  xAxisModes: any;
  xAxisStatOptions: any;
  xNameSegment: any;

  /** @ngInject **/
  constructor(private $scope, private $q) {
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
    this.$scope.ctrl = this;

    this.unitFormats = kbn.getUnitFormats();

    this.timeFormatTooltip = `<span>Flot x-axis time formats:</span>
    <div style="text-align: left;">
    %a: weekday name (customizable)<br>
    %b: month name (customizable)<br>
    %d: day of month, zero-padded (01-31)<br>
    %e: day of month, space-padded ( 1-31)<br>
    %H: hours, 24-hour time, zero-padded (00-23)<br>
    %I: hours, 12-hour time, zero-padded (01-12)<br>
    %m: month, zero-padded (01-12)<br>
    %M: minutes, zero-padded (00-59)<br>
    %q: quarter (1-4)<br>
    %S: seconds, zero-padded (00-59)<br>
    %y: year (two digits)<br>
    %Y: year (four digits)<br>
    %p: am/pm<br>
    %P: AM/PM (uppercase version of %p)<br>
    %w: weekday as number (0-6, 0 being Sunday)</div>`;

    this.logScales = {
      linear: 1,
      'log (base 2)': 2,
      'log (base 10)': 10,
      'log (base 32)': 32,
      'log (base 1024)': 1024,
    };

    this.xAxisModes = {
      Time: 'time',
      Series: 'series',
      Histogram: 'histogram',
      // 'Data field': 'field',
    };

    this.xAxisStatOptions = [
      { text: 'Avg', value: 'avg' },
      { text: 'Min', value: 'min' },
      { text: 'Max', value: 'max' },
      { text: 'Total', value: 'total' },
      { text: 'Count', value: 'count' },
      { text: 'Current', value: 'current' },
    ];

    if (this.panel.xaxis.mode === 'custom') {
      if (!this.panel.xaxis.name) {
        this.panel.xaxis.name = 'specify field';
      }
    }
  }

  setUnitFormat(axis, subItem) {
    axis.format = subItem.value;
    this.panelCtrl.render();
  }

  render() {
    this.panelCtrl.render();
  }

  xAxisModeChanged() {
    this.panelCtrl.processor.setPanelDefaultsForNewXAxisMode();
    this.panelCtrl.onDataReceived(this.panelCtrl.dataList);
  }

  xAxisValueChanged() {
    this.panelCtrl.onDataReceived(this.panelCtrl.dataList);
  }

  getDataFieldNames(onlyNumbers) {
    var props = this.panelCtrl.processor.getDataFieldNames(this.panelCtrl.dataList, onlyNumbers);
    var items = props.map(prop => {
      return { text: prop, value: prop };
    });

    return this.$q.when(items);
  }
}

/** @ngInject **/
export function axesEditorComponent() {
  'use strict';
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'public/app/plugins/panel/graph/axes_editor.html',
    controller: AxesEditorCtrl,
  };
}
