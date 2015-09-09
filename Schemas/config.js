  var mongoose = require('mongoose');

  var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost:3000';
  mongoose.connect(mongoURI);

  var db = mongoose.connection;
  db.on('error',console.error.bind(console,'connection error'));
  db.once('open',function(){
    console.log('Mongodb connection open');
  });

  module.exports = db;

