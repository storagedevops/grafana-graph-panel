var template = `
<div class="graph-panel" ng-class="{'graph-panel--legend-right': ctrl.panel.legend.rightSide}">
  <div class="graph-panel__chart" grafana-graph ng-dblclick="ctrl.zoomOut()">
  </div>

  <div class="graph-legend" graph-legend></div>
  <canvas class="pattern" width="10" height="10" style="display:none"></canvas>
</div>
`;

export default template;
