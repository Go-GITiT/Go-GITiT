var Tally = require('../Schemas/tally.js').Tally;
var db = require('../Schemas/config.js');



var currentTally = function(callback){

Tally.find(function(err,data){
	var lastTally;

	if(err){
		throw err;
	} else {
		lastTally = JSON.parse(data[data.length-1].tally);
		callback(lastTally);
	}
});
};

module.exports.currentTally = currentTally;

