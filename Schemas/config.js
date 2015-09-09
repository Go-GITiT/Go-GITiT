  var mongoose = require('mongoose');

  var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/gitit';
  
  mongoose.connect(mongoURI);

  var db = mongoose.connection;
  db.on('error',console.error.bind(console,'connection error'));
  db.once('open',function(){
    console.log('Mongodb connection open');
  });

  module.exports = db;

