/**
 * @project enfsfind
 * @filename findAsync.js
 * @description sync methods for finding items inside directories
 * @author Joao Parreira <joaofrparreira@gmail.com>
 * @copyright Copyright(c) 2016 Joao Parreira <joaofrparreira@gmail.com>
 * @licence Creative Commons Attribution 4.0 International License
 * @createdAt Created at 18-02-2016.
 * @version 0.0.1
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
        find.find(tmpPath, function(path) {
            return /sync/gi.test(path);
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
