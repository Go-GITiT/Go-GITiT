  var mongoose = require('mongoose');

  var fetchedRepoSchema = new mongoose.Schema(
  {
    repo_name: String,
    repo_url: String,
    file_url: {type: String, unique: true}
  },
  {collection: 'fetchedRepo'});

  var FetchedRepo = mongoose.model('FetchedRepo', fetchedRepoSchema);

  module.exports.FetchedRepo = FetchedRepo;


