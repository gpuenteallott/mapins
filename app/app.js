 // Load the http module to create an http server.
var http = require('http');

var _ip = '0.0.0.0';
var _port = 8000;

var express = require('express'),
	partials = require('express-partials'),
	bodyParser = require("body-parser"); // for POST request parameters parsing into req.body automatically

var app = express();

app.set( 'view engine', 'ejs');
app.use( partials() );

// Returns middleware that only parses urlencoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json request parameters. BackboneJS sends params in json format by default
app.use(bodyParser.json());

// all routes are in controllers/routes.js
var routes = require('./server/controllers/routes')(app);

// set public directory for assets like css and js files
app.use(express.static(__dirname + '/public'));

// explicitly indicate views directory, as it was failing otherwise
app.set('views', __dirname + "/server/views");

// Listen on port 8000, IP defaults to 127.0.0.1
app.listen(_port, _ip, function(){
	// Put a friendly message on the terminal
	console.log(new Date() + ' - Server running at http://'+_ip+'/'+_port);
});