var request = require("request");
var Results = require('../Schemas/result.js').Results;
//var api = require('../api.js');
var db = require('../Schemas/config.js');
String.prototype.contains = function(str, ignoreCase) {
  return (ignoreCase ? this.toUpperCase() : this)
    .indexOf(ignoreCase ? str.toUpperCase() : str) >= 0;
};
var total;
var count = 0;

Results.find(function(err, data){
  if(err){
    throw err;
  } else {
    total = data.length;
    var interval = setInterval(function(){
      if(data.length > 0){
        var currRepo = data.pop(); 
        parseForJS(currRepo);
      } else {
        clearInterval(interval); // CLEARS THE INTERVAL WHEN THE REPOOBJS ARRAY IS EMPTY 
        setTimeout(db.close, 3000);
      }
    }, 100);
  }
});

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
      'objective-j': false,
      spine: false,
      knockout: false
    }
  };
  
  request(obj.file_url, function(error, response, body) {
    // create an object to track framework occurences
    if(error){
      console.log(error);
    }
    if (!error && response.statusCode == 200) {
      // parse raw html for all strings ending in js 
      if(obj.file_url.match(/package\.json/) !== null){
	      var dependencies = body.dependencies;
        for(var dep in dependencies){
          // loop through our comparators
			    for(var key in repoData.libraryCollection){
			    if(dep.contains(key, true)){
              repoData.libraryCollection[key] = true;
              console.log('STORING PACKAGE: ' + obj.repo_name);
					    // flag comparator as true if found
				    }
			    }
		    }
      } 
      
      if(obj.file_url.match(/index\.html/) !== null) {
        var test = body.match(/\S*.js\w*/gi);
        console.log(test);
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
                // set that framework to true indicating use
                console.log('STORING INDEX: ' + obj.repo_name);
              }
            }
          }
        }
      }
      
      Results.update({"_id":obj._id},{"repo_data":JSON.stringify(repoData)}, function(err, data){
        if(err) {
          console.log(err);
        }
        console.log('record ', ++count, ' of ', total);
      });
    }
  });
}; 

