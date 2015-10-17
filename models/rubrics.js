module.exports = function(app){
	var db = require('./config_db.js'),
	mongoose = require('mongoose');
		
	var itemSchema = mongoose.Schema({
		title: {type: String},
		desc: {type: String},
		link: {type: String},
		comment: {type: String},
		grade: {type: Number}
	}),
	
	sectionSchema = mongoose.Schema({
		title: {type: String},
		weight: {type: Number},
		grade: {type: Number},
		items: [itemSchema]
	}),
	
	rubricSchema = mongoose.Schema({
        degreeAbbr: String,
        courseAbbr: String,
        title: String,
        grade: Number,
        gradeOptions: [Number],
        sections: [sectionSchema]
    }),

    _rubricModel = mongoose.model('rubrics', rubricSchema),
    
    // create - inserts a new rubric
    _save = function(data, success, fail){
        // Define an object to hold our new rubric
        var newDocument = new _rubricModel({
            degreeAbbr: data.degreeAbbr,
            courseAbbr: data.courseAbbr,
            title: data.title,
            grade: 0,
            gradeOptions: data.gradeOptions,
            sections: data.sectionTitle
        });

		// Insert the new document into the database
        newDocument.save(function(err){
            (err) ? fail(err) : success(newDocument);
        });
    },
    
    // fetchAll - finds all rubrics
    _findAll = function(targ, success, fail){
        // Finds all of the rubrics specified by the degree and course
        _rubricModel.find(targ, function(err, result){
            (err) ? fail(err) : success(result);
        });
    },
    
    // fetch - finds one rubric
    _find = function(targ, success, fail){
        // Finds all of the rubrics specified by the degree and course
        _rubricModel.findOne(targ, function(err, result){
            (err) ? fail(err) : success(result);
        });
    },
    
    // update - updates a rubric
    _update = function(targ, data, success, fail){
		_rubricModel.findByIdAndUpdate({_id: data._id}, data, function(err, result){
	        (err) ? fail(err) : success(result);
		});

    },
    
    // destroy - removes the document from the database
    _delete = function (targ, success, fail){
    	_rubricModel.remove(targ, function(err, result){
            (err) ? fail(err) : success(result);
    	});
    }
        
    ;return {
        create: _save,
        fetchAll: _findAll,
        fetch: _find,
        update: _update,
        destroy: _delete
    };
	
}();