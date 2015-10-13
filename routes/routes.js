module.exports = function(app) {

var bodyParser = require('body-parser');
// create application/x-www-form-urlencoded parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


    app.get('/',function(req,res){
        res.render('home');
    });
    // app.get('/addcourse',function(req,res){
    //     res.render('addcourse');
    // });
    // app.get('/addruberic',function(req,res){
    //     res.render('addruberic');
    // });
}//end export
