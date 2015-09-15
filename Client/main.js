var frameworkColor = {
  react: '#1f77b4',
  ember: '#ff7f0e',
  mithril: '#2ca02c',
  angular: '#d62728',
  backbone: '#9467bd',
  polymer: '#e377c2',
  spine: '#7f7f7f',
  flight: '#9edae5',
  knockout: '#771b17',
  'objective-j': '#d8a93c'
};

window.onload = function() {
  initBubbleChart();
  initBarChart();
  initLineChart();

  $("#bar-chart").hide();
  $("#line-chart").hide();

  $("#bubbleChartButton").click(function() {
    $("#line-chart").hide();
    $("#bar-chart").hide();
    $("#bubbles").fadeIn();
  });

  $("#barGraphButton").click(function() {
    $("#bubbles").hide();
    $("#line-chart").hide();
    $("#bar-chart").fadeIn();
  });

  $("#lineGraphButton").click(function() {
    $("#bubbles").hide();
    $("#bar-chart").hide();
    $("#line-chart").fadeIn();
  });
};
