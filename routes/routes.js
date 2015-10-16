module.exports = function(app) {
console.log('Loaded routes');
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

} //end export
