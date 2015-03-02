// Nook Harquail
//

var express = require("express");
var logfmt = require("logfmt");
var app = express();
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded() ); // to support URL-encoded bodies
var http = require('http'); //the variable doesn't necessarily have to be named http
app.use(logfmt.requestLogger());

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
           console.log("Listening on " + port);
           });
