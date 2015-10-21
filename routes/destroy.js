module.exports = function(app) {

var Degree = require('../models/degrees.js'),
	Course = require('../models/courses.js'),
	Rubric = require('../models/rubrics.js');

// Remove a degree
app.get('/api/deleteDegree/:abbr', function(req, res){
	//Remove degree
    Degree.destroy(req.params, function(doc){
    	 res.send();
    });
	//remove courses in that degree
	Course.destroy({degreeAbbr:req.params.abbr},function(doc){
		res.send();
	});
	//remove courses in that degree
	Rubric.destroy({degreeAbbr:req.params.abbr},function(doc){
		res.send();
	});

});

// Remove a course
app.get('/api/deleteCourse/:abbr', function(req, res){
	//remove courses in that degree

	Course.destroy({abbr:req.params.abbr},function(doc){
		res.send();
	});
	//remove courses in that degree
	Rubric.destroy({courseAbbr:req.params.abbr},function(doc){
		res.send();
	});

});

// Remove a rubric
app.get('/api/deleteRubric/:abbr', function(req, res){
	//remove rubric in that course
	Rubric.destroy({_id:req.params.abbr},function(doc){
		res.send();
	});

});

} //end export
