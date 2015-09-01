var jsdom = require("jsdom");

var githubUrl;

jsdom.env(
  ""+ githubUrl + "",
  ["http://code.jquery.com/jquery.js"],
  function(err, window) {
    window.$("script").each(function(i, v) {
      console.log("here is some script", window.$(v).attr('src'));
    });
  });

