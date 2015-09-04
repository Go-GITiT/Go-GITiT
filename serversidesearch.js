
var http = require("http");
var request = require("request");
var db = require('./config.js');
var FetchedRepo = require('./fetchedRepos.js').FetchedRepo;
var Result = require('./result.js').Result;

String.prototype.contains = function(str, ignoreCase) {
	return (ignoreCase ? this.toUpperCase() : this)
	.indexOf(ignoreCase ? str.toUpperCase() : str) >= 0;
};
// sample url just for testing
// REGEX /\S*.js\w*/gi 
var repoObjs;

var urlRetrieve = FetchedRepo.find(function(err, data){
	if(err){
		throw err;
	} else {
		repoObjs = data;
		repoObjs.forEach(function(item){
			var repo = item;
			parseForJS(repo.repo_url);
		});
		}
	}
);

var parseForJS = function(url){
	var result;
	var repoData = {
		repoLink : url,
		libraryCollection: {
			react : false,
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
	request(url, function (error, response, body) {
		// create an object to track framework occurences
		if (!error && response.statusCode == 200) {
				// parse raw html for all strings ending in js 
				var test = body.match(/\S*.js\w*/gi);
			// console.log(test);

			for(var i = 0; i < test.length; i++){
				// loop through the array of matches
				test[i] = test[i].match(/[^/]*$/gi);
				var foundlib = test[i][0];

				for(var key in repoData.libraryCollection){
					// compare each framework in our collection 
					// to see if that string is contained in our js strings
					if(foundlib.contains(key, true)){
						repoData.libraryCollection[key] = true;
						// set that framework to true indicating use
					}
				}
			}

			var repoStats = new Result({
				repo_name: repo.repo_name,
				repo_url: repo.repo_url,
				file_url: repo.file_url,
				repo_data: repoData

			});
		}
	});
};
