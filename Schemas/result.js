var mongoose = require('mongoose');

  var resultsSchema = new mongoose.Schema(
  {
    repo_name: String,
    repo_url: String,
    file_url: {type: String, unique: true},
    repo_data: String

  },
  {collection: 'results'});

  var Results = mongoose.model('Results', resultsSchema);

  module.exports.Results = Results;
