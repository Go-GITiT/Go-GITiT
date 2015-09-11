var request = require("request");
var FetchedRepo = require('../Schemas/fetchedRepos.js').FetchedRepo;
var Results = require('../Schemas/result.js').Results;
//var api = require('../api.js');
var db = require('../Schemas/config.js');

var pubnubPublishKey = process.env.PUBNUB_PUBLISH_KEY || api.PUBNUB_PUBLISH_KEY;
var pubnubSubscribeKey = process.env.PUBNUB_SUBSCRIBE_KEY || api.PUBNUB_SUBSCRIBE_KEY;
var pubnub = require("pubnub")({
  ssl: true, // <- enable TLS Tunneling over TCP
  publish_key: pubnubPublishKey,
  subscribe_key: pubnubSubscribeKey
});

String.prototype.contains = function(str, ignoreCase) {
  return (ignoreCase ? this.toUpperCase() : this)
    .indexOf(ignoreCase ? str.toUpperCase() : str) >= 0;
};
// sample url just for testing
// REGEX /\S*.js\w*/gi 
var repoObjs;
var numFilesToParse;
var reposFound = [];

var parseFiles = function() {
  FetchedRepo.find(function(err, data) {
    if (err) {
      throw err;
    } else {
      repoObjs = data;
      numFilesToParse = repoObjs.length;
      var interval = setInterval(function(){
        if(repoObjs.length > 0){
          parseForJS(repoObjs.pop());
        } else {
          clearInterval(interval);
          emitPubNubEvent();
        }
      }, 100);
    }
  });
};

var parseForJS = function(obj) {
  var result;
  var repoData = {
    repoLink: obj.file_url,
    libraryCollection: {
      react: false,
      angular: false,
      ember: false,
      backbone: false,
      mithril: false,
      polymer: false,
      flight: false,
      capuccino: false,
      spine: false,
      aurelia: false
    }
  };
  request(obj.file_url, function(error, response, body) {
    // create an object to track framework occurences
    if (!error && response.statusCode == 200) {
      // parse raw html for all strings ending in js 
      if(obj.file_url.match(/package\.json/) !== null && reposFound.indexOf(obj.repo_namei + 'h') === -1){
        body = JSON.parse(body);
	      var dependencies = body.dependencies;
        for(var dep in dependencies){
          // loop through our comparators
			    for(var key in repoData.libraryCollection){
				    if(dep.contains(key, true)){
					    reposFound.push(obj.repo_name + 'j');
              repoData.libraryCollection[key] = true;
              console.log('STORING PACKAGE: ' + obj.repo_name);
					    // flag comparator as true if found
				    }
			    }
		    }
      } 
      
      if(obj.file_url.match(/index\.html/) !== null && reposFound.indexOf(obj.repo_name + 'j') === -1) {
        var test = body.match(/\S*.js\w*/gi);
        if (test !== null) {
          for (var i = 0; i < test.length; i++) {
            // loop through the array of matches
            test[i] = test[i].match(/[^/]*$/gi);
            var foundlib = test[i][0];
            for (var key2 in repoData.libraryCollection) {
              // compare each framework in our collection 
              // to see if that string is contained in our js strings
              if (foundlib.contains(key2, true)) {
                repoData.libraryCollection[key2] = true;
                reposFound.push(obj.repo_name = 'h');
                // set that framework to true indicating use
                console.log('STORING INDEX: ' + obj.repo_name);
              }
            }
          }
        }
      }
      
      var repoStats = new Results({
        repo_name: obj.repo_name,
        repo_url: obj.repo_url,
        file_url: obj.file_url,
        repo_data: JSON.stringify(repoData)
      });
      repoStats.save(function(err) {
        if(err){
          console.log('Ignoring duplicate entry');
        }
        FetchedRepo.find({
          repo_name: obj.repo_name
        }).remove(function(){
          numFilesToParse --;
        }).exec();
      });
    }
  });
};

// LISTEN ON PUBNUB MESSAGES !
pubnub.subscribe({
  channel: "gitit_messages",
  callback: function(message) {
    console.log("parseReposWorker > ", message);
    if (message.type === 'fetchFilesWorker_job_complete') {
      parseFiles();
    }
  }
});

var emitPubNubEvent = function() {
  var message = {
    "type": "parseReposWorker_job_complete"
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

