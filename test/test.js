var expect          = require("chai").expect,
    degree            = require('../models/degrees.js');

describe('A degree in a collection', function() {

    var testdegree = null;

    beforeEach(function(done){
        degree.create({
            abbr: "WDD",
            title: "Web Design & Development",
            }, function (doc) {
                testdegree = doc;
                done();
        });

    });

    // afterEach( function (done) {
    //     degree.remove(testdegree._id, function () {
    //         done();
    //     });
    // });

    it('ADD a new degree', function(done){
        expect(testdegree.title).to.be.equal('Web Design & Development');
        done();
    });

    // it('UPDATE an existing degree', function(done){
    //     degree.update({_id:testdegree._id, abbr:"WDD"}, function(doc){
    //         expect(doc.quantity).to.be.equal(99);
    //         done();
    //     });
    // });

    // it('REMOVE an existing degree', function(done){
    //     degree.add({
    //             deck_id: 'unknown',
    //             title : 'Deleted degree',
    //             range : 1,
    //             damage : 1,
    //             quantity: 1,
    //             activation : 'On Defense',
    //             overcharge : 'Fail on Attack, this degree never makes it into a deck',
    //         }, function (doc) {
    //
    //             var removedegree = doc;
    //             expect(doc).not.to.be.null;
    //             degree.remove(removedegree._id, function () {
    //                 degree.find(removedegree, function(targetDoc){
    //                     expect(targetDoc).to.be.null;
    //                     done();
    //                 });
    //             });
    //     });
    // });

    it('FIND a degree', function(done){
        degree.fetch({_id:testdegree._id}, function(doc){
            expect(doc.title).to.be.equal('Web Design & Development');
            done();
        });
    });

    // it('FIND ALL degrees', function(done){
    //     degree.all(function(docs){
    //         expect(docs.length).to.be.above(1);
    //         done();
    //     });
    // });
});
