  var mongoose = require('mongoose');

  var repoSchema = new mongoose.Schema({
    repoName: String,
    file: String
  });

  var pageSchema = new mongoose.Schema({

    lastPage: Number

  });


  var Repo = mongoose.model('Repo', repoSchema);
  var Page = mongoose.model('Page', pageSchema);

  module.exports.Repo = Repo;

  module.exports.Page = Page;

