
var http = require("http");
var request = require("request");

String.prototype.contains = function(str, ignoreCase) {
	return (ignoreCase ? this.toUpperCase() : this)
	.indexOf(ignoreCase ? str.toUpperCase() : str) >= 0;
};

var githubUrl = 'https://raw.githubusercontent.com/facebook/relay/2a86be3e71cdc6511fa994e3de539f72070da1b4/examples/star-wars/public/index.html';
var tests = [];
// REGEX /\S*.js\w*/gi 

var parseForJS = function(url){
		var repoData = {
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

		if (!error && response.statusCode == 200) {
			var test = body.match(/\S*.js\w*/gi);
		// console.log(test);
		for(var i = 0; i < test.length; i++){
			test[i] = test[i].match(/[^/]*$/gi);
			var foundlib = test[i][0];
			for(var key in repoData.libraryCollection){
				if(foundlib.contains(key, true)){
					repoData.libraryCollection[key] = true;
				}
			}
		}
	tests.push(repoData);
	console.log(tests);
	}
});
};

parseForJS(githubUrl);
