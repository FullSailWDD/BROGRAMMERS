console.log("Loaded db config file");
var mongoose = require("mongoose");		

mongoose.connect('mongodb://localhost/prorubs');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log('connection open');
});
