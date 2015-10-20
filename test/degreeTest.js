var expect = require("chai").expect,
    degree = require('../models/degrees.js');

describe('A degree in a collection', function() {

    var testdegree = null;

    beforeEach(function(done){
        degree.create({
            abbr: "TTE",
            title: "Test Track Engineering",
            }, function (doc) {
                testdegree = doc;
                done();
        });

    });

    it('ADD a new degree', function(done){
        expect(testdegree.title).to.be.equal('Test Track Engineering');
        expect(testdegree.abbr).to.be.equal('TTE');
        done();
    });

    it('REMOVE an existing Degree', function(done){
        degree.create({
                title : 'DELETE DELETE DELETE',
                abbr : 'DDD',
            }, function (doc) {

                var removeDegree = doc;
                expect(doc).not.to.be.null;
                degree.destroy({_id:removeDegree._id}, function() {
                    degree.fetch({_id:removeDegree._id}, function(targetDoc){
                        expect(targetDoc).to.be.null;
                        done();
                    });
                });
        });
    });
    it('FIND a degree', function(done){
        degree.fetch({_id:testdegree._id}, function(doc){
            expect(testdegree.title).to.be.equal('Test Track Engineering');
            expect(testdegree.abbr).to.be.equal('TTE');
            done();
        });
    });

    it('FIND ALL degrees', function(done){
        degree.fetchAll(function(docs){
            expect(docs.length).to.be.above(1);
            done();
        });
    });

    it('remove all test degrees',function (done){
        degree.destroy({abbr:testdegree.abbr}, function() {
            degree.fetch({abbr:testdegree.abbr}, function(targetTest){
                expect(targetTest).to.be.null;
                done();
            });
        });
    });
});
