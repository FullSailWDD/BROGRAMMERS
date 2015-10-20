module.exports = function(app) {

var Degree = require('../models/degrees.js'),
	Course = require('../models/courses.js'),
	Rubric = require('../models/rubrics.js');

// Delete a degree and all of its corresponding data
app.delete('/api/deleteDegree/:abbr', function(req, res){
    // Remove every rubric related to the target degree
    Rubric.destroy(req.params, function(doc){
    	res.send(doc);
    });
    // Remove every course related to the target degree
    Course.destroy(req.params, function(doc){
    	res.send(doc);
    });
    
    // Remove the degree
    Degree.destroy(req.params, function(doc){
    	res.send(doc);
    });
});

} //end export
