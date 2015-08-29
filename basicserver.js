var http = require("http");
var request = require("request");

// import our handle request function
var HandleRequest = require("request-handler");
var handleRequest = HandleRequest.requestHandler;

var port = 3000;

// For now, since you're running this server on your local machine,
// we'll have it listen on the IP address 127.0.0.1, which is a
// special address that always refers to localhost.
var ip = "127.0.0.1";
// We use node's http module to create a server.
//
// The function we pass to http.createServer will be used to handle all
// incoming requests.
// 
// After creating the server, we will tell it to listen on the given port and IP. */
var server = http.createServer(handleRequest);

console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
