var Tally = require('../Schemas/tally.js').Tally;
var db = require('../Schemas/config.js');

var currentTally = function(callback) {
  Tally.find(function(err, data) {
    var lastTally;

    if (err) {
      throw err;
    } else {
      lastTally = JSON.parse(data[data.length - 1]);
      callback(lastTally);
    }
  });
};

var snapshots = function(callback) {
  Tally.find(function(err, data){
    if(err) throw err;
    callback(data);
  });
};

module.exports.currentTally = currentTally;
module.exports.snapshots = snapshots;
