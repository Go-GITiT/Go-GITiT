var Tally = require('../Schemas/tally.js').Tally;
var db = require('../Schemas/config.js');
Tally.find(function(err,data){

  if(err){
    throw err;
  }

  // console.log(data);
});

