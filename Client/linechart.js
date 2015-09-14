function initLineChart() {

  var maxTime = Number.MIN_VALUE;
  var minTime = Number.MAX_VALUE;
  var frameworks = {};
  d3.json("/snapshots", function(error, json) {
    if (error) console.warn(error);

    json.forEach(function(datum) {

      var time = (new Date(datum.timestamp).getTime());

      maxTime = Math.max(time, maxTime);
      minTime = Math.min(time, minTime);

      var t = JSON.parse(datum.tally);
      for (var k in t) {
        frameworks[k] = frameworks[k] || [];
        frameworks[k].push({
          sale: t[k],
          year: time
        });
      }
    });

    console.log(frameworks);

    var vis = d3.select("#line-chart"),
        WIDTH = 500,
        HEIGHT = 250,
        MARGINS = {
          top: 20,
          right: 20,
          bottom: 20,
          left: 50
        },
        xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([minTime, maxTime]),
        yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, 1000]),
        xAxis = d3.svg.axis()
          .scale(xScale),
        yAxis = d3.svg.axis()
          .scale(yScale)
          .orient("left");

    vis.append("svg:g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
      .call(xAxis);
    vis.append("svg:g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + (MARGINS.left) + ",0)")
      .call(yAxis);
    var lineGen = d3.svg.line()
          .x(function(d) {
            return xScale(d.year);
          })
          .y(function(d) {
            return yScale(d.sale);
          })
          .interpolate("basis");

    for (var fw in frameworks) {
      vis.append('svg:path')
        .attr('d', lineGen(frameworks[fw]))
        .attr('stroke', 'green')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
    }
    
    // vis.append('svg:path')
    //   .attr('d', lineGen(data2))
    //   .attr('stroke', 'blue')
    //   .attr('stroke-width', 2)
    //   .attr('fill', 'none');

  });
}
