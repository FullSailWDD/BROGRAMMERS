module.exports = function(app) {

var Degree = require('../models/degrees.js'),
	Course = require('../models/courses.js'),
	Rubric = require('../models/rubrics.js');

// Delete a degree and all of its corresponding data
app.delete('/api/deleteDegree', function(req, res){
	console.log("logging out the req",req);
    // Remove every rubric related to the target degree
    // Rubric.destroy(req.body, function(doc){
    // 	res.send(doc);
    // });
    // // Remove every course related to the target degree
    // Course.destroy(req.body, function(doc){
    // 	res.send(doc);
    // });
	console.log("delete degree ran!");
    // Remove the degree
    Degree.destroy({abbr:req.body.degreeAbbr}, function(doc){
		console.log("logging out the body",req.body);
		console.log("logging out the degreeAbbr in body",req.body.abbr);
    	res.send(doc);
    });
});

// Remove a degree
app.get('/api/deleteDegree/:abbr', function(req, res){
	console.log("request params ",req.params);
    // Degree.remove({abbr:req.params}, function(doc){
    // 	res.send(doc);
    // });
});
} //end export
