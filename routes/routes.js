module.exports = function(app) {

var bodyParser = require('body-parser');
// create application/x-www-form-urlencoded parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//********this route will be replaced with angular routes **********************
app.get('/',function(req,res){
    res.render('home');
});
    //=-=-=-=-=-=-=- Routes for API -=-=-=-=-=-=-=-=-=
    app.get('/degrees',function(req,res){
        //get all degrees from the database
    });

    app.get('/courses',function(req,res){
        //get all courses from the database
    });

    // app.get('/forms',function(req,res){
    //     res.render('forms');
    // });
};//end export

