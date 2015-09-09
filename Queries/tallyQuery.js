var Tally = require('../Schemas/tally.js').Tally;
var db = require('../Schemas/config.js');

var currentTally;

Tally.find(function(err,data){

	if(err){
		throw err;
	} else {
		currentTally = JSON.parse(data[data.length-1].tally);
		
	}


});

if(currentTally){
	module.exports.currentTally = currentTally;
}
