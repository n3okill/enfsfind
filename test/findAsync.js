/**
 * Created by JParreir on 28-12-2015.
 */

"use strict";

var nodePath = require("path"),
    find = require("../");

describe("enfsfind async", function() {
    var tmpPath = nodePath.join(__dirname, "..", "lib");
    it("should list files", function(done) {
        find.find(tmpPath, function(err, list) {
            (err === null).should.be.equal(true);
            list.length.should.be.equal(4);
            done();
        });
    });
    it("should list and filter files with regex", function(done) {
        find.find(tmpPath, /async/gi, function(err, list) {
            (err === null).should.be.equal(true);
            list.length.should.be.equal(1);
            done();
        });
    });
    it("should list and filter files with function", function(done) {
        find.find(tmpPath, function(item) {
            return /sync/gi.test(item.path);
        }, function(err, list) {
            (err === null).should.be.equal(true);
            list.length.should.be.equal(2);
            done();
        });
    });
    it("should list and filter files with regex", function(done) {
        find.find(tmpPath, /lib/, function(err, list) {
            (err === null).should.be.equal(true);
            list.length.should.be.equal(4);
            done();
        });
    });
});
