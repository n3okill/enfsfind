/**
 * Created by JParreir on 28-12-2015.
 */

"use strict";

var nodePath = require("path"),
    find = require("../");

describe("enfsfind sync", function() {
    var tmpPath = nodePath.join(__dirname, "..", "lib");

    it("should list files", function(done) {
        var list;
        list = find.findSync(tmpPath, "");
        list.length.should.be.equal(4);
        done();
    });
    it("should list and filter files with regex", function(done) {
        var list;
        list = find.findSync(tmpPath, /async/gi);
        list.length.should.be.equal(1);
        done();
    });
    it("should list and filter files with function", function(done) {
        var list;
        list = find.findSync(tmpPath, function(f) {
            return /sync/gi.test(f);
        });
        list.length.should.be.equal(2);
        done();
    });
    it("should list and filter files with regex", function(done) {
        var list;
        list = find.findSync(tmpPath, /lib/);
        list.length.should.be.equal(4);
        done();
    });
});
