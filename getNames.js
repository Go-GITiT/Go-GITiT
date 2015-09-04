var request = require("request");
var fs = require('fs');
var db = require('./config.js');
var FetchedRepo = require('./fetchedRepos.js').FetchedRepo;
var QueryData = require('./queryData.js').QueryData;
var api = require('./api.js');

var fullnames;


var nameRetrieve = QueryData.find(function(err,data){

  if(err){
    throw err;

  } else {

    fullnames = data; //data array, retrieved from DB
    getHtml(); //
  }

});

var getHtml = function() {
  var full_name = fullnames.pop().repo_name;

  if (fullnames.length > 0) {
    var apiUser = process.env.GITHUB_API_NAME || api.API_NAME;
    var apiToken = process.env.GITHUB_API_TOKEN || api.API_TOKEN;
    var req = {
      url: "https://api.github.com/search/code?q=in:file+language:html+filename:index+repo:" + full_name,
      headers: {
        'User-Agent': apiUser,
        'Authorization': apiToken
      }
    };

    request(req, function(error, response, body) {
      if (error) {
        console.log(error);
      } 

      var bod = JSON.parse(body);

      if (bod.items !== undefined && bod.items.length > 0) {

        var i = 0;
        var saveUrlsToDB = function() {
          if (i < bod.items.length) {

            var data = bod.items[i];
            var url = data.html_url.replace('https://github.com', 'https://raw.githubusercontent.com').replace('/blob', '');

            var info = new FetchedRepo({
              repo_name: String,
              repo_url: String,
              file_url: String
            });

            info.save(function(err, data) {
              if (err) {
                throw err;
              } else {
                console.log('Saved!');
              }

              i++;
              saveUrlsToDB();
            });
          } else {
            setTimeout(getHtml.bind(this), 2500);
          }
        };

        saveUrlsToDB();
      } else {
        setTimeout(getHtml.bind(this), 2500);
      }

    });
  }
};
