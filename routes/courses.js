module.exports = function(app) {

var Course = require('../models/courses.js');

// Inserts a new course
app.post('/api/newCourse', function(req, res){
    Course.create(req.body, function(results){
	    res.status(201).send(results);
    });
});
// Finds all of the courses by the degree abbreviation
app.get('/api/fetchCourses/:degreeAbbr', function(req, res){
    Course.fetchAll(req.params, function(doc){
	    res.send(doc);
    });
});

// Finds one course by degree abbreviation and course abbreviation
app.get('/api/fetchCourse/:degreeAbbr/:abbr', function(req, res){
    Course.fetch(req.params, function(doc){
    	res.send(doc);
    });
});

} //end export
