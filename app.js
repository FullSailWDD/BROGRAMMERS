console.log('Loaded app.js');
// Modules
var express = require('express'),
	app 	= express(),
	exphbs  = require('express-handlebars');

// View engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/templates', express.static('templates'));
app.use(express.static(__dirname + '/public'));
app.use('/views', express.static('views'));
app.use('/bower_components', express.static('bower_components'));


// Config vars
var port = process.env.PORT || 8080;

// =-=-=-=-=-=-=-=-=-=-=- Routes -=-=-=-=-=-=-=-=-=-=-=-=-=
require('./routes/routes')(app);
app.listen(port);
console.log("app running on port ", port);