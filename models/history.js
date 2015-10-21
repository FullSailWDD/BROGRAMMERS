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
	
	historySchema = mongoose.Schema({
        degreeAbbr: String,
        courseAbbr: String,
        title: String,
        grade: Number,
        gradeOptions: [Number],
        sections: [sectionSchema]
    }),

    _historyModel = mongoose.model('history', historySchema),
    
    // create - inserts a new history
    _save = function(data, success, fail){
        // Define an object to hold our new history
        var newDocument = new _historyModel({
            degreeAbbr: data.degreeAbbr,
            courseAbbr: data.courseAbbr,
            title: data.title,
            grade: data.grade,
            weight: data.weight,
            gradeOptions: data.gradeOptions,
            sections: data.sections
        });

		// Insert the new document into the database
        newDocument.save(function(err){
            (err) ? fail(err) : success(newDocument);
        });
    },
    
    // fetchAll - finds all historys
    _findAll = function(targ, success, fail){
        // Finds all of the historys specified by the degree and course
        _historyModel.find(targ, function(err, result){
            (err) ? fail(err) : success(result);
        });
    },
    
    // fetch - finds one history
    _find = function(targ, success, fail){
        // Finds all of the historys specified by the degree and course
        _historyModel.findOne(targ, function(err, result){
            (err) ? fail(err) : success(result);
        });
    }
    
    ;return {
        create: _save,
        fetchAll: _findAll,
        fetch: _find
    };
	
}();