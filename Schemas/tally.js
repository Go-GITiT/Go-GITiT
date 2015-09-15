var mongoose = require('mongoose');

var tallySchema = new mongoose.Schema(
  {
    tally: String,
    timestamp: Date,
    totals: {
      total: Number,
      indices: Number,
      packages: Number
    }
  },
  {collection: 'tally'}
);

var Tally = mongoose.model('Tally', tallySchema);

module.exports.Tally = Tally;
