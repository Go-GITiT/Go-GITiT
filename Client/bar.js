function initBarChart() {

  d3.json("/tally", function(error, json) {
    if (error) return console.warn(error);

    var WIDTH = 420;
    var HEIGHT = 420;
    var BARHEIGHT;
    var data = [];
    var max = Number.NEGATIVE_INFINITY;

    for (var k in json) {
      var v = parseInt(json[k]);
      data.push({
        t: k,
        v: v
      });
      max = Math.max(max, v);
    }

    BARHEIGHT = Math.round(HEIGHT / data. length);
    
    var x = d3.scale.linear()
          .domain([0, max])
          .range([0, WIDTH]);

    d3.select("#bar-chart")
      .selectAll("div")
      .data(data)
      .enter().append("div")
      .style("width", function(d) {
        console.log(x(d.v) + "px");
        return x(d.v) + "px"; //x(parseInt(d.v)) + "px";
      })
      .style("height", BARHEIGHT + "px")
      .style("background-color", function(d) {
        var color = frameworkColor[d.t];
        color = color || '#333';
        return color;
      });
    // .text(function(d) {
    //   return d.t;
    // });

  });
}
