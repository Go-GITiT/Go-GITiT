var express = require('express');//Requiring express JS for easy routing
var router = express.Router(); //Creating the router
var url = require('url'); // URL handling
var async = require('async-series'); // Async JS for handling async operations
var path = require('path'); // For resolving path names
var request = require('request'); // Request JS for simple API calls