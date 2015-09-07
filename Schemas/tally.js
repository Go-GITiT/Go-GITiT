var mongoose = require('mongoose');

var tallySchema = new mongoose.Schema(
  {
    tally: String,
    timestamp: Date 
  },
  {collection: 'tally'}
);

var Tally = mongoose.model('Tally', tallySchema);

module.exports.Tally = Tally;
