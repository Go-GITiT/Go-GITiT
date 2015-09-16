var mongoose = require('mongoose');

  // var api = require('../api.js');
  var mongoURI = process.env.MONGOLAB_URI || api.MONGO_DB;


mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
  console.log('Mongodb connection open');
});

module.exports = db;

