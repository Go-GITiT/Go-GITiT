var request = require("request");
var fs = require('fs');
var db = require('./config.js');
var Repo = require('./repos.js').Repo;
var api = require('./api.js');
var Promise = require("bluebird");

Promise.promisifyAll(request);

var i = 0;
var fullnames = [];

function getName() {

  if (i < 11) {
    var req = {
      url: 'https://api.github.com/search/repositories?q=language:JavaScript+created:>2015-01-01&sort=stars&page=' + i,
      headers: {
        'User-Agent': api.API_NAME,
        'Authorization': api.API_TOKEN
      }
    };

    var registerNames = function(error, response, body) {
      console.log(i);
      var bod = JSON.parse(body);
      bod.items.forEach(function(data) {
        if (data.full_name !== undefined) {
          //getHtml(data.full_name);
          fullnames.push(data.full_name);
        }
      });

      i++;
      getName();
    };

    request(req, registerNames);
  } else {
    getHtml();
  }
}
getName();



var getHtml = function() {
  var full_name = fullnames.pop();
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
};
