module.exports = function(app) {

var History = require('../models/history.js');
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
	// FIXME: We should pull the template from an external file
	var source = "<section><h1>{{title}} - {{grade}}</h1>{{#each sections}}<article><h2>{{title}} - {{weight}}</h2><ul>{{#each items}}<li><h3>{{title}} - {{grade}}</h3>{{#if comment}}<p>Description: {{comment}}</p>{{else}}<p>Description: None</p>{{/if}}{{#if comment}}<p>Comment: {{comment}}</p>{{else}}<p>Comment: None</p>{{/if}}</li>{{/each}}</ul></article>{{/each}}</section>";
	
	// Compile the template
	var template = Handlebars.compile(source);
	
	// Template out the data
	var rendered = template(req.body);
	
	// Assign the output value equal to the templated data
	req.body.output = rendered;
	
	History.create(req.body, function(results){
		res.status(201).send(results);
    });
});

} //end export
