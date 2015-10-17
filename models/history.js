module.exports = function(app){
	var db = require('./config_db.js'),
	mongoose = require('mongoose');
		
	var historySchema = mongoose.Schema({}, {strict: false}),

    _historyModel = mongoose.model('history', historySchema),
    
    // create - inserts a new rubric
    _save = function(data, success, fail){
	    console.log(data);
	   var newDocument = new _historyModel({data});

		// Insert the new document into the database
        newDocument.save(function(err){
            (err) ? fail(err) : success(newDocument);
        });
    }
            
    ;return {
        create: _save
    };
	
}();