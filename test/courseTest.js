var expect = require("chai").expect,
    course = require('../models/courses.js');

describe('A course in a collection', function() {

    var testcourse = null;

    beforeEach(function(done){
        course.create({
            degreeAbbr: "WDD",
            abbr: "ADT",
            title: "Applied Design Tools and Interfaces",
            }, function (doc) {
                testcourse = doc;
                done();
        });

    });
    it('ADD a new course', function(done){
        expect(testcourse.degreeAbbr).to.be.equal('WDD');
        expect(testcourse.abbr).to.be.equal('ADT');
        expect(testcourse.title).to.be.equal('Applied Design Tools and Interfaces');
        done();
    });

    it('FIND a course', function(done){
        course.fetch({_id:testcourse._id}, function(doc){
            expect(testcourse.degreeAbbr).to.be.equal('WDD');
            expect(testcourse.abbr).to.be.equal('ADT');
            expect(testcourse.title).to.be.equal('Applied Design Tools and Interfaces');
            done();
        });
    });

    it('FIND ALL courses', function(done){
        course.fetchAll({},function(docs){
            expect(docs.length).to.be.above(1);
            done();
        });
    });
});
