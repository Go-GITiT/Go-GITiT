// jsonParser.js
String.prototype.contains = function(str, ignoreCase) {
	return (ignoreCase ? this.toUpperCase() : this)
	.indexOf(ignoreCase ? str.toUpperCase() : str) >= 0;
};

var jsonParser = function(JSON){
	var dependencies = JSON[dependencies];
	
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
		// loop through the dependencies
		for(var dep in dependencies){
			for(var key in repoData){
				if(dep.contains(key, true)){
					repoData.libraryCollection[key] = true;
				}
			}
		}
};