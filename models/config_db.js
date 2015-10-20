//load mongoose module
var mongoose = require("mongoose");
//link to stage mongolab server

var mongodbURL = process.env.MONGOLAB_URI || 'mongodb://localhost/prorubs';

//connect to mongo
mongoose.connect(mongodbURL);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log('connection open');
});
