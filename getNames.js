  var request = require("request");
  var fs = require('fs');
  var db = require('./config.js');
  var Repo = require('./repos.js').Repo;
  var QueryData = require('./queryData.js').QueryData;
  var api = require('./api.js');

  var fullnames;

  var info = Repo.find(function(err,data){

    if(err){
      throw err;

    } else {

      fullnames = data;
      getHtml();
    }

  });

  var getHtml = function() {
    var full_name = fullnames.pop().repo_name;
    if (fullnames.length > 0) {
      console.log(fullnames.length, ' --> ', full_name);
      var req = {
        url: "https://api.github.com/search/code?q=in:file+language:html+filename:index+repo:" + full_name,
        headers: {
          'User-Agent': api.API_NAME,
          'Authorization': api.API_TOKEN
        }
      };
      request(req, function(error, response, body) {
        if (error) {
          console.log(error);
        } else {}

        var bod = JSON.parse(body);
        fs.appendFile('log.txt', JSON.stringify(bod) + '\n', function(err) {
          if (err) throw err;
          if (bod.items !== undefined && bod.items.length > 0) {

            var i = 0;
            var saveUrlsToDB = function() {
              if (i < bod.items.length) {

                var data = bod.items[i];
                var url = data.html_url.replace('https://github.com', 'https://raw.githubusercontent.com').replace('/blob', '');

                var info = new Repo({
                  repoName: full_name,
                  file: url
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
      });
    }
  } ;
