var express = require('express');
var app = express();
var currentTally = require('../Queries/tallyQuery.js').currentTally;
var snapshots = require('../Queries/tallyQuery.js').snapshots;
var db = require('../Schemas/config.js');
var path = require('path');

app.use(express.static('../Client'));

var port = process.env.PORT || 1111;

app.listen(port, function() {
  console.log("We have started our server on port " + port);
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../Client', 'index.html'));
});

app.get('/d3DataViz.js', function(req, res) {
  res.sendFile(path.join(__dirname, '../Client', 'd3DataViz.js'));
});

app.get('/tally', function(req, res) {
  currentTally(function(tally) {
    res.send(JSON.stringify(tally));
  });
});

app.get('/snapshots', function(req, res) {
  snapshots(function(snaps) {
    res.send(snaps);
  });
});
