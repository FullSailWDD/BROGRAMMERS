module.exports = function(app){
	var db = require('./config_db.js'),
	mongoose = require('mongoose');
		
	var itemSchema = mongoose.Schema({
		title: {type: String},
		link: {type: String},
		comment: {type: String},
		grade: {type: Number}
	}),
	
	sectionSchema = mongoose.Schema({
		title: {type: String},
		desc: {type: String},
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
    
    // fetch - finds only one specified rubric
    _findSection = function(targ, success, fail){
        // Finds just one rubric specificed by the degree abbreviation, course abbreviation and section title
		_rubricModel.find({degreeAbbr: targ.degreeAbbr, courseAbbr: targ.courseAbbr, title: targ.title},
			{sections: { $elemMatch: { title: targ.sectionTitle } } },
			function(err, result){
				/*
				 * FIX ME
				 * This function returns data in an unexpected format:
				 * 
				 *	[
				 *	  {
				 *	    "_id": "561e91c2d2cb0972b4f8dcc6",
				 *	    "sections": [
				 *	      {
				 *	        "title": "Color",
				 *	        "desc": "This covers overall color and how they work together.",
				 *	        "weight": 25,
				 *	        "grade": 0,
				 *	        "_id": "561e91c2d2cb0972b4f8dcc7",
				 *	        "items": []
				 *	      }
				 *	    ],
				 *	    "gradeOptions": []
				 *	  }
				 *	]
				 *
				 * TEMP FIX: success(result[0].sections[0]);
				 * SHOULD BE: success(result);
				 *
				*/
                (err) ? fail(err) : success(result[0].sections[0]);
			}
		);
    }
        
    ;return {
        schema: rubricSchema,
        create: _save,
        fetchAll: _findAll,
        fetch: _find,
        fetchSection: _findSection
    };
	
}();