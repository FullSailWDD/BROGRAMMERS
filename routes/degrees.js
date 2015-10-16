module.exports = function(app) {

var Degree = require('../models/degrees.js');

// Inserts a new degree
app.post('/api/newDegree', function(req, res){
    Degree.create(req.body, function(results){
	    res.status(201).send(results);
    });
});

// Finds all of the degrees
app.get('/api/fetchDegrees', function(req, res){
    Degree.fetchAll(function(doc){
	    res.send(doc);
    });
});

// Finds one degree by degree abbreviation
app.get('/api/fetchDegree/:abbr', function(req, res){
    Degree.fetch(req.params, function(doc){
    	res.send(doc);
    });
});

} //end export
