module.exports = function(app) {

var bodyParser = require('body-parser');

// create application/x-www-form-urlencoded parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',function(req,res){
    res.render('home');
});

require('./degrees.js')(app);
require('./courses.js')(app);
require('./rubrics.js')(app);
require('./history.js')(app);
require('./destroy.js')(app);
};
