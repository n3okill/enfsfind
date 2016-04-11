/**
 * @project enfsfind
 * @filename findSync.js
 * @description sync methods for finding items inside directories
 * @author Joao Parreira <joaofrparreira@gmail.com>
 * @copyright Copyright(c) 2016 Joao Parreira <joaofrparreira@gmail.com>
 * @licence Creative Commons Attribution 4.0 International License
 * @createdAt Created at 18-02-2016.
 * @version 0.0.2
 */
"use strict";

var nodePath = require("path"),
    find = require("../");

describe("enfsfind sync", function() {
    var tmpPath = nodePath.join(__dirname, "..", "lib");

    it("should list files", function() {
        find.findSync(tmpPath, "").length.should.be.equal(4);
    });
    it("should list and filter files with regex", function() {
        find.findSync(tmpPath, /async/gi).length.should.be.equal(1);
    });
    it("should list and filter files with function", function() {
        find.findSync(tmpPath, function(path) {
            return /sync/gi.test(path);
        }).length.should.be.equal(2);
    });
    it("should list and filter files with regex", function() {
        find.findSync(tmpPath, /lib/).length.should.be.equal(4);
    });
});
