  var mongoose = require('mongoose');

  var repoSchema = new mongoose.Schema(
  {
    repo_name: String,
    repo_url: String
  },
  {collection: 'testing'});

  var Repo = mongoose.model('Repo', repoSchema);

  module.exports.Repo = Repo;


