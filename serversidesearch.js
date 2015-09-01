// SERVER SIDE REPOSITORY SEARCH

var htmlparser = require("htmlparser2");

// create a single list of frameworks that we are searching for
	// needs to ignore version and source differences for frameworks
	// create a single document that tracks the count of framework occurences in repos by framework

var libraryCollection = {
	React : 0,
	Angular: 0,
	Ember: 0,
	Backbone: 0,
	Mithril: 0,
	Polymer: 0,
	Flight: 0,
	Capuccino: 0,
	Spine: 0,
	Aurelia: 0
};

// regex line breaks, white space, double quotes to singles quotes
// Save the stringified html content to a variable
// pull all text between "/*.js"
// compare libary against list
// increment appropriate value

// for html files write a finder function that iterates through all script tags
	// will find all src files ending in .js, both local, api, and cdnjs hosted
	// will check each file against a list of framework by name
	// if there is a match, the count for that framework increments

// for package.json files write a finder function that iterates through all dependencies
	// will find all dependencies that exist the a list of frameworks by name
	// upon match, the count for that framework increments

// for bower.json files write a finder function that iterates through all dependencies
	// will find all dependencies that exist in a list of frameworks by name
	// upon match, the count for that framework increments

// for browserify files write a finder function that iterates through all dependencies
	// will find all dependencies that exist in a list of libraries by name
	// upon match, the count for that library increments

// write a function that iterates through each repository, running our finder functions on them
	// can only increment a library's count once for each repository
	// updates the count in our database 