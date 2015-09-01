var jsdom = require("jsdom");
var http = require("http");
var request = require("request");

var githubUrl = 'https://raw.githubusercontent.com/facebook/relay/2a86be3e71cdc6511fa994e3de539f72070da1b4/examples/star-wars/public/index.html';

// jsdom.env(
//   "" + githubUrl + "",
//   function(err, window) {
//     window.$("script").each(function(i, v) {
//       console.log("here is some script", window.$(v).attr('src'));
//     });
//   });
var libraryCollection = {
	react : 0,
	angular: 0,
	ember: 0,
	backbone: 0,
	mithril: 0,
	polymer: 0,
	flight: 0,
	capuccino: 0,
	spine: 0,
	aurelia: 0
};
// REGEX /\S*.js\w*/gi 

var foundLibs = [];

request(githubUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
		var test = body.match(/\S*.js\w*/gi);
		// console.log(test);
		for(var i = 0; i < test.length; i++){
			test[i] = test[i].match(/[^/]*$/gi);
			foundLibs.push(test[i][0]);
			// if(test[i]){
			// if string in that array contains any of our library names, increment that name

			// }
		}
		console.log(foundLibs);
   }
});
