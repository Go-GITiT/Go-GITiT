  var mongoose = require('mongoose');

  var mongoURI = process.env.MONGOLAB_URI || 'mongodb://heroku_bmkn0cw7:9qnkmthdbkodud914ks46ln1gh@ds035563.mongolab.com:35563/heroku_bmkn0cw7';

  mongoose.connect(mongoURI);

  var db = mongoose.connection;
  db.on('error',console.error.bind(console,'connection error'));
  db.once('open',function(){
    console.log('Mongodb connection open');
  });

  module.exports = db;

