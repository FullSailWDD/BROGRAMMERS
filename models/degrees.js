module.exports = function(app){
	var db = require('./config_db.js'),
	mongoose = require('mongoose');
	
	var degreeSchema = mongoose.Schema({
            abbr: String,
            title: String,
        }),

        _degreeModel = mongoose.model('degrees', degreeSchema),
        
        // create - inserts a new degree
        _save = function(degree, success, fail){
	        // Define an object to hold our new degree
            var newDocument = new _degreeModel({
                abbr: degree.abbr,
                title: degree.title
            });

			// Insert the new document into the database
            newDocument.save(function(err){
                (err) ? fail(err) : success(newDocument);
            });
        },
        
        // fetchAll - finds all degrees
        _findAll = function(success, fail){
	        // Finds all of the degrees
            _degreeModel.find({}, function(err, result){
                (err) ? fail(err) : success(result);
            });
        },
        
        // fetch - finds only one specified degree
        _find = function(targ, success, fail){
	        // Finds just one degree specificed by the Degree Abbreviation
	        _degreeModel.findOne({abbr: targ}, function(err, result){
		        (err) ? fail(err) : success(result);
	        });
        }
        
    ;return {
        schema: degreeSchema,
        create: _save,
        fetchAll: _findAll,
        fetch: _find
    };
	
}();