module.exports = function(app) {

var History = require('../models/history.js'),
	Handlebars = require('handlebars');
	
// Finds all of the rubrics by the degree abbreviation and course abbreviation
app.get('/api/fetchHistory/:degreeAbbr/:courseAbbr/:title', function(req, res){
    History.fetchAll(req.params, function(doc){
	    res.send(doc);
    });
});

// Finds just one rubric by the degree abbreviation and course abbreviation
app.get('/api/fetchHistory/:_id', function(req, res){
    History.fetch(req.params, function(doc){
	    res.send(doc);
    });
});

app.post('/api/newAudit', function(req, res){
	
	var source = "<ul>{{#each sections}}<li>{{title}}</li>{{/each}}</ul>";
	
	var template = Handlebars.compile(source);
	 
	var data = req.body;
		
	var ren = template(data);
	
	req.body.output = ren;
	
	History.create(req.body, function(results){
		res.status(201).send(results);
    });
});

} //end export
