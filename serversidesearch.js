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

// var htmlparser = require("htmlparser2");
// var parser = new htmlparser.Parser({
//     onopentag: function(name, attribs){
//         if(name === "script" && attribs.type === "text/javascript"){
//             console.log("JS! Hooray!");
//         }
//     },
//     ontext: function(text){
//         console.log("-->", text);
//     },
//     onclosetag: function(tagname){
//         if(tagname === "script"){
//             console.log("That's it?!");
//         }
//     }
// }, {decodeEntities: true});

var rawHtml = "<!doctype html>\
<html lang='en'>\
  <head>\
    <meta charset='utf-8'>\
    <meta name='viewport' content='width=device-width, initial-scale=1'>\
    <title>Relay • Star Wars</title>\
  </head>\
  <body>\
    <div id='root'></div>\
    <script type='text/javascript'>\
      // Force `fetch` polyfill to workaround Chrome not displaying request body\
      // in developer tools for the native `fetch`.\
      self.fetch = null;\
      function warnRelayMissing() {\
        document.body.innerHTML = (\
          '<h2>Could not find relay.js</h2>' +\
          '<p>' +\
            'Be sure to run <code>npm run build</code> ' +\
            'in the <code>relay/</code> directory.' +\
          '</p>'\
        );\
      }\
    </script>\
    <script src='http://localhost:3000/webpack-dev-server.js'></script>\
    <script src='node_modules/react/dist/react.min.js'></script>\
    <script src='node_modules/react-relay/dist/relay.js' onerror='warnRelayMissing()'></script>\
    <script src='js/app.js'></script>\
  </body>\
</html>";

var handler = new htmlparser.DomHandler(function (error, dom) {
    if (error){
		console.log(error);
    } else {
        console.log(dom);
    }
});
var parser = new htmlparser.Parser(handler);
parser.write(rawHtml);
parser.done();
// regex line breaks, white space, double quotes to singles quotes
// Save the stringified html content to a variable
// pull all text between "/*.js"
// compare libary against list
// increment appropriate value


// parser.write("<!doctype html>\
// <html lang='en'>\
//   <head>\
//     <meta charset='utf-8'>\
//     <meta name='viewport' content='width=device-width, initial-scale=1'>\
//     <title>Relay • Star Wars</title>\
//   </head>\
//   <body>\
//     <div id='root'></div>\
//     <script type='text/javascript'>\
//       // Force `fetch` polyfill to workaround Chrome not displaying request body\
//       // in developer tools for the native `fetch`.\
//       self.fetch = null;\
//       function warnRelayMissing() {\
//         document.body.innerHTML = (\
//           '<h2>Could not find relay.js</h2>' +\
//           '<p>' +\
//             'Be sure to run <code>npm run build</code> ' +\
//             'in the <code>relay/</code> directory.' +\
//           '</p>'\
//         );\
//       }\
//     </script>\
//     <script src='http://localhost:3000/webpack-dev-server.js'></script>\
//     <script src='node_modules/react/dist/react.min.js'></script>\
//     <script src='node_modules/react-relay/dist/relay.js' onerror='warnRelayMissing()'></script>\
//     <script src='js/app.js'></script>\
//   </body>\
// </html>");
// parser.end();



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