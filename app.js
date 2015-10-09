//Modules
var express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	exphbs  = require('express-handlebars'),
	mongoose = require('mongoose');
	
mongoose.connect('mongodb://westindev:ratio.1.61803@ds035014.mongolab.com:35014/heroku_2ngprfz7');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log("connection open");
});

var port = process.env.PORT || 8080;

app.get('/', function(req, res){
	res.send("Hello, World");
});

app.listen(port);

console.log("Server running on port: ", port);