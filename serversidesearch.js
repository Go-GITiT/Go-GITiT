
var http = require("http");
var request = require("request");

String.prototype.contains = function(str, ignoreCase) {
	return (ignoreCase ? this.toUpperCase() : this)
	.indexOf(ignoreCase ? str.toUpperCase() : str) >= 0;
};
// sample url just for testing
var githubUrl = 'https://raw.githubusercontent.com/facebook/relay/2a86be3e71cdc6511fa994e3de539f72070da1b4/examples/star-wars/public/index.html';
// REGEX /\S*.js\w*/gi 


var parseForJS = function(url){
	var result;
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
		// create an object to track framework occurences
		if (!error && response.statusCode == 200) {
				// parse raw html for all strings ending in js 
				var test = body.match(/\S*.js\w*/gi);
			// console.log(test);

			for(var i = 0; i < test.length; i++){
				// loop through the array of matches
				test[i] = test[i].match(/[^/]*$/gi);
				var foundlib = test[i][0];
				console.log('JS file found in Repo', foundlib);
				for(var key in repoData.libraryCollection){
					// compare each framework in our collection 
					// to see if that string is contained in our js strings
					if(foundlib.contains(key, true)){
						repoData.libraryCollection[key] = true;
						// set that framework to true indicating use
					}
				}
			}
			console.log("Repo framework stats : ", repoData);
	// will show accurate data, but can't save it asnyc yet
	// need to handle async issue to return repoData obj after execution of search
}
});
};

parseForJS(githubUrl);
