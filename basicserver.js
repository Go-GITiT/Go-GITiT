var express = require('express');
var app = express(); // Defining server
var http = require('http');
var https = require('https');
var router = require('/basicrouting.js');

var port = 3000;
// For now, since you're running this server on your local machine,
// we'll have it listen on the IP address 127.0.0.1, which is a
// special address that always refers to localhost.
var ip = "127.0.0.1";
// We use node's http module to create a serv

console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
