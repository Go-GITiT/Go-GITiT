function initLineChart() {

  var maxTime = Number.MIN_VALUE;
  var minTime = Number.MAX_VALUE;
  var maxValue = Number.MIN_VALUE;
  var frameworkData = {};

  d3.json("/snapshots", function(error, json) {
    if (error) console.warn(error);

    json.forEach(function(datum) {
      //console.log(datum.timestamp);
      //console.log(d3.time.format("%Y-%m-%dT%H:%M:%S.%LZ").parse(datum.timestamp));
      var time = (new Date(datum.timestamp).getTime());
      var tally = JSON.parse(datum.tally);
      maxTime = Math.max(time, maxTime);
      minTime = Math.min(time, minTime);
      for (var t in tally) {
        maxValue = Math.max(maxValue, tally[t]);
        frameworkData[t] = frameworkData[t] || [];
        frameworkData[t].push({
          value: tally[t],
          day: time
        });
      }
    });

    var div = d3.select("#line-chart"),
        WIDTH = 500,
        HEIGHT = 350,
        vis = div.append("svg")
          .attr("viewBox", "0 0 " + WIDTH + " " + HEIGHT)
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("preserveAspectRatio", "xMinYMin meet"),
        MARGINS = {
          top: 20,
          right: 50,
          bottom: 50, //20,
          left: 50
        },
        xScale = d3.time.scale().range([MARGINS.left, WIDTH - MARGINS.right]).domain([minTime, maxTime]),
        yScale = d3.scale.linear().range([HEIGHT - MARGINS.bottom, MARGINS.bottom]).domain([0, maxValue + 100]),
        xAxis = d3.svg.axis()
          .scale(xScale)
          .orient('botttom')
          .tickFormat(d3.time.format("%Y-%m-%d")),
        yAxis = d3.svg.axis()
          .scale(yScale)
          .orient("left");

    vis.append("svg:g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(35) translate(10, 0) scale(.8)")
      .style("text-anchor", "start");
    vis.append("svg:g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + (MARGINS.left) + ",0)")
      .call(yAxis);

    var lineGen = d3.svg.line()
          .x(function(d) {
            return xScale(d.day);
          })
          .y(function(d) {
            return yScale(d.value);
          });

    for (var fw in frameworkData) {
      vis.append('svg:path')
        .attr('d', lineGen(frameworkData[fw]))
        .attr('stroke', frameworkColor[fw])
        .attr('stroke-width', 2)
        .attr('fill', 'none');
    }
  });
}
