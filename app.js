// =-=-=-=-=-=-=-=-=-=-=- Modules -=-=-=-=-=-=-=-=-=-=-=-=
var express = require('express'),
	app 	= express(),
	exphbs  = require('express-handlebars');

// =-=-=-=-=-=-=-=-=-=-=- View engine -=-=-=-=-=-=-=-=-=-=
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/views', express.static('views'));

// =-=-=-=-=-=-=-=-=-=-=- Config vars -=-=-=-=-=-=-=-=-=-=
var port = process.env.PORT || 8080;

// =-=-=-=-=-=-=-=-=-=-=- Routes -=-=-=-=-=-=-=-=-=-=-=-=-=

// require('./routes/routes')(app);
app.get('/', function (req, res) {
    res.render('home');
});


// require('./app/routes')(app); // pass our application into our routes

app.listen(port);
console.log("app running on port",port);
