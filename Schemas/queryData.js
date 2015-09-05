var mongoose = require('mongoose');

  var queryDataSchema = new mongoose.Schema(
  {
    repo_name: String,
    repo_url: String
  },
  {collection: 'queryData'});

  var QueryData = mongoose.model('QueryData', queryDataSchema);

  module.exports.QueryData = QueryData;


