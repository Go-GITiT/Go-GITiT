var express = require('express');
var app = express();
var currentTally = require('../Queries/tallyQuery.js').currentTally;
var db = require('../Schemas/config.js');
var path = require('path');

app.use('/', express.static('../Client'));

var port = process.env.PORT || 1111;

app.listen(port, function(){
console.log("We have started our server on port " + port);

});

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '../Client', 'Gitit.html'));
});

app.get('/tally', function(req, res){
	var tally;
	currentTally(function(tally){
	res.send(JSON.stringify(tally));
	});
});
