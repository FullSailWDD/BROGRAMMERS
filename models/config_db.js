console.log("Loaded db config file");
var mongoose = require("mongoose");

mongoose.connect('mongodb://prorubsstage:kfK69bP2MbJapLVy@dbh11.mongolab.com:27117/heroku_w63r32w2');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log('connection open');
});
