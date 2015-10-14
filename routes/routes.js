module.exports = function(app) {
console.log('Loaded routes');
var bodyParser = require('body-parser'),
	Degree = require('../models/degrees.js'),
	Course = require('../models/courses.js'),
	Rubric = require('../models/courses.js');

// create application/x-www-form-urlencoded parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/',function(req,res){
    res.render('home');
});

// Inserts a new degree
app.post('/newDegree', function(req, res){
    Degree.create(req.body, function(results){
	    res.status(201).send(results);
    });
});

// Finds all of the degrees
app.get('/fetchDegrees', function(req, res){
    Degree.fetchAll(function(doc){
	    res.send(doc);
    });
});

// Finds one degree
app.get('/fetchDegree/:abbr', function(req, res){
    Degree.fetch(req.params, function(doc){
    	res.send(doc);
    });
});

// Inserts a new course
app.post('/newCourse', function(req, res){
    Course.create(req.body, function(results){
	    res.status(201).send(results);
    });
});

// Finds all of the courses by the degree
app.get('/fetchCourses/:degreeAbbr', function(req, res){
    Course.fetchAll(req.params, function(doc){
	    res.send(doc);
    });
});

// Finds one course by degree and course
app.get('/fetchCourse/:degreeAbbr/:abbr', function(req, res){
    Course.fetch(req.params, function(doc){
    	res.send(doc);
    });
});

} //end export
