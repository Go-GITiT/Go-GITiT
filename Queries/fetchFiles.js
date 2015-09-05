var request = require("request");
var fs = require('fs');
var db = require('../Schemas/config.js');
var FetchedRepo = require('../Schemas/fetchedRepos.js').FetchedRepo;
var QueryData = require('../Schemas/queryData.js').QueryData;
var pubnubPublishKey = process.env.PUBNUB_PUBLISH_KEY || api.PUBNUB_PUBLISH_KEY;
var pubnubSubscribeKey = process.env.PUBNUB_SUBSCRIBE_KEY || api.PUBNUB_SUBSCRIBE_KEY;
var pubnub = require("pubnub")({
  ssl: true, // <- enable TLS Tunneling over TCP
  publish_key: pubnubPublishKey,
  subscribe_key: pubnubSubscribeKey
});
//var api = require('./api.js');

var fullnames;

var retrieveFiles = function() {
  QueryData.find(function(err, data) {

    if (err) {
      throw err;

    } else {

      fullnames = data; //data array, retrieved from DB
      getHtml(); //
    }

  });
};

var getHtml = function() {
  var repoObj = fullnames.pop();

  if (fullnames.length > 0) {
    var apiUser = process.env.GITHUB_API_NAME || api.API_NAME;
    var apiToken = process.env.GITHUB_API_TOKEN || api.API_TOKEN;
    var req = {
      url: "https://api.github.com/search/code?q=in:file+language:html+filename:index+repo:" + repoObj.repo_name,
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
              repo_name: repoObj.repo_name,
              repo_url: repoObj.repo_url,
              file_url: url
            });

            info.save(function(err) {
              if (err) {
                throw err;
              } else {
                console.log('Saved!');
                QueryData.find({
                  repo_name: repoObj.repo_name
                }).remove().exec();
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

        QueryData.find({
          repo_name: repoObj.repo_name
        }).remove().exec();
        
        setTimeout(getHtml.bind(this), 2500);
      }

    });
  }else{
    emitPubNubEvent();
  }
};

// LISTEN ON PUBNUB MESSAGES !
pubnub.subscribe({
  channel: "gitit_messages",
  callback: function(message) {
    console.log("fetchFilesWorker > ", message);
    if (message.type === 'bigQueryWorker_job_complete') {
      retrieveFiles();
    }
  }
});

var emitPubNubEvent = function() {
  var message = {
    "type": "fetchFilesWorker_job_complete"
  };

  pubnub.publish({
    channel: 'gitit_messages',
    message: message,
    callback: function(e) {
      console.log("SUCCESS!", e);
    },
    error: function(e) {
      console.log("FAILED! RETRY PUBLISH!", e);
    }
  });
};
