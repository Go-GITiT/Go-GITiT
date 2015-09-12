window.onload = function() {

  InitChart();
  
  d3.json("/tally", function(error, json) {
    if (error) return console.warn(error);

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

    // for(var key in data){
    //   createNodes(data[key], frameworks[key]);
    // }
    // var merged = [];
    // merged = merged.concat.apply(merged, nodes);
    // console.log(merged);
    // visualize(merged);

    // var data = [4, 8, 15, 16, 23, 42];

    var x = d3.scale.linear()
      .domain([0, max])
      .range([0, 420]);

    d3.select("#bar-chart")
      .selectAll("div")
      .data(data)
      .enter().append("div")
      .style("width", function(d) {
        console.log(x(d.v) + "px");
        return x(d.v) + "px"; //x(parseInt(d.v)) + "px";
      })
      .text(function(d) {
        return d.t;
      });
    console.log('do some mutherfucking shit!');
  });


};
