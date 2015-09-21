function initBarChart() {

  d3.json("/tally", function(error, json) {
    if (error) return console.warn(error);

    var WIDTH = 500;
    var HEIGHT = 350;
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

    data.sort(function(a, b){
      return b.v - a.v;
    });

    BARHEIGHT = Math.round(HEIGHT / data.length);

    var x = d3.scale.linear()
          .domain([0, max])
          .range([0, WIDTH]);

    var div = d3.select("#bar-chart"),
        vis = div.append("svg")
          .attr("viewBox", "0 0 " + WIDTH + " " + HEIGHT)
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("preserveAspectRatio", "xMinYMin meet");

    var foo = 0;
    vis.selectAll("svg")
      .data(data)
      .enter().append("rect")
      .attr("x", function(d) {
        foo += BARHEIGHT;
        return foo + "px";
      })
      .attr("y", function(d) {
        return (HEIGHT - x(d.v)) + "px";
      })
      .attr("height", function(d) {
        return x(d.v) + "px";
      })
      .attr("width", BARHEIGHT + "px")
      .attr("fill", function(d) {
        var color = frameworkColor[d.t];
        color = color || '#333';
        return color;
      });
    
  });
}
