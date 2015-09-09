var express = require('express');
var app = express();
var currentTally = require('../Queries/tallyQuery.js').currentTally;
var db = require('../Schemas/config.js');
var path = require('path');

app.use(express.static('../Client'));

var server=app.listen(3000, function(){
console.log("We have started our server on port 3000");
db.once('open', function(){
	currentTally(function(tally){
		console.log(tally);
	});
});
});

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '../Client', 'Gitit.html'));
});