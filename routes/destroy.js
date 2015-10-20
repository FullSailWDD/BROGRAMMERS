module.exports = function(app) {

var Degree = require('../models/degrees.js'),
	Course = require('../models/courses.js'),
	Rubric = require('../models/rubrics.js');

// Delete a degree and all of its corresponding data
app.delete('/api/deleteDegree', function(req, res){
    // Remove every rubric related to the target degree
    // Rubric.destroy(req.body, function(doc){
    // 	res.send(doc);
    // });
    // // Remove every course related to the target degree
    // Course.destroy(req.body, function(doc){
    // 	res.send(doc);
    // });

    // Remove the degree
    Degree.destroy({abbr:req.body.degreeAbbr}, function(doc){
		console.log("logging out the body",req.body);
		console.log("logging out the degreeAbbr in body",req.body.degreeAbbr);		
    	res.send(doc);
    });
});

} //end export
