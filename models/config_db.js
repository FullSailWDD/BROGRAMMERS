console.log("Loaded db config file");
var mongoose = require("mongoose");

//link to stage mongolab server
mongoose.connect('mongodb://prorubsprod:ywHfCqDCpegb7UFg@ds035004.mongolab.com:35004/heroku_p7341ngf');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log('connection open');
});
