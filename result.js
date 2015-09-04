var mongoose = require('mongoose');

  var resultsSchema = new mongoose.Schema(
  {
    repo_name: String,
    repo_url: String,
    file_url: String,
    repo_data: String

  },
  {collection: 'results'});

  var Results = mongoose.model('Results', resultsSchema);

  module.exports.Results = Results;
