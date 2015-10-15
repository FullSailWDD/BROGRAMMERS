module.exports = function(app) {
console.log('Loaded routes');
var bodyParser = require('body-parser'),
	Degree = require('../models/degrees.js'),
	Course = require('../models/courses.js'),
	Rubric = require('../models/rubrics.js');

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

// Inserts a new rubric
app.post('/newRubric', function(req, res){
	// Define an empty array to hold our section objects
	var sectionsArr = [],
		// Converts our string of grade options to an array and converts each array index to an integer
		gradeOptions = req.body.gradeOptions.split(',').map(Number),
		// Converts our string of section titles to an array
		sectionTitle = req.body.sectionTitle.split(',');
	
	// We need to format the data before shooting it to mongoose to be inserted, time for some loops
	sectionTitle.forEach(function(title, index){
		// Create a temporary object to hold our values
		var obj = {
			title: title,
			// The description has not been set yet so we start with an empty string
			desc: "",
			// Calculates the default weight of each section
			weight: Math.round(100 / sectionTitle.length),
			// The grade has not been set yet so we start at 0
			grade: 0
		}
		// Push the new object to the sectionsArr array;
		sectionsArr.push(obj);
	});
	
	// Sets the req.body.gradeOptions and req.body.sectionTitle to the formatted data
	req.body.gradeOptions = gradeOptions;
	req.body.sectionTitle = sectionsArr;
	
    Rubric.create(req.body, function(results){
	    res.status(201).send(results);
    });
});

// Finds all of the rubrics by the degree and course
app.get('/fetchRubrics/:degreeAbbr/:courseAbbr', function(req, res){
    Rubric.fetchAll(req.params, function(doc){
	    res.send(doc);
    });
});

// Finds just one rubric by the degree and course
app.get('/fetchRubric/:degreeAbbr/:courseAbbr/:title', function(req, res){
    Rubric.fetch(req.params, function(doc){
	    res.send(doc);
    });
});

} //end export
