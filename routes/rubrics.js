module.exports = function(app) {

var Rubric = require('../models/rubrics.js');
// Inserts a new rubric
app.post('/api/newRubric', function(req, res){
	// Define an empty array to hold our section objects
	var sectionsArr = [],
		// Converts our string of grade options to an array and converts each array index to an integer
		gradeOptions = req.body.gradeOptions.split(',').map(Number),
		// Converts our string of section titles to an array
		sectionTitles = req.body.sections.split(',');

	// We need to format the data before shooting it to mongoose to be inserted, time for some loops
	sectionTitles.forEach(function(title, index){
		// Create a temporary object to hold our values
		var obj = {
			title: title,
			// Calculates the default weight of each section
			weight: Math.round(100 / sectionTitles.length) / 100,
			// The grade has not been set yet so we start at 0
			grade: 0,
			// Lets store an empty item
			items: [
				{
					// None of these fields have been set yet, so let's create a blank item to build off of
					title: "",
					desc: "",
					link: "",
					comment: "",
					grade: 0
				}
			]

		}
		// Push the new object to the sectionsArr array;
		sectionsArr.push(obj);
	});

	// Sets the req.body.gradeOptions and req.body.sectionTitle to the formatted data
	req.body.gradeOptions = gradeOptions;
	req.body.sections = sectionsArr;

    Rubric.create(req.body, function(results){
	    res.status(201).send(results);
    });
});

// Finds all of the rubrics by the degree abbreviation and course abbreviation
app.get('/api/fetchRubrics/:degreeAbbr/:courseAbbr', function(req, res){
    Rubric.fetchAll(req.params, function(doc){
	    res.send(doc);
    });
});

// Finds just one rubric by the degree abbreviation and course abbreviation
app.get('/api/fetchRubric/:degreeAbbr/:courseAbbr/:title', function(req, res){
    Rubric.fetch(req.params, function(doc){
	    res.send(doc);
    });
});

// Deletes a rubric
app.delete('/api/deleteRubric', function(req, res){
    Rubric.destroy(req.body, function(doc){
	    res.send(doc);
    });
});

// Updates a rubric
app.put('/api/updateRubric', function(req, res){
	// Convert the new grades to numbers again only if the gradeOptions is a string
	if (typeof req.body.gradeOptions === 'string') req.body.gradeOptions = req.body.gradeOptions.split(',').map(Number);


    Rubric.update(req.body._id, req.body, function(doc){
	    res.send(doc);
    });
});

} //end export