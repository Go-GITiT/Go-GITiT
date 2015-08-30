
var request = require("request");
var fs = require('fs');
var db = require('./config.js');
var Repo = require('./repos.js').Repo;
var api = require('./api.js');
for (var i = 0; i < 11; i++) {

  var req = {
    url: 'https://api.github.com/search/repositories?q=language:JavaScript+created:>2015-01-01&sort=stars&page='+i,
    headers: {
      'User-Agent': api.API_NAME,
      'Authorization': api.API_TOKEN
    }
  };

  request(req,function(error,response,body){
    var bod = JSON.parse(body);
    bod.items.forEach(function(data){
      // console.log(i)
      getHtml(data.full_name);

    });
  });

}

var getHtml = function(full_name){
  req = {
    url: "https://api.github.com/search/code?q=in:file+language:html+filename:index+repo:" + full_name,
    headers: {
      'User-Agent': api.API_NAME,
      'Authorization': api.API_TOKEN
    }
  };
  request(req, function(error, response, body){
    var bod = JSON.parse(body);

    if(bod.items !== undefined && bod.items.length > 0){

      bod.items.forEach(function(data){
        var url = data.html_url.replace('https://github.com', 'https://raw.githubusercontent.com').replace('/blob', '');

        console.log(url);

            var info = new Repo({
              repoName: full_name,
              file: url
            });

            info.save(function(err,data){
              if(err) throw err;
              else console.log('Saved!');
            });

        fs.appendFile('url.txt',url+'\n',function(err){
          if(err) throw err;
          // console.log('IS WRITTEN!')
        });

      });
    } 
  });
};



