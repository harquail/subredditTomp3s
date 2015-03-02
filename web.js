// Nook Harquail
//

var sleep = require("sleep");
var express = require("express");
var logfmt = require("logfmt");
var rereddit = require("rereddit");
var ydl = require("ydl");
var fs = require('fs')
var winston = require('winston');
var wait = require('wait.for');

var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded()); // to support URL-encoded bodies
var http = require('http'); //the variable doesn't necessarily have to be named http
app.use(logfmt.requestLogger());


winston.add(winston.transports.File, {
  filename: 'somefile.log'
});
//'t3_2xi97n'
//takes an argument starting 
downloadASMRSounds(process.argv[2]);



function downloadASMRSounds(startPost) {
 
  // youtube download error handler
  ydl.error(function() {
    console.log('[STATUS] FAIL Fetch URL');
  });


  //get 100 posts from the asmr subreddit
  //try starting with top posts
  rereddit.read('asmr').limit(100).end(function(err, posts) {

    for (i in posts.data.children) {

      //
      var title = posts.data.children[i]["data"]["title"].toLowerCase();
      //regex to find tags in brakets
      var tags = title.match(/[^[\]]+(?=])/g)
      var url = posts.data.children[i]["data"]["url"];outube 
      //translate shortened youtube urls into full urls
      url = url.replace("youtu.be/", "youtube.com/watch?v=");
      url = url.replace("https://", "http://");

      //if there's a youtube video
      if (url.indexOf("youtu") > -1) {

        //log its tags and url                     
        var dict = {};
        dict['tags'] = tags;
        dict['url'] = url;
        winston.log('info', dict);

        try {
          //download the video and turn it into an mp3 file using ffmpeg
          ydl.exec(url, "mp3", function(filename) {
            console.log('[STATUS] Success fetch filename : ' + filename);
          });
        } catch (ex) {

        }
      }
    }

    console.log("LAST:" + posts.data.after);

  });

};
