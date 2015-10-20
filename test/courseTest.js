var expect = require("chai").expect,
    course = require('../models/courses.js');

describe('A course in a collection', function() {

    var testcourse = null;

    beforeEach(function(done){
        course.create({
            degreeAbbr: "WDD",
            abbr: "WXF",
            title: "Web Testing Frameworks",
            }, function (doc) {
                testcourse = doc;
                done();
        });

    });

    it('ADD a new course', function(done){
        expect(testcourse.degreeAbbr).to.be.equal('WDD');
        expect(testcourse.abbr).to.be.equal('WXF');
        expect(testcourse.title).to.be.equal('Web Testing Frameworks');
        done();
    });

    it('FIND a course', function(done){
        course.fetch({_id:testcourse._id}, function(doc){
            expect(testcourse.degreeAbbr).to.be.equal('WDD');
            expect(testcourse.abbr).to.be.equal('WXF');
            expect(testcourse.title).to.be.equal('Web Testing Frameworks');
            done();
        });
    });

    it('FIND ALL courses', function(done){
        course.fetchAll({},function(docs){
            expect(docs.length).to.be.above(1);
            done();
        });
    });

    it('REMOVE an existing Course', function(done){
        course.create({
            degreeAbbr: "WDD",
            abbr: "WXX",
            title: "Web User Experience",
            }, function (doc) {
                var removeCourse = doc;
                expect(doc).not.to.be.null;
                course.destroy({_id:removeCourse._id}, function() {
                    course.fetch({_id:removeCourse._id}, function(targetDoc){
                        expect(targetDoc).to.be.null;
                        done();
                    });
                });
        });
    });
    //remove all test from db
    it('REMOVE all test courses',function (done){
        course.destroy({abbr:testcourse.abbr}, function() {
            course.fetch({abbr:testcourse.abbr}, function(targetTest){
                expect(targetTest).to.be.null;
                done();
            });
        });
    });
});
