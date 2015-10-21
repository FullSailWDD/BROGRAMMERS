var expect = require("chai").expect,
    rubric = require('../models/rubrics.js');

describe('A rubric in a course', function() {

    var testrubric = null;

    beforeEach(function(done){
        rubric.create({
	"degreeAbbr" : "CC",
	"courseAbbr" : "GND",
	"title" : "loops",
	"sections" : [
		{
			"title" : "For",
			"weight" : 50,
			"grade" : 0,
			"items" : [
				{
					"title" : "",
					"desc" : "",
					"link" : "",
					"comment" : "",
					"grade" : 0,
				}
			]
		},
		{
			"title" : "while",
			"weight" : 50,
			"grade" : 0,
			"items" : [
				{
					"title" : "",
					"desc" : "",
					"link" : "",
					"comment" : "",
					"grade" : 0,
				}
			]
		}
	],
	"gradeOptions" : [
		0,
		100
	],
}, function (doc) {
                testrubric = doc;
                done();
        });

    });
    it('ADD a new course', function(done){
        expect(testrubric.degreeAbbr).to.be.equal('CC');
        expect(testrubric.courseAbbr).to.be.equal('GND');
        expect(testrubric.title).to.be.equal('loops');
        done();
    });

    it('FIND a rubric', function(done){
        rubric.fetch({_id:testrubric._id}, function(doc){
            expect(testrubric.degreeAbbr).to.be.equal('CC');
            expect(testrubric.courseAbbr).to.be.equal('GND');
            expect(testrubric.title).to.be.equal('loops');
            done();
        });
    });

    it('FIND ALL rubrics in that course', function(done){
        rubric.fetchAll({degreeAbbr:testrubric.degreeAbbr,courseAbbr:testrubric.courseAbbr},function(docs){
            expect(docs.length).to.be.above(1);
            done();
        });
    });

    it('REMOVE an existing rubric', function(done){
        rubric.create({
	"degreeAbbr" : "DD",
	"courseAbbr" : "DEL",
	"title" : "DeleteTest",
	"sections" : [
		{
			"title" : "RM",
			"weight" : 50,
			"grade" : 0,
			"items" : [
				{
					"title" : "",
					"desc" : "",
					"link" : "",
					"comment" : "",
					"grade" : 0,
				}
			]
		},
		{
			"title" : "RF",
			"weight" : 50,
			"grade" : 0,
			"items" : [
				{
					"title" : "",
					"desc" : "",
					"link" : "",
					"comment" : "",
					"grade" : 0,
				}
			]
		}
	],
	"gradeOptions" : [
		0,
        50,
		100
	],
}, function (doc) {
                var removeRubric = doc;
                expect(doc).not.to.be.null;
                rubric.destroy({_id:removeRubric._id}, function() {
                    rubric.fetch({_id:removeRubric._id}, function(targetDoc){
                        expect(targetDoc).to.be.null;
                        done();
                    });
                });
        });
    });
    //remove all test from db
    it('REMOVE all test rubrics',function (done){
        rubric.destroy({degreeAbbr:testrubric.degreeAbbr,courseAbbr:testrubric.courseAbbr,title:testrubric.title}, function() {
            rubric.fetch({degreeAbbr:testrubric.degreeAbbr,courseAbbr:testrubric.courseAbbr,title:testrubric.title}, function(targetTest){
                expect(targetTest).to.be.null;
                done();
            });
        });
    });
});
