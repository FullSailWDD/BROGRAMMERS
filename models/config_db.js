console.log("Loaded db config file");
var mongoose = require("mongoose");
//link to stage mongolab server

//mongoose.connect('mongodb://prorubsstage:kfK69bP2MbJapLVy@dbh11.mongolab.com:27117/heroku_w63r32w2');

//link to local mongodb
mongoose.connect('mongodb://localhost/prorubs');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log('connection open');
});
