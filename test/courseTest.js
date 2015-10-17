var expect = require("chai").expect,
    course = require('../models/courses.js');

describe('A course in a collection', function() {

    var testcourse = null;

    beforeEach(function(done){
        course.create({
            degreeAbbr: String,
            abbr: "WDD",
            title: "Web Design & Development",
            }, function (doc) {
                testcourse = doc;
                done();
        });

    });

    // afterEach( function (done) {
    //     course.remove(testcourse._id, function () {
    //         done();
    //     });
    // });

    it('ADD a new course', function(done){
        expect(testcourse.title).to.be.equal('Web Design & Development');
        done();
    });

    // it('UPDATE an existing course', function(done){
    //     course.update({_id:testcourse._id, abbr:"WDD"}, function(doc){
    //         expect(doc.quantity).to.be.equal(99);
    //         done();
    //     });
    // });

    // it('REMOVE an existing course', function(done){
    //     course.add({
    //             deck_id: 'unknown',
    //             title : 'Deleted course',
    //             range : 1,
    //             damage : 1,
    //             quantity: 1,
    //             activation : 'On Defense',
    //             overcharge : 'Fail on Attack, this course never makes it into a deck',
    //         }, function (doc) {
    //
    //             var removecourse = doc;
    //             expect(doc).not.to.be.null;
    //             course.remove(removecourse._id, function () {
    //                 course.find(removecourse, function(targetDoc){
    //                     expect(targetDoc).to.be.null;
    //                     done();
    //                 });
    //             });
    //     });
    // });

    it('FIND a course', function(done){
        course.fetch({_id:testcourse._id}, function(doc){
            expect(doc.title).to.be.equal('Web Design & Development');
            done();
        });
    });

    // it('FIND ALL courses', function(done){
    //     course.all(function(docs){
    //         expect(docs.length).to.be.above(1);
    //         done();
    //     });
    // });
});
