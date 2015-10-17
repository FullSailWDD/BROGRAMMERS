var expect = require("chai").expect,
    degree = require('../models/degrees.js');

describe('A degree in a collection', function() {

    var testdegree = null;

    beforeEach(function(done){
        degree.create({
            abbr: "WTF",
            title: "Web Text Fundamentals",
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
        expect(testdegree.title).to.be.equal('Web Text Fundamentals');
        expect(testdegree.abbr).to.be.equal('WTF');
        done();
    });

    // it('UPDATE an existing degree', function(done){
    //     degree.update({_id:testdegree._id, abbr:"WDD"}, function(doc){
    //         expect(doc.quantity).to.be.equal(99);
    //         done();
    //     });
    // });

    it('REMOVE an existing Degree', function(done){
        degree.create({
                title : 'DELETE DELETE DELETE',
                abbr : 'DDD',
            }, function (doc) {

                var removeDegree = doc;
                expect(doc).not.to.be.null;
                degree.delete({_id:removeDegree._id}, function() {
                    degree.fetch({_id:removeDegree._id}, function(targetDoc){
                        expect(targetDoc).to.be.null;
                        done();
                    });
                });
        });
    });
    it('FIND a degree', function(done){
        degree.fetch({_id:testdegree._id}, function(doc){
            expect(testdegree.title).to.be.equal('Web Text Fundamentals');
            expect(testdegree.abbr).to.be.equal('WTF');
            done();
        });
    });

    it('FIND ALL degrees', function(done){
        degree.fetchAll(function(docs){
            expect(docs.length).to.be.above(1);
            done();
        });
    });
});
