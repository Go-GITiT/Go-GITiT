var initBubbleChart = function() {

  var data; // a global
  var maxBubbles = 200;
  var scaleFactor;
  var width = 500,
      height = 350,
      padding = 0.3, // separation between same-color nodes
      clusterPadding = 2, // separation between different-color nodes
      maxRadius = 10,
      m = Object.keys(frameworkColor).length; // number of distinct clusters

  // need to distinguish color by framework
  var color = d3.scale.category20()
        .domain(d3.range(m));

  // The largest node for each cluster.
  var clusters = new Array(m);

  var nodes = [];
  var createNodes = function(n, framework) {
    n = Math.ceil(n / scaleFactor);
    var newNodes = d3.range(n).map(function() {
      // determines which cluster/color/framework each node belongs to
      var i = framework, // which cluster/color, need to change to framework
          r = 10, // size
          d = {
            cluster: i,
            radius: r,
            type: framework
          }; // individual nodes that will be individual bubbles
      if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
      return d;
    });
    nodes.push(newNodes);
  };

  var resultCountColor = function(key, value) {
    var keyCount = $("<span>").append("" + key + ": " + value + "<br>" + "").css("color", frameworkColor[key]);
    $("#statCounts").append(keyCount);
  };

  d3.json("/tally", function(error, data) {
    if (error) return console.warn(error);

    // sum number of hits
    var sum = 0;
    for (var key in data) {
      sum += data[key];
    }

    //calculate scale factor
    scaleFactor = 5 * (Math.round((sum / maxBubbles) / 5));
    $('#scaleFactor').text(scaleFactor);

    var sortedResults = []; // sorting the results based on occurrences
    for(var frame in data){
      var curr = {};
      curr[frame] = data[frame];
      sortedResults.push(curr);
    }
    
    sortedResults.sort(function(a, b){
      return b[Object.keys(b)[0]] - a[Object.keys(a)[0]];
    });

    sortedResults.forEach(function(val){
      var frame = Object.keys(val)[0];
      resultCountColor(frame, val[frame]);
      createNodes(val[frame], frameworkColor[frame]);
    });

    var merged = [];
    merged = merged.concat.apply(merged, nodes);
    visualize(merged);
  });

  var visualize = function(nodes) {
    d3.layout.pack()
      .sort(null)
      .size([width, height])
      .children(function(d) {
        return d.values;
      })
      .value(function(d) {
        return d.radius * d.radius;
      })
      .nodes({
        values: d3.nest()
          .key(function(d) {
            return d.cluster;
          })
          .entries(nodes)
      });

    var force = d3.layout.force()
          .nodes(nodes)
          .size([width, height])
          .gravity(0.05)
          .charge(0.1)
          .on("tick", tick)
          .start();

    var svg = d3.select("#bubble-chart").append("svg")
          .attr("viewBox", "0 0 " + width + " " + height)
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("preserveAspectRatio", "xMinYMin meet");

    var node = svg.selectAll("circle")
          .data(nodes)
          .enter().append("circle")
          .style("fill", function(d) {
            return d.type;
          })
          .call(force.drag)
          .on("mousedown", function() {
            d3.event.stopPropagation();
          });

    node.transition()
      .duration(750)
      .delay(function(d, i) {
        return i * 5;
      })
      .attrTween("r", function(d) {
        var i = d3.interpolate(2, d.radius);
        return function(t) {
          return d.radius = i(t);
        };
      });
    // function giving nodes location attributes
    function tick(e) {
      node
        .each(cluster(10 * e.alpha * e.alpha))
        .each(collide(0.15))
        .attr("cx", function(d) {
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y;
        });
    }

    // Move d to be adjacent to the cluster node.
    function cluster(alpha) {
      return function(d) {
        var cluster = clusters[d.cluster];
        if (cluster === d) return;
        var x = d.x - cluster.x,
            y = d.y - cluster.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + cluster.radius;
        if (l != r) {
          l = (l - r) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          cluster.x += x;
          cluster.y += y;
        }
      };
    }

    // Resolves collisions between d and all other circles.
    function collide(alpha) {
      var quadtree = d3.geom.quadtree(nodes);
      return function(d) {
        var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
            nx1 = d.x - r,
            nx2 = d.x + r,
            ny1 = d.y - r,
            ny2 = d.y + r;
        quadtree.visit(function(quad, x1, y1, x2, y2) {
          if (quad.point && (quad.point !== d)) {
            var x = d.x - quad.point.x,
                y = d.y - quad.point.y,
                l = Math.sqrt(x * x + y * y),
                r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
            if (l < r) {
              l = (l - r) / l * alpha;
              d.x -= x *= l;
              d.y -= y *= l;
              quad.point.x += x;
              quad.point.y += y;
            }
          }
          return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
      };
    }
  };
};
